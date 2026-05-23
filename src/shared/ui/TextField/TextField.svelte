<script lang="ts">
  import type { TextFieldProps as TextFieldProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    appearance = "default",
    class: _className,
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
    void [_className, _inputSize, _tone];
  });

  const fieldId = $derived(id ?? rest.name);
  const descriptionId = $derived(
    fieldId && description ? `${fieldId}-description` : undefined,
  );
  const errorId = $derived(fieldId && error ? `${fieldId}-error` : undefined);
  const describedBy = $derived(
    [descriptionId, errorId].filter(Boolean).join(" "),
  );
  const fieldClass = $derived(
    [
      "field",
      "text-field",
      `text-field--${_inputSize}`,
      `text-field--${appearance}`,
      (_tone === "danger" || error) && "text-field--danger",
      leading && "text-field--has-leading",
      trailing && "text-field--has-trailing",
      disabled && "text-field--disabled",
      rest.readonly && "text-field--readonly",
      _className,
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

<label class={fieldClass}>
  {#if label}
    <span class="field__label fontSize-xs fontWeight-regular">{label}</span>
  {/if}

  <span class="field__control text-field__control">
    {#if leading}
      <span class="text-field__leading" aria-hidden="true">
        {@render leading()}
      </span>
    {/if}

    <input
      {...rest}
      aria-describedby={describedBy || undefined}
      aria-invalid={error ? "true" : undefined}
      bind:value
      class="fontSize-xs fontWeight-regular"
      {disabled}
      id={fieldId}
      {type}
    />

    {#if trailing}
      <span class="text-field__trailing">
        {@render trailing()}
      </span>
    {/if}
  </span>

  {#if description}
    <span
      class="field__description fontSize-xs fontWeight-regular"
      id={descriptionId}>{description}</span
    >
  {/if}

  {#if error}
    <span class="field__error fontSize-xs fontWeight-regular" id={errorId}
      >{error}</span
    >
  {/if}
</label>
