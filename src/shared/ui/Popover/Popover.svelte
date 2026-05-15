<script lang="ts">
  import type {
    PopoverProps as PopoverProperties,
    PopoverRenderState,
  } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    class: className = "",
    open = $bindable(false),
    placement = "bottom",
    trigger,
    ...rest
  }: PopoverProperties = $props();

  const renderState = $derived<PopoverRenderState>({ open });
  const toggle = () => {
    open = !open;
  };
</script>

<div
  {...rest}
  class={`ui-popover ui-popover--${placement} ${className}`.trim()}
  data-state={open ? "open" : "closed"}
>
  {#if trigger}
    <button
      aria-expanded={open}
      class="ui-popover__trigger"
      onclick={toggle}
      type="button"
    >
      {@render trigger(renderState)}
    </button>
  {/if}

  {#if open && children}
    <div class="ui-popover__content" role="dialog">
      {@render children(renderState)}
    </div>
  {/if}
</div>
