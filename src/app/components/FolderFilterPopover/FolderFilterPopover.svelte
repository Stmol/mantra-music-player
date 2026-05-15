<script lang="ts">
  import { Copy, Menu, Search } from "lucide-svelte";

  const iconStroke = 1.25;
  const folders = [
    ["Environments", 2],
    ["Mantra Forge", 3],
    ["Defect Gen", 36],
    ["2025-03-27_15-32-10_basic_skeleton", 1],
    ["Random", 1],
    ["Vibe Ride", 1],
  ] as const;
</script>

<div class="popover folder-popover" aria-label="Folder filter">
  <div class="popover-head">
    <label class="ui-text-field">
      <Search size={18} strokeWidth={iconStroke} aria-hidden="true" />
      <input aria-label="Search folders" placeholder="Search..." />
    </label>
    <span>Rule:</span>
    <button class="ui-icon-button selected" aria-label="Include any">
      <Copy size={18} strokeWidth={iconStroke} aria-hidden="true" />
    </button>
    <button class="ui-icon-button" aria-label="Include all">
      <Copy size={18} strokeWidth={iconStroke} aria-hidden="true" />
    </button>
    <button class="ui-icon-button" aria-label="More rules">
      <Menu size={18} strokeWidth={iconStroke} aria-hidden="true" />
    </button>
  </div>
  <div class="check-list">
    {#each folders as [folder, count]}
      <label>
        <input type="checkbox" />
        <span>{folder}</span>
        <em>{count}</em>
      </label>
    {/each}
  </div>
  <footer>
    <span>Select <kbd>L-Click</kbd></span>
    <span>Exclude <kbd>R-Click</kbd></span>
  </footer>
</div>
