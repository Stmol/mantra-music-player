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

<label data-appearance={appearance} data-disabled={disabled ? "true" : "false"}>
  {#if label}
    <span class="label">{label}</span>
  {/if}

  <span class="control">
    {#if leading}
      <span class="leading" aria-hidden="true">
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
      <span class="trailing">
        {@render trailing()}
      </span>
    {/if}
  </span>

  {#if description}
    <span class="description" id={descriptionId}>{description}</span>
  {/if}

  {#if error}
    <span class="error" id={errorId}>{error}</span>
  {/if}
</label>

<style>
  label {
    display: grid;
    gap: var(--space-stack-xs);
  }

  .control {
    display: flex;
    align-items: center;
  }

  .leading,
  .trailing {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
  }

  input {
    min-width: 0;
    font: inherit;
  }

  label[data-appearance="panel-header"] .control {
    gap: var(--space-control-gap);
    width: 100%;
    min-width: 260px;
    height: 38px;
    padding: 0 var(--space-control-padding-inline);
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    background: var(--panel);
    color: var(--type-control-color);
    font-family: var(--font-family-mono);
    font-size: var(--type-control-size);
    line-height: var(--type-control-line-height);
    font-weight: var(--type-control-weight);
    font-variant-numeric: tabular-nums;
  }

  label[data-appearance="panel-header"] input {
    flex: 1;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--type-body-color);
    font-size: inherit;
  }

  .trailing :global(kbd) {
    padding: var(--space-2) var(--space-control-padding-inline-tight);
    border: 1px solid var(--line);
    border-radius: 4px;
    color: var(--type-micro-label-color);
    font-family: var(--font-family-mono);
    font-size: var(--type-micro-label-size);
    line-height: var(--type-micro-label-line-height);
    font-weight: var(--type-micro-label-weight);
    letter-spacing: var(--type-micro-label-tracking);
    font-variant-numeric: tabular-nums;
  }
</style>
