# Building with the joshdavidoff.com design system

A small editorial design system: dark green ground, cream serif body text, mustard
accents. Three typefaces, eight colors, and a set of card and section components taken
from the site itself.

## Wrap everything in `SiteRoot`

**This palette is dark-first. Every layout must be wrapped in `SiteRoot`.** It supplies
the ground color, the foreground color, and the body typeface. Without it, components
render cream-on-white and are effectively invisible — they will look broken, not merely
unstyled. There is no theme provider and no JavaScript context: `SiteRoot` is a plain
element carrying the CSS the site normally puts on `<body>`.

```tsx
<SiteRoot>
  <SiteNav name="Josh Davidoff" homeHref="/" nameVisible links={[
    { label: "Work", href: "#projects" },
    { label: "Email", href: "mailto:joshdavidoff@gmail.com" },
  ]} />
  <Page>
    <SectionLabel>Projects, by type</SectionLabel>
    <div className="project-grid">
      <ProjectCard
        categories={["System integration"]}
        title="Payment sync and reporting"
        description="High-control workflows connecting Fluxx GMS payment records to team-facing trackers."
        systems={["Fluxx", "Monday.com", "Power BI"]}
        link={{ label: "View case", href: "/projects/payment-sync" }}
      />
    </div>
  </Page>
</SiteRoot>
```

## The styling idiom: fixed class names, tokens for your own glue

**There is no utility-class system.** Components own their class names internally; you do
not style them by passing class or style props. Props carry *content* only — text, links,
lists. Nothing in this system takes a color, size, or spacing prop.

For your own layout glue (grids, spacers, one-off wrappers), write plain CSS and reach for
the design system's custom properties. These are the complete vocabulary — all eight
colors and three families, defined on `:root`:

| Token | Role |
|---|---|
| `--bg` | page ground, dark green |
| `--bg-deep` | recessed panels and cards |
| `--cream` | primary foreground text |
| `--muted` | secondary body copy |
| `--faint` | tertiary/meta text |
| `--mustard` | links, accents, section labels |
| `--tomato` | categories, numbers, years |
| `--rule` | borders and dividers |
| `--font-display` | Bricolage Grotesque — headings |
| `--font-ui` | Instrument Sans — eyebrows, chips, meta |
| `--font-body` | Newsreader — body copy |

```css
.my-grid { display: grid; gap: 18px; border-top: 1px solid var(--rule); }
```

A few layout classes from the site are available and worth reusing rather than
reinventing: `.project-grid` and `.experiment-grid` (two-column card grids), `.extras`
(three-column), `.wrap` (the centered 680px column, which `Page` renders for you), and
`.mono` (the uppercase letterspaced eyebrow treatment).

## Variants

`Page`, `SectionLabel`, and `SiteNav` take a `variant` prop selecting page shape —
`"home"` (default), `"case"` for case-study pages, `"bsh"` for the talk-deck page. These
change spacing only. `CaseHeader` takes `"case"` (default) or `"bsh"`.

## Where the truth lives

- **The stylesheet is authoritative.** Read `_ds/<folder>/styles.css` and the
  `_ds_bundle.css` it imports before styling anything — every rule and token is there.
- **Per-component API**: each component's `.d.ts` gives the exact props with
  documentation, and its `.prompt.md` shows composition examples.

## Two quirks worth knowing

- `Chip` and `CategoryTag` are styled only inside a project card. A bare `<Chip>` has no
  pill border, and a chip row outside a `.proj-card` renders at 6px. Compose them inside
  `ProjectCard`, `ExperimentCard`, or an `<article className="proj-card">`.
- `SiteNav`'s wordmark is hidden by default, matching the site's pre-scroll state. Pass
  `nameVisible` for any static layout, or `variant="case"` for the always-visible form.
