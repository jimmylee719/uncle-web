import type { NextConfig } from "next";

/** 繁體中文是預設語系，網址不帶前綴；其他語言用 /en /ja /ko 前綴。 */
const ZH_PAGES = ["story", "menu", "stores", "faq", "franchise"];

const nextConfig: NextConfig = {
  experimental: {
    // 讓不存在的網址也能顯示品牌 404（根版面在 [locale] 底下）
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/zh", destination: "/", permanent: true },
      { source: "/zh/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/zh" },
        ...ZH_PAGES.map((p) => ({ source: `/${p}`, destination: `/zh/${p}` })),
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
