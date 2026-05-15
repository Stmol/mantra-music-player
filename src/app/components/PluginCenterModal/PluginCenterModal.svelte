<script lang="ts">
  import { Search, X } from "lucide-svelte";
  import type { Plugin } from "../../data/types";

  interface Properties {
    plugins: Plugin[];
  }

  const iconStroke = 1.25;
  const categories = [
    "All",
    "Productivity",
    "Converter",
    "Image",
    "Video",
    "Downloader",
    "Format",
    "Inspector",
    "Others",
    "Updates",
  ] as const;

  let { plugins }: Properties = $props();
</script>

<section class="modal plugin-center" aria-label="Plugin Center">
  <header>
    <h2>Plugin Center</h2>
    <button
      class="ui-icon-button close-button"
      aria-label="Close plugin center"
    >
      <X size={22} strokeWidth={iconStroke} aria-hidden="true" />
    </button>
  </header>
  <div class="modal-body">
    <aside class="modal-sidebar">
      <label class="ui-text-field">
        <Search size={18} strokeWidth={iconStroke} aria-hidden="true" />
        <input aria-label="Search plugins" placeholder="Search plugins..." />
      </label>
      {#each categories as category, index}
        <a class:active={index === 0} href="/">{category}</a>
      {/each}
    </aside>
    <div class="plugin-list">
      {#each plugins as plugin}
        <article class="plugin-row">
          <span class="plugin-icon" style:--plugin-color={plugin.swatch}></span>
          <div>
            <h3>{plugin.name}</h3>
            <p>{plugin.description}</p>
          </div>
          <span class="users">{plugin.users}</span>
          <button
            class:installed={plugin.status === "Installed"}
            class="ui-button primary"
          >
            {plugin.status}
          </button>
        </article>
      {/each}
    </div>
  </div>
</section>
