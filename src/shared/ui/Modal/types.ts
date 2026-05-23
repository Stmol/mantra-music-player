import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type ModalSize = "sm" | "md" | "lg";

export type ModalProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "style"
> & {
  children?: Snippet;
  description?: string;
  dismissible?: boolean;
  footer?: Snippet;
  onClose?: () => void;
  open?: boolean;
  size?: ModalSize;
  title?: string;
};
