import type { ReactNode } from "react";

/**
 * Props for {@link SiteRoot}.
 */
export interface SiteRootProps {
  /** Content rendered inside the themed root. */
  children: ReactNode;
  /** Additional class name(s) appended after the base `site-root` class. */
  className?: string;
}

/**
 * The design system's theme root. Establishes the dark ground, the cream
 * foreground, and the body typeface that every other component is designed
 * against.
 *
 * **Wrap anything you build with this design system in `SiteRoot`.** The
 * palette is dark-first: on a default white page the cream and muted
 * foreground colors are nearly invisible, and components will look broken
 * rather than merely unstyled. The original site gets these declarations from
 * `body`, which only works when the design system owns the whole document.
 *
 * ```tsx
 * <SiteRoot>
 *   <SiteNav name="Josh Davidoff" homeHref="/" links={links} />
 *   <Page>{content}</Page>
 * </SiteRoot>
 * ```
 */
export function SiteRoot({ children, className }: SiteRootProps) {
  return (
    <div className={className ? `site-root ${className}` : "site-root"}>{children}</div>
  );
}
