import type { ReactNode } from "react";

export interface CategoryTagProps {
  /** Category label text, e.g. "System integration" or "AI enablement". */
  children: ReactNode;
  /** Additional class names appended after the base `category` class. */
  className?: string;
}

export function CategoryTag({ children, className }: CategoryTagProps) {
  return (
    <span className={className ? `category ${className}` : "category"}>
      {children}
    </span>
  );
}
