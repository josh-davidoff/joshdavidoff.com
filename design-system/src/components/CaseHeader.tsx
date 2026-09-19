import type { ReactNode } from "react";

/**
 * Props for {@link CaseHeader}.
 */
export interface CaseHeaderProps {
  /** Kicker text above the title (e.g. "Case Study"), rendered in `p.kicker.mono`. */
  kicker: ReactNode;
  /** The case study's headline, rendered as `h1.title`. */
  title: ReactNode;
  /** Optional dek/summary line rendered as `p.subtitle`. */
  subtitle?: ReactNode;
  /**
   * "Last updated" stamp rendered after the subtitle as `p.page-updated.mono`.
   * `datetime` is ISO (`2026-09-14`); `label` is the visible text, e.g.
   * "Updated Sep 14, 2026".
   */
  updated?: { datetime: string; label: string };
  /**
   * Which page shape this header belongs to. `"case"` (the default) is the
   * case-study scale used on `/projects/*`; `"bsh"` is the larger talk-deck
   * scale, which the extracted stylesheet carries as `.title--bsh` /
   * `.subtitle--bsh`.
   */
  variant?: "case" | "bsh";
  /** Additional class name(s) appended to the `header` element. */
  className?: string;
}

/**
 * The case-study page `<header>`: the `.kicker.mono` eyebrow (with its
 * decorative `.dot` glyph), the `h1.title`, and the optional `p.subtitle`.
 */
export function CaseHeader(props: CaseHeaderProps) {
  const { kicker, title, subtitle, updated, variant, className } = props;
  const titleClass = variant === "bsh" ? "title title--bsh" : "title";
  const subtitleClass = variant === "bsh" ? "subtitle subtitle--bsh" : "subtitle";

  return (
    <header className={className}>
      <p className="kicker mono">
        <span className="dot" aria-hidden="true"></span>
        {kicker}
      </p>
      <h1 className={titleClass}>{title}</h1>
      {subtitle !== undefined ? <p className={subtitleClass}>{subtitle}</p> : null}
      {updated ? (
        <p className="page-updated mono">
          <time dateTime={updated.datetime}>{updated.label}</time>
        </p>
      ) : null}
    </header>
  );
}
