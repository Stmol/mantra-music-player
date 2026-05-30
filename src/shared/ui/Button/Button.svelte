<script lang="ts">
  import type { ButtonProps as ButtonProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    block = false,
    children,
    disabled = false,
    ghost = false,
    hoverVariant,
    leading,
    loading = false,
    pressed,
    rounded = false,
    size = "md",
    trailing,
    type = "button",
    variant = "secondary",
    ...rest
  }: ButtonProperties = $props();

  const resolvedVariant = $derived(
    variant === "danger"
      ? "negative"
      : variant === "ghost"
        ? "ghost-action"
        : variant === "secondary"
          ? "grey"
          : variant,
  );
  const isGhost = $derived(ghost);

  $effect(() => {
    void [block, hoverVariant, isGhost, resolvedVariant, rounded, size];
  });
</script>

<button
  {...rest}
  aria-busy={loading || undefined}
  aria-pressed={pressed}
  data-block={block ? "true" : "false"}
  data-ghost={isGhost ? "true" : "false"}
  data-loading={loading ? "true" : "false"}
  data-rounded={rounded ? "true" : "false"}
  data-size={size}
  data-variant={resolvedVariant}
  disabled={disabled || loading}
  {type}
>
  {#if leading}
    <span class="leading" aria-hidden="true">
      {@render leading()}
    </span>
  {/if}

  {#if children}
    <span class="content">
      {@render children()}
    </span>
  {/if}

  {#if trailing}
    <span class="trailing" aria-hidden="true">
      {@render trailing()}
    </span>
  {/if}
</button>

<style>
  button {
    display: inline-flex;
    gap: var(--space-control-gap);
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition:
      background-color 140ms ease,
      color 140ms ease,
      border-color 140ms ease,
      box-shadow 140ms ease,
      transform 140ms ease,
      opacity 140ms ease;
  }

  button[data-block="true"] {
    width: 100%;
  }

  button[data-rounded="true"] {
    border-radius: 999px;
  }

  button[data-size="xs"] {
    min-height: 24px;
    padding: 0 var(--space-control-padding-inline-tight);
    font-size: var(--type-data-size);
    line-height: var(--type-data-line-height);
    font-weight: var(--type-data-weight);
  }

  button[data-size="sm"] {
    min-height: 31px;
    padding: 0 var(--space-control-padding-inline-compact);
    font-size: var(--type-control-size);
    line-height: var(--type-control-line-height);
    font-weight: var(--type-control-weight);
  }

  button[data-size="md"],
  button[data-size="lg"],
  button[data-size="xl"] {
    height: 38px;
    padding: 0 var(--space-control-padding-inline);
    font-size: var(--type-control-size);
    line-height: var(--type-control-line-height);
    font-weight: var(--type-control-weight);
  }

  button[data-variant="grey"] {
    border-color: var(--line);
    background: var(--panel);
    color: var(--type-control-color);
  }

  button[data-variant="primary"] {
    background: var(--text);
    color: var(--type-control-color-inverse);
  }

  button[data-variant="grey"]:hover {
    background: var(--panel-muted);
    color: var(--type-control-color-strong);
    border-color: var(--line-strong);
    box-shadow: 0 1px 0 rgb(0 0 0 / 0.04);
  }

  button[data-variant="primary"]:hover {
    background: color-mix(in srgb, var(--text) 88%, white);
    color: var(--type-control-color-inverse);
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
  }

  button:disabled {
    cursor: default;
    opacity: 0.6;
  }

  .content,
  .leading,
  .trailing {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    gap: var(--space-control-gap);
  }
</style>
