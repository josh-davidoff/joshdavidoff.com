import type { ReactNode } from "react";

/**
 * Props for {@link TalkListCard}.
 */
export interface TalkListCardProps {
  /** Card heading, rendered in the `h3`. */
  title: ReactNode;
  /** Meta line (venue, date, etc.) rendered in `p.meta`. */
  meta: ReactNode;
  /** Body paragraph(s) rendered after the meta line. */
  children: ReactNode;
  /** Additional class name(s) appended after the base `talk-card` class. */
  className?: string;
}

/**
 * The site's `.talk-card` — a mustard left-rule variant used inside
 * `.talk-list` groupings.
 */
export function TalkListCard(props: TalkListCardProps) {
  const { title, meta, children, className } = props;
  const classes = ["talk-card", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <h3>{title}</h3>
      <p className="meta">{meta}</p>
      {children}
    </div>
  );
}
