import type { ReactNode } from "react";

export interface PlaceholderProps {
  /** Label text shown inside the diagonal-hatch placeholder box, e.g. "photo of josh — drop here". */
  children?: ReactNode;
  /** Additional class names appended after the base `ph` class. */
  className?: string;
}

export function Placeholder({ children, className }: PlaceholderProps) {
  return <div className={className ? `ph ${className}` : "ph"}>{children}</div>;
}
