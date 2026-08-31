import { Page, SectionLabel } from "@joshdavidoff/site-ds";

/** Home page column: roomy padding, used for the index page's `.wrap`. */
export const Home = () => (
  <Page screenLabel="Home" variant="home">
    <SectionLabel variant="home">Core competencies</SectionLabel>
    <p>
      Working at the intersection of grants management, process analysis &amp;
      automation, and responsible, safe AI adoption, I help grantmaking teams
      translate strategy into approachable workflows and clean tech stacks.
    </p>
  </Page>
);

/** Case-study column: tighter padding, used on `/projects/*` pages. */
export const Case = () => (
  <Page screenLabel="Operational Layer" variant="case">
    <SectionLabel variant="case">The Problem</SectionLabel>
    <p>
      Fluxx holds the authoritative grants data, but it lacks project
      management functionality. The team needed accessible views for
      reports, agreements, payments, and pipeline tracking without losing
      data discipline.
    </p>
  </Page>
);

/** Talk-deck column: used on the `/bsh` page. */
export const Bsh = () => (
  <Page screenLabel="Bot Stops Here" variant="bsh">
    <SectionLabel variant="bsh">Talk Companion</SectionLabel>
    <p>
      Request access to the Skill.md repo from &ldquo;The Bot Stops
      Here,&rdquo; a talk on practical AI workflows for small foundation
      teams.
    </p>
  </Page>
);
