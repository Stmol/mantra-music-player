<script lang="ts">
  import { IconButton } from "../IconButton";
  import type { ChipProps as ChipProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    class: _className,
    create = false,
    fullWidth = false,
    removable = false,
    type = "button",
    ...rest
  }: ChipProperties = $props();

  const chipClass = $derived(
    [
      "chip",
      "fontSize-xs",
      "fontWeight-regular",
      "lineHieght-extraTight",
      create ? "create-label-btn" : "label-item",
      fullWidth && "create-label-btn--full-width",
      _className,
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

{#if create && !children}
  <IconButton
    {...rest}
    class={chipClass}
    icon="plus"
    {type}
    variant="chip-add"
  />
{:else}
  <button {...rest} class={chipClass} {type}>
    {#if create}
      <IconButton
        as="span"
        class="create-label-btn__icon"
        icon="plus"
        variant="chip-add"
      />
    {/if}

    {#if children}
      <span class="label-item-name">
        {@render children()}
      </span>
    {/if}

    {#if !create && removable}
      <IconButton
        as="span"
        class="label-item-remove-btn"
        icon="close"
        variant="chip-remove"
      />
    {/if}
  </button>
{/if}
