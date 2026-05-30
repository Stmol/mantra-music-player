<script lang="ts">
  import type { ProgressMeterProps as ProgressMeterProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    accent = "mint",
    ariaLabel,
    max = 100,
    value,
    ...rest
  }: ProgressMeterProperties = $props();

  const safeMax = $derived(max <= 0 ? 100 : max);
  const normalizedValue = $derived(Math.min(Math.max(value, 0), safeMax));
  const percentage = $derived((normalizedValue / safeMax) * 100);
</script>

<div
  {...rest}
  aria-hidden={ariaLabel ? undefined : "true"}
  aria-label={ariaLabel}
  class="meter"
>
  <span data-accent={accent} style={`width: ${percentage}%`}></span>
</div>

<style>
  .meter {
    height: 6px;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: 99px;
    background: var(--panel-muted);
  }

  span {
    display: block;
    height: 100%;
  }

  span[data-accent="mint"] {
    background: var(--accent-mint);
  }

  span[data-accent="blue"] {
    background: var(--accent-blue);
  }

  span[data-accent="amber"] {
    background: var(--accent-amber);
  }

  span[data-accent="neutral"] {
    background: var(--text-muted);
  }

  span[data-accent="danger"] {
    background: var(--accent-danger);
  }
</style>
