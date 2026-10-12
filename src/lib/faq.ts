import type { Dict } from "@/content/dict/zh";
import { CONTACT, GOOGLE, HOURS } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** 營業時間的可讀文字，例如「週一至週五 11:30–14:00 / 17:00–20:00」 */
export function hoursText(dict: Dict) {
  const slots = HOURS.map((h) => `${h.open}–${h.close}`).join(" / ");
  return `${dict.stores.hoursRows[0].day} ${slots}`;
}

/** 把問答裡的 {address} {phone} {hours} {rating} {count} 換成站點設定的實際資料 */
export function fillTokens(text: string, locale: Locale, dict: Dict) {
  return text
    .replaceAll("{address}", CONTACT.address[locale])
    .replaceAll("{phone}", CONTACT.phoneDisplay)
    .replaceAll("{hours}", hoursText(dict))
    .replaceAll("{rating}", GOOGLE.rating.toFixed(1))
    .replaceAll("{count}", String(GOOGLE.reviewCount));
}

export function faqItems(locale: Locale, dict: Dict) {
  return dict.faq.items.map((it) => ({
    q: fillTokens(it.q, locale, dict),
    a: fillTokens(it.a, locale, dict),
  }));
}
