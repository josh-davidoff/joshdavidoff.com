import { BeyondCard, Entry, CurrentlyPanel, CurrentlyRow } from "@joshdavidoff/site-ds";

/** The "Music" panel from the home page's Beyond the work section. */
export const Music = () => (
  <BeyondCard heading="Music">
    <Entry title="autofictions" href="https://autofictions.bandcamp.com/" />
    <Entry
      title="Brooklyn Choir Project"
      href="https://www.instagram.com/brooklynchoirproject/"
      meta="Producer, 2024–2025"
    />
    <Entry title="film scoring reel" href="https://youtu.be/W5Zj8Amikl4" />
    <Entry title="theboywonderhimself" href="https://theboywonderhimself.bandcamp.com/" />
  </BeyondCard>
);

/** The "Volunteer" panel, entries with meta lines instead of links. */
export const Volunteer = () => (
  <BeyondCard heading="Volunteer">
    <Entry title="Chair, Immigrant Solidarity Committee" meta="First Unitarian Brooklyn" />
    <Entry title="Immigrant Advocate" meta="The Ark Pro Se Asylum Clinic" />
    <Entry title="Eagle Scout" meta="Troop 3, Evanston" />
  </BeyondCard>
);

/** The "Currently:" panel, composing CurrentlyPanel/CurrentlyRow inside a BeyondCard. */
export const Currently = () => (
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
