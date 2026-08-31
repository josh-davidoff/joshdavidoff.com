import type { ReactNode } from "react";

/**
 * Props for {@link DiagramBox}.
 */
export interface DiagramBoxProps {
  /** Content rendered inside the box, e.g. a `table.ref-table`. */
  children: ReactNode;
  /** Additional class name(s) appended after the base `diagram-box` class. */
  className?: string;
}

/**
 * The site's `.diagram-box` — a mustard-bordered container used on case
 * study pages to hold reference tables and diagrams.
 */
export function DiagramBox(props: DiagramBoxProps) {
  const { children, className } = props;
  const classes = ["diagram-box", className].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}
