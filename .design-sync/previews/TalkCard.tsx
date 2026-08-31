import { TalkCard } from "@joshdavidoff/site-ds";

/** The upcoming AI-enablement talk card from the home-page project grid. */
export const Upcoming = () => (
  <TalkCard
    title="The Bot Stops Here"
    categories={["Public Speaking", "AI enablement"]}
    events={[
      {
        organization: "Technology Association of Grantmakers",
        detail: (
          <>
            Chicago · Nov&nbsp;12, 2026 <em>(upcoming)</em>
          </>
        ),
      },
      {
        organization: "Foundations for Research and Innovation in Data and AI",
        detail: "Rockefeller Fdn · NYC · Jun 2, 2026",
      },
    ]}
    description="Cognitive checkpoints are a practical design approach to keep teams engaged during AI-assisted analytical tasks."
    systems={["Skill.MD packets", "Python", "Responsible AI"]}
    link={{ label: "View deck", href: "/bsh" }}
    type="speaking ai"
  />
);

/** A past talk card with a single event and no trailing link. */
export const SingleEventNoLink = () => (
  <TalkCard
    title="Small Team, Big Impact"
    categories={["Public Speaking", "System integration"]}
    events={[
      {
        organization: "Technology Association of Grantmakers",
        detail: "Atlanta · Nov 10, 2025",
      },
    ]}
    description="A primer on no-code/low-code automation middleware platforms for common philanthropy tech stacks."
    systems={["Fluxx", "Power Automate"]}
    type="speaking system"
  />
);
