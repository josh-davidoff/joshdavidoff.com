import { BackLink, CaseHeader } from "@joshdavidoff/site-ds";

/** The back-to-home link used at the top of every case-study and talk page. */
export const Default = () => (
  <BackLink href="/">joshdavidoff.com</BackLink>
);

/** As it appears in context, stacked above a case-study header. */
export const InContext = () => (
  <div>
    <BackLink href="/">joshdavidoff.com</BackLink>
    <CaseHeader
      kicker="Case Study"
      title="Fluxx to Monday operational layer"
      subtitle="A controlled mirror layer that surfaces critical grant tasks in user-friendly Monday views."
    />
  </div>
);
