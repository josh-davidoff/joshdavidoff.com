/**
 * Design system for joshdavidoff.com.
 *
 * Extracted from the site's inline stylesheets: an OKLCH token set, three
 * editorial typefaces (Bricolage Grotesque for display, Instrument Sans for
 * UI/eyebrow text, Newsreader for body copy), and the card and section
 * components used across the home page and the case-study pages.
 *
 * Every component is a typed wrapper around the extracted stylesheet — it
 * emits the site's own class names and expects `styles.css` to be loaded.
 * There is no theme provider and no runtime styling: all color and spacing
 * comes from CSS custom properties defined on `:root`.
 */

export { ArrowLink, type ArrowLinkProps } from "./components/ArrowLink";
export { BackLink, type BackLinkProps } from "./components/BackLink";
export { BeyondCard, type BeyondCardProps } from "./components/BeyondCard";
export { CaseHeader, type CaseHeaderProps } from "./components/CaseHeader";
export { CaseLinks, type CaseLinksProps } from "./components/CaseLinks";
export { CategoryTag, type CategoryTagProps } from "./components/CategoryTag";
export { Chip, type ChipProps } from "./components/Chip";
export { ChipRow, type ChipRowProps } from "./components/ChipRow";
export {
  CompetencyAccordion,
  type CompetencyAccordionProps,
  CompetencyItem,
  type CompetencyItemProps,
} from "./components/CompetencyAccordion";
export {
  CurrentlyPanel,
  type CurrentlyPanelProps,
  CurrentlyRow,
  type CurrentlyRowProps,
} from "./components/CurrentlyPanel";
export { DiagramBox, type DiagramBoxProps } from "./components/DiagramBox";
export { Entry, type EntryProps } from "./components/Entry";
export { ExperimentCard, type ExperimentCardProps } from "./components/ExperimentCard";
export { Hero, type HeroProps } from "./components/Hero";
export { Note, type NoteProps } from "./components/Note";
export { Page, type PageProps } from "./components/Page";
export { Placeholder, type PlaceholderProps } from "./components/Placeholder";
export { ProjectCard, type ProjectCardProps } from "./components/ProjectCard";
export {
  RefTable,
  type RefTableCell,
  type RefTableProps,
  type RefTableRow,
} from "./components/RefTable";
export { SectionLabel, type SectionLabelProps } from "./components/SectionLabel";
export {
  SegmentedFilter,
  type SegmentedFilterProps,
  type SegmentedOption,
} from "./components/SegmentedFilter";
export { SiteFooter, type SiteFooterProps } from "./components/SiteFooter";
export { SiteNav, type SiteNavLink, type SiteNavProps } from "./components/SiteNav";
export { TalkCard, type TalkCardProps, type TalkEvent } from "./components/TalkCard";
export { TalkListCard, type TalkListCardProps } from "./components/TalkListCard";
