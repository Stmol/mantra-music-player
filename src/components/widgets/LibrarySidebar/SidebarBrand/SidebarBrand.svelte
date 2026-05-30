<script lang="ts">
  import { AudioLines } from "lucide-svelte";
  import { Eyebrow } from "../../../shared/Eyebrow";
</script>

<div class="brand-block">
  <div class="brand-mark" aria-hidden="true">
    <AudioLines size={18} strokeWidth={1.8} />
  </div>

  <div>
    <Eyebrow>Mantra</Eyebrow>
    <h1>Library OS</h1>
  </div>
</div>

<style>
  .brand-block {
    display: flex;
    gap: var(--space-stack-md);
    align-items: center;
    min-height: 44px;
  }

  .brand-mark {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    background: var(--panel-muted);
    color: var(--accent-mint);
  }

  h1 {
    margin: var(--space-1) 0 0;
    color: var(--type-app-title-color);
    font-size: var(--type-app-title-size);
    line-height: var(--type-app-title-line-height);
    font-weight: var(--type-app-title-weight);
    letter-spacing: var(--type-app-title-tracking);
  }
</style>
