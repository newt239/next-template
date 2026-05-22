"use client";

import { type ReactElement, type ReactNode, useMemo } from "react";

import { ThemeContext, type ThemeContextValue, type Theme, defaultTheme } from "./theme-context";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
};

export const ThemeProvider = ({
  children,
  defaultTheme: initialTheme = defaultTheme,
}: Readonly<ThemeProviderProps>): ReactElement => {
  const value = useMemo<ThemeContextValue>(() => ({ theme: initialTheme }), [initialTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
