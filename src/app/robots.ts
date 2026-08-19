import type { MetadataRoute } from "next";

import { SITE_URL } from "#/lib/site";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    allow: "/",
    disallow: "/tasks/",
    userAgent: "*",
  },
  sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
});

export default robots;
