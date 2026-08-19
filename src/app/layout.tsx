import "./globals.css";
import type { Metadata, Viewport } from "next";

import { Geist_Mono, Inter } from "next/font/google";

import { THEME_COLORS, themeScript } from "#/components/providers/theme";
import { ThemeProvider } from "#/components/providers/theme-provider";
import { Toast } from "#/components/ui/toast";
import { SITE_NAME, SITE_URL } from "#/lib/site";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description: SITE_NAME,
  metadataBase: SITE_URL,
  openGraph: {
    description: SITE_NAME,
    locale: "ja_JP",
    siteName: SITE_NAME,
    title: SITE_NAME,
    type: "website",
    url: "/",
  },
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ja" className={`${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
    <head>
      <meta name="theme-color" content={THEME_COLORS.light} />
      <script>{themeScript}</script>
    </head>
    <body>
      <ThemeProvider>
        {children}
        <Toast position="top-center" />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
