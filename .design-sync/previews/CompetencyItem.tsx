import { CompetencyAccordion, CompetencyItem } from "@joshdavidoff/site-ds";

// `.comp-item` sizes itself with `max-width: calc(50% - 6px)`, which only
// makes sense inside the flex `.comp-grid` the site always wraps it in, so
// each cell here composes a single item inside `CompetencyAccordion` — the
// only context the site actually renders it in. Real copy is lifted from
// the "Core competencies" section of index.html.

/** A single item closed — the default pill state, "+" marker. */
export const Closed = () => (
  <CompetencyAccordion>
    <CompetencyItem summary="Process analysis">
      I map how work moves through organizations and redesign processes so
      that teams can operate with clarity and efficiency.
    </CompetencyItem>
  </CompetencyAccordion>
);

/** A single item expanded — mustard border, joined panel, "-" marker. */
export const Open = () => (
  <CompetencyAccordion>
    <CompetencyItem summary="Systems & automation" defaultOpen>
      I build API-driven automations and integrations that knit a tech stack
      together and reduce time spent on data entry.
    </CompetencyItem>
  </CompetencyAccordion>
);

/** The longest real summary/body pairing on the site, expanded, to check wrap behavior. */
export const LongContentOpen = () => (
  <CompetencyAccordion>
    <CompetencyItem summary="Change management" defaultOpen>
      I support teams to adopt new systems with punchy documentation,
      up-front communication, engaging trainings, and plentiful
      opportunities for feedback.
    </CompetencyItem>
  </CompetencyAccordion>
);
