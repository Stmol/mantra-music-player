<script lang="ts">
  import type { RadioButtonProps as RadioButtonProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    checked = $bindable(false),
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
  const state = $derived(checked || group === value ? "checked" : "idle");
</script>

<label data-state={state}>
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
