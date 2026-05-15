import type { LibraryItem, Plugin, Track } from "./types";

export const quickItems: LibraryItem[] = [
  { label: "Library", count: 589, icon: "all", active: true },
  { label: "Recently Played", icon: "clock" },
  { label: "Albums", count: 42, icon: "folder" },
  { label: "Artists", count: 18, icon: "bookmark" },
  { label: "Playlists", count: 7, icon: "tag" },
  { label: "Plugins", icon: "shuffle" },
];

export const smartItems: LibraryItem[] = [];

export const folderItems: LibraryItem[] = [];

export const filterTabs = [
  "Color",
  "Folder",
  "Tags",
  "Genre",
  "Duration",
  "Types",
  "Size",
  "Note",
] as const;

export const tracks: Track[] = [
  {
    title: "IMG_2276",
    artist: "Kira Vale",
    album: "Rusted Shield",
    duration: "03:42",
    colors: ["#140d0c", "#55545b", "#8c4d33", "#d28949", "#f1c37d"],
    tags: ["item", "ambient"],
    active: true,
  },
  {
    title: "Light Rail Memory",
    artist: "Nami Drift",
    album: "City Archives",
    duration: "04:18",
    colors: ["#0d1118", "#2e4f72", "#647f97", "#c4d4dd", "#e5edf1"],
    tags: ["city", "demo"],
  },
  {
    title: "Minor Glass",
    artist: "Sera Mono",
    album: "Soft Controls",
    duration: "02:56",
    colors: ["#101010", "#3b3c3e", "#717477", "#babdc0", "#f4f5f5"],
    tags: ["piano", "favorite"],
  },
  {
    title: "Defect Gen Theme",
    artist: "Mantra Forge",
    album: "Plugin Sketches",
    duration: "05:01",
    colors: ["#121819", "#244841", "#39a778", "#9ee1ba", "#f0f4d8"],
    tags: ["plugin", "vocal"],
  },
  {
    title: "Amber Pin",
    artist: "Red Head Dwarf",
    album: "Game Assets",
    duration: "01:48",
    colors: ["#170d09", "#69331e", "#b35d2d", "#e39548", "#ffc77b"],
    tags: ["loop", "pin"],
  },
  {
    title: "Unsorted Room",
    artist: "Vibe Ride",
    album: "Unorganized",
    duration: "03:09",
    colors: ["#101112", "#34373d", "#666b75", "#9da4af", "#d7dde4"],
    tags: ["draft", "mix"],
  },
];

export const plugins: Plugin[] = [
  {
    name: "Pinterest Visual Search",
    description: "Find similar cover moods from a reference track.",
    users: "288.4K",
    status: "Installed",
    swatch: "#e60023",
  },
  {
    name: "JXL Format Extension",
    description: "Enable full support for future audio preview formats.",
    users: "12.0K",
    status: "Install",
    swatch: "#46c7bd",
  },
  {
    name: "Live Photo Format Extension",
    description: "Generate animated thumbnails for visual albums.",
    users: "27.8K",
    status: "Install",
    swatch: "#58d84d",
  },
  {
    name: "SWF Format Extension",
    description: "Preview legacy interactive media attached to releases.",
    users: "23.5K",
    status: "Install",
    swatch: "#ef3d2f",
  },
  {
    name: "dotLottie Image Extensions",
    description: "Adds moving artwork support for playlist covers.",
    users: "24.1K",
    status: "Install",
    swatch: "#18d3b2",
  },
];
