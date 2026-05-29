<script lang="ts">
  import type { SectionProps as SectionProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    description,
    disabled = false,
    title,
    ...rest
  }: SectionProperties = $props();
</script>

<section {...rest} data-disabled={disabled ? "true" : undefined}>
  {#if title || description}
    <header>
      {#if title}
        <h2>{title}</h2>
      {/if}

      {#if description}
        <p>{description}</p>
      {/if}
    </header>
  {/if}

  <div>
    {#if children}
      <div>
        {@render children()}
      </div>
    {/if}
  </div>
</section>
