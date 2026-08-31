import { ChipRow } from "@joshdavidoff/site-ds";

// NOTE: `.proj-sys .chip` is the only styled selector for chips, and `.proj-sys`
// itself is only sized correctly inside a `.proj-card` (the card's `p` rule at
// 18px beats the bare `.proj-sys` rule's 6px). Every cell below is composed
// inside <article className="proj-card"> to match the site's real usage.

/** The system-integration tool row, as used on the payment-sync case. */
export const PaymentSyncSystems = () => (
  <article className="proj-card">
    <span className="category">System integration</span>
    <h3>Payment sync and reporting</h3>
    <ChipRow items={["Fluxx", "Monday.com", "Bill.com", "Power BI"]} />
  </article>
);

/** A shorter row, as used on the Monday.com operational-layer case. */
export const OperationalLayerSystems = () => (
  <article className="proj-card">
    <span className="category">System integration</span>
    <h3>Monday.com as operational layer</h3>
    <ChipRow items={["Fluxx", "Monday.com", "Power Automate"]} />
  </article>
);

/** Longer tool labels wrap onto a second row rather than overflowing. */
export const WrappingLongLabels = () => (
  <article className="proj-card">
    <span className="category">AI enablement</span>
    <h3>AI due-diligence judgment architecture</h3>
    <ChipRow items={["Claude Code / Codex", "Skill.MD packets", "HTML/CSS/JavaScript", "AI vision model"]} />
  </article>
);
