<script lang="ts">
  import type { SwitchProps as SwitchProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    checked = $bindable(false),
    class: className = "",
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
</script>

<button
  {...rest}
  aria-checked={checked}
  class={`ui-switch ${className}`.trim()}
  data-state={checked ? "checked" : "unchecked"}
  {disabled}
  onclick={toggle}
  role="switch"
  {type}
>
  <span class="ui-switch__track" aria-hidden="true">
    <span class="ui-switch__thumb">
      {#if checked && onIcon}
        {@render onIcon()}
      {:else if !checked && offIcon}
        {@render offIcon()}
      {/if}
    </span>
  </span>

  {#if label || description}
    <span class="ui-switch__body">
      {#if label}
        <span class="ui-switch__label">{label}</span>
      {/if}

      {#if description}
        <span class="ui-switch__description">{description}</span>
      {/if}
    </span>
  {/if}
</button>
