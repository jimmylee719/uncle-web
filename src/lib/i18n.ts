export const LOCALES = ["zh", "en", "ja", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

/** 預設語系（繁體中文）網址不帶前綴：/、/menu；其他語系帶前綴：/en、/en/menu */
export const DEFAULT_LOCALE: Locale = "zh";

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** 一段多語文字：{ zh, en, ja, ko } */
export type L10n = Record<Locale, string>;

export const HREFLANG: Record<Locale, string> = {
  zh: "zh-TW",
  en: "en",
  ja: "ja",
  ko: "ko",
};

export const LOCALE_LABEL: Record<Locale, string> = {
  zh: "繁體中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
};

export const PAGES = ["/", "/story", "/menu", "/stores", "/faq", "/franchise"] as const;
export type PagePath = (typeof PAGES)[number];

export function localePath(locale: Locale, path: string = "/"): string {
  const clean = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
}

export async function getDict(locale: Locale) {
  switch (locale) {
    case "en":
      return (await import("@/content/dict/en")).default;
    case "ja":
      return (await import("@/content/dict/ja")).default;
    case "ko":
      return (await import("@/content/dict/ko")).default;
    default:
      return (await import("@/content/dict/zh")).default;
  }
}

export const t = (text: L10n, locale: Locale) => text[locale];
