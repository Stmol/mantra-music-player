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
    style: _style,
    type = "button",
    ...rest
  }: SwitchProperties = $props();

  $effect(() => {
    void [_className, _style];
  });

  const toggle = () => {
    if (!disabled) {
      checked = !checked;
    }
  };

  const switchClass = $derived(
    ["switch", _className].filter(Boolean).join(" "),
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
  style={_style}
  {type}
>
  {#if label || description}
    <span class="control__content">
      {#if label}
        <span class="control__label">{label}</span>
      {/if}

      {#if description}
        <span class="control__description">{description}</span>
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
