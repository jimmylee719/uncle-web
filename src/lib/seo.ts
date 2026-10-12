import type { Metadata } from "next";
import { HREFLANG, LOCALES, localePath, type Locale, type PagePath } from "@/lib/i18n";
import { OG_IMAGE, SITE_URL } from "@/content/site";
import type { Dict } from "@/content/dict/zh";

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

type PageKey = keyof Dict["meta"]["pages"];

const PAGE_KEY: Record<PagePath, PageKey> = {
  "/": "home",
  "/story": "story",
  "/menu": "menu",
  "/stores": "stores",
  "/faq": "faq",
  "/franchise": "franchise",
};

/** 每一頁的 title / description / canonical / hreflang / Open Graph */
export function pageMetadata(locale: Locale, path: PagePath, dict: Dict): Metadata {
  const { title, description } = dict.meta.pages[PAGE_KEY[path]];
  const url = localePath(locale, path);

  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HREFLANG[l]] = localePath(l, path);
  languages["x-default"] = localePath("zh", path);

  return {
    title: { absolute: title },
    description,
    keywords: dict.meta.keywords,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      siteName: dict.brand.name,
      title,
      description,
      url,
      locale: dict.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) =>
        l === "zh" ? "zh_TW" : l === "en" ? "en_US" : l === "ja" ? "ja_JP" : "ko_KR",
      ),
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: dict.brand.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
