import type { MetadataRoute } from "next";

import { SITE_NAME } from "#/lib/site";

const manifest = (): MetadataRoute.Manifest => ({
  background_color: "#fafafa",
  description: SITE_NAME,
  display: "standalone",
  icons: [
    { purpose: "any", sizes: "any", src: "/icon.svg", type: "image/svg+xml" },
    { sizes: "any", src: "/favicon.ico", type: "image/x-icon" },
  ],
  name: SITE_NAME,
  short_name: "Template",
  start_url: "/",
  theme_color: "#fafafa",
});

export default manifest;
