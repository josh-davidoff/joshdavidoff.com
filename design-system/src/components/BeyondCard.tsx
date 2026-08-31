import type { ReactNode } from "react";

/**
 * Props for {@link BeyondCard}.
 */
export interface BeyondCardProps {
  /** Uppercase panel heading, rendered in the `h3`. */
  heading: ReactNode;
  /** Panel body content, typically one or more {@link Entry} components. */
  children: ReactNode;
  /** Additional class name(s) appended after the base `beyond-card` class. */
  className?: string;
}

/**
 * The site's `.beyond-card` — a panel used in the "Beyond the work" section,
 * heading followed by a list of entries.
 */
export function BeyondCard(props: BeyondCardProps) {
  const { heading, children, className } = props;
  const classes = ["beyond-card", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <h3>{heading}</h3>
      {children}
    </div>
  );
}
