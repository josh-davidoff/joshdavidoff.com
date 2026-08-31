import { RefTable, DiagramBox } from "@joshdavidoff/site-ds";

// Real rows lifted from the "System of record" table on
// projects/fluxx-monday-operational-layer.html. The site always wraps this
// table in `DiagramBox` (the mustard-bordered container), so most cells
// here show the wrapped version — that is the table's only true render —
// with one bare cell to confirm it still degrades sensibly on its own.

const columns = ["Object", "System of record", "Operational mirror", "Notes"];

const rows = [
  [
    { content: "Grants / proposals", emphasis: "source" as const },
    { content: "Fluxx", emphasis: "source" as const },
    { content: "Monday, SharePoint, Power BI", emphasis: "mirror" as const },
    { content: "Fluxx is authoritative", emphasis: "note" as const },
  ],
  [
    { content: "Reports", emphasis: "source" as const },
    { content: "Fluxx", emphasis: "source" as const },
    { content: "Monday", emphasis: "mirror" as const },
    {
      content: "Team visibility; limited write-back of state and due date",
      emphasis: "note" as const,
    },
  ],
  [
    { content: "Agreements", emphasis: "source" as const },
    { content: "Fluxx", emphasis: "source" as const },
    { content: "Monday", emphasis: "mirror" as const },
    { content: "State column only", emphasis: "note" as const },
  ],
  [
    { content: "Payments", emphasis: "source" as const },
    { content: "Fluxx", emphasis: "source" as const },
    { content: "Monday, SharePoint", emphasis: "mirror" as const },
    {
      content:
        "High-control area; Power BI depends on SharePoint list integrity",
      emphasis: "note" as const,
    },
  ],
  [
    { content: "Board prep planning", emphasis: "source" as const },
    { content: "Monday", emphasis: "mirror" as const },
    { content: "Outlook, dashboards", emphasis: "mirror" as const },
    {
      content: "Operational only — not source-of-truth grants data",
      emphasis: "note" as const,
    },
  ],
  [
    { content: "Receipts", emphasis: "source" as const },
    { content: "Monday", emphasis: "mirror" as const },
    { content: "QuickBooks (manual)", emphasis: "mirror" as const },
    {
      content: "Intake automated; reconciliation is manual",
      emphasis: "note" as const,
    },
  ],
];

/** The full reference table wrapped in `DiagramBox`, as it ships on the case study page. */
export const InDiagramBox = () => (
  <DiagramBox>
    <RefTable columns={columns} rows={rows} />
  </DiagramBox>
);

/** A shorter slice, wrapped, to check the mustard box's bottom padding around fewer rows. */
export const ShortInDiagramBox = () => (
  <DiagramBox>
    <RefTable columns={columns} rows={rows.slice(0, 2)} />
  </DiagramBox>
);

/** The bare table with no `DiagramBox` — confirms it still reads sensibly on its own. */
export const Bare = () => <RefTable columns={columns} rows={rows.slice(0, 3)} />;
