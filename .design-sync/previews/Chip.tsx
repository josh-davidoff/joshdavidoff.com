import { Chip, ProjectCard } from "@joshdavidoff/site-ds";

// NOTE: `.chip` is styled only as `.proj-sys .chip` in the design system's CSS,
// and `.proj-sys` itself is sized by the enclosing `.proj-card p` rule. A bare
// <Chip> therefore renders as unstyled text. These previews compose chips in
// the context that actually styles them, which is also the only context the
// site uses them in.

/** Chips in their real context: the system list inside a project card. */
export const InProjectCard = () => (
  <ProjectCard
    categories={["System integration"]}
    title="Payment sync and reporting"
    description="High-control workflows connecting Fluxx GMS payment records to team-facing trackers and Power BI dashboards."
    systems={["Fluxx", "Monday.com", "Bill.com", "Power BI"]}
    type="system"
  />
);

/** The tool vocabulary the site tags work with. */
export const SystemNames = () => (
  <article className="proj-card">
    <p className="proj-sys">
      <Chip>Fluxx</Chip>
      <Chip>Monday.com</Chip>
      <Chip>Power Automate</Chip>
      <Chip>Power BI</Chip>
      <Chip>SharePoint</Chip>
    </p>
  </article>
);

/** Longer labels wrap onto a second row rather than overflowing. */
export const LongLabels = () => (
  <article className="proj-card">
    <p className="proj-sys">
      <Chip>Claude Code / Codex</Chip>
      <Chip>Skill.MD packets</Chip>
      <Chip>HTML/CSS/JavaScript</Chip>
      <Chip>AI vision model</Chip>
    </p>
  </article>
);
