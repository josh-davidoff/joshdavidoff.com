import type { ReactNode } from "react";

export interface CompetencyAccordionProps {
  /** `CompetencyItem` elements to render inside the `comp-grid`. */
  children: ReactNode;
  /** Additional class names appended after the base `comp-grid` class. */
  className?: string;
}

export function CompetencyAccordion({
  children,
  className,
}: CompetencyAccordionProps) {
  return (
    <div className={className ? `comp-grid ${className}` : "comp-grid"}>
      {children}
    </div>
  );
}

export interface CompetencyItemProps {
  /** Heading text shown in the `<summary>`, always visible. */
  summary: string;
  /** Body content revealed inside the `<p>` when the item is expanded. */
  children: ReactNode;
  /** Whether the `<details>` element starts expanded. */
  defaultOpen?: boolean;
  /** Additional class names appended after the base `comp-item` class. */
  className?: string;
}

export function CompetencyItem({
  summary,
  children,
  defaultOpen,
  className,
}: CompetencyItemProps) {
  return (
    <details
      className={className ? `comp-item ${className}` : "comp-item"}
      open={defaultOpen}
    >
      <summary>{summary}</summary>
      <p>{children}</p>
    </details>
  );
}
