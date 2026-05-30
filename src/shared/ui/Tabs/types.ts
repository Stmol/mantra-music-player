import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type TabsValue = string;

export type TabsAppearance = "segmented";

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
  appearance?: TabsAppearance;
  items: TabsItem[];
  onValueChange?: (value: TabsValue) => void;
  panelId?: string;
  tabIdPrefix?: string;
  trailing?: Snippet;
};
