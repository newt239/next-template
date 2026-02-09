"use client";

import { type ReactElement, type ReactNode, createContext, useContext } from "react";

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

export const ThemeProvider = ({
  children,
  defaultTheme: initialTheme = defaultTheme,
}: ThemeProviderProps): ReactElement => (
  <ThemeContext.Provider value={{ theme: initialTheme }}>{children}</ThemeContext.Provider>
);

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === null) {
    return { theme: defaultTheme };
  }
  return context;
};
