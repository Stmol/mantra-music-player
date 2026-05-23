<script lang="ts">
  import { setTheme as setTauriTheme } from "@tauri-apps/api/app";
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { onMount } from "svelte";
  import { UiDemoScreen } from "../pages/ui-demo-screen";
  import type { DemoTheme } from "../pages/ui-demo-screen";

  type ThemeOverride = DemoTheme | undefined;

  const getBrowserSystemTheme = (): DemoTheme =>
    globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  const ignoreThemeError = () => {
    return;
  };

  let currentTheme = $state<DemoTheme>(getBrowserSystemTheme());
  let themeOverride = $state<ThemeOverride>();

  const nextTheme = $derived(currentTheme === "dark" ? "light" : "dark");

  const toggleTheme = () => {
    themeOverride = nextTheme;
    currentTheme = nextTheme;
    void setTauriTheme(nextTheme).catch(ignoreThemeError);
  };

  const applySystemTheme = (theme: DemoTheme) => {
    if (themeOverride === undefined) {
      currentTheme = theme;
    }
  };

  const handleBrowserThemeChange = () => {
    applySystemTheme(getBrowserSystemTheme());
  };

  $effect(() => {
    globalThis.document.documentElement.dataset["theme"] = currentTheme;
    globalThis.document.body.setAttribute("theme", currentTheme);
  });

  onMount(() => {
    let unlistenThemeChanged: (() => void) | undefined;
    const browserThemeQuery = globalThis.matchMedia?.(
      "(prefers-color-scheme: dark)",
    );
    void setTauriTheme().catch(ignoreThemeError);
    void getCurrentWindow()
      .theme()
      .then((theme) => {
        applySystemTheme(theme ?? getBrowserSystemTheme());
      })
      .catch(() => {
        applySystemTheme(getBrowserSystemTheme());
      });
    void getCurrentWindow()
      .onThemeChanged(({ payload: theme }) => {
        applySystemTheme(theme);
      })
      .then((unlisten) => {
        unlistenThemeChanged = unlisten;
      })
      .catch(ignoreThemeError);

    browserThemeQuery?.addEventListener("change", handleBrowserThemeChange);

    return () => {
      unlistenThemeChanged?.();
      browserThemeQuery?.removeEventListener(
        "change",
        handleBrowserThemeChange,
      );
    };
  });
</script>

<UiDemoScreen {nextTheme} onToggleTheme={toggleTheme} />
