<script lang="ts">
  import type { StackedLinkListItem } from "../types";

  interface StackedLinkListItemProperties {
    item: StackedLinkListItem;
    onSelect: ((value: string) => void) | undefined;
  }

  let { item, onSelect }: StackedLinkListItemProperties = $props();
</script>

{#if onSelect}
  <button onclick={() => onSelect(item.value)} type="button">
    <span>{item.label}</span>
    {#if item.meta !== undefined}
      <span>{item.meta}</span>
    {/if}
  </button>
{:else}
  <div>
    <span>{item.label}</span>
    {#if item.meta !== undefined}
      <span>{item.meta}</span>
    {/if}
  </div>
{/if}

<style>
  button,
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 29px;
    padding: 0 var(--space-control-padding-inline-compact);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--type-control-color);
    font-size: var(--type-control-size);
    line-height: var(--type-control-line-height);
    font-weight: var(--type-control-weight);
  }

  button {
    width: 100%;
    border: 0;
    cursor: pointer;
  }

  button:hover {
    background: var(--panel-muted);
    color: var(--type-control-color-strong);
  }

  span:last-child {
    color: var(--type-data-color);
    font-family: var(--font-family-mono);
    font-size: var(--type-data-size);
    line-height: var(--type-data-line-height);
    font-weight: var(--type-data-weight);
    font-variant-numeric: tabular-nums;
  }
</style>
