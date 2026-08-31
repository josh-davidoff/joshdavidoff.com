/**
 * Props for {@link SiteFooter}.
 */
export interface SiteFooterProps {
  /** Ordered list of links rendered in `.links` (e.g. Email, Resume). */
  links: Array<{ label: string; href: string }>;
  /**
   * Optional location line rendered as `.loc` below the link row. The
   * home page footer does not use this, but the pattern appears elsewhere
   * on the site for a small mustard-colored location/status line.
   */
  location?: string;
  /** Additional class name(s) appended to the `<footer>` element. */
  className?: string;
}

/**
 * The page footer: a `.links` row of footer links, with an optional `.loc`
 * line beneath it.
 */
export function SiteFooter(props: SiteFooterProps) {
  const { links, location, className } = props;

  return (
    <footer className={className}>
      <div className="links">
        {links.map((link) => (
          <a key={link.href + link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      {location !== undefined ? <p className="loc">{location}</p> : null}
    </footer>
  );
}
