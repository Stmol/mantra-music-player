import { appEnvironment } from "./environment";

export type WindowPlatform = "linux" | "macos" | "unknown" | "windows";

type NavigatorLike = {
  platform?: string;
  userAgent?: string;
  userAgentData?: {
    platform?: string;
  };
};

const resolveNavigatorPlatform = (): WindowPlatform => {
  const navigatorObject = globalThis.navigator as NavigatorLike | undefined;
  const userAgent = navigatorObject?.userAgent?.toLowerCase() ?? "";
  const navigatorPlatform =
    navigatorObject?.userAgentData?.platform?.toLowerCase() ??
    navigatorObject?.platform?.toLowerCase() ??
    "";

  if (navigatorPlatform.includes("mac") || userAgent.includes("mac os")) {
    return "macos";
  }

  if (navigatorPlatform.includes("win") || userAgent.includes("windows")) {
    return "windows";
  }

  if (
    navigatorPlatform.includes("linux") ||
    userAgent.includes("linux") ||
    userAgent.includes("x11")
  ) {
    return "linux";
  }

  return "unknown";
};

export const getWindowPlatform = (): WindowPlatform => {
  const tauriPlatform = appEnvironment.tauriPlatform?.toLowerCase();

  if (
    tauriPlatform === "linux" ||
    tauriPlatform === "macos" ||
    tauriPlatform === "windows"
  ) {
    return tauriPlatform;
  }

  return resolveNavigatorPlatform();
};
