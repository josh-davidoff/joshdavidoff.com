import type { ReactNode } from "react";

/**
 * Props for {@link Page}.
 */
export interface PageProps {
  /** Page content rendered inside the `.wrap` container. */
  children: ReactNode;
  /**
   * Value written to `data-screen-label` on the wrap element. The site uses
   * this per-page (e.g. "Home", "Operational Layer") to identify the screen.
   */
  screenLabel?: string;
  /**
   * Which page shape this wrap belongs to, selecting the column's vertical
   * padding. `"home"` (the default) is the roomy home-page column; `"case"`
   * is the tighter case-study column used on `/projects/*`; `"bsh"` is the
   * talk-deck page. In the original site this difference lived in duplicated
   * page-scoped CSS rather than a class; the extracted stylesheet expresses
   * it as `.wrap--case` / `.wrap--bsh` modifiers instead.
   */
  variant?: "home" | "case" | "bsh";
  /** Additional class name(s) appended after the base `wrap` class. */
  className?: string;
}

/**
 * The site's top-level `.wrap` container: a centered, max-width column that
 * every page renders its content inside.
 */
export function Page(props: PageProps) {
  const { children, screenLabel, variant, className } = props;
  const classes = [
    "wrap",
    variant && variant !== "home" ? `wrap--${variant}` : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-screen-label={screenLabel}>
      {children}
    </div>
  );
}
