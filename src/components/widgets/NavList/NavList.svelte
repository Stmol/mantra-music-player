<script lang="ts">
  import NavListItemRow from "./NavListItem/NavListItem.svelte";
  import type { NavListProps as NavListProperties } from "./types";

  let { activeValue, ariaLabel, items, onSelect }: NavListProperties = $props();
</script>

<nav aria-label={ariaLabel} class="nav-list">
  {#each items as item}
    <NavListItemRow active={item.value === activeValue} {item} {onSelect} />
  {/each}
</nav>

<style>
  .nav-list {
    display: grid;
    gap: var(--space-stack-xs);
  }
</style>
