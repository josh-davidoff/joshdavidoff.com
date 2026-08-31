import type { ReactNode } from "react";
import { Chip } from "./Chip";
import { ArrowLink } from "./ArrowLink";

/**
 * One entry in a {@link TalkCard}'s `.talk-meta` list.
 */
export interface TalkEvent {
  /** Organization/venue name, rendered inside `.event-title`. */
  organization: string;
  /** Remaining event detail (location, date, status notes) after the title. */
  detail: ReactNode;
}

/**
 * Props for {@link TalkCard}.
 */
export interface TalkCardProps {
  /** Card heading, rendered in the `h3`. */
  title: ReactNode;
  /** One or more speaking events, rendered as `.talk-meta .event` rows. */
  events: TalkEvent[];
  /** Body copy rendered in the description `<p>`. */
  description: ReactNode;
  /**
   * Category label(s) shown above the title. A single category renders as
   * one bare `span.category`; two or more render wrapped in `.category-row`,
   * matching the source markup exactly.
   */
  categories?: string[];
  /** System/tool names rendered as `.chip` spans inside `p.proj-sys`. */
  systems?: string[];
  /** Optional trailing arrow link (`p.proj-link`), e.g. "View deck →". */
  link?: { label: string; href: string };
  /** Value written to `data-type` on the `article`, used by the site's filter UI. */
  type?: string;
  /** Additional class name(s) appended after the base classes. */
  className?: string;
}

/**
 * The site's `article.proj-card.speaking-card` — a talk/speaking-engagement
 * card carrying a `.talk-meta` list of events.
 */
export function TalkCard(props: TalkCardProps) {
  const { title, events, description, categories, systems, link, type, className } =
    props;
  const classes = ["proj-card", "speaking-card", className].filter(Boolean).join(" ");

  return (
    <article className={classes} data-type={type}>
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
      <div className="talk-meta">
        {events.map((event, index) => (
          <div className="event" key={index}>
            <span className="event-title">{event.organization}</span>
            {event.detail}
          </div>
        ))}
      </div>
      <p>{description}</p>
      {systems && systems.length > 0 ? (
        <p className="proj-sys">
          {systems.map((system) => (
            <Chip key={system}>{system}</Chip>
          ))}
        </p>
      ) : null}
      {link ? (
        <p className="proj-link">
          <ArrowLink href={link.href}>{link.label}</ArrowLink>
        </p>
      ) : null}
    </article>
  );
}
