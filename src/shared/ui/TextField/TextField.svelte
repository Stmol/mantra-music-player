<script lang="ts">
  import type { TextFieldProps as TextFieldProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    appearance = "default",
    description,
    disabled = false,
    error,
    id,
    inputSize: _inputSize = "md",
    label,
    leading,
    tone: _tone = "neutral",
    trailing,
    type = "text",
    value = $bindable(""),
    ...rest
  }: TextFieldProperties = $props();

  $effect(() => {
    void [_inputSize, _tone, appearance];
  });

  const fieldId = $derived(id ?? rest.name);
  const descriptionId = $derived(
    fieldId && description ? `${fieldId}-description` : undefined,
  );
  const errorId = $derived(fieldId && error ? `${fieldId}-error` : undefined);
  const describedBy = $derived(
    [descriptionId, errorId].filter(Boolean).join(" "),
  );
</script>

<label>
  {#if label}
    <span>{label}</span>
  {/if}

  <span>
    {#if leading}
      <span aria-hidden="true">
        {@render leading()}
      </span>
    {/if}

    <input
      {...rest}
      aria-describedby={describedBy || undefined}
      aria-invalid={error ? "true" : undefined}
      bind:value
      {disabled}
      id={fieldId}
      {type}
    />

    {#if trailing}
      <span>
        {@render trailing()}
      </span>
    {/if}
  </span>

  {#if description}
    <span id={descriptionId}>{description}</span>
  {/if}

  {#if error}
    <span id={errorId}>{error}</span>
  {/if}
</label>
