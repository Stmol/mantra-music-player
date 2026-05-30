<script lang="ts">
  import { IconButton } from "../../shared/IconButton";
  import { Section } from "../../shared/Section";
  import StackedLinkListItemRow from "./StackedLinkListItem/StackedLinkListItem.svelte";
  import type { StackedLinkListProps as StackedLinkListProperties } from "./types";

  let {
    headerActionAriaLabel,
    items,
    onHeaderAction,
    onItemSelect,
    title,
  }: StackedLinkListProperties = $props();
</script>

<Section {title}>
  {#snippet headerActions()}
    {#if onHeaderAction && headerActionAriaLabel}
      <IconButton
        aria-label={headerActionAriaLabel}
        onclick={onHeaderAction}
        size="sm"
        type="button"
        variant="control"
      />
    {/if}
  {/snippet}

  <div class="stacked-link-list">
    {#each items as item}
      <StackedLinkListItemRow {item} onSelect={onItemSelect} />
    {/each}
  </div>
</Section>

<style>
  .stacked-link-list {
    display: grid;
    gap: var(--space-2);
  }
</style>
