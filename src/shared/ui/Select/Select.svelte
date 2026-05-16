<script lang="ts">
  import type { SelectProps as SelectProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    class: _className,
    description,
    disabled = false,
    error,
    id,
    label,
    leading,
    options = [],
    selectSize: _selectSize = "md",
    style: _style,
    value = $bindable(""),
    ...rest
  }: SelectProperties = $props();

  $effect(() => {
    void [_className, _selectSize, _style];
  });

  const fieldId = $derived(id ?? rest.name);
  const descriptionId = $derived(
    fieldId && description ? `${fieldId}-description` : undefined,
  );
  const errorId = $derived(fieldId && error ? `${fieldId}-error` : undefined);
  const describedBy = $derived(
    [descriptionId, errorId].filter(Boolean).join(" "),
  );
  const sizeClasses = {
    lg: "select-l",
    md: "select-m",
    sm: "select-s",
  } as const;
  const fieldClass = $derived(
    ["field", "select-field", error && "select-field--danger", _className]
      .filter(Boolean)
      .join(" "),
  );
  const selectClass = $derived(["select", sizeClasses[_selectSize]].join(" "));
  const selectedOption = $derived(
    options.find((option) => option.value === value) ?? options[0],
  );
</script>

<label class={fieldClass} style={_style}>
  {#if label}
    <span class="field__label">{label}</span>
  {/if}

  <span class={selectClass}>
    <span class="select-content" aria-hidden="true">
      {#if leading}
        <span class="select-leading">
          {@render leading()}
        </span>
      {/if}
      <span class="select-value">{selectedOption?.label ?? ""}</span>
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
    <span class="field__description" id={descriptionId}>{description}</span>
  {/if}

  {#if error}
    <span class="field__error" id={errorId}>{error}</span>
  {/if}
</label>
