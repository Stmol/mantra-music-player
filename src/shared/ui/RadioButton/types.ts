import type { Snippet } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";

export type RadioButtonValue = string | number;

export type RadioButtonProps = Omit<
  HTMLInputAttributes,
  "checked" | "children" | "type" | "value"
> & {
  checked?: boolean;
  description?: string;
  group?: RadioButtonValue;
  label?: string;
  marker?: Snippet;
  value?: RadioButtonValue;
};
