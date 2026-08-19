"use client";

import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import { useTheme } from "#/components/providers/use-theme";
import { Button } from "#/components/ui/button";

import type { Theme } from "#/components/providers/theme";

const nextTheme: Record<Theme, Theme> = {
  dark: "system",
  light: "dark",
  system: "light",
};

const themeLabel: Record<Theme, string> = {
  dark: "ダーク",
  light: "ライト",
  system: "システム設定",
};

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      intent="plain"
      size="sq-sm"
      onPress={() => {
        setTheme(nextTheme[theme]);
      }}
      aria-label={`テーマを切り替える 現在: ${themeLabel[theme]}`}
    >
      {theme === "light" && <SunIcon data-slot="icon" />}
      {theme === "dark" && <MoonIcon data-slot="icon" />}
      {theme === "system" && <ComputerDesktopIcon data-slot="icon" />}
    </Button>
  );
};
