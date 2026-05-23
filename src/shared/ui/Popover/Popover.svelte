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
    surfaceSize = "default",
    trigger,
    triggerMode = "button",
    ...rest
  }: PopoverProperties = $props();

  $effect(() => {
    void [_className, _placement];
  });

  const toggle = () => {
    open = !open;
  };
  const renderState = $derived<PopoverRenderState>({ open, toggle });
  const popoverClass = $derived(
    ["popover", `popover--${_placement}`, _className].filter(Boolean).join(" "),
  );
  const surfaceClass = $derived(
    [
      "popover-surface",
      surfaceSize !== "default" && `popover-surface--${surfaceSize}`,
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

<div {...rest} class={popoverClass}>
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
    <div class={surfaceClass} role="dialog">
      {@render children(renderState)}
    </div>
  {/if}
</div>
