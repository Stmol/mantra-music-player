export type DemoTheme = "dark" | "light";

export type UiDemoScreenProperties = {
  nextTheme: DemoTheme;
  onToggleTheme: () => void;
};
