import type { HTMLButtonAttributes } from "svelte/elements";

export type IconButtonIcon = "close" | "copy" | "plus";

export type IconButtonVariant =
  | "default"
  | "close"
  | "chip-add"
  | "chip-remove";

export type IconButtonElement = "button" | "span";

export type IconButtonProps = Omit<
  HTMLButtonAttributes,
  "children" | "style"
> & {
  as?: IconButtonElement;
  icon: IconButtonIcon;
  label?: string;
  variant?: IconButtonVariant;
};
