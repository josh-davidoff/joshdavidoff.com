# Component authoring conventions

These rules are binding for every component in `src/components/`.

## File shape

One component per file, named `<ComponentName>.tsx`. Each file exports:

- a named `export interface <ComponentName>Props`
- a named `export function <ComponentName>(props: <ComponentName>Props)`

No default exports. No `React.FC`. Import React types explicitly:

```tsx
import type { ReactNode } from "react";
```

## Rules

1. **Emit the site's existing class names verbatim.** These components are a typed
   wrapper around the extracted stylesheet, not a redesign. Never invent a class,
   never rename one, never add inline `style` attributes.
2. **Preserve the source markup structure and element types.** If the site used
   `<article class="proj-card">` with a `<span class="category">` before the `<h3>`,
   the component emits exactly that, in that order.
3. **Preserve accessibility attributes** found in the source: `aria-hidden` on the
   decorative `✽`/`→` glyphs, `aria-label` on nav landmarks, `aria-pressed` on the
   segmented buttons, `role="group"`, `alt` on images.
4. **Props are content, not styling.** Expose the text/nodes the site varies, plus
   `href` where the source links. Do not expose color, spacing, or font props.
5. Every prop that can accept rich text is typed `ReactNode`; plain strings are `string`.
6. Optional props get `?` and are omitted from the DOM when undefined — never render
   an empty element for a missing optional.
7. Accept and spread a `className?: string` appended after the base class, so page-level
   variants (e.g. `proj-card speaking-card`) remain expressible.
8. **Every prop gets a TSDoc `/** ... *\/` comment.** These become the API contract the
   design agent codes against, so describe what the prop is for, not its type.
9. No state, no effects, no event handlers unless the source markup was interactive
   (`SegmentedFilter`, `CompetencyAccordion`). Keep those uncontrolled where the site
   was uncontrolled.
10. No imports from other component files unless listed as a dependency in the task.
    Shared leaf components (`Chip`, `SectionLabel`, `ArrowLink`) may be imported.
