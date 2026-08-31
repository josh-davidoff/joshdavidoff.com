import { CompetencyAccordion, CompetencyItem } from "@joshdavidoff/site-ds";

// Real copy lifted from the "Core competencies" grid on the home page
// (index.html). `defaultOpen` drives the `[open]` state, which the CSS
// styles very differently (mustard border, joined panel radius) from the
// closed pill — so these previews sweep both states rather than showing
// an all-closed grid that would hide half the design.

/** The competencies grid as it ships on the home page — all five items closed. */
export const Default = () => (
  <CompetencyAccordion>
    <CompetencyItem summary="Process analysis">
      I map how work moves through organizations and redesign processes so
      that teams can operate with clarity and efficiency.
    </CompetencyItem>
    <CompetencyItem summary="Systems & automation">
      I build API-driven automations and integrations that knit a tech stack
      together and reduce time spent on data entry.
    </CompetencyItem>
    <CompetencyItem summary="Agentic workflow design">
      I design practical AI-assisted analytical workflows with human
      checkpoints and clear guardrails to keep users in the driver's seat.
    </CompetencyItem>
    <CompetencyItem summary="Business intelligence">
      I organize messy operational data into decision-centered dashboards
      that show live progress on key priorities.
    </CompetencyItem>
    <CompetencyItem summary="Change management">
      I support teams to adopt new systems with punchy documentation,
      up-front communication, engaging trainings, and plentiful
      opportunities for feedback.
    </CompetencyItem>
  </CompetencyAccordion>
);

/** Same five items, all expanded — shows the mustard-bordered `[open]` panel state. */
export const AllOpen = () => (
  <CompetencyAccordion>
    <CompetencyItem summary="Process analysis" defaultOpen>
      I map how work moves through organizations and redesign processes so
      that teams can operate with clarity and efficiency.
    </CompetencyItem>
    <CompetencyItem summary="Systems & automation" defaultOpen>
      I build API-driven automations and integrations that knit a tech stack
      together and reduce time spent on data entry.
    </CompetencyItem>
    <CompetencyItem summary="Agentic workflow design" defaultOpen>
      I design practical AI-assisted analytical workflows with human
      checkpoints and clear guardrails to keep users in the driver's seat.
    </CompetencyItem>
    <CompetencyItem summary="Business intelligence" defaultOpen>
      I organize messy operational data into decision-centered dashboards
      that show live progress on key priorities.
    </CompetencyItem>
    <CompetencyItem summary="Change management" defaultOpen>
      I support teams to adopt new systems with punchy documentation,
      up-front communication, engaging trainings, and plentiful
      opportunities for feedback.
    </CompetencyItem>
  </CompetencyAccordion>
);

/** A mixed state — some expanded, some closed — as a visitor would leave it mid-browse. */
export const Mixed = () => (
  <CompetencyAccordion>
    <CompetencyItem summary="Process analysis" defaultOpen>
      I map how work moves through organizations and redesign processes so
      that teams can operate with clarity and efficiency.
    </CompetencyItem>
    <CompetencyItem summary="Systems & automation">
      I build API-driven automations and integrations that knit a tech stack
      together and reduce time spent on data entry.
    </CompetencyItem>
    <CompetencyItem summary="Agentic workflow design" defaultOpen>
      I design practical AI-assisted analytical workflows with human
      checkpoints and clear guardrails to keep users in the driver's seat.
    </CompetencyItem>
    <CompetencyItem summary="Business intelligence">
      I organize messy operational data into decision-centered dashboards
      that show live progress on key priorities.
    </CompetencyItem>
    <CompetencyItem summary="Change management">
      I support teams to adopt new systems with punchy documentation,
      up-front communication, engaging trainings, and plentiful
      opportunities for feedback.
    </CompetencyItem>
  </CompetencyAccordion>
);
