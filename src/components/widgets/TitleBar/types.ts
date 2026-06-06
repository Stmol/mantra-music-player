export type TitleBarControl = "close" | "maximize" | "minimize" | "restore";

export type TitleBarProperties = {
  nextTheme: "dark" | "light";
  onToggleTheme: () => void;
};
