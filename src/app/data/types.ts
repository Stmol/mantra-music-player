export type LibraryItem = {
  label: string;
  count?: number;
  icon: LibraryIcon;
  active?: boolean;
  accent?: "green" | "amber";
  depth?: 0 | 1 | 2;
  open?: boolean;
};

export type LibraryIcon =
  | "all"
  | "folder"
  | "tag"
  | "clock"
  | "shuffle"
  | "bookmark"
  | "trash"
  | "smart-folder";

export type Track = {
  title: string;
  artist: string;
  album: string;
  duration: string;
  colors: string[];
  tags: string[];
  active?: boolean;
};

export type Plugin = {
  name: string;
  description: string;
  users: string;
  status: "Install" | "Installed";
  swatch: string;
};
