import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type EyebrowElement = "div" | "p" | "span";

export type EyebrowProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  as?: EyebrowElement;
  children?: Snippet;
};
