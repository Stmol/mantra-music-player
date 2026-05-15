import type { Snippet } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";

export type TextFieldSize = "sm" | "md" | "lg";

export type TextFieldTone = "neutral" | "danger";

export type TextFieldProps = Omit<
  HTMLInputAttributes,
  "children" | "size" | "value"
> & {
  description?: string;
  error?: string;
  inputSize?: TextFieldSize;
  label?: string;
  leading?: Snippet;
  tone?: TextFieldTone;
  trailing?: Snippet;
  value?: string;
};
