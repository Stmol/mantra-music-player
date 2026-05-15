import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type SwitchProps = Omit<
  HTMLButtonAttributes,
  "aria-checked" | "children" | "role"
> & {
  checked?: boolean;
  description?: string;
  label?: string;
  offIcon?: Snippet;
  onIcon?: Snippet;
};
