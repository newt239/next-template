import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Next.js Template",
  title: "Next.js Template",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ja">
    <body>{children}</body>
  </html>
);

export default RootLayout;
