/**
 * One link in the site nav's link group.
 */
export interface SiteNavLink {
  /** Visible link text (e.g. "Work", "Building", "Resume"). */
  label: string;
  /** Destination URL or in-page anchor (e.g. "#projects", "/stack/"). */
  href: string;
  /**
   * When set, renders `data-nav-filter` with this value on the link. The
   * home page uses this on the "Talks" and "Experiments" nav links so a
   * click also applies the matching project-grid filter.
   */
  navFilter?: string;
  /**
   * When true, renders this link with the `.linkedin-icon` treatment (a
   * small square badge) instead of plain text, as the site does for the
   * LinkedIn nav link.
   */
  icon?: boolean;
}

/**
 * Props for {@link SiteNav}.
 */
export interface SiteNavProps {
  /** Wordmark text shown in the nav (e.g. "Josh Davidoff"). */
  name: string;
  /** Destination for the wordmark link — the site's home page. */
  homeHref: string;
  /** Ordered list of links rendered in `.site-nav-links`. */
  links: SiteNavLink[];
  /** Additional class name(s) appended after the base `site-nav` class. */
  className?: string;
}

/**
 * The sticky site navigation bar: `nav.site-nav` containing the wordmark
 * (`.site-nav-name`, hidden until scroll on the home page) and the
 * `.site-nav-links` link group.
 */
export function SiteNav(props: SiteNavProps) {
  const { name, homeHref, links, className } = props;
  const classes = ["site-nav", className].filter(Boolean).join(" ");

  return (
    <nav className={classes} aria-label="Site navigation">
      <div className="site-nav-inner">
        <a className="site-nav-name" href={homeHref}>
          <span className="nav-dot" aria-hidden="true"></span>
          {name}
        </a>
        <div className="site-nav-links">
          {links.map((link) =>
            link.icon ? (
              <a
                key={link.href + link.label}
                className="linkedin-icon"
                href={link.href}
                aria-label={link.label}
              >
                in
              </a>
            ) : (
              <a
                key={link.href + link.label}
                href={link.href}
                data-nav-filter={link.navFilter}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
