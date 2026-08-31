import { CurrentlyPanel, CurrentlyRow, BeyondCard } from "@joshdavidoff/site-ds";

/** A single row ("Reading") composed inside its real parent context. */
export const Reading = () => (
  <BeyondCard heading="Currently:">
    <CurrentlyPanel>
      <CurrentlyRow label="Reading">
        <em>On the Calculation of Volume</em> —&nbsp;Solvej Balle
      </CurrentlyRow>
    </CurrentlyPanel>
  </BeyondCard>
);

/** All three real rows together, showing label/value alignment across rows. */
export const AllRows = () => (
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
