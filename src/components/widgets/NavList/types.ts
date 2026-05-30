import type { ComponentType } from "svelte";

export type NavListAccent = "amber" | "blue" | "danger" | "mint" | "neutral";

export type NavListItemIcon = ComponentType;

export type NavListItem = {
  accent?: NavListAccent;
  icon?: NavListItemIcon;
  label: string;
  meta?: string;
  value: string;
};

export type NavListProps = {
  activeValue?: string;
  ariaLabel: string;
  items: NavListItem[];
  onSelect?: (value: string) => void;
};
