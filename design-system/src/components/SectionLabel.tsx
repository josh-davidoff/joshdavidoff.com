import type { ReactNode } from "react";

/**
 * Props for {@link SectionLabel}.
 */
export interface SectionLabelProps {
  /** Label text (e.g. "Core competencies", "The Problem"). */
  children: ReactNode;
  /**
   * Which page shape this label appears in, selecting its spacing. `"home"`
   * (the default) carries the home page's larger margin and underline gap;
   * `"case"` is the tighter case-study spacing; `"bsh"` is the talk-deck
   * page. The markup is identical in all three — only the rule differs.
   */
  variant?: "home" | "case" | "bsh";
  /** Additional class name(s) appended after the base `label mono` classes. */
  className?: string;
}

/**
 * Shared section heading: `h2.label.mono` with the decorative ✽ `.star`
 * glyph before the text, above a rule. Used for section headers like
 * "Core competencies" and case-study headers like "The Problem".
 */
export function SectionLabel(props: SectionLabelProps) {
  const { children, variant, className } = props;
  const classes = [
    "label",
    "mono",
    variant && variant !== "home" ? `label--${variant}` : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <h2 className={classes}>
      <span className="star" aria-hidden="true">
        ✳
      </span>
      {children}
    </h2>
  );
}
