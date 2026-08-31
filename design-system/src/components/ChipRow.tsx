import { Chip } from "./Chip";

export interface ChipRowProps {
  /** Tool or system names to render as a row of chips (the `p.proj-sys` line). */
  items: string[];
  /** Additional class names appended after the base `proj-sys` class. */
  className?: string;
}

export function ChipRow({ items, className }: ChipRowProps) {
  return (
    <p className={className ? `proj-sys ${className}` : "proj-sys"}>
      {items.map((item, index) => (
        <Chip key={index}>{item}</Chip>
      ))}
    </p>
  );
}
