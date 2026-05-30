<script lang="ts">
  import type { EyebrowProps as EyebrowProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let { as = "p", children, ...rest }: EyebrowProperties = $props();
</script>

{#if as === "span"}
  <span {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </span>
{:else if as === "div"}
  <div {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </div>
{:else}
  <p {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </p>
{/if}

<style>
  p,
  span,
  div {
    margin: 0;
    color: var(--type-micro-label-color);
    font-family: var(--font-family-mono);
    font-size: var(--type-micro-label-size);
    line-height: var(--type-micro-label-line-height);
    font-weight: var(--type-micro-label-weight);
    letter-spacing: var(--type-micro-label-tracking);
    text-transform: uppercase;
  }
</style>
