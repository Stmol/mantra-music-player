import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "text"
  | "danger"
  | "grey"
  | "white"
  | "positive"
  | "negative"
  | "warning";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonHoverVariant =
  | "grey"
  | "primary"
  | "positive"
  | "negative"
  | "warning";

export type ButtonProps = Omit<HTMLButtonAttributes, "children" | "style"> & {
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
