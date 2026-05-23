import type { IconName } from "../Icon";
import type { HTMLAttributes } from "svelte/elements";

export type IconTabsValue = string;

export type IconTabsItem = {
  disabled?: boolean;
  icon: IconName;
  label: string;
  value: IconTabsValue;
};

export type IconTabsProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "style"
> & {
  activeValue?: IconTabsValue;
  items: IconTabsItem[];
  onValueChange?: (value: IconTabsValue) => void;
  tabIdPrefix?: string;
};
