import type { ReactNode } from "react";

/**
 * Props for {@link BackLink}.
 */
export interface BackLinkProps {
  /** Destination the back link points to (e.g. the site root). */
  href: string;
  /** Link text (e.g. "joshdavidoff.com"). The leading arrow is added automatically. */
  children: ReactNode;
  /** Additional class name(s) appended after the base `back mono` classes. */
  className?: string;
}

/**
 * The case-study "back" link: `a.back.mono` with a leading `←` arrow that
 * nudges left on hover via `.arr-back`.
 */
export function BackLink(props: BackLinkProps) {
  const { href, children, className } = props;
  const classes = ["back", "mono", className].filter(Boolean).join(" ");

  return (
    <a className={classes} href={href}>
      <span className="arr arr-back" aria-hidden="true">
        ←
      </span>
      {children}
    </a>
  );
}
