"use client";

import { createContext, useContext, type ReactNode, type ReactElement } from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const defaultTheme: Theme = "system";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
};

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
