<script lang="ts">
  import { Icon } from "../Icon";
  import type {
    IconTabsProps as IconTabsProperties,
    IconTabsValue,
  } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    activeValue = $bindable<IconTabsValue | undefined>(),
    items,
    onValueChange,
    tabIdPrefix = "icon-tabs",
    ...rest
  }: IconTabsProperties = $props();

  $effect(() => {
    if (activeValue === undefined) {
      activeValue = items.find((item) => !item.disabled)?.value;
    }
  });

  const selectTab = (value: IconTabsValue) => {
    activeValue = value;
    onValueChange?.(value);
  };
</script>

<nav {...rest} aria-label={rest["aria-label"] ?? "Icon tabs"} role="tablist">
  {#each items as item}
    {@const selected = item.value === activeValue}
    <button
      aria-label={item.label}
      aria-selected={selected}
      disabled={item.disabled}
      id={`${tabIdPrefix}-${item.value}`}
      onclick={() => selectTab(item.value)}
      role="tab"
      tabindex={selected ? 0 : -1}
      title={item.label}
      type="button"
    >
      <Icon name={item.icon} />
    </button>
  {/each}
</nav>
