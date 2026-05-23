<script lang="ts">
  import type { SectionProps as SectionProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    children,
    class: _className,
    description,
    disabled = false,
    title,
    ...rest
  }: SectionProperties = $props();

  const sectionClass = $derived(
    ["section-surface", disabled && "section-surface--disabled", _className]
      .filter(Boolean)
      .join(" "),
  );
</script>

<section
  {...rest}
  class={sectionClass}
  data-disabled={disabled ? "true" : undefined}
>
  {#if title || description}
    <header>
      {#if title}
        <h2 class="fontSize-xs fontWeight-bold lineHieght-extraTight">
          {title}
        </h2>
      {/if}

      {#if description}
        <p class="fontSize-xs fontWeight-regular">{description}</p>
      {/if}
    </header>
  {/if}

  <div class="section-surface__panel">
    {#if children}
      <div class="section-surface__body">
        {@render children()}
      </div>
    {/if}
  </div>
</section>
