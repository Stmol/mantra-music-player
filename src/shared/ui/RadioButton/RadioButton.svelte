<script lang="ts">
  import type { RadioButtonProps as RadioButtonProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    checked = $bindable(false),
    class: _className,
    description,
    disabled = false,
    group = $bindable(),
    id,
    label,
    marker,
    style: _style,
    value,
    ...rest
  }: RadioButtonProperties = $props();

  $effect(() => {
    void [_className, _style];
  });

  const fieldId = $derived(id ?? rest.name);
  const descriptionId = $derived(
    fieldId && description ? `${fieldId}-description` : undefined,
  );
  const radioButtonClass = $derived(
    ["checkbox", "radio", _className].filter(Boolean).join(" "),
  );
  const state = $derived(checked || group === value ? "checked" : "idle");
</script>

<label class={radioButtonClass} data-state={state} style={_style}>
  <input
    {...rest}
    aria-checked={checked || group === value}
    aria-describedby={descriptionId}
    bind:group
    checked={checked || group === value}
    {disabled}
    id={fieldId}
    onchange={(event) => {
      checked = event.currentTarget.checked;
    }}
    type="radio"
    {value}
  />

  <span class="control-indicator">
    {#if marker}
      {@render marker()}
    {/if}
  </span>

  <span class="control__content">
    {#if label}
      <span class="control__label">{label}</span>
    {/if}

    {#if description}
      <span class="control__description" id={descriptionId}>
        {description}
      </span>
    {/if}
  </span>
</label>
