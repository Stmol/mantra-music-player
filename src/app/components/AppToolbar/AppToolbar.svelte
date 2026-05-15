<script lang="ts">
  import {
    ChevronLeft,
    ChevronRight,
    Grid2X2,
    Plug,
    RefreshCw,
    Search,
    SlidersHorizontal,
  } from "lucide-svelte";

  interface Properties {
    filterTabs: readonly string[];
  }

  const iconStroke = 1.25;
  let { filterTabs }: Properties = $props();
</script>

<header class="app-toolbar">
  <div class="toolbar-row">
    <div class="toolbar-left">
      <button class="ui-icon-button" aria-label="Back">
        <ChevronLeft size={18} strokeWidth={iconStroke} aria-hidden="true" />
      </button>
      <button class="ui-icon-button muted" aria-label="Forward">
        <ChevronRight size={18} strokeWidth={iconStroke} aria-hidden="true" />
      </button>
      <div class="toolbar-title">Uncategorized</div>
    </div>

    <div class="zoom-control" aria-label="Thumbnail zoom">
      <button class="ui-plain-button" aria-label="Decrease zoom">-</button>
      <span class="zoom-track"><span></span></span>
      <button class="ui-plain-button" aria-label="Increase zoom">+</button>
    </div>

    <div class="toolbar-actions">
      <button class="ui-icon-button selected" aria-label="Refresh">
        <RefreshCw size={17} strokeWidth={iconStroke} aria-hidden="true" />
      </button>
      <button class="ui-icon-button" aria-label="Plugin center">
        <Plug size={17} strokeWidth={iconStroke} aria-hidden="true" />
      </button>
      <button class="ui-icon-button" aria-label="Layout">
        <Grid2X2 size={17} strokeWidth={iconStroke} aria-hidden="true" />
      </button>
      <button class="ui-icon-button" aria-label="Filter">
        <SlidersHorizontal
          size={17}
          strokeWidth={iconStroke}
          aria-hidden="true"
        />
      </button>
      <label class="ui-text-field search-input">
        <Search size={16} strokeWidth={iconStroke} aria-hidden="true" />
        <input aria-label="Search tracks" placeholder="Search" />
      </label>
    </div>
  </div>

  <div class="filter-bar" aria-label="Track filters">
    {#each filterTabs as tab, index}
      <button class:active={index === 1} class="filter-chip">
        <span class="chip-glyph" aria-hidden="true"></span>
        {tab}
      </button>
    {/each}
  </div>
</header>
