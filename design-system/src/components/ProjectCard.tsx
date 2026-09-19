import type { ReactNode } from "react";
import { Chip } from "./Chip";
import { ArrowLink } from "./ArrowLink";

/**
 * Props for {@link ProjectCard}.
 */
export interface ProjectCardProps {
  /** Card heading, rendered in the `h3`. */
  title: ReactNode;
  /** Body copy rendered in the description `<p>`. */
  description: ReactNode;
  /**
   * Category label(s) shown above the title. A single category renders as
   * one bare `span.category`; two or more render wrapped in `.category-row`,
   * matching the source markup exactly.
   */
  categories?: string[];
  /** Optional numeric/label chip (`.proj-num`) shown above the categories. */
  num?: ReactNode;
  /** System/tool names rendered as `.chip` spans inside `p.proj-sys`. */
  systems?: string[];
  /** Optional italic focus line (`p.proj-focus`). */
  focus?: ReactNode;
  /** Optional trailing arrow link (`p.proj-link`), e.g. "View case →". */
  link?: { label: string; href: string };
  /**
   * "Last updated" dateline rendered as `time.proj-updated` on its own line
   * above the categories. `datetime` is ISO (`2026-09-14`); `label` is the
   * visible text, e.g. "Updated Sep 14, 2026".
   */
  updated?: { datetime: string; label: string };
  /** Value written to `data-type` on the `article`, used by the site's filter UI. */
  type?: string;
  /** Additional class name(s) appended after the base `proj-card` class. */
  className?: string;
  /** Additional content rendered after the standard card body. */
  children?: ReactNode;
}

/**
 * The site's `article.proj-card` — a project/work item card used in the
 * project grid.
 */
export function ProjectCard(props: ProjectCardProps) {
  const {
    title,
    description,
    categories,
    num,
    systems,
    focus,
    link,
    updated,
    type,
    className,
    children,
  } = props;
  const classes = ["proj-card", className].filter(Boolean).join(" ");

  return (
    <article className={classes} data-type={type}>
      {updated ? (
        <time className="proj-updated" dateTime={updated.datetime}>
          {updated.label}
        </time>
      ) : null}
      {num !== undefined ? <span className="proj-num">{num}</span> : null}
      {categories && categories.length > 1 ? (
        <div className="category-row">
          {categories.map((category) => (
            <span className="category" key={category}>
              {category}
            </span>
          ))}
        </div>
      ) : null}
      {categories && categories.length === 1 ? (
        <span className="category">{categories[0]}</span>
      ) : null}
      <h3>{title}</h3>
      <p>{description}</p>
      {systems && systems.length > 0 ? (
        <p className="proj-sys">
          {systems.map((system) => (
            <Chip key={system}>{system}</Chip>
          ))}
        </p>
      ) : null}
      {focus !== undefined ? <p className="proj-focus">{focus}</p> : null}
      {link ? (
        <p className="proj-link">
          <ArrowLink href={link.href}>{link.label}</ArrowLink>
        </p>
      ) : null}
      {children}
    </article>
  );
}
