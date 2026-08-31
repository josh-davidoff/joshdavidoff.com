import { SegmentedFilter } from "@joshdavidoff/site-ds";

const OPTIONS = [
  { value: "all", label: "All work", count: 9 },
  { value: "system", label: "System integration", count: 3 },
  { value: "ai", label: "AI enablement", count: 2 },
  { value: "speaking", label: "Public Speaking", count: 2 },
  { value: "experiment", label: "Experiments", count: 2 },
];

/** The project filter as it ships on the home page, with counts. */
export const Default = () => <SegmentedFilter options={OPTIONS} ariaLabel="Filter projects" />;

/** A non-first option selected, showing the active treatment. */
export const OptionSelected = () => (
  <SegmentedFilter options={OPTIONS} defaultValue="experiment" ariaLabel="Filter projects" />
);

/** Without counts, for filter sets where a total would be noise. */
export const WithoutCounts = () => (
  <SegmentedFilter
    options={OPTIONS.map(({ value, label }) => ({ value, label }))}
    ariaLabel="Filter projects"
  />
);
