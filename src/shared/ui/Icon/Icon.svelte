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
  <Bookmark aria-hidden="true" />
{:else if name === "copy"}
  <Copy aria-hidden="true" />
{:else if name === "filter"}
  <Funnel aria-hidden="true" />
{:else if name === "grid"}
  <Grid2X2 aria-hidden="true" />
{:else if name === "search"}
  <Search aria-hidden="true" />
{:else if name === "sort-asc"}
  <SortAsc aria-hidden="true" />
{:else if name === "sort-desc"}
  <SortDesc aria-hidden="true" />
{/if}
