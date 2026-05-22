"use client";

import { createContext } from "react";

export type Theme = "light" | "dark" | "system";

export type ThemeContextValue = {
  theme: Theme;
};

export const defaultTheme: Theme = "system";

export const ThemeContext = createContext<ThemeContextValue | null>(null);
