import type { HTMLAttributes } from "svelte/elements";

export type ProgressMeterAccent =
  | "amber"
  | "blue"
  | "danger"
  | "mint"
  | "neutral";

export type ProgressMeterProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  accent?: ProgressMeterAccent;
  ariaLabel?: string;
  max?: number;
  value: number;
};
