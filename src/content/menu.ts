import type { L10n } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────
 *  菜單資料（四語系 + 價格）
 *  改價格、新增品項，只需要改這個檔案；網站與搜尋引擎結構化資料會一起更新。
 * ─────────────────────────────────────────────
 */

export type Accent = "red" | "brown" | "green" | "navy" | "plum" | "teal";

export type MenuItem = {
  name: L10n;
  /** 新台幣 */
  price: number;
  /** 可選「湯」或「乾」 */
  modes?: boolean;
  badge?: "signature" | "limited" | "takeout";
  size?: string;
  alcohol?: boolean;
  /** 照片檔名（不含副檔名），放在 public/images/menu/，沒填就顯示占位圖 */
  img?: string;
  note?: L10n;
};

export type MenuCategory = {
  id: string;
  accent: Accent;
  name: L10n;
  note?: L10n;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "noodle",
    accent: "red",
    name: { zh: "主食類", en: "Noodle Soups", ja: "麺（ビーフン）", ko: "면 요리" },
    items: [
      {
        name: {
          zh: "豬雜米粉湯",
          en: "Pork Offal Rice Noodle Soup",
          ja: "豚もつビーフンスープ",
          ko: "돼지 내장 쌀국수탕",
        },
        price: 140,
        img: "noodle-offal",
        badge: "signature",
      },
      {
        name: {
          zh: "清米粉湯",
          en: "Plain Rice Noodle Soup",
          ja: "あっさりビーフンスープ",
          ko: "맑은 쌀국수탕",
        },
        price: 70,
        img: "noodle-plain",
      },
    ],
  },
  {
    id: "rice",
    accent: "red",
    name: { zh: "米飯類", en: "Rice", ja: "ご飯もの", ko: "밥 요리" },
    note: {
      zh: "兩款湯飯，11:50 前現場享早鳥價 NT$100",
      en: "Both soup-and-rice bowls: early-bird price NT$100 on-site before 11:50",
      ja: "2種のスープごはんは、11:50までの来店で早割 NT$100",
      ko: "두 가지 탕밥 모두 11:50 이전 현장 방문 시 얼리버드 NT$100",
    },
    items: [
      {
        name: {
          zh: "辣味噌豬雜湯飯",
          en: "Spicy Miso Offal Soup with Rice",
          ja: "辛味噌もつスープごはん",
          ko: "매운 된장 내장탕밥",
        },
        price: 140,
        img: "rice-miso",
      },
      {
        name: {
          zh: "古早味豬雜湯飯",
          en: "Classic Offal Soup with Rice",
          ja: "古早味もつスープごはん",
          ko: "전통 내장탕밥",
        },
        price: 140,
        img: "rice-classic",
      },
      {
        name: {
          zh: "冠軍滷肉飯",
          en: "Champion Braised Pork Rice (Lu Rou Fan)",
          ja: "チャンピオン魯肉飯（ルーローハン）",
          ko: "챔피언 루러우판 (대만식 돼지고기 덮밥)",
        },
        price: 70,
        img: "rice-luroufan",
      },
    ],
  },
  {
    id: "set",
    accent: "navy",
    name: { zh: "商業套餐類", en: "Set Meals", ja: "セットメニュー", ko: "세트 메뉴" },
    items: [
      {
        name: {
          zh: "豬雜米粉湯＋煙燻豬頭肉 或 煙燻豆干",
          en: "Offal Noodle Soup + Smoked Pork Head Meat or Smoked Tofu",
          ja: "豚もつビーフン＋燻製豚頭肉 または 燻製干し豆腐",
          ko: "내장 쌀국수 + 훈제 돼지머리고기 또는 훈제 건두부",
        },
        price: 170,
        img: "set-noodle",
        badge: "signature",
      },
      {
        name: {
          zh: "冠軍滷肉飯＋綜合豬雜＋豬血湯",
          en: "Braised Pork Rice + Assorted Offal + Pork Blood Soup",
          ja: "魯肉飯＋もつ盛り合わせ＋豚の血のスープ",
          ko: "루러우판 + 모둠 내장 + 선지탕",
        },
        price: 170,
        img: "set-rice",
      },
      {
        name: {
          zh: "豬雜滷肉飯便當",
          en: "Offal & Braised Pork Rice Bento",
          ja: "もつ魯肉飯弁当",
          ko: "내장 루러우판 도시락",
        },
        price: 120,
        img: "set-bento",
        badge: "takeout",
      },
    ],
  },
  {
    id: "soup",
    accent: "green",
    name: { zh: "湯品類", en: "Soups", ja: "スープ", ko: "국물 요리" },
    items: [
      {
        name: {
          zh: "香菇貢丸湯",
          en: "Shiitake & Pork Meatball Soup",
          ja: "しいたけ入り肉団子スープ",
          ko: "표고버섯 완자탕",
        },
        price: 60,
      },
      {
        name: { zh: "豬血湯", en: "Pork Blood Soup", ja: "豚の血のスープ", ko: "선지탕" },
        price: 60,
      },
    ],
  },
  {
    id: "offal",
    accent: "brown",
    name: {
      zh: "下水類（黑白切）",
      en: "Offal Cuts (Hei-Bai-Qie)",
      ja: "もつ各種（黒白切）",
      ko: "내장 부위 (헤이바이체)",
    },
    note: {
      zh: "每一味都可選「湯」或「乾」",
      en: "Every cut is served either in soup or dry",
      ja: "どの部位も「スープ」か「汁なし」を選べます",
      ko: "모든 부위를 ‘국물’ 또는 ‘건식’으로 선택할 수 있어요",
    },
    items: [
      {
        name: { zh: "綜合豬雜", en: "Assorted Offal", ja: "もつ盛り合わせ", ko: "모둠 내장" },
        price: 90,
        modes: true,
      },
      {
        name: {
          zh: "肝連肉",
          en: "Gan-lian (Pork Diaphragm)",
          ja: "肝連（豚の横隔膜）",
          ko: "간련 (돼지 횡격막)",
        },
        price: 90,
        modes: true,
      },
      {
        name: { zh: "嘴邊肉", en: "Pork Cheek", ja: "豚ほほ肉", ko: "돼지 볼살" },
        price: 90,
        modes: true,
      },
      {
        name: { zh: "豬心", en: "Pork Heart", ja: "豚ハツ", ko: "돼지 염통" },
        price: 80,
        modes: true,
      },
      {
        name: { zh: "豬舌", en: "Pork Tongue", ja: "豚タン", ko: "돼지 혀" },
        price: 80,
        modes: true,
      },
      {
        name: { zh: "脆腸", en: "Crunchy Intestine", ja: "コリコリ腸", ko: "오독오독 곱창" },
        price: 80,
        modes: true,
      },
      {
        name: {
          zh: "粉腸",
          en: "Soft Intestine (Fen-chang)",
          ja: "粉腸（やわらか小腸）",
          ko: "분장 (부드러운 소장)",
        },
        price: 80,
        modes: true,
      },
      {
        name: { zh: "大腸", en: "Large Intestine", ja: "大腸", ko: "대창" },
        price: 80,
        modes: true,
      },
      {
        name: { zh: "小腸", en: "Small Intestine", ja: "小腸", ko: "소장" },
        price: 80,
        modes: true,
      },
    ],
  },
  {
    id: "limited",
    accent: "plum",
    name: { zh: "限定版美食", en: "Limited Edition", ja: "限定メニュー", ko: "한정 메뉴" },
    items: [
      {
        name: {
          zh: "豬寶貝",
          en: "Zhu Bao Bei",
          ja: "豬寶貝",
          ko: "주바오베이",
        },
        price: 200,
        badge: "limited",
        note: {
          zh: "限定供應，詳情請洽現場",
          en: "Limited availability — ask at the counter",
          ja: "数量限定。詳しくは店頭でご確認ください",
          ko: "한정 판매 — 자세한 내용은 매장에 문의하세요",
        },
      },
    ],
  },
  {
    id: "chilled",
    accent: "navy",
    name: { zh: "冷鮮類", en: "Take-Home", ja: "お持ち帰り（冷凍）", ko: "냉동 포장" },
    items: [
      {
        name: {
          zh: "冠軍極品滷肉汁冷凍包",
          en: "Champion Braised Pork Sauce, frozen pack",
          ja: "チャンピオン魯肉汁 冷凍パック",
          ko: "챔피언 루러우 소스 냉동팩",
        },
        price: 80,
        size: "150g",
      },
    ],
  },
  {
    id: "sides",
    accent: "green",
    name: { zh: "小菜類", en: "Side Dishes", ja: "小皿料理", ko: "반찬" },
    items: [
      {
        name: {
          zh: "蒜泥白肉",
          en: "Sliced Pork with Garlic Sauce",
          ja: "ガーリックソースの茹で豚",
          ko: "마늘소스 삶은 돼지고기",
        },
        price: 120,
      },
      {
        name: {
          zh: "阿婆煙燻豬頭肉",
          en: "Grandma’s Smoked Pork Head Meat",
          ja: "おばあちゃんの燻製豚頭肉",
          ko: "할머니표 훈제 돼지머리고기",
        },
        price: 60,
      },
      {
        name: {
          zh: "阿婆煙燻豆干",
          en: "Grandma’s Smoked Dried Tofu",
          ja: "おばあちゃんの燻製干し豆腐",
          ko: "할머니표 훈제 건두부",
        },
        price: 60,
      },
      {
        name: {
          zh: "老媽辣白菜",
          en: "Mom’s Spicy Napa Cabbage",
          ja: "お母さんの辛い白菜漬け",
          ko: "엄마표 매운 배추",
        },
        price: 60,
      },
      {
        name: { zh: "湯青菜", en: "Blanched Greens", ja: "青菜の湯がき", ko: "데친 채소" },
        price: 60,
      },
      {
        name: { zh: "油豆腐", en: "Fried Tofu", ja: "厚揚げ", ko: "유부" },
        price: 30,
      },
      {
        name: { zh: "菜頭", en: "Daikon Radish", ja: "大根", ko: "무" },
        price: 30,
        modes: true,
      },
      {
        name: {
          zh: "冠軍滷蛋",
          en: "Champion Braised Egg",
          ja: "チャンピオン煮卵",
          ko: "챔피언 간장 계란",
        },
        price: 20,
      },
    ],
  },
  {
    id: "drinks",
    accent: "teal",
    name: {
      zh: "解渴三兄弟",
      en: "The Thirst-Quenching Trio",
      ja: "喉うるおす三兄弟",
      ko: "갈증 해소 삼형제",
    },
    items: [
      {
        name: {
          zh: "經典台灣啤酒",
          en: "Taiwan Beer Classic",
          ja: "台湾ビール クラシック",
          ko: "타이완 맥주 클래식",
        },
        price: 50,
        size: "330ml",
        alcohol: true,
      },
      {
        name: { zh: "可口可樂", en: "Coca-Cola", ja: "コカ・コーラ", ko: "코카콜라" },
        price: 30,
        size: "200ml",
      },
      {
        name: {
          zh: "黑松沙士",
          en: "HeySong Sarsaparilla",
          ja: "黒松サルサパリラ（沙士）",
          ko: "헤이송 사사 (사르사파릴라)",
        },
        price: 30,
        size: "330ml",
      },
    ],
  },
];

export const PRICE_RANGE = "NT$20–200";
