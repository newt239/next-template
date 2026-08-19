export type Theme = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme";

export const THEME_DARK_CLASS = "dark";

export const THEME_COLORS = {
  dark: "oklch(0.14 0 0)",
  light: "oklch(0.98 0 0)",
} as const;

export const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var d=t==="dark"||(t!=="light"&&window.matchMedia(${JSON.stringify(DARK_MEDIA_QUERY)}).matches);document.documentElement.classList.toggle(${JSON.stringify(THEME_DARK_CLASS)},d);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",d?${JSON.stringify(THEME_COLORS.dark)}:${JSON.stringify(THEME_COLORS.light)});}catch(e){}})();`;
