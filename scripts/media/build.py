#!/usr/bin/env python3
"""Fill the homepage's Reading and Listening cards with this year's books and records.

Books come from Hardcover (books marked read, with a read finished this year). Records come
from last.fm: an album counts once three or more different songs from it have been played
this year.

Books show as a gauge toward BOOK_GOAL with a pace marker, records as a mosaic of covers, and
each has a dropdown list of titles.

Usage: build.py SITE_DIR. Rewrites every <!-- media:NAME -->...<!-- /media:NAME --> region in
SITE_DIR/index.html and writes SITE_DIR/data/this-year.json.
The Pages workflow runs it on the staged copy of the site, so the repo itself is untouched.

Environment: LASTFM_API_KEY, HARDCOVER_TOKEN (required); LASTFM_USER (default joshd19).
A source that fails keeps the numbers from the live site's data/this-year.json, so an API
outage leaves yesterday's figures up instead of blanking the card. When there is no live copy
either, that source's regions keep their committed text; the other source is still filled
in. Any failed source makes the script exit 1, which the workflow shows as a warning.
"""
from __future__ import annotations

import calendar
import datetime as dt
import html
import json
import math
import os
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path
from zoneinfo import ZoneInfo

LASTFM = "https://ws.audioscrobbler.com/2.0/"
HARDCOVER = "https://api.hardcover.app/v1/graphql"
LIVE_DATA = "https://joshdavidoff.com/data/this-year.json"
USER_AGENT = "joshdavidoff.com this-year build"
TZ = ZoneInfo("America/New_York")
MIN_SONGS = 3  # different songs played before an album counts as a record
PAGES = ("index.html",)
BOOK_GOAL = 50
MOSAIC_TILES = 21  # three rows of seven covers, most played first
LASTFM_NO_ART = "2a96cbd8b46e442fc41c2b86b821562f"  # last.fm's grey star placeholder


def _request(url: str, data: bytes | None = None, headers: dict | None = None, retries: int = 4) -> dict:
    req = urllib.request.Request(url, data=data, headers={"User-Agent": USER_AGENT, "Accept": "application/json", **(headers or {})})
    for i in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and i < retries - 1:
                time.sleep(5 * (i + 1))
                continue
            try:  # last.fm and Hardcover explain a 4xx in a JSON body; hand it back to the caller
                body = json.loads(e.read())
            except ValueError:
                body = None
            if isinstance(body, dict) and "error" in body:
                return body
            raise RuntimeError(f"{urllib.parse.urlsplit(url).netloc}: HTTP {e.code}") from None
        except (urllib.error.URLError, TimeoutError):
            if i < retries - 1:
                time.sleep(5)
                continue
            raise
    raise RuntimeError("unreachable")


def _lastfm(params: dict) -> dict:
    data = _request(LASTFM + "?" + urllib.parse.urlencode({**params, "format": "json"}))
    if "error" in data:
        raise RuntimeError(f"last.fm {params['method']}: {data.get('message', data['error'])}")
    time.sleep(0.22)  # stay under last.fm's 5 requests a second
    return data


# Whole words only: 'Mixtape', 'Demonic' and 'Liverpool' are titles, not tags.
TAG_WORDS = (r"\b(remaster(ed)?|deluxe|expanded|edition|anniversary|version|bonus|live|mono|stereo"
             r"|mix|edit|demo|acoustic|session|take)\b")
# A bracketed tag may hold its word anywhere: '(2019 Remaster)', '[Live at the BBC]'. After a
# dash the tag word must lead, after at most a year and one more word: 'Remastered 2011',
# '2009 Remaster', 'Radio Edit', 'Live 1972-03-01'; 'Sonata - II. Allegro' and 'Song - How to
# Live' are left alone.
TAG = re.compile(rf"(\s*[\(\[][^\(\)\[\]]*{TAG_WORDS}[^\(\)\[\]]*[\)\]]"
                 rf"|\s+[-\u2013\u2014]\s+(\d{{4}}\s+)?([^\W\d]+\s+)?{TAG_WORDS}[^\(\)\[\]]*)\s*$", re.I)


def strip_tags(name: str) -> str:
    """'Abbey Road (Deluxe Edition) [Remastered]' and 'IV - Remastered' lose their edition
    tags; '(What's the Story) Morning Glory?' and 'Sonata - II. Allegro' keep everything."""
    while True:
        cut = TAG.sub("", name).strip()
        if cut == name or not cut:
            return name
        name = cut


def _fold(s: str) -> str:
    """Drop punctuation, symbols and spaces, and accents on Latin letters only, so 'Don’t
    Stop' -> 'dontstop' and 'Café' -> 'cafe' while 'バ' and 'ハ' stay distinct."""
    out, prev = [], ""
    for c in unicodedata.normalize("NFKD", s.casefold()):
        if unicodedata.combining(c) and prev and ord(prev) < 0x250:
            continue
        if unicodedata.category(c)[0] in "PSZC":
            continue
        out.append(c)
        prev = c
    return unicodedata.normalize("NFC", "".join(out))


