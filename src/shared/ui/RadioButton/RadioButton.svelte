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
    value,
    ...rest
  }: RadioButtonProperties = $props();

  const fieldId = $derived(id ?? rest.name);
  const descriptionId = $derived(
    fieldId && description ? `${fieldId}-description` : undefined,
  );
  const radioButtonClass = $derived(
    ["checkbox", "radio", "fontSize-s", "fontWeight-regular", _className]
      .filter(Boolean)
      .join(" "),
  );
  const state = $derived(checked || group === value ? "checked" : "idle");
</script>

<label class={radioButtonClass} data-state={state}>
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
      <span class="control__label fontSize-s fontWeight-regular">{label}</span>
    {/if}

    {#if description}
      <span
        class="control__description fontSize-xs fontWeight-regular"
        id={descriptionId}
      >
        {description}
      </span>
    {/if}
  </span>
</label>
