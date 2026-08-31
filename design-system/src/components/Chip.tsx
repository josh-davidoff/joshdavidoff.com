import type { ReactNode } from "react";

export interface ChipProps {
  /** Label content for the chip, typically a short tool or system name. */
  children: ReactNode;
  /** Additional class names appended after the base `chip` class. */
  className?: string;
}

export function Chip({ children, className }: ChipProps) {
  return (
    <span className={className ? `chip ${className}` : "chip"}>{children}</span>
  );
}
