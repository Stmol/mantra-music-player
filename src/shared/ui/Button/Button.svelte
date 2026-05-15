<script lang="ts">
  import type { ButtonProps as ButtonProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    class: className = "",
    disabled = false,
    leading,
    loading = false,
    pressed,
    size = "md",
    trailing,
    type = "button",
    variant = "secondary",
    ...rest
  }: ButtonProperties = $props();

  const stateClass = $derived(loading ? "ui-button--loading" : "");
</script>

<button
  {...rest}
  aria-busy={loading || undefined}
  aria-pressed={pressed}
  class={`ui-button ui-button--${variant} ui-button--${size} ${stateClass} ${className}`.trim()}
  disabled={disabled || loading}
  {type}
>
  {#if leading}
    <span class="ui-button__icon ui-button__icon--leading" aria-hidden="true">
      {@render leading()}
    </span>
  {/if}

  {#if children}
    <span class="ui-button__content">
      {@render children()}
    </span>
  {/if}

  {#if trailing}
    <span class="ui-button__icon ui-button__icon--trailing" aria-hidden="true">
      {@render trailing()}
    </span>
  {/if}
</button>
