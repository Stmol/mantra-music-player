<script lang="ts">
  import type { SwitchProps as SwitchProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    checked = $bindable(false),
    class: _className,
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

  const switchClass = $derived(
    ["switch", "fontSize-s", "fontWeight-regular", _className]
      .filter(Boolean)
      .join(" "),
  );
  const state = $derived(checked ? "checked" : "idle");
</script>

<button
  {...rest}
  aria-checked={checked}
  class={switchClass}
  data-state={state}
  {disabled}
  onclick={toggle}
  role="switch"
  {type}
>
  {#if label || description}
    <span class="control__content">
      {#if label}
        <span class="control__label fontSize-s fontWeight-regular">{label}</span
        >
      {/if}

      {#if description}
        <span class="control__description fontSize-xs fontWeight-regular"
          >{description}</span
        >
      {/if}
    </span>
  {/if}

  <span aria-hidden="true" class="switch__track">
    <span class="switch__thumb">
      {#if checked && onIcon}
        {@render onIcon()}
      {:else if !checked && offIcon}
        {@render offIcon()}
      {/if}
    </span>
  </span>
</button>
