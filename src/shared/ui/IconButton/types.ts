import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type IconButtonIcon = "close" | "copy" | "plus";

export type IconButtonVariant =
  | "default"
  | "close"
  | "chip-add"
  | "chip-remove"
  | "control"
  | "control-primary";

export type IconButtonElement = "button" | "span";

export type IconButtonSize = "sm" | "md";

export type IconButtonProps = Omit<
  HTMLButtonAttributes,
  "children" | "style"
> & {
  as?: IconButtonElement;
  children?: Snippet;
  icon?: IconButtonIcon;
  label?: string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
};
