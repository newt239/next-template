import type { NextConfig } from "next";

import "./src/lib/env";

const nextConfig: NextConfig = {
  cacheComponents: true,
  typedRoutes: true,
};

export default nextConfig;
