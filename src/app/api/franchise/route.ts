import { NextResponse } from "next/server";

/**
 * 加盟洽詢表單 API
 * 用 Resend 寄信到店家信箱。需要在 Vercel 設定環境變數：
 *   RESEND_API_KEY         （必填）Resend 後台建立的 API Key
 *   FRANCHISE_INQUIRY_TO   （必填）收信信箱，多個用逗號分隔
 *   FRANCHISE_INQUIRY_FROM （選填）寄件人，預設用 Resend 測試寄件地址
 * 沒設定時：開發模式只在終端機印出內容；正式環境回傳 503（前端會顯示「請來電」）。
 */

const clean = (v: unknown, max: number) =>
  (typeof v === "string" ? v : "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // 陷阱欄位被填、或表單送出快得不像真人 → 假裝成功，不寄信
  const elapsed = Number(body.elapsed) || 0;
  if (clean(body.website, 50) || (elapsed > 0 && elapsed < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 120);
  const region = clean(body.region, 120);
  const format = clean(body.format, 80);
  const line = clean(body.line, 60);
  const budget = clean(body.budget, 60);
  const message = typeof body.message === "string" ? body.message.slice(0, 2000).trim() : "";
  const locale = clean(body.locale, 5);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const phoneOk = /^[0-9+()\-\s.#]{6,30}$/.test(phone);
  if (!name || !phoneOk || !emailOk || !region || !format || body.consent !== true) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const text = [
    "【古早味豬雜米粉湯｜加盟洽詢】",
    "",
    `姓名：${name}`,
    `電話：${phone}`,
    `信箱：${email}`,
    `LINE：${line || "-"}`,
    `想開店的城市／國家：${region}`,
    `有興趣的店型：${format}`,
    `預計預算：${budget || "-"}`,
    `填寫語言：${locale || "-"}`,
    "",
    "留言：",
    message || "-",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.FRANCHISE_INQUIRY_TO || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey || to.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[franchise inquiry — 尚未設定寄信，只在開發模式顯示]\n" + text);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("franchise inquiry: RESEND_API_KEY / FRANCHISE_INQUIRY_TO not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.FRANCHISE_INQUIRY_FROM || "Gu Zao Wei Website <onboarding@resend.dev>",
      to,
      reply_to: email,
      subject: `【加盟洽詢】${name}｜${region}｜${format}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("franchise inquiry: resend failed", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
