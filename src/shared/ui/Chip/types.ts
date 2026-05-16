import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ChipProps = Omit<HTMLButtonAttributes, "children"> & {
  create?: boolean;
  children?: Snippet;
  fullWidth?: boolean;
  removable?: boolean;
};
