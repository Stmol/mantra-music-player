<script lang="ts">
  import type { ButtonProps as ButtonProperties } from "./types";

  // svelte-ignore custom_element_props_identifier
  let {
    block = false,
    children,
    class: className = "",
    disabled = false,
    ghost = false,
    hoverVariant,
    leading,
    loading = false,
    pressed,
    rounded = false,
    size = "md",
    trailing,
    type = "button",
    variant = "secondary",
    ...rest
  }: ButtonProperties = $props();

  const sizeClasses = {
    lg: "button-lg",
    md: "button-md",
    sm: "button-sm",
    xl: "button-xl",
    xs: "button-xs",
  } as const;

  const resolvedVariant = $derived(
    variant === "danger"
      ? "negative"
      : variant === "ghost"
        ? "ghost-action"
        : variant === "secondary"
          ? "grey"
          : variant,
  );
  const isGhost = $derived(ghost);
  const sizeClass = $derived(sizeClasses[size]);
  const buttonClass = $derived(
    [
      "button",
      "fontSize-s",
      "fontWeight-regular",
      "lineHieght-extraTight",
      `button-${resolvedVariant}`,
      sizeClass,
      isGhost && "button-ghost",
      block && "button-block",
      rounded && "button-rounded",
      hoverVariant && `button-hover-${hoverVariant}`,
      (disabled || loading) && "button-disabled",
      loading && "button-loading",
      pressed && "active",
      className,
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

<button
  {...rest}
  aria-busy={loading || undefined}
  aria-pressed={pressed}
  class={buttonClass}
  disabled={disabled || loading}
  {type}
>
  {#if leading}
    <span aria-hidden="true" class="button__slot">
      {@render leading()}
    </span>
  {/if}

  {#if children}
    <span class="button__label">
      {@render children()}
    </span>
  {/if}

  {#if trailing}
    <span aria-hidden="true" class="button__slot">
      {@render trailing()}
    </span>
  {/if}
</button>
