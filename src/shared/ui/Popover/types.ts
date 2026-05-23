import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type PopoverPlacement = "top" | "right" | "bottom" | "left";
export type PopoverSurfaceSize = "default" | "lg";

export type PopoverRenderState = {
  open: boolean;
  toggle: () => void;
};

export type PopoverProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "style"
> & {
  children?: Snippet<[PopoverRenderState]>;
  open?: boolean;
  placement?: PopoverPlacement;
  surfaceSize?: PopoverSurfaceSize;
  trigger?: Snippet<[PopoverRenderState]>;
  triggerMode?: "button" | "custom";
};
