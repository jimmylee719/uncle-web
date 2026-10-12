# 古早味豬雜米粉湯｜官方網站

Next.js 16（App Router）+ Tailwind CSS 4。繁體中文 / English / 日本語 / 한국어 四語系，全站預先靜態產生，部署到 Vercel 即可。

## 頁面

| 頁面 | 網址（繁中 / 英文） | 內容 |
|---|---|---|
| 首頁 | `/`　`/en` | 品牌開場、四種說法、新鮮到桌＋Google 評分、招牌三味、加量不加價、故事預告、加盟預告、來店資訊＋地圖 |
| 品牌故事 | `/story`　`/en/story` | 五章品牌故事、四個規矩、吉祥物 |
| 菜單 | `/menu`　`/en/menu` | 完整菜單（含價格、湯／乾）、第一次來點餐指南、紙本菜單 |
| 門市資訊 | `/stores`　`/en/stores` | 地址、營業時間（含「營業中」即時狀態）、Google 商家資訊、Uber Eats、照片 |
| 常見問題 | `/faq`　`/en/faq` | 12 題問答＋重點資訊表（地址、時間、價位、付款、外送…），專為搜尋引擎與 AI 助理設計 |
| 加盟招募 | `/franchise`　`/en/franchise` | 優勢、四種店型、總部支援、投資概念、流程、理想夥伴、FAQ、洽詢表單 |

日文 `/ja`、韓文 `/ko` 同樣有以上六頁。

## 本機執行

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 正式建置（部署前先跑一次確認沒問題）
```

## 部署到 Vercel

1. 把這個資料夾推到 GitHub（`素材原檔/` 與 `.claude/` 已在 `.vercelignore`，不會被部署）。
2. Vercel → **Add New Project** → 選這個 repo → Framework 會自動辨識為 Next.js → Deploy。
3. 到 **Settings → Environment Variables** 設定（可參考 `.env.example`）：
   - `RESEND_API_KEY`、`FRANCHISE_INQUIRY_TO`：**加盟表單寄信用，沒設定的話表單送出會失敗**（前端會請訪客改為來電）。
   - `NEXT_PUBLIC_SITE_URL`：綁定自訂網域後填入（例如 `https://www.xxx.com`），用於 SEO、分享圖、sitemap。
