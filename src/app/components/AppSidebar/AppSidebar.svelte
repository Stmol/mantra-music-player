<script lang="ts">
  import {
    Archive,
    Bookmark,
    ChevronDown,
    ChevronRight,
    Clock3,
    Folder,
    FolderCog,
    Search,
    Shuffle,
    Tags,
    Trash2,
  } from "lucide-svelte";
  import type { LibraryItem } from "../../data/types";

  interface Properties {
    quickItems: LibraryItem[];
    smartItems: LibraryItem[];
    folderItems: LibraryItem[];
  }

  const iconSize = 18;
  const iconStroke = 1.25;

  let { quickItems, smartItems, folderItems }: Properties = $props();
</script>

<aside class="app-sidebar" aria-label="Library navigation">
  <div class="library-title">
    <div class="app-mark" aria-hidden="true">
      <span></span>
    </div>
    <span>Mantra</span>
    <ChevronDown size={16} strokeWidth={iconStroke} aria-hidden="true" />
  </div>

  <nav class="nav-group" aria-label="Primary folders">
    {#each quickItems as item}
      <a
        class:active={item.active}
        class="nav-row"
        href="/"
        aria-current={item.active ? "page" : undefined}
      >
        {#if item.icon === "all"}
          <Archive
            size={iconSize}
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
        {:else if item.icon === "folder"}
          <Folder size={iconSize} strokeWidth={iconStroke} aria-hidden="true" />
        {:else if item.icon === "tag"}
          <Tags size={iconSize} strokeWidth={iconStroke} aria-hidden="true" />
        {:else if item.icon === "clock"}
          <Clock3 size={iconSize} strokeWidth={iconStroke} aria-hidden="true" />
        {:else if item.icon === "shuffle"}
          <Shuffle
            size={iconSize}
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
        {:else if item.icon === "bookmark"}
          <Bookmark
            size={iconSize}
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
        {:else}
          <Trash2 size={iconSize} strokeWidth={iconStroke} aria-hidden="true" />
        {/if}
        <span class="nav-label">{item.label}</span>
        {#if item.count}
          <span class="nav-count">{item.count}</span>
        {/if}
      </a>
    {/each}
  </nav>

  {#if smartItems.length > 0}
    <div class="section-label">Smart Folders</div>
    <nav class="nav-group" aria-label="Smart folders">
      {#each smartItems as item}
        <a class="nav-row" href="/">
          <FolderCog
            size={iconSize}
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
          <span class="nav-label">{item.label}</span>
          <span class="nav-count">{item.count}</span>
        </a>
      {/each}
    </nav>
  {/if}

  {#if folderItems.length > 0}
    <div class="section-label">Folders</div>
    <nav class="nav-group folder-tree" aria-label="Collection folders">
      {#each folderItems as item}
        <a
          class:active={item.active}
          class:open={item.open}
          class="nav-row depth-{item.depth ?? 0}"
          href="/"
          aria-current={item.active ? "page" : undefined}
        >
          <span class="tree-caret" aria-hidden="true">
            {#if item.open}
              <ChevronDown size={13} strokeWidth={iconStroke} />
            {:else if item.depth === 0}
              <ChevronRight size={13} strokeWidth={iconStroke} />
            {/if}
          </span>
          <Folder
            class="nav-icon {item.accent ?? ''}"
            size={iconSize}
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
          <span class="nav-label">{item.label}</span>
          {#if item.count}
            <span class="nav-count">{item.count}</span>
          {/if}
        </a>
      {/each}
    </nav>
  {/if}

  <label class="ui-text-field sidebar-filter">
    <Search size={16} strokeWidth={iconStroke} aria-hidden="true" />
    <input aria-label="Filter library" placeholder="Filter" />
  </label>
</aside>
