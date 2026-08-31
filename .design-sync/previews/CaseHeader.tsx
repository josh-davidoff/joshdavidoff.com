import { CaseHeader } from "@joshdavidoff/site-ds";

/** The case-study header, as used on `/projects/fluxx-monday-operational-layer`. */
export const CaseStudy = () => (
  <CaseHeader
    kicker="Case Study"
    title="Fluxx to Monday operational layer"
    subtitle="A controlled mirror layer that surfaces critical grant tasks in user-friendly Monday views."
  />
);

/** The talk-deck header, as used on `/bsh`. */
export const TalkCompanion = () => (
  <CaseHeader
    variant="bsh"
    kicker="Talk Companion"
    title="The Bot Stops Here"
    subtitle="Request access to the Skill.md repo from “The Bot Stops Here,” a talk on practical AI workflows for small foundation teams."
  />
);
