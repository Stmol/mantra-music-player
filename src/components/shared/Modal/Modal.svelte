<script lang="ts">
  import { IconButton } from "../IconButton";
  import type { ModalProps as ModalProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    description,
    dismissible = true,
    footer,
    id,
    onClose,
    open = $bindable(false),
    size: _size = "md",
    title,
    ...rest
  }: ModalProperties = $props();

  $effect(() => {
    void _size;
  });

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
  <div role="presentation" onclick={close}></div>
  <section
    {...rest}
    aria-describedby={descriptionId}
    aria-labelledby={titleId}
    aria-modal="true"
    {id}
    role="dialog"
  >
    <div>
      {#if title || dismissible}
        <header>
          {#if title}
            <h2 id={titleId}>{title}</h2>
          {/if}

          {#if dismissible}
            <IconButton
              icon="close"
              label="Close modal"
              onclick={close}
              variant="close"
            />
          {/if}
        </header>
      {/if}

      {#if description}
        <p id={descriptionId}>{description}</p>
      {/if}

      {#if children}
        <div>
          {@render children()}
        </div>
      {/if}

      {#if footer}
        <footer>
          {@render footer()}
        </footer>
      {/if}
    </div>
  </section>
{/if}
