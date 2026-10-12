import type { Metadata, Viewport } from "next";
import {
  Inter,
  Playfair_Display,
  Noto_Sans_TC,
  Noto_Serif_TC,
  Noto_Sans_JP,
  Noto_Serif_JP,
  Noto_Sans_KR,
  Noto_Serif_KR,
} from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { LOCALES, getDict, isLocale } from "@/lib/i18n";
import { SITE_URL } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { JsonLd } from "@/components/JsonLd";
import { entityGraph } from "@/lib/schema";
import { GEO } from "@/content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// 中日韓字體以 unicode-range 切片載入，只會下載頁面實際用到的字
// （next/font 的參數必須是字面值，不能用展開語法或變數）
const sansTC = Noto_Sans_TC({ display: "swap", preload: false, variable: "--font-noto-sans-tc", weight: ["400", "500", "700"] });
const serifTC = Noto_Serif_TC({ display: "swap", preload: false, variable: "--font-noto-serif-tc", weight: ["700", "900"] });
const sansJP = Noto_Sans_JP({ display: "swap", preload: false, variable: "--font-noto-sans-jp", weight: ["400", "500", "700"] });
const serifJP = Noto_Serif_JP({ display: "swap", preload: false, variable: "--font-noto-serif-jp", weight: ["700", "900"] });
const sansKR = Noto_Sans_KR({ display: "swap", preload: false, variable: "--font-noto-sans-kr", weight: ["400", "500", "700"] });
const serifKR = Noto_Serif_KR({ display: "swap", preload: false, variable: "--font-noto-serif-kr", weight: ["700", "900"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "古早味豬雜米粉湯",
  formatDetection: { telephone: true, address: true },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: "restaurant",
  creator: "古早味豬雜米粉湯",
  publisher: "古早味豬雜米粉湯",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "TW-TPE",
    "geo.placename": "Taipei, Da’an District",
    "geo.position": `${GEO.lat};${GEO.lng}`,
    ICBM: `${GEO.lat}, ${GEO.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#130f0d",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  const fontVars = [
    inter,
    playfair,
    sansTC,
    serifTC,
    sansJP,
    serifJP,
    sansKR,
    serifKR,
  ]
    .map((f) => f.variable)
    .join(" ");

  return (
    <html lang={dict.htmlLang} className={fontVars}>
      <body>
        <JsonLd data={entityGraph(locale, dict)} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:text-ink"
        >
          {dict.nav.skip}
        </a>
        <Header
          locale={locale}
          labels={dict.nav}
          brand={{ name: dict.brand.name, tagline: dict.brand.tagline }}
        />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <MobileDock locale={locale} labels={dict.dock} />
      </body>
    </html>
  );
}
