import type { L10n } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────
 *  站點基本資料（電話、地址、營業時間、連結）
 *  要改店家資訊，只需要改這個檔案。
 * ─────────────────────────────────────────────
 */

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
).replace(/\/$/, "");

export const BRAND = {
  zh: "古早味豬雜米粉湯",
  short: "古早味",
  tagline: "豚之香 ・ 台北大安",
  en: "Gu Zao Wei",
  descriptor: "Pork Offal & Rice Noodle Soup",
  /** Google 商家與 Uber Eats 上登記的店名；在地搜尋、外送平台都用這個名字找得到 */
  googleName: "豚之香豬雜米粉湯，滷肉飯",
};

/**
 * Google 商家資料（取自店家 Google 商家檔案，2026-10-07 擷取）
 * 評分與評論數是「快照」，之後可手動更新數字。
 */
export const GOOGLE = {
  cid: "10554794287468219487",
  kgmid: "/g/11z7qp2d8y",
  rating: 4.4,
  reviewCount: 27,
  cashOnly: true,
  dogsAllowed: true,
  /** 使用者提供的 Google 分享連結 */
  shareUrl: "https://share.google/CC2vyJhaqpsKKMS4R",
  /** Google 地圖商家頁（以 CID 開啟） */
  mapsUrl: "https://www.google.com/maps?cid=10554794287468219487",
};

export const CONTACT = {
  /** 訂餐／洽詢電話（國際格式，用於 tel: 連結與結構化資料） */
  phoneIntl: "+886-2-2778-0039",
  phoneDisplay: "(02) 2778-0039",
  /** 加盟洽詢電話；目前與門市同線，之後有專線可改這裡 */
  franchisePhoneIntl: "+886-2-2778-0039",
  franchisePhoneDisplay: "(02) 2778-0039",
  postalCode: "106",
  address: {
    zh: "台北市大安區忠孝東路四段216巷40弄16號",
    en: "No. 16, Aly. 40, Ln. 216, Sec. 4, Zhongxiao E. Rd., Da’an Dist., Taipei City 106, Taiwan",
    ja: "台湾 台北市大安区 忠孝東路四段216巷40弄16号",
    ko: "대만 타이베이시 다안구 중샤오동로 4단 216항 40롱 16호",
  } satisfies L10n,
};

/** 營業時間：days 用 0=週日 … 6=週六；時間為台北時間（UTC+8） */
export const HOURS: { days: number[]; open: string; close: string }[] = [
  { days: [1, 2, 3, 4, 5], open: "11:30", close: "14:00" },
  { days: [1, 2, 3, 4, 5], open: "17:00", close: "20:00" },
];

export const TIMEZONE = "Asia/Taipei";

/** 店面座標（取自 Google 地圖），用於搜尋引擎的結構化資料 */
export const GEO = { lat: 25.0393102, lng: 121.5522654 };

/** 內容最後更新日（sitemap 與結構化資料的 dateModified）。改過文案或菜單後請一起更新。 */
export const CONTENT_UPDATED = "2026-10-07";

export const LINKS = {
  maps: GOOGLE.mapsUrl,
  mapsShare: GOOGLE.shareUrl,
  mapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(
    `${BRAND.googleName} ${CONTACT.address.zh}`,
  )}&hl=zh-TW&z=17&output=embed`,
  /** 有官方網址再填，例如 Instagram / Facebook / LINE 官方帳號 / Uber Eats 店家頁。留空就不會顯示。 */
  instagram: "",
  facebook: "",
  line: "",
  ubereats: "",
};

export const OG_IMAGE = "/og.png";
