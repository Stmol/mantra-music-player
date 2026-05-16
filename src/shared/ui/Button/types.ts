import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "grey"
  | "white"
  | "orange"
  | "third"
  | "positive"
  | "negative"
  | "warning"
  | "facebook"
  | "twitter"
  | "light-gray";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonHoverVariant =
  | "grey"
  | "primary"
  | "secondary"
  | "third"
  | "positive"
  | "negative"
  | "warning";

export type ButtonProps = Omit<HTMLButtonAttributes, "children"> & {
  block?: boolean;
  children?: Snippet;
  ghost?: boolean;
  hoverVariant?: ButtonHoverVariant;
  leading?: Snippet;
  loading?: boolean;
  pressed?: boolean;
  rounded?: boolean;
  size?: ButtonSize;
  trailing?: Snippet;
  variant?: ButtonVariant;
};
