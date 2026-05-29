<script lang="ts">
  import { IconButton } from "../IconButton";
  import type { ChipProps as ChipProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    create = false,
    fullWidth = false,
    removable = false,
    type = "button",
    ...rest
  }: ChipProperties = $props();

  $effect(() => {
    void fullWidth;
  });
</script>

{#if create && !children}
  <IconButton {...rest} icon="plus" {type} variant="chip-add" />
{:else}
  <button {...rest} {type}>
    {#if create}
      <IconButton as="span" icon="plus" variant="chip-add" />
    {/if}

    {#if children}
      <span>
        {@render children()}
      </span>
    {/if}

    {#if !create && removable}
      <IconButton as="span" icon="close" variant="chip-remove" />
    {/if}
  </button>
{/if}
