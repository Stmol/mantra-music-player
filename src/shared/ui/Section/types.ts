import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type SectionProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "style"
> & {
  children?: Snippet;
  description?: string;
  disabled?: boolean;
  title?: string;
};
