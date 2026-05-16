<script lang="ts">
  import {
    Bookmark,
    Copy,
    Funnel,
    Grid2X2,
    Search,
    SortAsc,
    SortDesc,
  } from "lucide-svelte";
  import type { IconProps as IconProperties } from "./types";

  let { name }: IconProperties = $props();
</script>

{#if name === "bookmark"}
  <Bookmark
    aria-hidden="true"
    class="mantra-icon"
    size={20}
    strokeWidth={1.2}
  />
{:else if name === "copy"}
  <Copy aria-hidden="true" class="mantra-icon" size={20} strokeWidth={1.2} />
{:else if name === "filter"}
  <Funnel aria-hidden="true" class="mantra-icon" size={20} strokeWidth={1.2} />
{:else if name === "grid"}
  <Grid2X2 aria-hidden="true" class="mantra-icon" size={20} strokeWidth={1.2} />
{:else if name === "search"}
  <Search aria-hidden="true" class="mantra-icon" size={20} strokeWidth={1.2} />
{:else if name === "sort-asc"}
  <SortAsc aria-hidden="true" class="mantra-icon" size={20} strokeWidth={1.2} />
{:else if name === "sort-desc"}
  <SortDesc
    aria-hidden="true"
    class="mantra-icon"
    size={20}
    strokeWidth={1.2}
  />
{/if}
