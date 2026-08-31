import { SectionLabel } from "@joshdavidoff/site-ds";

/** Home page section heading — the largest margin/gap of the three variants. */
export const Home = () => (
  <SectionLabel variant="home">Core competencies</SectionLabel>
);

/** Case-study section heading — tightest spacing, used on `/projects/*`. */
export const Case = () => <SectionLabel variant="case">The Problem</SectionLabel>;

/** Talk-deck section heading, used on `/bsh`. */
export const Bsh = () => <SectionLabel variant="bsh">What I Built</SectionLabel>;
