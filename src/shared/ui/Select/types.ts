import type { Snippet } from "svelte";
import type { HTMLSelectAttributes } from "svelte/elements";

export type SelectSize = "sm" | "md" | "lg";
export type SelectControlWidth = "sm" | "md" | "lg";

export type SelectOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type SelectProps = Omit<
  HTMLSelectAttributes,
  "children" | "size" | "style" | "value"
> & {
  description?: string;
  error?: string;
  label?: string;
  leading?: Snippet;
  options?: SelectOption[];
  controlWidth?: SelectControlWidth;
  selectSize?: SelectSize;
  value?: string;
};
