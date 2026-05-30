<script lang="ts">
  import type { SwitchProps as SwitchProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    checked = $bindable(false),
    description,
    disabled = false,
    label,
    offIcon,
    onIcon,
    type = "button",
    ...rest
  }: SwitchProperties = $props();

  const toggle = () => {
    if (!disabled) {
      checked = !checked;
    }
  };

  const state = $derived(checked ? "checked" : "idle");
</script>

<button
  {...rest}
  aria-checked={checked}
  data-state={state}
  {disabled}
  onclick={toggle}
  role="switch"
  {type}
>
  {#if label || description}
    <span>
      {#if label}
        <span>{label}</span>
      {/if}

      {#if description}
        <span>{description}</span>
      {/if}
    </span>
  {/if}

  <span aria-hidden="true">
    <span>
      {#if checked && onIcon}
        {@render onIcon()}
      {:else if !checked && offIcon}
        {@render offIcon()}
      {/if}
    </span>
  </span>
</button>
