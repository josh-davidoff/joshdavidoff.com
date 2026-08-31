import type { ReactNode } from "react";

export interface CaseLinksProps {
  /** Rows to render, each a numbered link to another case. */
  items: Array<{ number: string; label: string; href: string }>;
  /** Optional heading rendered above the link list. */
  heading?: ReactNode;
  /** Additional class names appended after the base `more-cases` class. */
  className?: string;
}

export function CaseLinks({ items, heading, className }: CaseLinksProps) {
  return (
    <div className={className ? `more-cases ${className}` : "more-cases"}>
      {heading}
      <div className="case-links">
        {items.map((item) => (
          <div className="case-link-row" key={item.href}>
            <span className="cn">{item.number}</span>
            <a href={item.href}>
              {item.label} <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