4. 綁好網域後，到 [Google Search Console](https://search.google.com/search-console) 新增網站並提交 `https://你的網域/sitemap.xml`。

## 要改內容，改哪裡

| 想改什麼 | 檔案 |
|---|---|
| 電話、地址、營業時間、Google 連結、IG／FB／LINE／Uber Eats 連結 | `src/content/site.ts` |
| 菜單品項與價格（四語） | `src/content/menu.ts` |
| 各頁文案：繁中 | `src/content/dict/zh.ts` |
| 各頁文案：英／日／韓 | `src/content/dict/en.ts`、`ja.ts`、`ko.ts` |
| 顏色、字體、動畫 | `src/app/globals.css` |
| 圖片 | `public/images/`（JPG／PNG，直接換同名檔案即可；原始素材在 `素材原檔/`） |
| 菜單品項照片 | `public/images/menu/`（正方形 JPG，建議 800×800 以上）。品項在 `menu.ts` 用 `img: "檔名"` 指定；換成實拍只要覆蓋同名檔案，沒填 `img` 的品項會顯示黑底占位圖 |
| 常見問題內容 | 各語言 dict 檔的 `faq` 區塊（`{address}` `{phone}` `{hours}` `{rating}` 會自動帶入 `site.ts` 的資料） |

> 文案檔的結構與繁中一致，TypeScript 會在你漏改欄位時報錯。

## ⚠️ 上線前請逐項確認（這些是我依現有素材撰寫、需要店家確認的內容）

1. **品牌名稱**：招牌是「古早味豬雜米粉湯」，但 Google 商家與 Uber Eats 登記的是「**豚之香**豬雜米粉湯，滷肉飯」。網站兩個名字都有放（SEO 與在地搜尋會用到），建議正式統一對外名稱，並讓 Google 商家名稱與招牌一致。英文名「Gu Zao Wei」是我擬的，請確認。
2. **品牌故事**：阿婆的灶、老媽的辣白菜等敘事是依菜單（阿婆煙燻、老媽辣白菜）延伸創作的，非真實歷史，請依實際情況調整。
3. **「24 小時內成為桌上佳餚」**：取自店家 Google 商家貼文（已標註出處），請確認仍屬實。
4. **「每日現滷」「真材實料」「加量不加價（內用）」**：取自現有海報／菜單。
5. **加盟頁**：店型、總部支援項目、流程都是依一般連鎖制度撰寫的**規劃**，請確認總部實際能提供；**投資金額我刻意不寫**（顯示「說明會提供試算」），避免未經確認的數字。依公平交易委員會規範，招募內容需真實，簽約前需提供加盟說明書。
6. **Google 評分（4.4／27 則）**是 2026-10-07 的快照，寫在 `src/content/site.ts`，之後請手動更新。
7. **只收現金、歡迎毛小孩**：取自 Google 商家資訊，如已改變請更新。
8. **圖片**：食物照是從海報裁切放大並做了降噪／調色，解析度仍有限；建議之後拍正式的食物照，替換 `public/images/food-*.jpg`。
9. **菜單照片**：`public/images/menu/` 目前是 AI 生成的示意圖（頁面已標註「照片為示意」），上線前請逐步換成實拍；實拍後可把 `photoNote` 那句拿掉。
10. **常見問題**：12 題答案只用到已知事實（取自菜單、Google 商家、海報）。週末與國定假日是否營業目前寫「以店內公告為準」，確定後請更新。

## SEO 與 AEO（搜尋引擎與 AI 搜尋）

**網站內已完成**

- 每頁獨立的標題／描述、canonical、四語 hreflang（含 x-default）、Open Graph／Twitter 卡片。
- 結構化資料（JSON-LD）：
  - 全站共用一份實體圖：品牌 `Organization`、`WebSite`、`Restaurant`（含座標、營業時間、價位、付款方式、毛小孩、外送、菜單連結、Google 地圖與知識圖譜連結）。
  - 每頁各有 `WebPage`（含麵包屑、主圖、更新日期）；菜單頁有完整 `Menu`；常見問題頁與加盟頁有 `FAQPage`；加盟頁有 `Service`。
- **AEO**：`/faq` 以「問題→一句話答案」寫成，附重點資訊表；另有 `/llms.txt`、`/llms-full.txt`（給 ChatGPT、Claude、Perplexity 等 AI 讀的精簡版與完整版：菜單價格、四語問答、品牌與加盟摘要）。
- `robots.txt` 明確歡迎一般與 AI 搜尋爬蟲（GPTBot、OAI-SearchBot、ClaudeBot、PerplexityBot、Google-Extended、Applebot 等）。
- `sitemap.xml` 含四語對照與圖片；圖片自動轉 AVIF／WebP，首屏圖優先載入。
- 資料來源都集中在 `src/content/site.ts`，改一次，網站、結構化資料、`llms.txt` 同步更新。

**上線後你要做的（這些在網站外，對排名與 AI 引用影響很大）**

1. **Google 商家檔案**：把「網站」欄填上正式網址；店名、地址、電話要和網站一模一樣；補上菜單連結、Uber Eats 連結、營業時間（含週末／假日）、多拍幾張食物照，並請老客人留評論、回覆每則評論。
2. **Google Search Console**：驗證網站（把驗證碼填進 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`）→ 提交 `sitemap.xml`。**Bing Webmaster Tools** 也提交一次（ChatGPT 搜尋會參考 Bing）。
3. 在 **Apple 地圖（Apple Business Connect）**、**Bing Places** 建立商家，資料與 Google 一致。
4. 讓網站被別的地方提到：Uber Eats 店頁加上官網、IG／FB 簡介放官網連結、爭取部落客／媒體報導與美食平台（如 iFood、Walkerland）收錄。AI 搜尋會看「有多少可信來源在講同一家店」。
5. 之後每次改菜單／價格／營業時間，記得更新 `site.ts` 的 `CONTENT_UPDATED` 日期。

## 技術備註

- 繁中網址不帶前綴，其他語言帶 `/en`、`/ja`、`/ko`；`/zh/...` 會自動 308 導回無前綴網址。
- 每頁都有 canonical、hreflang、Open Graph、JSON-LD（Restaurant、Menu、FAQ、Breadcrumb）。
- 表單有蜜罐欄位與送出時間檢查擋機器人；若之後垃圾信變多，可再加 Cloudflare Turnstile。
- 字體使用 `next/font`（自動自託管）；中日韓字體分片載入，只下載用到的字。
