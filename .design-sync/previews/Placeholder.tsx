import { Placeholder } from "@joshdavidoff/site-ds";

// `.ph` has no live usage in index.html's current markup (an orphaned rule,
// confirmed in components.css: "defined but never applied anywhere in
// index.html's current markup"). It also declares no width/height, so with
// no text content to size it, a bare <div className="ph"> collapses to a
// sliver (just its border-top) instead of showing the diagonal-hatch fill.
// Any real caller would need to size it explicitly; these previews do that
// with a small scoped <style> block, which is preview composition only —
// it does not touch the design system's own stylesheet.

/** Reconstructed directory-mockup usage: a photo drop target, sized by its label text. */
export const PhotoDropTarget = () => (
  <Placeholder className="photo-drop">photo of josh — drop here</Placeholder>
);

/** A wider placeholder, sized like a card hero image slot. */
export const WideHeroSlot = () => (
  <>
    <style>{".hero-slot { width: 320px; height: 160px; }"}</style>
    <Placeholder className="hero-slot" />
  </>
);

/** A square placeholder, sized like a thumbnail slot, with no label. */
export const SquareThumbnail = () => (
  <>
    <style>{".thumb-slot { width: 140px; height: 140px; }"}</style>
    <Placeholder className="thumb-slot" />
  </>
);
