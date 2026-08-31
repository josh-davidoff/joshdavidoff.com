import type { ReactNode } from "react";

export interface RefTableCell {
  /** Cell content. */
  content: ReactNode;
  /** Visual emphasis for the cell: `source` for the authoritative system, `mirror` for a downstream mirror, `note` for a trailing annotation. */
  emphasis?: "source" | "mirror" | "note";
}

export type RefTableRow = RefTableCell[];

const emphasisClassName: Record<
  NonNullable<RefTableCell["emphasis"]>,
  string
> = {
  source: "src",
  mirror: "mirror",
  note: "note",
};

export interface RefTableProps {
  /** Column header labels, in order. */
  columns: string[];
  /** Table body rows; each row is an array of cells aligned to `columns`. */
  rows: RefTableRow[];
  /** Additional class names appended after the base `ref-table` class. */
  className?: string;
}

export function RefTable({ columns, rows, className }: RefTableProps) {
  return (
    <table className={className ? `ref-table ${className}` : "ref-table"}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={cell.emphasis ? emphasisClassName[cell.emphasis] : undefined}
              >
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
