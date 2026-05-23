<script lang="ts">
  import type { CheckboxProps as CheckboxProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    checked = $bindable(false),
    class: _className,
    description,
    disabled = false,
    id,
    indeterminate = false,
    label,
    marker,
    ...rest
  }: CheckboxProperties = $props();

  const fieldId = $derived(id ?? rest.name);
  const descriptionId = $derived(
    fieldId && description ? `${fieldId}-description` : undefined,
  );
  const checkboxClass = $derived(
    ["checkbox", "fontSize-s", "fontWeight-regular", _className]
      .filter(Boolean)
      .join(" "),
  );
  const state = $derived(
    indeterminate ? "mixed" : checked ? "checked" : "idle",
  );
</script>

<label class={checkboxClass} data-state={state}>
  <input
    {...rest}
    aria-checked={indeterminate ? "mixed" : checked}
    aria-describedby={descriptionId}
    bind:checked
    {disabled}
    id={fieldId}
    type="checkbox"
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
