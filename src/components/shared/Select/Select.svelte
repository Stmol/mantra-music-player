<script lang="ts">
  import type { SelectProps as SelectProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    description,
    disabled = false,
    error,
    id,
    label,
    leading,
    options = [],
    controlWidth,
    selectSize: _selectSize = "md",
    value = $bindable(""),
    ...rest
  }: SelectProperties = $props();

  $effect(() => {
    void [_selectSize, controlWidth];
  });

  const fieldId = $derived(id ?? rest.name);
  const descriptionId = $derived(
    fieldId && description ? `${fieldId}-description` : undefined,
  );
  const errorId = $derived(fieldId && error ? `${fieldId}-error` : undefined);
  const describedBy = $derived(
    [descriptionId, errorId].filter(Boolean).join(" "),
  );
  const selectedOption = $derived(
    options.find((option) => option.value === value) ?? options[0],
  );
</script>

<label>
  {#if label}
    <span>{label}</span>
  {/if}

  <span>
    <span aria-hidden="true">
      {#if leading}
        <span>
          {@render leading()}
        </span>
      {/if}
      <span>{selectedOption?.label ?? ""}</span>
    </span>

    <select
      {...rest}
      aria-describedby={describedBy || undefined}
      aria-invalid={error ? "true" : undefined}
      bind:value
      {disabled}
      id={fieldId}
    >
      {#each options as option}
        <option disabled={option.disabled} value={option.value}>
          {option.label}
        </option>
      {/each}
    </select>
  </span>

  {#if description}
    <span id={descriptionId}>{description}</span>
  {/if}

  {#if error}
    <span id={errorId}>{error}</span>
  {/if}
</label>
