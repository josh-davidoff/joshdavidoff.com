import { CategoryTag } from "@joshdavidoff/site-ds";

// NOTE: `.category` is a card-context element. The single-tag form appears
// bare above an h3 in `.proj-card`; the multi-tag form is wrapped in
// `.category-row`, which adds the pill border/background. Both are composed
// inside <article className="proj-card"> to match real usage.

/** Single category tag above a project title (the common case). */
export const SingleTag = () => (
  <article className="proj-card">
    <CategoryTag>System integration</CategoryTag>
    <h3>Payment sync and reporting</h3>
  </article>
);

/** Single tag on an experiment card. */
export const ExperimentTag = () => (
  <article className="proj-card">
    <CategoryTag>Experiment</CategoryTag>
    <h3>Sky Window</h3>
  </article>
);

/** Multi-tag form: two categories in a `.category-row`, as on cross-cutting entries. */
export const MultiTagRow = () => (
  <article className="proj-card">
    <div className="category-row">
      <CategoryTag>Public Speaking</CategoryTag>
      <CategoryTag>AI enablement</CategoryTag>
    </div>
    <h3>The Bot Stops Here</h3>
  </article>
);

/** A different category pairing, from the "Small Team, Big Impact" talk. */
export const MultiTagRowAlt = () => (
  <article className="proj-card">
    <div className="category-row">
      <CategoryTag>Public Speaking</CategoryTag>
      <CategoryTag>System integration</CategoryTag>
    </div>
    <h3>Small Team, Big Impact</h3>
  </article>
);
