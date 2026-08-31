import { ExperimentCard } from "@joshdavidoff/site-ds";

/** The Sky Window experiment card from the home-page experiment grid. */
export const Default = () => (
  <ExperimentCard
    title="Sky Window"
    description="A live, ambient map of the aircraft crossing a customizable strip of sky above any location."
    systems={["OpenSky", "OpenStreetMap", "Python"]}
  />
);

/** An experiment card with no systems chips, e.g. Vinyl cataloging tool's simplest form. */
export const NoChips = () => (
  <ExperimentCard
    title="Snail: Slow Dating by Mail"
    description="A live service prototype that tests slower, more intentional dating through one-match-at-a-time matchmaking and handwritten letters."
  />
);
