import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type PopoverPlacement = "top" | "right" | "bottom" | "left";

export type PopoverRenderState = {
  open: boolean;
  toggle: () => void;
};

export type PopoverProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  children?: Snippet<[PopoverRenderState]>;
  open?: boolean;
  placement?: PopoverPlacement;
  trigger?: Snippet<[PopoverRenderState]>;
  triggerMode?: "button" | "custom";
};