def track_key(name: str) -> str:
    """Fold a track title so 'Song (2019 Remaster)' and 'Song - Live' match 'Song'."""
    name = strip_tags(name)
    return _fold(name) or name.casefold()


def scrobbles(user: str, key: str, since: dt.datetime, until: dt.datetime) -> list[dict]:
    out, page = [], 1
    while True:
        d = _lastfm({"method": "user.getrecenttracks", "user": user, "api_key": key, "limit": 200, "page": page,
                     "from": int(since.timestamp()), "to": int(until.timestamp())})["recenttracks"]
        tracks = d["track"] if isinstance(d["track"], list) else [d["track"]]
        for t in tracks:
            if t.get("@attr", {}).get("nowplaying") or not t.get("album", {}).get("#text"):
                continue
            out.append({"artist": t["artist"]["#text"], "album": t["album"]["#text"], "track": t["name"]})
        if page >= int(d["@attr"]["totalPages"]):
            return out
        page += 1


def album_info(artist: str, album: str, key: str) -> tuple[str, str]:
    """(album page url, cover url) from last.fm; empty when it has no record of the album."""
    try:
        d = _lastfm({"method": "album.getinfo", "artist": artist, "album": album, "api_key": key})["album"]
    except RuntimeError as e:
        if "not found" in str(e).lower():
            return "", ""
        raise
    art = next((i["#text"] for i in d.get("image") or [] if i.get("size") == "medium"), "")
    if LASTFM_NO_ART in art:
        art = ""
    return d.get("url", ""), art


def album_title(name: str) -> str:
    """'Rubber Soul (Remastered 2009)' -> 'Rubber Soul'; leaves '(What's the Story)' alone."""
    return strip_tags(name)


def records(user: str, key: str, year: int) -> list[dict]:
    """Albums by (artist, title) ignoring case and edition tags, so a remaster and the
    original, or two capitalizations of one name, count as one record."""
    since = dt.datetime(year, 1, 1, tzinfo=TZ)
    groups: dict[tuple[str, str], dict] = {}
    for s in scrobbles(user, key, since, dt.datetime.now(TZ)):
        g = groups.setdefault((s["artist"].casefold(), album_title(s["album"]).casefold()),
                              {"keys": [], "names": Counter()})
        g["keys"].append(track_key(s["track"]))
        g["names"][(s["artist"], s["album"])] += 1
    out = []
    for g in groups.values():
        if len(set(g["keys"])) < MIN_SONGS:
            continue
        artist, album = g["names"].most_common(1)[0][0]
        url, art = album_info(artist, album, key)
        out.append({"artist": artist, "album": album_title(album), "plays": len(g["keys"]), "url": url, "image": art})
    out.sort(key=lambda r: (-r["plays"], r["artist"].lower(), r["album"].lower()))
    return out


# Josh's public Hardcover user id (username autofictions). user_books is readable for every
# public library, so the query has to name whose; a token with read:me is not needed.
HARDCOVER_USER_ID = 183109

BOOKS_QUERY = """query($uid: Int!, $since: date!) {
  user_books(where: {user_id: {_eq: $uid}, status_id: {_eq: 3}, user_book_reads: {finished_at: {_gte: $since}}}) {
    book { title subtitle slug contributions { contribution author { name } } }
    user_book_reads(where: {finished_at: {_gte: $since}}, order_by: {finished_at: desc}, limit: 1) { finished_at }
  }
}"""


def book_title(title: str, subtitle: str | None) -> str:
    """'Superintelligence: Paths, Dangers, Strategies' -> 'Superintelligence' when Hardcover
    lists 'Paths, Dangers, Strategies' as the subtitle; 'Dune: Messiah' stays whole."""
    head, sep, tail = title.partition(": ")
    if sep and subtitle and head.strip() and _fold(tail)[:24] == _fold(subtitle)[:24]:
        return head.strip()
    return title


