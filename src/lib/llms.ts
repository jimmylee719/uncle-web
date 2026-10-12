import zh from "@/content/dict/zh";
import en from "@/content/dict/en";
import ja from "@/content/dict/ja";
import ko from "@/content/dict/ko";
import { MENU } from "@/content/menu";
import { BRAND, CONTACT, CONTENT_UPDATED, GOOGLE, LINKS, SITE_URL } from "@/content/site";
import { LOCALES, PAGES, localePath, type Locale } from "@/lib/i18n";
import { faqItems, fillTokens, hoursText } from "@/lib/faq";

const DICTS = { zh, en, ja, ko };
const NAMES: Record<Locale, string> = { zh: "繁體中文", en: "English", ja: "日本語", ko: "한국어" };
const PAGE_NAME = (l: Locale, p: (typeof PAGES)[number]) => {
  const d = DICTS[l];
  return { "/": d.nav.home, "/story": d.nav.story, "/menu": d.nav.menu, "/stores": d.nav.stores, "/faq": d.nav.faq, "/franchise": d.nav.franchise }[p];
};
const url = (l: Locale, p: string) => `${SITE_URL}${localePath(l, p) === "/" ? "" : localePath(l, p)}`;

function facts(l: Locale) {
  const d = DICTS[l];
  const f = d.faq;
  return [
    `- ${f.labels.name}: ${f.values.name}`,
    `- ${f.labels.cuisine}: ${f.values.cuisine}`,
    `- ${f.labels.address}: ${CONTACT.address[l]}`,
    `- ${f.labels.hours}: ${hoursText(d)}`,
    `- ${f.labels.phone}: ${CONTACT.phoneIntl}`,
    `- ${f.labels.price}: ${f.values.price}`,
    `- ${f.labels.payment}: ${f.values.payment}`,
    `- ${f.labels.delivery}: ${f.values.delivery}`,
    `- ${f.labels.pets}: ${f.values.pets}`,
    `- ${f.labels.rating}: ${fillTokens(f.values.rating, l, d)}`,
    `- Google Maps: ${GOOGLE.mapsUrl}`,
  ].join("\n");
}

function pagesList(l: Locale) {
  return PAGES.map((p) => `- [${PAGE_NAME(l, p)}](${url(l, p)}): ${DICTS[l].meta.pages[({ "/": "home", "/story": "story", "/menu": "menu", "/stores": "stores", "/faq": "faq", "/franchise": "franchise" } as const)[p]].description}`).join("\n");
}

function faq(l: Locale) {
  return faqItems(l, DICTS[l]).map((i) => `### ${i.q}\n${i.a}`).join("\n\n");
}

function menu(l: Locale) {
  return MENU.map(
    (c) =>
      `### ${c.name[l]}\n` +
      c.items
        .map(
          (i) =>
            `- ${i.name[l]}${i.size ? ` (${i.size})` : ""}: NT$${i.price}${i.modes ? ` (${DICTS[l].common.soupOrDry})` : ""}`,
        )
        .join("\n"),
  ).join("\n\n");
}

const SUMMARY = `${BRAND.zh} (${BRAND.en}) is a pork offal rice noodle soup and braised-pork-rice shop in Da'an District, Taipei, Taiwan. Listed on Google Maps and Uber Eats as "${BRAND.googleName}". Signature dishes: pork offal rice noodle soup (NT$140), champion braised pork rice (NT$70) and hei-bai-qie assorted cuts (NT$80–90). It is also accepting franchise inquiries from founding partners in Taiwan and overseas.`;

/** /llms.txt：給 AI 搜尋與助理讀的精簡說明 */
export function llmsTxt() {
  return `# ${BRAND.zh} (${BRAND.en}) — Taipei pork offal rice noodle soup

> ${SUMMARY}

Last updated: ${CONTENT_UPDATED}. Prices in NT$. Site languages: ${LOCALES.map((l) => `${NAMES[l]} (${l})`).join(", ")}.

## Key facts (English)
${facts("en")}

## 重點資訊（繁體中文）
${facts("zh")}

## Pages
${LOCALES.map((l) => `### ${NAMES[l]}\n${pagesList(l)}`).join("\n\n")}

## Optional
- [Full text for AI: menu, FAQ in four languages](${SITE_URL}/llms-full.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)
${LINKS.instagram ? `- [Instagram](${LINKS.instagram})\n` : ""}${LINKS.facebook ? `- [Facebook](${LINKS.facebook})\n` : ""}`;
}

/** /llms-full.txt：完整菜單、四語問答、品牌與加盟摘要 */
export function llmsFullTxt() {
  const story = (l: Locale) =>
    DICTS[l].story.chapters.map((c) => `### ${c.no}. ${c.title}\n${c.body.join("\n")}`).join("\n\n");
  const fr = (l: Locale) => {
    const f = DICTS[l].franchise;
    return [
      `${f.hero.title.replace("\n", "")}`,
      f.hero.sub,
      `${f.formats.title}: ${f.formats.items.map((i) => i.title).join(" / ")}`,
      `${f.investment.body}`,
      `${f.investment.note}`,
      `${DICTS[l].franchise.contact.callLabel}: ${CONTACT.franchisePhoneIntl} — ${url(l, "/franchise")}#contact`,
    ].join("\n");
  };
  return `${llmsTxt()}

---

# Full content

## About the brand (English)
${story("en")}

## 品牌故事（繁體中文）
${story("zh")}

## Menu (prices in NT$)
${menu("en")}

## 菜單（新台幣）
${menu("zh")}

## Franchise (English)
${fr("en")}

## 加盟招募（繁體中文）
${fr("zh")}

${LOCALES.map((l) => `## FAQ — ${NAMES[l]}\n${faq(l)}`).join("\n\n")}

## メニュー (日本語)
${menu("ja")}

## 메뉴 (한국어)
${menu("ko")}
`;
}
