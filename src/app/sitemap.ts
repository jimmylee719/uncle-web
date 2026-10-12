import type { MetadataRoute } from "next";
import { HREFLANG, LOCALES, PAGES, localePath, type PagePath } from "@/lib/i18n";
import { CONTENT_UPDATED, SITE_URL } from "@/content/site";

const full = (l: (typeof LOCALES)[number], p: string) => {
  const path = localePath(l, p);
  return `${SITE_URL}${path === "/" ? "" : path}`;
};

const IMAGES: Record<PagePath, string[]> = {
  "/": ["/images/store-front.jpg", "/images/food-offal.jpg", "/images/food-bento.jpg"],
  "/story": ["/images/brush-poster.jpg", "/images/store-inside-2.jpg"],
  "/menu": ["/images/menu-poster.jpg", "/images/food-soup.jpg"],
  "/stores": ["/images/store-front.jpg", "/images/store-inside-1.jpg", "/images/store-inside-2.jpg"],
  "/faq": [],
  "/franchise": ["/images/store-inside-1.jpg"],
};

const PRIORITY: Record<PagePath, number> = {
  "/": 1,
  "/menu": 0.9,
  "/stores": 0.9,
  "/faq": 0.8,
  "/story": 0.7,
  "/franchise": 0.8,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);
  return PAGES.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: full(locale, path),
      lastModified,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: PRIORITY[path],
      images: IMAGES[path].map((i) => `${SITE_URL}${i}`),
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [HREFLANG[l], full(l, path)])),
          "x-default": full("zh", path),
        },
      },
    })),
  );
}
