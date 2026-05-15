import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<HTMLButtonAttributes, "children"> & {
  children?: Snippet;
  leading?: Snippet;
  loading?: boolean;
  pressed?: boolean;
  size?: ButtonSize;
  trailing?: Snippet;
  variant?: ButtonVariant;
};
