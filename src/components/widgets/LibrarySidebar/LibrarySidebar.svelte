<script lang="ts">
  import { Database } from "lucide-svelte";
  import { NavList } from "../NavList";
  import { StackedLinkList } from "../StackedLinkList";
  import { SummaryCard } from "../SummaryCard";
  import SidebarBrand from "./SidebarBrand/SidebarBrand.svelte";
  import type {
    LibrarySidebarPlaylist,
    LibrarySidebarSource,
    LibrarySidebarStorage,
  } from "./types";
  import type { NavListItem } from "../NavList";
  import type { StackedLinkListItem } from "../StackedLinkList";

  interface LibrarySidebarProperties {
    activeSource: string;
    onSourceSelect: (label: string) => void;
    playlists: LibrarySidebarPlaylist[];
    sources: LibrarySidebarSource[];
    storage: LibrarySidebarStorage;
  }

  let {
    activeSource,
    onSourceSelect,
    playlists,
    sources,
    storage,
  }: LibrarySidebarProperties = $props();

  const sourceItems = $derived.by<NavListItem[]>(() =>
    sources.map((source) => ({
      accent: source.accent,
      icon: source.icon,
      label: source.label,
      meta: source.count,
      value: source.label,
    })),
  );

  const playlistItems = $derived.by<StackedLinkListItem[]>(() =>
    playlists.map((playlist) => ({
      label: playlist.label,
      meta: playlist.count,
      value: playlist.label,
    })),
  );

  const handleCollectionCreate = () => {
    return;
  };

  const handlePlaylistSelect = (value: string) => {
    void value;
  };
</script>

<aside class="sidebar" aria-label="Library navigation">
  <SidebarBrand />
  <NavList
    activeValue={activeSource}
    ariaLabel="Sources"
    items={sourceItems}
    onSelect={onSourceSelect}
  />
  <StackedLinkList
    headerActionAriaLabel="Create collection"
    items={playlistItems}
    onHeaderAction={handleCollectionCreate}
    onItemSelect={handlePlaylistSelect}
    title="Collections"
  />
  <div class="storage-card-slot">
    <SummaryCard
      ariaLabel="Storage usage"
      description={storage.description}
      icon={Database}
      progress={storage.progress}
      title={storage.label}
      value={storage.value}
    />
  </div>
</aside>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-shell-gap);
    min-height: 0;
    padding: var(--space-shell-padding);
    border-right: 1px solid var(--line);
    background: var(--panel);
  }

  .storage-card-slot {
    margin-top: auto;
  }
</style>
