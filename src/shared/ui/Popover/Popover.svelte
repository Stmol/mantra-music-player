<script lang="ts">
  import type {
    PopoverProps as PopoverProperties,
    PopoverRenderState,
  } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    class: _className,
    open = $bindable(false),
    placement: _placement = "bottom",
    style: _style,
    trigger,
    triggerMode = "button",
    ...rest
  }: PopoverProperties = $props();

  $effect(() => {
    void [_className, _placement, _style];
  });

  const toggle = () => {
    open = !open;
  };
  const renderState = $derived<PopoverRenderState>({ open, toggle });
  const popoverClass = $derived(
    ["popover", `popover--${_placement}`, _className].filter(Boolean).join(" "),
  );
</script>

<div {...rest} class={popoverClass} style={_style}>
  {#if trigger}
    {#if triggerMode === "custom"}
      {@render trigger(renderState)}
    {:else}
      <button
        aria-expanded={open}
        class="popover__trigger"
        onclick={toggle}
        type="button"
      >
        {@render trigger(renderState)}
      </button>
    {/if}
  {/if}

  {#if open && children}
    <div class="popover-surface" role="dialog">
      {@render children(renderState)}
    </div>
  {/if}
</div>
