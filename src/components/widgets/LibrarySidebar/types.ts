import type { NavListAccent, NavListItemIcon } from "../NavList";

export type LibrarySidebarSource = {
  accent: NavListAccent;
  count: string;
  icon: NavListItemIcon;
  label: string;
};

export type LibrarySidebarPlaylist = {
  count: number;
  label: string;
};

export type LibrarySidebarStorage = {
  description: string;
  label: string;
  progress: number;
  value: string;
};
