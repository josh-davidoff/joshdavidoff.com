"""Tier 2 smoke tests for the joshdavidoff.com static site.

Per /Users/josh/codex/AGENTS.md ("Testing"): a live public site earns a smoke
test that it boots and serves plus security regressions, and nothing more.
Run with: /Users/josh/codex/.venv/bin/python -m pytest -q tests
"""
from __future__ import annotations

import os
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[1]

EXCLUDED_DIR_PREFIXES = (
    "design-system/",
    "ds-bundle/",
    ".ds-sync/",
    ".design-sync/",
    "node_modules/",
)

EXCLUDED_LINK_PREFIXES = ("http:", "https:", "//", "mailto:", "tel:", "#", "data:")

SECRET_PATTERNS = [
    re.compile(r"sk-[A-Za-z0-9]{20,}"),
    re.compile(r"AKIA[0-9A-Z]{16}"),
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    re.compile(r"ghp_[A-Za-z0-9]{30,}"),
]


def _git_ls_files(pattern: str | None = None) -> list[str]:
    cmd = ["git", "ls-files"]
    if pattern:
        cmd.append(pattern)
    out = subprocess.run(
        cmd, cwd=REPO_ROOT, capture_output=True, text=True, check=True
    ).stdout
    return out.splitlines()


def _tracked_html_files() -> list[str]:
    files = _git_ls_files("*.html")
    return [f for f in files if not f.startswith(EXCLUDED_DIR_PREFIXES)]


def _tracked_js_files() -> list[str]:
    files = _git_ls_files("*.js")
    return [f for f in files if not f.startswith(EXCLUDED_DIR_PREFIXES)]


class _TitleCounter(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title_count = 0

    def handle_starttag(self, tag, attrs):
        if tag.lower() == "title":
            self.title_count += 1


# Search Console verification files are tokens, not pages, and must stay tracked.
HTML_FILES = [f for f in _tracked_html_files() if not os.path.basename(f).startswith("google")]


@pytest.mark.parametrize("rel_path", HTML_FILES)
def test_html_parses_and_has_one_title(rel_path: str) -> None:
    text = (REPO_ROOT / rel_path).read_text(encoding="utf-8")
    parser = _TitleCounter()
    parser.feed(text)  # raises on malformed input under html.parser's rules
    parser.close()
    assert parser.title_count == 1, (
        f"{rel_path} has {parser.title_count} <title> tags, expected exactly 1"
    )


def _extract_links(text: str) -> list[str]:
    return re.findall(r'(?:href|src)=["\']([^"\']+)["\']', text)


def _strip_query_and_fragment(link: str) -> str:
    link = link.split("#", 1)[0]
    link = link.split("?", 1)[0]
    return link


def test_relative_links_resolve() -> None:
    all_tracked = set(_git_ls_files())
    broken: list[tuple[str, str]] = []

    for rel_path in HTML_FILES:
        text = (REPO_ROOT / rel_path).read_text(encoding="utf-8")
        for link in _extract_links(text):
            if link.startswith(EXCLUDED_LINK_PREFIXES):
                continue
            stripped = _strip_query_and_fragment(link)
            if stripped == "":
                continue

            if stripped.startswith("/"):
                target = stripped.lstrip("/")
            else:
                target = os.path.normpath(
                    os.path.join(os.path.dirname(rel_path), stripped)
                )

            if stripped.endswith("/") or target == "" or target == ".":
                index_target = (
                    os.path.join(target, "index.html") if target not in ("", ".")
                    else "index.html"
                )
                resolved = index_target in all_tracked or (target.rstrip("/") + ".html") in all_tracked
            else:
                resolved = (
                    target in all_tracked
                    or target + ".html" in all_tracked
                    or os.path.join(target, "index.html") in all_tracked
                )

            if not resolved:
                broken.append((rel_path, link))

    assert not broken, "unresolvable links: " + "; ".join(f"{f} -> {l}" for f, l in broken)


def test_no_secret_shaped_strings() -> None:
    offenders: list[str] = []
    for rel_path in HTML_FILES + _tracked_js_files():
        text = (REPO_ROOT / rel_path).read_text(encoding="utf-8", errors="replace")
        for pattern in SECRET_PATTERNS:
            if pattern.search(text):
                offenders.append(f"{rel_path}: {pattern.pattern}")
    assert not offenders, f"secret-shaped strings found: {offenders}"


def test_cname_is_correct() -> None:
    cname_path = REPO_ROOT / "CNAME"
    assert cname_path.exists(), "CNAME file is missing"
    assert cname_path.read_text(encoding="utf-8").strip() == "joshdavidoff.com"


def test_pages_workflow_deploys() -> None:
    workflow_path = REPO_ROOT / ".github" / "workflows" / "pages.yml"
    assert workflow_path.exists(), "pages.yml workflow is missing"
    assert "actions/deploy-pages" in workflow_path.read_text(encoding="utf-8")


# "Updated" dates: the register renders each card's date from its dossier, and
# the linked case page carries the same date by hand, so the two can drift.
MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
CARD_RE = re.compile(r'<article class="proj-card[^"]*"[^>]*>(.*?)</article>', re.S)
CARD_TIME_RE = re.compile(r'<time class="proj-updated" datetime="([^"]+)">([^<]*)</time>')
CARD_LINK_RE = re.compile(r'<p class="proj-link"><a href="([^"]+)">')
PAGE_TIME_RE = re.compile(r'<p class="page-updated mono"><time datetime="([^"]+)">([^<]*)</time></p>')


def _short_date(iso: str) -> str:
    year, month, day = (int(part) for part in iso.split("-"))
    return f"{MONTHS[month - 1]} {day}, {year}"


def _cards() -> list[tuple[str | None, str, str]]:
    """(link href, datetime, label) for every card on the home page."""
    text = (REPO_ROOT / "index.html").read_text(encoding="utf-8")
    cards = CARD_RE.findall(text)
    assert cards, "no project cards found on index.html"
    out = []
    for body in cards:
        times = CARD_TIME_RE.findall(body)
        assert len(times) == 1, f"card has {len(times)} updated dates: {body[:80]!r}"
        link = CARD_LINK_RE.search(body)
        out.append((link.group(1) if link else None, times[0][0], times[0][1]))
    return out


def test_card_dates_are_valid_and_labelled() -> None:
    from datetime import date

    for _, iso, label in _cards():
        date.fromisoformat(iso)  # raises on a malformed or impossible date
        assert label == f"Updated {_short_date(iso)}", (iso, label)


def test_case_page_dates_match_cards() -> None:
    from datetime import date

    mismatches: list[str] = []
    for href, iso, _ in _cards():
        if not href or not href.startswith("/") or href == "/sky":
            continue
        page = REPO_ROOT / (href.lstrip("/") + ".html")
        assert page.exists(), f"card links to {href} but {page} is missing"
        found = PAGE_TIME_RE.findall(page.read_text(encoding="utf-8"))
        if len(found) != 1:
            mismatches.append(f"{href}: {len(found)} updated lines in header")
            continue
        page_iso, page_label = found[0]
        date.fromisoformat(page_iso)
        if page_iso != iso:
            mismatches.append(f"{href}: card says {iso}, page says {page_iso}")
        if page_label != f"Updated {_short_date(page_iso)}":
            mismatches.append(f"{href}: label {page_label!r} does not match {page_iso}")
    assert not mismatches, "; ".join(mismatches)
