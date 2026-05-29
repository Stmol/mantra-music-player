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
  disabled={disabled || loading}
  {type}
>
  {#if leading}
    <span aria-hidden="true">
      {@render leading()}
    </span>
  {/if}

  {#if children}
    <span>
      {@render children()}
    </span>
  {/if}

  {#if trailing}
    <span aria-hidden="true">
      {@render trailing()}
    </span>
  {/if}
</button>
