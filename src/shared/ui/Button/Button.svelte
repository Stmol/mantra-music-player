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
    style: _style,
    trailing,
    type = "button",
    variant = "secondary",
    ...rest
  }: ButtonProperties = $props();

  const sizeClasses = {
    lg: "button-m",
    md: "button-s",
    sm: "button-xs",
    xl: "button-l",
    xs: "button-xs",
  } as const;

  const resolvedVariant = $derived(
    variant === "danger"
      ? "negative"
      : variant === "ghost"
        ? "ghost-action"
        : variant === "secondary"
          ? "grey"
          : variant === "light-gray"
            ? "ligth-gray"
            : variant,
  );
  const isGhost = $derived(ghost);
  const sizeClass = $derived(sizeClasses[size]);
  const buttonClass = $derived(
    [
      "button",
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
  style={_style}
  {type}
>
  {#if leading}
    <span aria-hidden="true">
      {@render leading()}
    </span>
  {/if}

  {#if children}
    <span>
      {@render children()}
    </span>
  {/if}

  {#if trailing}
    <span aria-hidden="true">
      {@render trailing()}
    </span>
  {/if}
</button>
