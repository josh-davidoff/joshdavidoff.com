import type { ReactNode } from "react";

export interface NoteProps {
  /** Footnote text content. */
  children: ReactNode;
  /** Additional class names appended after the base `note` class. */
  className?: string;
}

export function Note({ children, className }: NoteProps) {
  return <p className={className ? `note ${className}` : "note"}>{children}</p>;
}
