import type { ReactNode } from "react";

/**
 * Props for {@link Hero}.
 */
export interface HeroProps {
  /** The person's name, rendered in `.name-main` next to the `.dot` glyph. */
  name: string;
  /** Optional location line rendered as `.place` (e.g. "Brooklyn, NY"). */
  place?: string;
  /**
   * The headline content rendered inside `h1.lede`. To reproduce the
   * site's mustard highlight on part of the headline, wrap that portion in
   * `<span className="pop">…</span>` when composing this node — e.g.
   * `<>I connect platforms and people to enable a{" "}
   * <span className="pop">focus on mission.</span></>`.
   */
  lede: ReactNode;
  /** Portrait image source, rendered as `img.portrait`. */
  portraitSrc?: string;
  /** Alt text for the portrait image. */
  portraitAlt?: string;
  /**
   * Optional introductory paragraph rendered after the head row, matching
   * the site's `.subline` treatment.
   */
  subline?: ReactNode;
  /** Additional class name(s) appended to the `<header>` element. */
  className?: string;
}

/**
 * The home page's `<header>`: the `.name` line (name + place), and the
 * `.head-row` grid pairing the `h1.lede` headline with the `.portrait`
 * image.
 */
export function Hero(props: HeroProps) {
  const { name, place, lede, portraitSrc, portraitAlt, subline, className } =
    props;

  return (
    <header className={className}>
      <p className="name">
        <span className="name-main">
          <span className="dot" aria-hidden="true"></span>
          {name}
        </span>
        {place !== undefined ? <span className="place">{place}</span> : null}
      </p>
      <div className="head-row">
        <div>
          <h1 className="lede">{lede}</h1>
        </div>
        {portraitSrc !== undefined ? (
          <img className="portrait" src={portraitSrc} alt={portraitAlt ?? ""} />
        ) : null}
      </div>
      {subline !== undefined ? <p className="subline">{subline}</p> : null}
    </header>
  );
}
