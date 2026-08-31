import type { ReactNode } from "react";
import { Chip } from "./Chip";

/**
 * Props for {@link ExperimentCard}.
 */
export interface ExperimentCardProps {
  /** Card heading, rendered in the `h3`. */
  title: ReactNode;
  /** Body copy rendered in the description `<p>`. */
  description: ReactNode;
  /** System/tool names rendered as `.chip` spans inside `p.proj-sys`. */
  systems?: string[];
  /** Additional class name(s) appended after the base `exp-card` class. */
  className?: string;
}

/**
 * The site's `article.exp-card` — a smaller experiment card used in the
 * experiment grid.
 */
export function ExperimentCard(props: ExperimentCardProps) {
  const { title, description, systems, className } = props;
  const classes = ["exp-card", className].filter(Boolean).join(" ");

  return (
    <article className={classes}>
      <h3>{title}</h3>
      <p>{description}</p>
      {systems && systems.length > 0 ? (
        <p className="proj-sys">
          {systems.map((system) => (
            <Chip key={system}>{system}</Chip>
          ))}
        </p>
      ) : null}
    </article>
  );
}
