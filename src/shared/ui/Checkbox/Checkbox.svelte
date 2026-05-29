<script lang="ts">
  import type { CheckboxProps as CheckboxProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    checked = $bindable(false),
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
  const state = $derived(
    indeterminate ? "mixed" : checked ? "checked" : "idle",
  );
</script>

<label data-state={state}>
  <input
    {...rest}
    aria-checked={indeterminate ? "mixed" : checked}
    aria-describedby={descriptionId}
    bind:checked
    {disabled}
    id={fieldId}
    type="checkbox"
  />

  <span>
    {#if marker}
      {@render marker()}
    {/if}
  </span>

  <span>
    {#if label}
      <span>{label}</span>
    {/if}

    {#if description}
      <span id={descriptionId}>
        {description}
      </span>
    {/if}
  </span>
</label>
