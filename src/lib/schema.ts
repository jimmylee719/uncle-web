import { BRAND, CONTACT, CONTENT_UPDATED, GEO, GOOGLE, HOURS, LINKS, SITE_URL } from "@/content/site";
import { MENU, PRICE_RANGE } from "@/content/menu";
import { HREFLANG, LOCALES, localePath, type Locale, type PagePath } from "@/lib/i18n";
import type { Dict } from "@/content/dict/zh";

export const abs = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const ID = {
  org: `${SITE_URL}/#organization`,
  site: `${SITE_URL}/#website`,
  restaurant: `${SITE_URL}/#restaurant`,
};

const IMAGES = {
  logo: abs("/images/mascot.png"),
  front: abs("/images/store-front.jpg"),
  inside: abs("/images/store-inside-1.jpg"),
  food: abs("/images/food-offal.jpg"),
  bento: abs("/images/food-bento.jpg"),
};

/**
 * 全站共用的「實體圖」：品牌（Organization）、網站（WebSite）、餐廳（Restaurant）。
 * 每個頁面都帶這一份，讓 Google 與 AI 搜尋把所有頁面串成同一個品牌實體。
 */
export function entityGraph(locale: Locale, dict: Dict) {
  const socials = [LINKS.instagram, LINKS.facebook, LINKS.line].filter(Boolean);
  const sameAs = [GOOGLE.mapsUrl, `https://www.google.com/search?kgmid=${GOOGLE.kgmid}`, ...socials];
  const names = [BRAND.zh, BRAND.googleName, BRAND.en, BRAND.tagline];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ID.org,
        name: dict.brand.name,
        alternateName: names,
        url: abs("/"),
        logo: { "@type": "ImageObject", url: IMAGES.logo, width: 600, height: 586 },
        image: IMAGES.front,
        slogan: dict.home.hero.line1 + dict.home.hero.line2,
        sameAs,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: CONTACT.phoneIntl,
            areaServed: "TW",
            availableLanguage: ["zh-TW", "en", "ja", "ko"],
          },
          {
            "@type": "ContactPoint",
            contactType: "franchise inquiries",
            telephone: CONTACT.franchisePhoneIntl,
            url: abs(localePath(locale, "/franchise")),
            availableLanguage: ["zh-TW", "en", "ja", "ko"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": ID.site,
        url: abs("/"),
        name: dict.brand.name,
        alternateName: names,
        inLanguage: LOCALES.map((l) => HREFLANG[l]),
        publisher: { "@id": ID.org },
      },
      {
        "@type": "Restaurant",
        "@id": ID.restaurant,
        name: dict.brand.name,
        alternateName: names,
        description: dict.meta.pages.home.description,
        url: abs(localePath(locale, "/")),
        image: [IMAGES.front, IMAGES.inside, IMAGES.food, IMAGES.bento],
        logo: IMAGES.logo,
        brand: { "@type": "Brand", name: BRAND.zh, logo: IMAGES.logo },
        parentOrganization: { "@id": ID.org },
        telephone: CONTACT.phoneIntl,
        servesCuisine: ["Taiwanese", "Pork offal", "Rice noodle soup", "Braised pork rice"],
        keywords: dict.meta.keywords.join(", "),
        knowsAbout: ["Taiwanese pork offal soup", "Braised pork rice (lu rou fan)", "Hei-bai-qie", "ホルモン", "豬雜"],
        priceRange: PRICE_RANGE,
        paymentAccepted: "Cash",
        currenciesAccepted: "TWD",
        petsAllowed: true,
        acceptsReservations: false,
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Cash only", value: true },
          { "@type": "LocationFeatureSpecification", name: "Dogs welcome", value: true },
          { "@type": "LocationFeatureSpecification", name: "Delivery via Uber Eats", value: true },
          { "@type": "LocationFeatureSpecification", name: "Take-away", value: true },
        ],
        hasMenu: { "@id": `${abs(localePath(locale, "/menu"))}#menu` },
        hasMap: GOOGLE.mapsUrl,
        geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
        areaServed: { "@type": "City", name: "Taipei" },
        address: {
          "@type": "PostalAddress",
          streetAddress: "忠孝東路四段216巷40弄16號1樓",
          addressLocality: "大安區",
          addressRegion: "台北市",
          postalCode: CONTACT.postalCode,
          addressCountry: "TW",
        },
        openingHoursSpecification: HOURS.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days.map((d) => DAY[d]),
          opens: h.open,
          closes: h.close,
        })),
        sameAs,
      },
    ],
  };
}

type PageKind = "WebPage" | "AboutPage" | "FAQPage" | "ContactPage";

/** 每頁自己的 WebPage 描述（含麵包屑、主圖、更新日期） */
export function pageSchema(
  locale: Locale,
  path: PagePath,
  dict: Dict,
  opts: { type?: PageKind; name: string; description: string; image?: string; extra?: Record<string, unknown> },
) {
  const url = abs(localePath(locale, path));
  const crumbs =
    path === "/"
      ? [{ name: dict.brand.name, url: abs(localePath(locale, "/")) }]
      : [
          { name: dict.brand.name, url: abs(localePath(locale, "/")) },
          { name: opts.name, url },
        ];
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: HREFLANG[locale],
    isPartOf: { "@id": ID.site },
    about: { "@id": ID.restaurant },
    primaryImageOfPage: { "@type": "ImageObject", url: opts.image ?? IMAGES.front },
    dateModified: CONTENT_UPDATED,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
    },
    ...opts.extra,
  };
}

export function menuSchema(locale: Locale, dict: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${abs(localePath(locale, "/menu"))}#menu`,
    name: `${dict.brand.name} — ${dict.nav.menu}`,
    inLanguage: HREFLANG[locale],
    provider: { "@id": ID.restaurant },
    hasMenuSection: MENU.map((cat) => ({
      "@type": "MenuSection",
      name: cat.name[locale],
      ...(cat.note ? { description: cat.note[locale] } : {}),
      hasMenuItem: cat.items.map((it) => ({
        "@type": "MenuItem",
        name: it.name[locale],
        ...(it.modes ? { description: dict.common.soupOrDry } : {}),
        ...(it.img ? { image: abs(`/images/menu/${it.img}.jpg`) } : {}),
        offers: { "@type": "Offer", price: it.price, priceCurrency: "TWD", availability: "https://schema.org/InStock" },
      })),
    })),
  };
}

export const faqEntities = (items: { q: string; a: string }[]) =>
  items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  }));

export function faqSchema(locale: Locale, path: PagePath, items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${abs(localePath(locale, path))}#faq`,
    inLanguage: HREFLANG[locale],
    mainEntity: faqEntities(items),
  };
}

/** 加盟頁：說明加盟方案（不寫金額，避免未經確認的數字） */
export function franchiseServiceSchema(locale: Locale, dict: Dict) {
  const f = dict.franchise;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(localePath(locale, "/franchise"))}#service`,
    name: f.hero.title.replace("\n", ""),
    serviceType: "Franchise opportunity",
    description: f.hero.sub,
    provider: { "@id": ID.org },
    areaServed: ["TW", "Worldwide"],
    audience: { "@type": "BusinessAudience", name: f.partner.title },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${abs(localePath(locale, "/franchise"))}#contact`,
      servicePhone: { "@type": "ContactPoint", telephone: CONTACT.franchisePhoneIntl },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: f.formats.title,
      itemListElement: f.formats.items.map((it) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: it.title, description: it.desc },
      })),
    },
  };
}
