import { TalkListCard } from "@joshdavidoff/site-ds";

/**
 * Reconstructed-from-CSS variant: the mustard left-rule `.talk-card` used in
 * a `.talk-list` grouping. No live HTML instance exists on the site — this
 * uses the real "The Bot Stops Here" talk copy from the home-page grid.
 */
export const Default = () => (
  <TalkListCard
    title="The Bot Stops Here"
    meta="Technology Association of Grantmakers · Chicago · Nov 12, 2026"
  >
    <p>
      Cognitive checkpoints are a practical design approach to keep teams
      engaged during AI-assisted analytical tasks.
    </p>
  </TalkListCard>
);

/** Second list entry, showing the component stacked as `.talk-list` would render it. */
export const InList = () => (
  <div className="talk-list">
    <TalkListCard
      title="The Bot Stops Here"
      meta="Technology Association of Grantmakers · Chicago · Nov 12, 2026"
    >
      <p>
        Cognitive checkpoints are a practical design approach to keep teams
        engaged during AI-assisted analytical tasks.
      </p>
    </TalkListCard>
    <TalkListCard
      title="Small Team, Big Impact"
      meta="Technology Association of Grantmakers · Atlanta · Nov 10, 2025"
    >
      <p>
        A primer on no-code/low-code automation middleware platforms for
        common philanthropy tech stacks.
      </p>
    </TalkListCard>
  </div>
);
