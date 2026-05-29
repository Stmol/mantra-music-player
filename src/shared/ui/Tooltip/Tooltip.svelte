<script lang="ts" module>
  let tooltipIdCounter = 0;
  const DEFAULT_TOOLTIP_DELAY_MS = 250;
  const DEFAULT_TOOLTIP_OFFSET = 8;
  const TOOLTIP_HIDE_DELAY_MS = 200;
</script>

<script lang="ts">
  import { tick } from "svelte";
  import type {
    TooltipPlacement,
    TooltipProps as TooltipProperties,
  } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    content,
    delay = DEFAULT_TOOLTIP_DELAY_MS,
    disabled = false,
    id,
    label,
    offset = DEFAULT_TOOLTIP_OFFSET,
    placement: _placement = "top",
    ...rest
  }: TooltipProperties = $props();

  let triggerElement: globalThis.HTMLSpanElement | undefined = $state();
  let tooltipElement: globalThis.HTMLSpanElement | undefined = $state();
  let mounted = $state(false);
  let visible = $state(false);
  let rootLeft = $state(0);
  let rootTop = $state(0);
  let showTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
  let hideTimer: ReturnType<typeof globalThis.setTimeout> | undefined;

  const generatedTooltipId = `mantra-tooltip-${++tooltipIdCounter}`;
  const tooltipId = $derived(id ?? generatedTooltipId);
  const tooltipState = $derived(visible ? "visible" : "hidden");
  const rootStyle = $derived(
    [
      "position: fixed",
      `left: ${rootLeft}px`,
      `top: ${rootTop}px`,
      "pointer-events: none",
    ].join("; "),
  );
  const boxStyle = [
    "transition: opacity var(--mantra-duration-base) var(--timing-function-super), transform var(--mantra-duration-base) var(--timing-function-super)",
  ].join("; ");

  const getCoordinates = (
    triggerRect: globalThis.DOMRect,
    tooltipRect: globalThis.DOMRect,
    placement: TooltipPlacement,
  ) => {
    const centerX = triggerRect.left + triggerRect.width / 2;
    const centerY = triggerRect.top + triggerRect.height / 2;

    if (placement === "bottom") {
      return {
        left: centerX - tooltipRect.width / 2,
        top: triggerRect.bottom + offset,
      };
    }

    if (placement === "left") {
      return {
        left: triggerRect.left - tooltipRect.width - offset,
        top: centerY - tooltipRect.height / 2,
      };
    }

    if (placement === "right") {
      return {
        left: triggerRect.right + offset,
        top: centerY - tooltipRect.height / 2,
      };
    }

    return {
      left: centerX - tooltipRect.width / 2,
      top: triggerRect.top - tooltipRect.height - offset,
    };
  };

  const updatePosition = async () => {
    await tick();

    if (!triggerElement || !tooltipElement) {
      return;
    }

    const triggerRect = triggerElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const coordinates = getCoordinates(triggerRect, tooltipRect, _placement);

    rootLeft = Math.round(coordinates.left);
    rootTop = Math.round(coordinates.top);
  };

  const clearTimers = () => {
    if (showTimer) {
      globalThis.clearTimeout(showTimer);
      showTimer = undefined;
    }

    if (hideTimer) {
      globalThis.clearTimeout(hideTimer);
      hideTimer = undefined;
    }
  };

  const show = () => {
    if (disabled || (!label && !content)) {
      return;
    }

    clearTimers();
    showTimer = globalThis.setTimeout(() => {
      mounted = true;
      void updatePosition().then(() => {
        visible = true;
      });
    }, delay);
  };

  const hide = () => {
    clearTimers();
    visible = false;
    hideTimer = globalThis.setTimeout(() => {
      mounted = false;
    }, TOOLTIP_HIDE_DELAY_MS);
  };

  const handleViewportChange = () => {
    void updatePosition();
  };

  const handleMouseOut = (event: globalThis.MouseEvent) => {
    if (
      event.relatedTarget instanceof globalThis.Node &&
      triggerElement?.contains(event.relatedTarget)
    ) {
      return;
    }

    hide();
  };

  $effect(() => {
    void _placement;

    if (!mounted) {
      return;
    }

    globalThis.addEventListener("resize", handleViewportChange);
    globalThis.addEventListener("scroll", handleViewportChange, true);

    return () => {
      globalThis.removeEventListener("resize", handleViewportChange);
      globalThis.removeEventListener("scroll", handleViewportChange, true);
    };
  });
</script>

<span
  {...rest}
  aria-describedby={mounted ? tooltipId : undefined}
  bind:this={triggerElement}
  onfocusin={show}
  onfocusout={hide}
  onmouseenter={show}
  onmouseleave={hide}
  onmouseout={handleMouseOut}
  onmouseover={show}
  onpointerenter={show}
  onpointerleave={hide}
>
  {@render children()}
</span>

{#if mounted}
  <span data-tippy-root style={rootStyle}>
    <span
      bind:this={tooltipElement}
      data-animation="scale"
      data-placement={_placement}
      data-state={tooltipState}
      id={tooltipId}
      role="tooltip"
      style={boxStyle}
    >
      <span>
        {#if content}
          {@render content()}
        {:else}
          {label}
        {/if}
      </span>
    </span>
  </span>
{/if}
