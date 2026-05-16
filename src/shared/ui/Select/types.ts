import type { Snippet } from "svelte";
import type { HTMLSelectAttributes } from "svelte/elements";

export type SelectSize = "sm" | "md" | "lg";

export type SelectOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type SelectProps = Omit<
  HTMLSelectAttributes,
  "children" | "size" | "value"
> & {
  description?: string;
  error?: string;
  label?: string;
  leading?: Snippet;
  options?: SelectOption[];
  selectSize?: SelectSize;
  value?: string;
};
