<script lang="ts">
  import type { CheckboxProps as CheckboxProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    checked = $bindable(false),
    class: className = "",
    description,
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
</script>

<label class={`ui-checkbox ${className}`.trim()}>
  <input
    {...rest}
    aria-checked={indeterminate ? "mixed" : checked}
    aria-describedby={descriptionId}
    bind:checked
    class="ui-checkbox__input"
    id={fieldId}
    type="checkbox"
  />

  <span
    class="ui-checkbox__box"
    data-indeterminate={indeterminate || undefined}
  >
    {#if marker}
      {@render marker()}
    {/if}
  </span>

  <span class="ui-checkbox__body">
    {#if label}
      <span class="ui-checkbox__label">{label}</span>
    {/if}

    {#if description}
      <span class="ui-checkbox__description" id={descriptionId}
        >{description}</span
      >
    {/if}
  </span>
</label>
