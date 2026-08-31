import type { ReactNode } from "react";

export interface ArrowLinkProps {
  /** Destination URL for the link. */
  href: string;
  /** Link label content, rendered before the arrow glyph. */
  children: ReactNode;
  /** Additional class names appended after the base link has no default class. */
  className?: string;
}

export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <a href={href} className={className}>
      {children} <span className="arr" aria-hidden="true">→</span>
    </a>
  );
}
