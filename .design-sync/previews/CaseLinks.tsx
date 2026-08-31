import { CaseLinks } from "@joshdavidoff/site-ds";

// `CaseLinks` has CSS rules (`.more-cases`, `.case-links`, `.case-link-row`,
// `.cn`) but no live HTML anywhere on the site — every project page's
// footer only has a plain "All projects" back-link, never a rendered
// `.more-cases` block. This component's markup was reconstructed from the
// CSS selectors alone, so it is one of the least-verified in the system.
// The CSS itself is self-contained (not gated behind a parent selector),
// so a bare render should be styled correctly if the reconstruction is
// right. Numbers/titles/hrefs below are the real other case studies from
// /Users/josh/codex/jd site/projects/.

/** Three other case studies, as a "more cases" block might appear at the foot of a project page. */
export const Default = () => (
  <CaseLinks
    heading={<h2 className="label mono">More case studies</h2>}
    items={[
      {
        number: "01",
        label: "Board prep and meeting workflow infrastructure",
        href: "/projects/board-prep-meeting-workflow.html",
      },
      {
        number: "02",
        label: "Payment sync and financial visibility",
        href: "/projects/payment-sync-financial-visibility.html",
      },
      {
        number: "03",
        label: "Independent journalist dashboard",
        href: "/projects/journalism-atlas-dashboard.html",
      },
    ]}
  />
);

/** No heading supplied — `heading` is optional. */
export const NoHeading = () => (
  <CaseLinks
    items={[
      {
        number: "01",
        label: "Home dashboard system",
        href: "/projects/home-dashboard-system.html",
      },
      {
        number: "02",
        label: "Judgment architecture for AI-assisted due diligence",
        href: "/projects/ai-diligence-review-pattern.html",
      },
    ]}
  />
);

/** A single row — checks the layout doesn't rely on multiple rows for spacing. */
export const SingleItem = () => (
  <CaseLinks
    heading={<h2 className="label mono">Related work</h2>}
    items={[
      {
        number: "01",
        label: "Fluxx to Monday operational layer",
        href: "/projects/fluxx-monday-operational-layer.html",
      },
    ]}
  />
);
