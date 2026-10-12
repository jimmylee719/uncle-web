import Link from "next/link";
import Image from "next/image";
import type { Dict } from "@/content/dict/zh";
import { BRAND, CONTACT, HOURS, LINKS } from "@/content/site";
import { LOCALES, LOCALE_LABEL, localePath, type Locale } from "@/lib/i18n";

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const nav = [
    { href: "/story", label: dict.nav.story },
    { href: "/menu", label: dict.nav.menu },
    { href: "/stores", label: dict.nav.stores },
    { href: "/faq", label: dict.nav.faq },
    { href: "/franchise", label: dict.nav.franchise },
  ];
  const slot = (h: (typeof HOURS)[number]) => `${h.open}–${h.close}`;
  const social = [
    { label: "Instagram", href: LINKS.instagram },
    { label: "Facebook", href: LINKS.facebook },
    { label: "LINE", href: LINKS.line },
  ].filter((s) => s.href);

  return (
    <footer className="grain relative overflow-hidden bg-ink pb-28 pt-20 text-cream md:pb-12 md:pt-28">
      <div className="container-x relative z-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <span className="relative block h-16 w-16 overflow-hidden rounded-full bg-cream">
                <Image src="/images/mascot.png" alt="" fill sizes="64px" className="object-contain p-1" />
              </span>
              <div>
                <p className="font-serif text-2xl font-black">{dict.brand.name}</p>
                <p className="t-eyebrow mt-1 opacity-60">{BRAND.tagline}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-8 opacity-70">{dict.footer.blurb}</p>
          </div>

          <div className="md:col-span-2">
            <p className="t-eyebrow mb-5 opacity-50">{dict.footer.explore}</p>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={localePath(locale, n.href)}
                    className="opacity-85 transition-opacity hover:text-ember hover:opacity-100"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="t-eyebrow mb-5 opacity-50">{dict.footer.contact}</p>
            <address className="space-y-3 text-[0.95rem] not-italic leading-7 opacity-85">
              <p>{CONTACT.address[locale]}</p>
              <p>
                <a href={`tel:${CONTACT.phoneIntl}`} className="numeral text-lg font-bold hover:text-ember">
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p className="numeral text-sm opacity-80">
                {dict.stores.hoursRows[0].day}
                <br />
                {HOURS.map(slot).join(" / ")}
              </p>
              <p className="flex flex-wrap gap-x-5 gap-y-1 pt-1 text-sm">
                <a href={LINKS.maps} target="_blank" rel="noopener noreferrer" className="underline decoration-cream/30 underline-offset-4 hover:text-ember">
                  {dict.footer.googleMaps}
                </a>
                {social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-cream/30 underline-offset-4 hover:text-ember">
                    {s.label}
                  </a>
                ))}
              </p>
            </address>
          </div>

          <div className="md:col-span-2">
            <p className="t-eyebrow mb-5 opacity-50">{dict.nav.language}</p>
            <ul className="space-y-3">
              {LOCALES.map((l) => (
                <li key={l}>
                  <Link
                    href={localePath(l, "/")}
                    hrefLang={l}
                    className={`transition-opacity hover:text-ember ${l === locale ? "text-ember" : "opacity-85"}`}
                  >
                    {LOCALE_LABEL[l]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/10 pt-8 text-xs opacity-60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {dict.brand.name} · {BRAND.googleName}. {dict.footer.rights}.
          </p>
          <p>{dict.footer.alcohol}</p>
        </div>
      </div>
    </footer>
  );
}
