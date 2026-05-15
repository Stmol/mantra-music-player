/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TAURI_ENV_PLATFORM?: string;
  readonly TAURI_ENV_ARCH?: string;
  readonly TAURI_ENV_FAMILY?: string;
  readonly TAURI_ENV_PLATFORM_VERSION?: string;
  readonly TAURI_ENV_PLATFORM_TYPE?: string;
  readonly TAURI_ENV_DEBUG?: string;
  readonly VITE_MANTRA_LOG_LEVEL?: "debug" | "info" | "warn" | "error";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.svelte" {
  import type { Component } from "svelte";

  const component: Component;
  export default component;
}
