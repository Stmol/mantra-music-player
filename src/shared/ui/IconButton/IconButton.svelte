<script lang="ts">
  import { Copy, Plus, X } from "lucide-svelte";
  import type { IconButtonProps as IconButtonProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    as = "button",
    children,
    icon,
    label,
    size = "md",
    type = "button",
    variant = "default",
    ...rest
  }: IconButtonProperties = $props();

  $effect(() => {
    void [size, variant];
  });

  const iconPixelSize = $derived(size === "sm" ? 14 : 15);
</script>

{#if as === "span"}
  <span
    aria-hidden={label ? undefined : "true"}
    aria-label={label ?? rest["aria-label"]}
    data-size={size}
    data-variant={variant}
  >
    {#if children}
      {@render children()}
    {:else if icon === "close"}
      <X aria-hidden="true" size={iconPixelSize} />
    {:else if icon === "copy"}
      <Copy aria-hidden="true" size={iconPixelSize} />
    {:else}
      <Plus aria-hidden="true" size={iconPixelSize} />
    {/if}
  </span>
{:else}
  <button
    {...rest}
    aria-label={label ?? rest["aria-label"]}
    data-size={size}
    data-variant={variant}
    {type}
  >
    {#if children}
      {@render children()}
    {:else if icon === "close"}
      <X aria-hidden="true" size={iconPixelSize} />
    {:else if icon === "copy"}
      <Copy aria-hidden="true" size={iconPixelSize} />
    {:else}
      <Plus aria-hidden="true" size={iconPixelSize} />
    {/if}
  </button>
{/if}

<style>
  button,
  span {
    display: inline-grid;
    place-items: center;
  }

  button {
    border: 0;
    padding: 0;
    cursor: pointer;
    transition:
      background-color 140ms ease,
      color 140ms ease,
      border-color 140ms ease,
      box-shadow 140ms ease,
      transform 140ms ease,
      opacity 140ms ease;
  }

  button[data-size="sm"],
  span[data-size="sm"] {
    width: 24px;
    height: 24px;
  }

  button[data-size="md"],
  span[data-size="md"] {
    width: 31px;
    height: 31px;
  }

  button[data-size="sm"] :global(svg),
  span[data-size="sm"] :global(svg) {
    width: 14px;
    height: 14px;
  }

  button[data-size="md"] :global(svg),
  span[data-size="md"] :global(svg) {
    width: 15px;
    height: 15px;
  }

  button[data-variant="control"],
  button[data-variant="control-primary"] {
    border: 1px solid var(--line);
    border-radius: var(--radius-sm);
    background: var(--panel-muted);
    color: var(--type-control-color);
  }

  button[data-variant="control"]:hover {
    background: var(--panel);
    color: var(--type-control-color-strong);
    border-color: var(--line);
  }

  button[data-variant="control-primary"] {
    background: var(--text);
    color: var(--inverse);
  }

  button[data-variant="control-primary"]:hover {
    background: color-mix(in srgb, var(--text) 88%, white);
    color: var(--type-control-color-inverse);
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
  }

  button[data-variant="chip-add"],
  button[data-variant="chip-remove"],
  span[data-variant="chip-add"],
  span[data-variant="chip-remove"] {
    width: auto;
    height: auto;
    color: inherit;
  }

  :global(svg) {
    display: block;
  }
</style>
