import { SiteRoot, SiteNav, Hero, SectionLabel } from "@joshdavidoff/site-ds";

/**
 * The theme root itself, composed with real page content so the dark
 * ground and cream/mustard palette it supplies are visible rather than an
 * empty box.
 */
export const Default = () => (
  <SiteRoot>
    <SiteNav
      name="Josh Davidoff"
      homeHref="/"
      links={[
        { label: "Work", href: "#projects" },
        { label: "Building", href: "/building/" },
        { label: "Resume", href: "/assets/Josh%20Davidoff_resume_2026-8.pdf" },
      ]}
    />
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "56px 32px 40px" }}>
      <Hero
        name="Josh Davidoff"
        place="Brooklyn, NY"
        lede={
          <>
            I connect platforms and people to enable a{" "}
            <span className="pop">focus on mission.</span>
          </>
        }
      />
      <div style={{ marginTop: 40 }}>
        <SectionLabel variant="home">Core competencies</SectionLabel>
      </div>
    </div>
  </SiteRoot>
);
