<script lang="ts">
  import type { TabsProps as TabsProperties, TabsValue } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    activeValue = $bindable<TabsValue | undefined>(),
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

<nav {...rest} aria-label={rest["aria-label"] ?? "Tabs"}>
  <div role="tablist">
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
    <div>
      {@render trailing()}
    </div>
  {/if}
</nav>
