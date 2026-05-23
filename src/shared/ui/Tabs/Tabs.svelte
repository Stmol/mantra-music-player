<script lang="ts">
  import type { TabsProps as TabsProperties, TabsValue } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    activeValue = $bindable<TabsValue | undefined>(),
    class: _className,
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

  const tabsClass = $derived(
    ["tabs", "popover-tabs", _className].filter(Boolean).join(" "),
  );

  const selectTab = (value: TabsValue) => {
    activeValue = value;
    onValueChange?.(value);
  };
</script>

<nav {...rest} aria-label={rest["aria-label"] ?? "Tabs"} class={tabsClass}>
  <div class="popover-tabs__list" role="tablist">
    {#each items as item}
      {@const selected = item.value === activeValue}
      <button
        aria-controls={panelId}
        aria-selected={selected}
        class={["tab", "popover-tabs__tab", "fontSize-xs", selected && "active"]
          .filter(Boolean)
          .join(" ")}
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
    <div class="popover-tabs__trailing">
      {@render trailing()}
    </div>
  {/if}
</nav>
