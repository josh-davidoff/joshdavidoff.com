import { CurrentlyPanel, CurrentlyRow, BeyondCard } from "@joshdavidoff/site-ds";

/**
 * `panel=false` (default) — the plain `.currently` grid nested inside a
 * `.beyond-card`, exactly as the home page's "Currently:" panel does.
 */
export const NestedInBeyondCard = () => (
  <BeyondCard heading="Currently:">
    <CurrentlyPanel>
      <CurrentlyRow label="Reading">
        <em>On the Calculation of Volume</em> —&nbsp;Solvej Balle
      </CurrentlyRow>
      <CurrentlyRow label="Listening">Something Worth Waiting For — Friko</CurrentlyRow>
      <CurrentlyRow label="Playing">Rec softball · pickleball · Sufjan Stevens covers</CurrentlyRow>
    </CurrentlyPanel>
  </BeyondCard>
);

/**
 * `panel=true` — the standalone `.currently-panel` background treatment.
 * No live HTML instance of this variant exists on the site (reconstructed
 * from CSS only); same real "Currently" copy, without the BeyondCard wrapper.
 */
export const StandalonePanel = () => (
  <CurrentlyPanel panel>
    <CurrentlyRow label="Reading">
      <em>On the Calculation of Volume</em> —&nbsp;Solvej Balle
    </CurrentlyRow>
    <CurrentlyRow label="Listening">Something Worth Waiting For — Friko</CurrentlyRow>
    <CurrentlyRow label="Playing">Rec softball · pickleball · Sufjan Stevens covers</CurrentlyRow>
  </CurrentlyPanel>
);
