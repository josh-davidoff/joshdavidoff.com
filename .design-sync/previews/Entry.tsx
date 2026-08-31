import { Entry, BeyondCard } from "@joshdavidoff/site-ds";

/** Link entry with no meta/description, as used for "autofictions" etc. */
export const LinkOnly = () => (
  <BeyondCard heading="Music">
    <Entry title="autofictions" href="https://autofictions.bandcamp.com/" />
  </BeyondCard>
);

/** Entry with a meta line, as used in the Volunteer panel. */
export const WithMeta = () => (
  <BeyondCard heading="Volunteer">
    <Entry title="Chair, Immigrant Solidarity Committee" meta="First Unitarian Brooklyn" />
  </BeyondCard>
);

/**
 * Entry with a `year` prop, rendering `.entry .yr`. No live HTML instance
 * of `.yr` exists on the site (reconstructed from CSS only), so this
 * exercises the prop directly using plausible content in the Volunteer style.
 */
export const WithYear = () => (
  <BeyondCard heading="Volunteer">
    <Entry
      title="Chair, Immigrant Solidarity Committee"
      meta="First Unitarian Brooklyn"
      year="2023–present"
    />
  </BeyondCard>
);
