import { SiteFooter, Page } from "@joshdavidoff/site-ds";

/**
 * `SiteFooter` has no horizontal padding of its own — on the real site it
 * always sits inside `Page`'s `.wrap` column, which supplies the 32px side
 * margins. Composed here the same way for a true render.
 */

/** The home page footer: just Email and Resume links, no location line. */
export const Home = () => (
  <Page variant="home">
    <SiteFooter
      links={[
        { label: "Email", href: "mailto:joshdavidoff@gmail.com" },
        { label: "Resume", href: "/assets/Josh%20Davidoff_resume_2026-8.pdf" },
      ]}
    />
  </Page>
);

/** The `/bsh` talk-deck footer, which adds the `.loc` location line. */
export const WithLocation = () => (
  <Page variant="bsh">
    <SiteFooter
      links={[
        { label: "Main site", href: "/" },
        { label: "Resume", href: "/assets/Josh%20Davidoff_resume_2026-8.pdf" },
        { label: "Email", href: "mailto:joshdavidoff@gmail.com" },
      ]}
      location="Brooklyn, NY"
    />
  </Page>
);
