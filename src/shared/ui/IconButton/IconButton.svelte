<script lang="ts">
  import { Copy, Plus, X } from "lucide-svelte";
  import type { IconButtonProps as IconButtonProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    as = "button",
    class: _className,
    icon,
    label,
    type = "button",
    variant = "default",
    ...rest
  }: IconButtonProperties = $props();

  const iconButtonClass = $derived(
    ["icon-button", `icon-button--${variant}`, _className]
      .filter(Boolean)
      .join(" "),
  );
</script>

{#if as === "span"}
  <span
    aria-hidden={label ? undefined : "true"}
    aria-label={label ?? rest["aria-label"]}
    class={iconButtonClass}
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
  <button
    {...rest}
    aria-label={label ?? rest["aria-label"]}
    class={iconButtonClass}
    {type}
  >
    {#if icon === "close"}
      <X aria-hidden="true" />
    {:else if icon === "copy"}
      <Copy aria-hidden="true" />
    {:else}
      <Plus aria-hidden="true" />
    {/if}
  </button>
{/if}
