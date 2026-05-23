import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type TabsValue = string;

export type TabsItem = {
  disabled?: boolean;
  label: string;
  value: TabsValue;
};

export type TabsProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "style"
> & {
  activeValue?: TabsValue;
  items: TabsItem[];
  onValueChange?: (value: TabsValue) => void;
  panelId?: string;
  tabIdPrefix?: string;
  trailing?: Snippet;
};
