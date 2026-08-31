import { ArrowLink } from "@joshdavidoff/site-ds";

// ArrowLink inherits mustard link styling + animated underline from the site's
// base `a` rule, so it renders acceptably outside a card. Site usage wraps it
// in `p.proj-link` inside a `.proj-card`, which is reproduced below.

/** "View case →" — the most common case-study link, in its real card context. */
export const ViewCase = () => (
  <article className="proj-card">
    <span className="category">System integration</span>
    <h3>Payment sync and reporting</h3>
    <p className="proj-link">
      <ArrowLink href="/projects/payment-sync-financial-visibility">View case</ArrowLink>
    </p>
  </article>
);

/** "View deck →" — used for the talk case studies. */
export const ViewDeck = () => (
  <article className="proj-card">
    <div className="category-row">
      <span className="category">Public Speaking</span>
      <span className="category">AI enablement</span>
    </div>
    <h3>The Bot Stops Here</h3>
    <p className="proj-link">
      <ArrowLink href="/bsh">View deck</ArrowLink>
    </p>
  </article>
);

/** An external, self-labeled link — "snaildating.com →". */
export const ExternalLink = () => (
  <article className="proj-card">
    <span className="category">Experiment</span>
    <h3>Snail: Slow Dating by Mail</h3>
    <p className="proj-link">
      <ArrowLink href="https://snaildating.com">snaildating.com</ArrowLink>
    </p>
  </article>
);

/** A verb-led CTA link, not "View case" — "Open Sky Window →". */
export const CustomLabel = () => (
  <article className="proj-card">
    <span className="category">Experiment</span>
    <h3>Sky Window</h3>
    <p className="proj-link">
      <ArrowLink href="/sky">Open Sky Window</ArrowLink>
    </p>
  </article>
);
