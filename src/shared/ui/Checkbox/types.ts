import type { Snippet } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";

export type CheckboxProps = Omit<
  HTMLInputAttributes,
  "checked" | "children" | "style" | "type"
> & {
  checked?: boolean;
  description?: string;
  indeterminate?: boolean;
  label?: string;
  marker?: Snippet;
};
