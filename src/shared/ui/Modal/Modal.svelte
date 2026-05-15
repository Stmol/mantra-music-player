<script lang="ts">
  import type { ModalProps as ModalProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    class: className = "",
    description,
    dismissible = true,
    footer,
    id,
    onClose,
    open = $bindable(false),
    size = "md",
    title,
    ...rest
  }: ModalProperties = $props();

  const titleId = $derived(id && title ? `${id}-title` : undefined);
  const descriptionId = $derived(
    id && description ? `${id}-description` : undefined,
  );

  const close = () => {
    if (!dismissible) {
      return;
    }

    open = false;
    onClose?.();
  };
</script>

{#if open}
  <div class="ui-modal__backdrop" role="presentation" onclick={close}></div>
  <section
    {...rest}
    aria-describedby={descriptionId}
    aria-labelledby={titleId}
    aria-modal="true"
    class={`ui-modal ui-modal--${size} ${className}`.trim()}
    {id}
    role="dialog"
  >
    <div class="ui-modal__panel">
      {#if title || dismissible}
        <header class="ui-modal__header">
          {#if title}
            <h2 class="ui-modal__title" id={titleId}>{title}</h2>
          {/if}

          {#if dismissible}
            <button
              aria-label="Close modal"
              class="ui-modal__close"
              onclick={close}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          {/if}
        </header>
      {/if}

      {#if description}
        <p class="ui-modal__description" id={descriptionId}>{description}</p>
      {/if}

      {#if children}
        <div class="ui-modal__content">
          {@render children()}
        </div>
      {/if}

      {#if footer}
        <footer class="ui-modal__footer">
          {@render footer()}
        </footer>
      {/if}
    </div>
  </section>
{/if}
