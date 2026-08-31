import type { ReactNode } from "react";

/**
 * Props for {@link CurrentlyPanel}.
 */
export interface CurrentlyPanelProps {
  /** Row content, typically one or more {@link CurrentlyRow} components. */
  children: ReactNode;
  /**
   * When true, wraps the `.currently` grid in the `.currently-panel`
   * background container (the standalone "Currently" panel treatment).
   * Omit for the plain `.currently` grid nested inside `.beyond-card`.
   */
  panel?: boolean;
  /** Additional class name(s) appended after the base `currently` class. */
  className?: string;
}

/**
 * The site's `.currently` grid — a set of key/value rows, e.g. "Reading",
 * "Listening", "Playing".
 */
export function CurrentlyPanel(props: CurrentlyPanelProps) {
  const { children, panel, className } = props;
  const classes = ["currently", className].filter(Boolean).join(" ");
  const grid = <div className={classes}>{children}</div>;

  if (panel) {
    return <div className="currently-panel">{grid}</div>;
  }

  return grid;
}

/**
 * Props for {@link CurrentlyRow}.
 */
export interface CurrentlyRowProps {
  /** Key text rendered in `span.k.mono`, e.g. "Reading". */
  label: string;
  /** Value content rendered in the sibling `<span>`. */
  children: ReactNode;
  /** Additional class name(s) appended after the base `row` class. */
  className?: string;
}

/**
 * One key/value row inside {@link CurrentlyPanel}'s `.currently` grid.
 */
export function CurrentlyRow(props: CurrentlyRowProps) {
  const { label, children, className } = props;
  const classes = ["row", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <span className="k mono">{label}</span>
      <span>{children}</span>
    </div>
  );
}
