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
  <button {...rest} data-full-width={fullWidth ? "true" : "false"} {type}>
    {#if create}
      <IconButton as="span" icon="plus" variant="chip-add" />
    {/if}

    {#if children}
      <span class="content">
        {@render children()}
      </span>
    {/if}

    {#if !create && removable}
      <IconButton as="span" icon="close" variant="chip-remove" />
    {/if}
  </button>
{/if}

<style>
  button {
    display: inline-flex;
    gap: var(--space-stack-xs);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    min-height: 25px;
    padding: 0 var(--space-control-padding-inline-compact);
    border: 1px solid var(--line);
    border-radius: 99px;
    background: transparent;
    color: var(--type-data-color-strong);
    font-family: var(--font-family-mono);
    font-size: var(--type-data-size);
    line-height: 1;
    font-weight: var(--type-data-weight);
    font-variant-numeric: tabular-nums;
    transition:
      background-color 140ms ease,
      color 140ms ease,
      border-color 140ms ease,
      box-shadow 140ms ease;
  }

  button[data-full-width="true"] {
    width: 100%;
  }

  button:hover {
    background: var(--panel-muted);
    color: var(--type-control-color-strong);
    border-color: var(--line-strong);
    box-shadow: 0 1px 0 rgb(0 0 0 / 0.04);
  }

  .content {
    display: inline-flex;
    gap: var(--space-stack-xs);
    align-items: center;
    justify-content: center;
  }
</style>
