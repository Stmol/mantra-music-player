<script lang="ts">
  import { IconButton } from "../IconButton";
  import type { ModalProps as ModalProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    class: _className,
    description,
    dismissible = true,
    footer,
    id,
    onClose,
    open = $bindable(false),
    size: _size = "md",
    style: _style,
    title,
    ...rest
  }: ModalProperties = $props();

  $effect(() => {
    void [_className, _size, _style];
  });

  const titleId = $derived(id && title ? `${id}-title` : undefined);
  const descriptionId = $derived(
    id && description ? `${id}-description` : undefined,
  );
  const modalClass = $derived(
    ["modal", `modal--${_size}`, _className].filter(Boolean).join(" "),
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
  <div class="modal-overlay" role="presentation" onclick={close}></div>
  <section
    {...rest}
    aria-describedby={descriptionId}
    aria-labelledby={titleId}
    aria-modal="true"
    class={modalClass}
    {id}
    role="dialog"
    style={_style}
  >
    <div class="modal-surface">
      {#if title || dismissible}
        <header class="modal__header">
          {#if title}
            <h2 class="modal__title" id={titleId}>{title}</h2>
          {/if}

          {#if dismissible}
            <IconButton
              class="modal__close"
              icon="close"
              label="Close modal"
              onclick={close}
              variant="close"
            />
          {/if}
        </header>
      {/if}

      {#if description}
        <p class="modal__description" id={descriptionId}>{description}</p>
      {/if}

      {#if children}
        <div class="modal__body">
          {@render children()}
        </div>
      {/if}

      {#if footer}
        <footer class="modal__footer">
          {@render footer()}
        </footer>
      {/if}
    </div>
  </section>
{/if}
