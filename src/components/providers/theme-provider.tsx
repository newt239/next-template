"use client";

import { useMemo, useSyncExternalStore } from "react";

import {
  DARK_MEDIA_QUERY,
  THEME_COLORS,
  THEME_DARK_CLASS,
  THEME_STORAGE_KEY,
  type Theme,
} from "./theme";
import { ThemeContext, type ThemeContextValue } from "./theme-context";

const listeners = new Set<() => void>();

let currentTheme: Theme | null = null;

const applyTheme = () => {
  const isDark =
    currentTheme === "dark" ||
    (currentTheme !== "light" && window.matchMedia(DARK_MEDIA_QUERY).matches);
  document.documentElement.classList.toggle(THEME_DARK_CLASS, isDark);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isDark ? THEME_COLORS.dark : THEME_COLORS.light);
};

const getTheme = (): Theme => {
  if (currentTheme === null) {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    currentTheme = stored === "light" || stored === "dark" ? stored : "system";
  }
  return currentTheme;
};

const getServerTheme = (): Theme => "system";

const subscribe = (listener: () => void) => {
  const media = window.matchMedia(DARK_MEDIA_QUERY);
  listeners.add(listener);
  media.addEventListener("change", applyTheme);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", applyTheme);
  };
};

const setTheme = (theme: Theme) => {
  currentTheme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme();
  for (const listener of listeners) {
    listener();
  }
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Readonly<ThemeProviderProps>) => {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const value = useMemo<ThemeContextValue>(() => ({ setTheme, theme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