def books(token: str, year: int) -> list[dict]:
    token = token.removeprefix("Bearer ").strip()
    body = {"query": BOOKS_QUERY, "variables": {"uid": HARDCOVER_USER_ID, "since": f"{year}-01-01"}}
    d = _request(HARDCOVER, data=json.dumps(body).encode(),
                 headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
    if d.get("errors") or "error" in d or not d.get("data"):
        raise RuntimeError(f"Hardcover: {str(d.get('errors', d))[:200]}")
    out = []
    for ub in d["data"]["user_books"]:
        reads = ub["user_book_reads"]
        if not reads or not reads[0]["finished_at"].startswith(str(year)):
            continue
        b = ub["book"]
        authors = [" ".join(c["author"]["name"].split()) for c in b["contributions"]
                   if c.get("author") and c.get("contribution") in (None, "Author")]
        out.append({"title": book_title(b["title"], b.get("subtitle")), "authors": authors, "finished": reads[0]["finished_at"][:10],
                    "url": f"https://hardcover.app/books/{b['slug']}" if b.get("slug") else ""})
    out.sort(key=lambda b: (b["finished"], b["title"].lower()), reverse=True)
    return out


def live_copy() -> dict:
    try:
        return _request(LIVE_DATA)
    except Exception:  # first deploy, or the site is down: nothing to fall back on
        return {}


def _a(url: str, text: str) -> str:
    return f'<a href="{html.escape(url)}">{text}</a>' if url else text


def gauge(count: int, goal: int, today: dt.date) -> str:
    """A half-circle gauge filled count/goal, with a tick where an even pace would be today."""
    cx, cy, r = 80, 78, 64
    year_frac = (today.timetuple().tm_yday - 0.5) / (366 if calendar.isleap(today.year) else 365)
    angle = math.pi * (1 - min(year_frac, 1))
    (x1, y1), (x2, y2) = ((cx + rr * math.cos(angle), cy - rr * math.sin(angle)) for rr in (r - 11, r + 11))
    pct = min(count / goal, 1) * 100
    arc = f"M {cx - r} {cy} A {r} {r} 0 0 1 {cx + r} {cy}"
    fill_arc = f'<path class="g-fill" d="{arc}" pathLength="100" stroke-dasharray="{pct:.1f} 100"/>' if count else ""
    return (f'<svg class="gauge" viewBox="0 0 160 92" role="img" aria-label="{count} books toward a goal of {goal}">'
            f'<path class="g-track" d="{arc}"/>{fill_arc}<path class="g-pace" d="M {x1:.1f} {y1:.1f} L {x2:.1f} {y2:.1f}"/>'
            f'<text class="g-num" x="{cx}" y="{cy - 8}">{count}</text>'
            f'<text class="g-of" x="{cx}" y="{cy + 12}">of {goal}-book goal</text></svg>')


def render(data: dict) -> dict[str, str]:
    """Regions for whichever sources are present in data."""
    built = dt.date.fromisoformat(data.get("books_built") or data["built"])
    empty = '<li class="empty">None yet this year.</li>'
    out = {"year": str(data["year"])}
    if "books" in data:
        bk = data["books"]
        out["books-viz"] = gauge(len(bk), BOOK_GOAL, built)
        out["books-count"] = "See the list"
        out["books-list"] = "".join(
            f'<li><span class="t">{_a(b["url"], html.escape(b["title"]))}</span>'
            f'<span class="by">{html.escape(", ".join(b["authors"]))}</span></li>' for b in bk) or empty
    if "records" in data:
        rec = data["records"]
        covers = [r for r in rec if r.get("image")][:MOSAIC_TILES]
        tiles = "".join(f'<img src="{html.escape(r["image"])}" alt="" title="{html.escape(r["album"])} · {html.escape(r["artist"])}"'
                        f' width="64" height="64" loading="lazy" decoding="async">' for r in covers)
        mosaic = (f'<div class="mosaic" role="img" aria-label="Covers of my {len(covers)} most-played records">{tiles}</div>'
                  if covers else "")
        out["records-viz"] = f'<p class="viz-num"><span class="n">{len(rec)}</span> record{"" if len(rec) == 1 else "s"}</p>' + mosaic
        out["records-count"] = "See the list"
        out["records-list"] = "".join(
            f'<li><span class="t">{_a(r["url"], html.escape(r["album"]))}</span>'
            f'<span class="by">{html.escape(r["artist"])}</span></li>' for r in rec) or empty
    return out


def fill(text: str, regions: dict[str, str]) -> str:
    for name, value in regions.items():
        text = re.sub(rf"(<!-- media:{name} -->).*?(<!-- /media:{name} -->)",
                      lambda m: m.group(1) + value + m.group(2), text, flags=re.S)
    return text


def main(site: Path) -> int:
    today = dt.datetime.now(TZ).date()
    year = today.year
    data = {"year": year, "built": today.isoformat()}
    failed, stale = [], []
    sources = {
        "books": lambda: books(os.environ["HARDCOVER_TOKEN"], year),
        "records": lambda: records(os.environ.get("LASTFM_USER", "joshd19"), os.environ["LASTFM_API_KEY"], year),
    }
    live = None
    for name, fetch in sources.items():
        try:
            data[name] = fetch()
        except Exception as e:  # noqa: BLE001 - any failure falls back to the live copy
            print(f"{name}: {type(e).__name__}: {e}", file=sys.stderr)
            live = live_copy() if live is None else live
            if live.get("year") == year and name in live:
                data[name] = live[name]
                stale.append(name)
                print(f"{name}: kept {len(live[name])} from the live site", file=sys.stderr)
            else:
                failed.append(name)
    if failed:
        print(f"no data for {', '.join(failed)}; leaving those regions as committed", file=sys.stderr)
    # Pace is measured on the day the books were fetched, so stale books keep their old date.
    data["books_built"] = ((live.get("books_built") or live.get("built")) if "books" in stale else "") or data["built"]
    regions = render(data)
    for page in PAGES:
        path = site / page
        path.write_text(fill(path.read_text(encoding="utf-8"), regions), encoding="utf-8")
    (site / "data").mkdir(exist_ok=True)
    (site / "data" / "this-year.json").write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{year}: " + ", ".join(f"{len(data[k])} {k}" for k in sources if k in data))
    return 1 if failed or stale else 0  # a non-zero exit is the workflow's warning


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    sys.exit(main(Path(sys.argv[1])))
