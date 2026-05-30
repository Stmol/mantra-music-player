<script lang="ts">
  import type { NavListItem } from "../types";

  interface NavListItemProperties {
    active?: boolean;
    item: NavListItem;
    onSelect: ((value: string) => void) | undefined;
  }

  let { active = false, item, onSelect }: NavListItemProperties = $props();

  const ItemIcon = $derived(item.icon);
</script>

{#if onSelect}
  <button class:active onclick={() => onSelect(item.value)} type="button">
    {#if ItemIcon}
      <span class="item-icon" data-accent={item.accent ?? "neutral"}>
        <ItemIcon size={16} strokeWidth={1.8} />
      </span>
    {/if}
    <span>{item.label}</span>
    {#if item.meta}
      <span class="item-meta">{item.meta}</span>
    {/if}
  </button>
{:else}
  <div class:active>
    {#if ItemIcon}
      <span class="item-icon" data-accent={item.accent ?? "neutral"}>
        <ItemIcon size={16} strokeWidth={1.8} />
      </span>
    {/if}
    <span>{item.label}</span>
    {#if item.meta}
      <span class="item-meta">{item.meta}</span>
    {/if}
  </div>
{/if}

<style>
  button,
  div {
    display: flex;
    gap: var(--space-control-gap);
    align-items: center;
    width: 100%;
    min-height: 38px;
    padding: var(--space-control-padding-inline-tight)
      var(--space-control-padding-inline-compact);
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--type-control-color);
    font-size: var(--type-control-size);
    line-height: var(--type-control-line-height);
    font-weight: var(--type-control-weight);
    text-align: left;
  }

  button {
    border: 0;
    cursor: pointer;
  }

  button:hover,
  button.active,
  div.active {
    background: var(--panel-muted);
    color: var(--type-control-color-strong);
  }

  button.active,
  div.active {
    box-shadow: inset 0 0 0 1px var(--line);
  }

  .item-icon {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border: 1px solid var(--line);
    border-radius: var(--radius-sm);
    background: var(--panel-muted);
  }

  .item-icon[data-accent="mint"] {
    color: var(--accent-mint);
  }

  .item-icon[data-accent="blue"] {
    color: var(--accent-blue);
  }

  .item-icon[data-accent="amber"] {
    color: var(--accent-amber);
  }

  .item-icon[data-accent="neutral"] {
    color: var(--text-muted);
  }

  .item-icon[data-accent="danger"] {
    color: var(--accent-danger);
  }

  .item-meta {
    margin-left: auto;
    color: var(--type-data-color);
    font-family: var(--font-family-mono);
    font-size: var(--type-data-size);
    line-height: var(--type-data-line-height);
    font-weight: var(--type-data-weight);
    font-variant-numeric: tabular-nums;
  }
</style>
