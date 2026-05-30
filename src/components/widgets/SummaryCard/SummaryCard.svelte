<script lang="ts">
  import { ProgressMeter } from "../../shared/ProgressMeter";
  import type { SummaryCardProps as SummaryCardProperties } from "./types";

  let {
    ariaLabel,
    description,
    icon,
    progress,
    progressAccent = "mint",
    progressMax = 100,
    title,
    value,
  }: SummaryCardProperties = $props();

  const IconComponent = $derived(icon);
</script>

<section aria-label={ariaLabel} class="summary-card">
  <div class="summary-header">
    {#if IconComponent}
      <IconComponent size={16} strokeWidth={1.8} />
    {/if}
    <span>{title}</span>
  </div>

  <strong>{value}</strong>

  {#if progress !== undefined}
    <ProgressMeter
      accent={progressAccent}
      ariaLabel={`${title} progress`}
      max={progressMax}
      value={progress}
    />
  {/if}

  {#if description}
    <p>{description}</p>
  {/if}
</section>

<style>
  .summary-card {
    display: grid;
    gap: var(--space-stack-sm);
    padding: var(--space-panel-padding);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: var(--panel);
  }

  .summary-header {
    display: flex;
    gap: var(--space-stack-sm);
    align-items: center;
    color: var(--type-support-color);
    font-size: var(--type-support-size);
    line-height: var(--type-support-line-height);
  }

  strong,
  p {
    margin: 0;
    font-family: var(--font-family-mono);
    font-variant-numeric: tabular-nums;
  }

  strong {
    color: var(--type-section-title-color);
    font-size: var(--type-section-title-size);
    line-height: var(--type-section-title-line-height);
    font-weight: var(--type-section-title-weight);
    letter-spacing: var(--type-section-title-tracking);
  }

  p {
    color: var(--type-data-color);
    font-size: var(--type-data-size);
    line-height: var(--type-data-line-height);
    font-weight: var(--type-data-weight);
  }
</style>
