"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Dict } from "@/content/dict/zh";
import type { Locale } from "@/lib/i18n";
import { Arrow } from "@/components/ui";

type Labels = Dict["franchise"]["form"];
type Status = "idle" | "sending" | "success" | "error" | "invalid";

const field =
  "w-full rounded-xl border border-cream/20 bg-cream/[0.06] px-4 py-3.5 text-[1rem] text-cream placeholder:text-cream/40 transition focus:border-ember focus:bg-cream/[0.1] focus:outline-none";

export function FranchiseForm({ locale, labels }: { locale: Locale; labels: Labels }) {
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef<number>(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("invalid");
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/franchise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          consent: data.consent === "on",
          locale,
          elapsed: Date.now() - startedAt.current,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const label = (text: string, required = false) => (
    <span className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide text-cream/85">
      {text}
      {required && <span className="text-ember">*</span>}
    </span>
  );

  return (
    <form
      onSubmit={onSubmit}
      onFocus={() => {
        if (!startedAt.current) startedAt.current = Date.now();
      }}
      noValidate
      className="grid gap-5 md:grid-cols-2"
    >
      <label className="block">
        {label(labels.name, true)}
        <input name="name" required maxLength={80} autoComplete="name" className={field} />
      </label>
      <label className="block">
        {label(labels.phone, true)}
        <input name="phone" type="tel" required maxLength={30} autoComplete="tel" className={field} />
      </label>
      <label className="block">
        {label(labels.email, true)}
        <input name="email" type="email" required maxLength={120} autoComplete="email" className={field} />
      </label>
      <label className="block">
        {label(labels.line)}
        <input name="line" maxLength={60} className={field} />
      </label>
      <label className="block">
        {label(labels.region, true)}
        <input name="region" required maxLength={120} className={field} />
      </label>
      <label className="block">
        {label(labels.format, true)}
        <select name="format" required defaultValue="" className={`${field} [&>option]:text-ink`}>
          <option value="" disabled>
            {labels.select}
          </option>
          {labels.formatOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      <label className="block md:col-span-2">
        {label(labels.budget)}
        <select name="budget" defaultValue="" className={`${field} [&>option]:text-ink`}>
          <option value="">{labels.select}</option>
          {labels.budgetOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      <label className="block md:col-span-2">
        {label(labels.message)}
        <textarea name="message" rows={4} maxLength={2000} className={`${field} resize-y`} />
      </label>

      {/* 防機器人陷阱欄位：真人看不到也不會填 */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm leading-7 text-cream/75 md:col-span-2">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1.5 h-4 w-4 shrink-0 accent-[var(--color-vermilion-2)]"
        />
        <span>{labels.consent}</span>
      </label>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center">
        <button type="submit" disabled={status === "sending"} className="btn btn-red disabled:opacity-60">
          {status === "sending" ? labels.sending : labels.submit}
          <Arrow />
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm leading-7 ${
            status === "success" ? "text-emerald-300" : status === "idle" ? "" : "text-ember"
          }`}
        >
          {status === "success" && labels.success}
          {status === "error" && labels.error}
          {status === "invalid" && labels.invalid}
        </p>
      </div>
    </form>
  );
}
