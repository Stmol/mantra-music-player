import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type TooltipPlacement = "top" | "right" | "bottom" | "left";

export type TooltipProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "content" | "style"
> & {
  children: Snippet;
  content?: Snippet;
  delay?: number;
  disabled?: boolean;
  label?: string;
  offset?: number;
  placement?: TooltipPlacement;
};
