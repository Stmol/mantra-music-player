<script lang="ts">
  import { Copy, Plus, X } from "lucide-svelte";
  import type { IconButtonProps as IconButtonProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    as = "button",
    icon,
    label,
    type = "button",
    variant = "default",
    ...rest
  }: IconButtonProperties = $props();

  $effect(() => {
    void variant;
  });
</script>

{#if as === "span"}
  <span
    aria-hidden={label ? undefined : "true"}
    aria-label={label ?? rest["aria-label"]}
  >
    {#if icon === "close"}
      <X aria-hidden="true" />
    {:else if icon === "copy"}
      <Copy aria-hidden="true" />
    {:else}
      <Plus aria-hidden="true" />
    {/if}
  </span>
{:else}
  <button {...rest} aria-label={label ?? rest["aria-label"]} {type}>
    {#if icon === "close"}
      <X aria-hidden="true" />
    {:else if icon === "copy"}
      <Copy aria-hidden="true" />
    {:else}
      <Plus aria-hidden="true" />
    {/if}
  </button>
{/if}
