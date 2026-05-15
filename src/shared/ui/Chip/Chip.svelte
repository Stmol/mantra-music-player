<script lang="ts">
  import type { ChipProps as ChipProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    class: className = "",
    leading,
    selected = false,
    size = "md",
    tone = "neutral",
    trailing,
    type = "button",
    ...rest
  }: ChipProperties = $props();
</script>

<button
  {...rest}
  aria-pressed={selected}
  class={`ui-chip ui-chip--${tone} ui-chip--${size} ${className}`.trim()}
  data-selected={selected || undefined}
  {type}
>
  {#if leading}
    <span class="ui-chip__icon ui-chip__icon--leading" aria-hidden="true">
      {@render leading()}
    </span>
  {/if}

  {#if children}
    <span class="ui-chip__content">
      {@render children()}
    </span>
  {/if}

  {#if trailing}
    <span class="ui-chip__icon ui-chip__icon--trailing" aria-hidden="true">
      {@render trailing()}
    </span>
  {/if}
</button>
