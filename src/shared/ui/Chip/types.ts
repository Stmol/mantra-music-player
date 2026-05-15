import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ChipTone = "neutral" | "accent" | "danger";

export type ChipSize = "sm" | "md";

export type ChipProps = Omit<HTMLButtonAttributes, "children"> & {
  children?: Snippet;
  leading?: Snippet;
  selected?: boolean;
  size?: ChipSize;
  tone?: ChipTone;
  trailing?: Snippet;
};
