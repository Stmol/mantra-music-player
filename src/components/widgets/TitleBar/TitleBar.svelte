<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { Download, RotateCw, Search, Settings2 } from "lucide-svelte";
  import { onMount } from "svelte";
  import { Button, TextField } from "../../shared";
  import {
    getWindowPlatform,
    type WindowPlatform,
  } from "../../../shared/config/window-platform";
  import type { TitleBarControl, TitleBarProperties } from "./types";

  const appWindow = getCurrentWindow();

  interface DesktopDragSurfaceLike {
    addEventListener(type: "dblclick", listener: () => void): void;
    removeEventListener(type: "dblclick", listener: () => void): void;
  }

  type MaximizableTitleBarControl = Extract<
    TitleBarControl,
    "maximize" | "restore"
  >;

  let { nextTheme, onToggleTheme }: TitleBarProperties = $props();

  let platform = $state<WindowPlatform>(getWindowPlatform());
  let isMaximized = $state(false);
  let titleBarDragSurface = $state<DesktopDragSurfaceLike | undefined>();

  const isMacos = $derived(platform === "macos");
  const maximizeControl = $derived<MaximizableTitleBarControl>(
    isMaximized ? "restore" : "maximize",
  );

  const ignoreWindowActionError = () => {
    return;
  };

  const syncMaximizedState = async () => {
    try {
      isMaximized = await appWindow.isMaximized();
    } catch {
      isMaximized = false;
    }
  };

  const handleWindowAction = (action: TitleBarControl) => {
    if (action === "minimize") {
      void appWindow.minimize().catch(ignoreWindowActionError);
      return;
    }

    if (action === "maximize" || action === "restore") {
      void appWindow.toggleMaximize().catch(ignoreWindowActionError);
      return;
    }

    void appWindow.close().catch(ignoreWindowActionError);
  };

  const handleDesktopDragSurfaceDoubleClick = () => {
    if (platform === "windows" || platform === "linux") {
      handleWindowAction(maximizeControl);
    }
  };

  onMount(() => {
    let unlistenResized: (() => void) | undefined;

    void syncMaximizedState();
    titleBarDragSurface?.addEventListener(
      "dblclick",
      handleDesktopDragSurfaceDoubleClick,
    );
    void appWindow
      .onResized(() => {
        void syncMaximizedState();
      })
      .then((unlisten) => {
        unlistenResized = unlisten;
      })
      .catch(ignoreWindowActionError);

    return () => {
      titleBarDragSurface?.removeEventListener(
        "dblclick",
        handleDesktopDragSurfaceDoubleClick,
      );
      unlistenResized?.();
    };
  });
</script>

<header class="title-bar" data-platform={platform}>
  <div class="title-bar__lead">
    {#if isMacos}
      <div
        class="title-bar__traffic-lights-gap title-bar__drag-surface title-bar__drag-surface--traffic-lights"
        aria-hidden="true"
        data-tauri-drag-region
      ></div>
    {:else}
      <div
        class="title-bar__drag-surface title-bar__drag-surface--lead"
        data-tauri-drag-region
      ></div>
    {/if}
  </div>

  <div class="title-bar__main">
    <div class="title-bar__search">
      <TextField
        appearance="panel-header"
        aria-label="Search music library"
        value="artist:glass tag:focus"
      >
        {#snippet leading()}
          <Search size={17} strokeWidth={1.8} />
        {/snippet}
        {#snippet trailing()}
          <kbd>CMD K</kbd>
        {/snippet}
      </TextField>
    </div>

    <div
      bind:this={titleBarDragSurface}
      class="title-bar__drag-surface title-bar__drag-surface--desktop"
      data-tauri-drag-region
    ></div>

    <div class="title-bar__actions-cluster">
      <div class="title-bar__actions">
        <Button type="button" variant="secondary">
          {#snippet children()}
            <RotateCw size={15} />
            Sync
          {/snippet}
        </Button>
        <Button onclick={onToggleTheme} type="button" variant="secondary">
          {#snippet children()}
            <Settings2 size={15} />
            {nextTheme}
          {/snippet}
        </Button>
        <Button type="button" variant="primary">
          {#snippet children()}
            <Download size={15} />
            Import
          {/snippet}
        </Button>
      </div>

      {#if !isMacos}
        <div class="title-bar__controls" aria-label="Window controls">
          <button
            aria-label="Minimize window"
            class="title-bar__control-button"
            type="button"
            onclick={() => handleWindowAction("minimize")}
          >
            <span class="title-bar__glyph title-bar__glyph--minimize"></span>
          </button>
          <button
            aria-label={isMaximized ? "Restore window" : "Maximize window"}
            class="title-bar__control-button"
            type="button"
            onclick={() => handleWindowAction(maximizeControl)}
          >
            {#if isMaximized}
              <span class="title-bar__glyph title-bar__glyph--restore"></span>
            {:else}
              <span class="title-bar__glyph title-bar__glyph--maximize"></span>
            {/if}
          </button>
          <button
            aria-label="Close window"
            class="title-bar__control-button title-bar__control-button--close"
            type="button"
            onclick={() => handleWindowAction("close")}
          >
            <span class="title-bar__glyph title-bar__glyph--close"></span>
          </button>
        </div>
      {/if}
    </div>
  </div>
</header>
