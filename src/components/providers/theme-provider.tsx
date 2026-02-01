"use client";

import { type ReactElement, type ReactNode, createContext, useContext } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const defaultTheme: Theme = "system";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme: initialTheme = defaultTheme,
}: ThemeProviderProps): ReactElement {
  return <ThemeContext.Provider value={{ theme: initialTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) {
    return { theme: defaultTheme };
  }
  return context;
}
