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
  /** Additional class name(s) appended to the `<header>` element. */
  className?: string;
}

/**
 * The case-study page `<header>`: the `.kicker.mono` eyebrow (with its
 * decorative `.dot` glyph), the `h1.title`, and the optional `p.subtitle`.
 */
export function CaseHeader(props: CaseHeaderProps) {
  const { kicker, title, subtitle, className } = props;

  return (
    <header className={className}>
      <p className="kicker mono">
        <span className="dot" aria-hidden="true"></span>
        {kicker}
      </p>
      <h1 className="title">{title}</h1>
      {subtitle !== undefined ? <p className="subtitle">{subtitle}</p> : null}
    </header>
  );
}
