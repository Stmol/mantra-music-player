<script lang="ts">
  import type { TabsProps as TabsProperties, TabsValue } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    activeValue = $bindable<TabsValue | undefined>(),
    appearance = "segmented",
    items,
    onValueChange,
    panelId,
    tabIdPrefix = "tabs",
    trailing,
    ...rest
  }: TabsProperties = $props();

  $effect(() => {
    if (activeValue === undefined) {
      activeValue = items.find((item) => !item.disabled)?.value;
    }
  });

  const selectTab = (value: TabsValue) => {
    activeValue = value;
    onValueChange?.(value);
  };
</script>

<nav
  {...rest}
  aria-label={rest["aria-label"] ?? "Tabs"}
  data-appearance={appearance}
>
  <div class="tablist" role="tablist">
    {#each items as item}
      {@const selected = item.value === activeValue}
      <button
        aria-controls={panelId}
        aria-selected={selected}
        disabled={item.disabled}
        id={`${tabIdPrefix}-${item.value}`}
        onclick={() => selectTab(item.value)}
        role="tab"
        tabindex={selected ? 0 : -1}
        type="button"
      >
        {item.label}
      </button>
    {/each}
  </div>

  {#if trailing}
    <div class="trailing">
      {@render trailing()}
    </div>
  {/if}
</nav>

<style>
  nav {
    display: inline-flex;
    align-items: center;
    gap: var(--space-control-gap);
  }

  .tablist {
    display: inline-grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
  }

  nav[data-appearance="segmented"] .tablist {
    gap: var(--space-2);
    padding: var(--space-3);
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    background: var(--panel-muted);
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 74px;
    height: 30px;
    border: 0;
    padding: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--type-control-color);
    font-size: var(--type-control-size);
    line-height: var(--type-control-line-height);
    font-weight: var(--type-control-weight);
    cursor: pointer;
  }

  button[aria-selected="true"] {
    background: var(--panel);
    color: var(--type-control-color-strong);
    box-shadow: inset 0 0 0 1px var(--line);
  }
</style>
