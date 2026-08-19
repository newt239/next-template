import type { MetadataRoute } from "next";

import { SITE_URL } from "#/lib/site";

const sitemap = (): MetadataRoute.Sitemap =>
  ["/", "/login", "/register"].map((path) => ({
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.5,
    url: new URL(path, SITE_URL).toString(),
  }));

export default sitemap;
