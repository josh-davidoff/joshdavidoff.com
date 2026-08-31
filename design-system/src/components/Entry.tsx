import type { ReactNode } from "react";

/**
 * Props for {@link Entry}.
 */
export interface EntryProps {
  /** Entry heading, rendered in the `h3`. */
  title: ReactNode;
  /** If set, the `h3` title is wrapped in an `<a href>`. */
  href?: string;
  /** Optional body copy rendered in a `<p>` below the heading. */
  description?: ReactNode;
  /** Optional meta line (e.g. venue/affiliation) rendered in `p.meta`. */
  meta?: ReactNode;
  /** Optional year/date range, rendered in a `span.yr` after the title. */
  year?: string;
  /** Additional class name(s) appended after the base `entry` class. */
  className?: string;
}

/**
 * The site's `.entry` — a small heading/detail block used inside
 * {@link BeyondCard} and home-page list sections.
 */
export function Entry(props: EntryProps) {
  const { title, href, description, meta, year, className } = props;
  const classes = ["entry", className].filter(Boolean).join(" ");
  const heading = href ? <a href={href}>{title}</a> : title;

  return (
    <div className={classes}>
      <h3>
        {heading}
        {year !== undefined ? <span className="yr"> {year}</span> : null}
      </h3>
      {meta !== undefined ? <p className="meta">{meta}</p> : null}
      {description !== undefined ? <p>{description}</p> : null}
    </div>
  );
}
