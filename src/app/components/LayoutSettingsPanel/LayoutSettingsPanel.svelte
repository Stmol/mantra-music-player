<script lang="ts">
  import { ChevronDown, Grid2X2 } from "lucide-svelte";

  const iconStroke = 1.25;
  const options = [
    "Show Name",
    "Show item info",
    "Show extension",
    "Show annotation",
    "Show subfolder contents",
    "Show sidebar",
    "Show inspector",
  ] as const;
</script>

<div class="floating-panel layout-panel" aria-label="Layout settings">
  <div class="panel-row">
    <span>Layout</span>
    <button class="select-button">
      <Grid2X2 size={16} strokeWidth={iconStroke} aria-hidden="true" />
      Justified
      <ChevronDown size={14} strokeWidth={iconStroke} aria-hidden="true" />
    </button>
  </div>
  <div class="panel-row">
    <span>Sort by</span>
    <button class="select-button">
      Date Added
      <ChevronDown size={14} strokeWidth={iconStroke} aria-hidden="true" />
    </button>
  </div>
  {#each options as option}
    <label class="panel-toggle">
      <span>{option}</span>
      <input checked type="checkbox" />
      <span></span>
    </label>
  {/each}
  <button class="ui-button secondary wide-button compact">Refresh</button>
</div>
