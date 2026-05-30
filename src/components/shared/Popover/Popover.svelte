<script lang="ts">
  import type {
    PopoverProps as PopoverProperties,
    PopoverRenderState,
  } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    open = $bindable(false),
    placement: _placement = "bottom",
    surfaceSize = "default",
    trigger,
    triggerMode = "button",
    ...rest
  }: PopoverProperties = $props();

  $effect(() => {
    void _placement;
  });

  const toggle = () => {
    open = !open;
  };
  const renderState = $derived<PopoverRenderState>({ open, toggle });

  $effect(() => {
    void surfaceSize;
  });
</script>

<div {...rest}>
  {#if trigger}
    {#if triggerMode === "custom"}
      {@render trigger(renderState)}
    {:else}
      <button aria-expanded={open} onclick={toggle} type="button">
        {@render trigger(renderState)}
      </button>
    {/if}
  {/if}

  {#if open && children}
    <div role="dialog">
      {@render children(renderState)}
    </div>
  {/if}
</div>
