import { ProjectCard } from "@joshdavidoff/site-ds";

/** The canonical case-study card from the home page project grid. */
export const Default = () => (
  <ProjectCard
    categories={["System integration"]}
    title="Payment sync and reporting"
    description="High-control workflows connecting Fluxx GMS payment records to team-facing trackers and Power BI dashboards."
    systems={["Fluxx", "Monday.com", "Bill.com", "Power BI"]}
    link={{ label: "View case", href: "/projects/payment-sync-financial-visibility" }}
    type="system"
  />
);

/** Two categories switch the layout to the `.category-row` treatment. */
export const MultipleCategories = () => (
  <ProjectCard
    categories={["Public Speaking", "AI enablement"]}
    title="The Bot Stops Here"
    description="Cognitive checkpoints are a practical design approach to keep teams engaged during AI-assisted analytical tasks."
    systems={["Skill.MD packets", "Python", "Responsible AI"]}
    link={{ label: "View deck", href: "/bsh" }}
    type="speaking ai"
  />
);

/** An experiment with no case study behind it — no trailing link. */
export const WithoutLink = () => (
  <ProjectCard
    categories={["Experiment"]}
    title="Vinyl cataloging tool"
    description="An AI-powered cataloging tool that reads record labels from phone photos, grades physical condition, cross-references Discogs for pricing and release data, and appends everything to a Google Sheet."
    systems={["AI vision model", "Discogs", "Google Sheets"]}
    type="experiment"
  />
);

/** The numbered variant, with the italic focus line beneath the body copy. */
export const NumberedWithFocus = () => (
  <ProjectCard
    num="01"
    categories={["System integration"]}
    title="Monday.com as operational layer"
    description="A surgical shadow system that surfaces critical tasks in Monday without displacing Fluxx as the authoritative grants system."
    focus="Data discipline · Staff adoption · Write-back safety"
    systems={["Fluxx", "Monday.com", "Power Automate"]}
    link={{ label: "View case", href: "/projects/fluxx-monday-operational-layer" }}
    type="system"
  />
);
