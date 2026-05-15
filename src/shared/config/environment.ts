export type AppEnvironment = {
  readonly mode: string;
  readonly isDevelopment: boolean;
  readonly isProduction: boolean;
  readonly tauriPlatform: string | undefined;
};

export const appEnvironment: AppEnvironment = {
  mode: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  tauriPlatform: import.meta.env.TAURI_ENV_PLATFORM,
};
