import { useState } from "react";

export interface SegmentedOption {
  /** Filter key for this option, mirrors the source's `data-filter` value. */
  value: string;
  /** Visible label for the button. */
  label: string;
  /** Optional count shown in the trailing `<span>` next to the label. */
  count?: number;
}

export interface SegmentedFilterProps {
  /** Buttons to render in the group, in order. */
  options: SegmentedOption[];
  /** Initial active value for uncontrolled use. Ignored when `value` is provided. */
  defaultValue?: string;
  /** Active value for controlled use. When provided, the component no longer tracks its own state. */
  value?: string;
  /** Called with the newly selected value whenever a button is clicked. */
  onChange?: (value: string) => void;
  /** Accessible label for the `role="group"` container, e.g. "Filter projects". */
  ariaLabel?: string;
  /** Additional class names appended after the base `segmented` class. */
  className?: string;
}

export function SegmentedFilter({
  options,
  defaultValue,
  value,
  onChange,
  ariaLabel,
  className,
}: SegmentedFilterProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options[0]?.value
  );
  const activeValue = isControlled ? value : internalValue;

  function handleClick(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  }

  return (
    <div
      className={className ? `segmented ${className}` : "segmented"}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isActive = option.value === activeValue;
        return (
          <button
            key={option.value}
            type="button"
            className={isActive ? "is-active" : undefined}
            data-filter={option.value}
            aria-pressed={isActive}
            onClick={() => handleClick(option.value)}
          >
            {option.label}{" "}
            {option.count !== undefined && (
              <span data-count={option.value}>{option.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
