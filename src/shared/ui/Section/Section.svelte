<script lang="ts">
  import type { SectionProps as SectionProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    description,
    disabled = false,
    headerActions,
    title,
    variant = "plain",
    ...rest
  }: SectionProperties = $props();
</script>

<section
  {...rest}
  data-disabled={disabled ? "true" : undefined}
  data-variant={variant}
>
  {#if title || description}
    <header>
      <div class="copy">
        {#if title}
          <h2>{title}</h2>
        {/if}

        {#if description}
          <p>{description}</p>
        {/if}
      </div>

      {#if headerActions}
        <div class="actions">
          {@render headerActions()}
        </div>
      {/if}
    </header>
  {/if}

  <div class="body">
    {#if children}
      {@render children()}
    {/if}
  </div>
</section>

<style>
  section {
    display: grid;
    gap: var(--space-stack-sm);
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-stack-md);
  }

  .copy {
    min-width: 0;
  }

  .body {
    display: grid;
    gap: inherit;
    min-width: 0;
  }

  h2,
  p {
    margin: 0;
  }

  h2 {
    color: var(--type-label-color);
    font-family: var(--font-family-mono);
    font-size: var(--type-label-size);
    line-height: var(--type-label-line-height);
    font-weight: var(--type-label-weight);
    letter-spacing: var(--type-label-tracking);
    text-transform: uppercase;
  }

  section[data-variant="plain"] header {
    padding-left: var(--space-control-padding-inline-compact);
  }

  section[data-variant="panel"] {
    gap: var(--space-stack-md);
    padding: var(--space-panel-padding);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: var(--panel);
  }
</style>
