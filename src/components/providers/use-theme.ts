"use client";

import { useContext } from "react";

import { ThemeContext, type ThemeContextValue, defaultTheme } from "./theme-context";

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === null) {
    return { theme: defaultTheme };
  }
  return context;
};
