"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_LABEL, localePath, type Locale } from "@/lib/i18n";
import { Logo } from "@/components/Logo";
import { Arrow, GlobeIcon } from "@/components/ui";

type Labels = {
  story: string;
  menu: string;
  stores: string;
  franchise: string;
  franchiseCta: string;
  openMenu: string;
  closeMenu: string;
  language: string;
  home: string;
};

function stripLocale(pathname: string) {
  const m = pathname.match(/^\/(zh|en|ja|ko)(\/.*)?$/);
  const p = m ? m[2] || "/" : pathname;
  return p.length > 1 ? p.replace(/\/$/, "") : p;
}

export function Header({
  locale,
  labels,
  brand,
}: {
  locale: Locale;
  labels: Labels;
  brand: { name: string; tagline: string };
}) {
  const pathname = usePathname();
  const base = stripLocale(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [langOpen]);

  const items = [
    { href: "/story", label: labels.story },
    { href: "/menu", label: labels.menu },
    { href: "/stores", label: labels.stores },
    { href: "/franchise", label: labels.franchise },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-cream transition-[background-color,backdrop-filter,box-shadow] duration-500 ${
          scrolled || open
            ? "bg-ink/85 shadow-[0_1px_0_rgba(243,234,215,0.1)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
          <Logo
            locale={locale}
            name={brand.name}
            tagline={brand.tagline}
            label={labels.home}
          />

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {items.map((it) => {
              const active = base === it.href;
              return (
                <Link
                  key={it.href}
                  href={localePath(locale, it.href)}
                  aria-current={active ? "page" : undefined}
                  className="relative py-2 text-[0.95rem] font-semibold tracking-[0.12em] opacity-90 transition-opacity hover:opacity-100"
                >
                  {it.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-ember transition-transform duration-500 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-expanded={langOpen}
                aria-label={labels.language}
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold tracking-wider opacity-90 transition-colors hover:bg-cream/10 hover:opacity-100"
              >
                <GlobeIcon />
                <span>{LOCALE_LABEL[locale]}</span>
              </button>
              {langOpen && (
                <ul className="absolute right-0 top-full mt-2 min-w-40 overflow-hidden rounded-2xl bg-ink-2 py-2 shadow-2xl ring-1 ring-cream/15">
                  {LOCALES.map((l) => (
                    <li key={l}>
                      <Link
                        href={localePath(l, base)}
                        hrefLang={l}
                        onClick={() => setLangOpen(false)}
                        aria-current={l === locale ? "true" : undefined}
                        className={`block px-5 py-2.5 text-sm transition-colors hover:bg-cream/10 ${
                          l === locale ? "text-ember" : ""
                        }`}
                      >
                        {LOCALE_LABEL[l]}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="hidden md:block">
              <Link
                href={`${localePath(locale, "/franchise")}#contact`}
                className="btn btn-line !px-4 !py-2 !text-xs !font-semibold opacity-80 hover:opacity-100"
              >
                {labels.franchiseCta}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? labels.closeMenu : labels.openMenu}
              className="relative flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-cream/30 lg:hidden"
            >
              <span
                className={`absolute h-[2px] w-5 bg-cream transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 bg-cream transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 bg-cream transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* 手機全螢幕選單 */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-ink text-cream transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="container-x flex min-h-full flex-col justify-between pb-10 pt-28">
          <ul className="flex flex-col">
            {items.map((it, i) => (
              <li key={it.href} className="border-b border-cream/10">
                <Link
                  href={localePath(locale, it.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 font-serif text-[2.1rem] font-black"
                  style={{
                    transitionDelay: open ? `${80 + i * 70}ms` : "0ms",
                  }}
                >
                  <span>{it.label}</span>
                  <Arrow className="opacity-50" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-6">
            <Link
              href={`${localePath(locale, "/franchise")}#contact`}
              onClick={() => setOpen(false)}
              className="btn btn-red w-full"
            >
              {labels.franchiseCta}
            </Link>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-80">
              {LOCALES.map((l) => (
                <li key={l}>
                  <Link
                    href={localePath(l, base)}
                    hrefLang={l}
                    onClick={() => setOpen(false)}
                    className={l === locale ? "text-ember" : ""}
                  >
                    {LOCALE_LABEL[l]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
