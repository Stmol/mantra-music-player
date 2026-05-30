import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type SectionVariant = "plain" | "panel";

export type SectionProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "style"
> & {
  children?: Snippet;
  description?: string;
  disabled?: boolean;
  headerActions?: Snippet;
  title?: string;
  variant?: SectionVariant;
};
