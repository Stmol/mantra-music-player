<script lang="ts">
  import type { TextFieldProps as TextFieldProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    class: className = "",
    description,
    error,
    id,
    inputSize = "md",
    label,
    leading,
    tone = "neutral",
    trailing,
    type = "text",
    value = $bindable(""),
    ...rest
  }: TextFieldProperties = $props();

  const fieldId = $derived(id ?? rest.name);
  const descriptionId = $derived(
    fieldId && description ? `${fieldId}-description` : undefined,
  );
  const errorId = $derived(fieldId && error ? `${fieldId}-error` : undefined);
  const describedBy = $derived(
    [descriptionId, errorId].filter(Boolean).join(" "),
  );
  const resolvedTone = $derived(error ? "danger" : tone);
</script>

<label class={`ui-text-field ui-text-field--${inputSize} ${className}`.trim()}>
  {#if label}
    <span class="ui-text-field__label">{label}</span>
  {/if}

  <span
    class={`ui-text-field__control ui-text-field__control--${resolvedTone}`}
  >
    {#if leading}
      <span
        class="ui-text-field__icon ui-text-field__icon--leading"
        aria-hidden="true"
      >
        {@render leading()}
      </span>
    {/if}

    <input
      {...rest}
      aria-describedby={describedBy || undefined}
      aria-invalid={error ? "true" : undefined}
      bind:value
      class="ui-text-field__input"
      id={fieldId}
      {type}
    />

    {#if trailing}
      <span
        class="ui-text-field__icon ui-text-field__icon--trailing"
        aria-hidden="true"
      >
        {@render trailing()}
      </span>
    {/if}
  </span>

  {#if description}
    <span class="ui-text-field__description" id={descriptionId}
      >{description}</span
    >
  {/if}

  {#if error}
    <span class="ui-text-field__error" id={errorId}>{error}</span>
  {/if}
</label>
