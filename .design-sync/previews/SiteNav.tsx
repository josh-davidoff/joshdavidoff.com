import { SiteNav } from "@joshdavidoff/site-ds";

// NOTE: the home-page wordmark is hidden by default (`.site-nav-name { opacity: 0 }`)
// and the live site reveals it with scroll JS. Static previews pass `nameVisible`
// so it isn't rendered as an invisible element.

/** The home page's full nav, wordmark revealed as it appears after scrolling. */
export const Home = () => (
  <SiteNav
    name="Josh Davidoff"
    homeHref="/"
    nameVisible
    links={[
      { label: "Work", href: "#projects" },
      { label: "Talks", href: "#projects", navFilter: "speaking" },
      { label: "Experiments", href: "#projects", navFilter: "experiment" },
      { label: "Resume", href: "/assets/Josh%20Davidoff_resume_2026-8.pdf" },
      { label: "Email", href: "mailto:joshdavidoff@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/joshdavidoff/", icon: true },
    ]}
  />
);

/** The nav used on case-study pages, where the wordmark is always visible. */
export const CaseStudy = () => (
  <SiteNav
    name="Josh Davidoff"
    homeHref="/"
    variant="case"
    links={[
      { label: "Work", href: "/#projects" },
      { label: "Resume", href: "/assets/Josh%20Davidoff_resume_2026-8.pdf" },
      { label: "Email", href: "mailto:joshdavidoff@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/joshdavidoff/", icon: true },
    ]}
  />
);

/** The home-page nav in its true pre-scroll state: the wordmark is transparent. */
export const BeforeScroll = () => (
  <SiteNav
    name="Josh Davidoff"
    homeHref="/"
    links={[
      { label: "Work", href: "#projects" },
      { label: "Resume", href: "/assets/Josh%20Davidoff_resume_2026-8.pdf" },
      { label: "Email", href: "mailto:joshdavidoff@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/joshdavidoff/", icon: true },
    ]}
  />
);
