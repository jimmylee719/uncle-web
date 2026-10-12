import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDict, isLocale, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { menuSchema, pageSchema } from "@/lib/schema";
import { MENU, type Accent } from "@/content/menu";
import { CONTACT } from "@/content/site";
import { Arrow, Eyebrow, PhoneIcon } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

const ACCENT: Record<Accent, string> = {
  red: "bg-vermilion",
  brown: "bg-brown",
  green: "bg-forest",
  navy: "bg-navy",
  plum: "bg-plum",
  teal: "bg-teal",
};

export async function generateMetadata({ params }: PageProps<"/[locale]/menu">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/menu", await getDict(locale));
}

export default async function MenuPage({ params }: PageProps<"/[locale]/menu">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const m = dict.menu;

  const badge = (b: "signature" | "limited" | "takeout") => m.badges[b];

  return (
    <>
      <JsonLd data={menuSchema(locale, dict)} />
      <JsonLd
        data={pageSchema(locale, "/menu", dict, {
          name: dict.meta.pages.menu.title,
          description: dict.meta.pages.menu.description,
        })}
      />
      <PageHero eyebrow={m.hero.eyebrow} title={m.hero.title} sub={m.hero.sub}>
        <a href={`tel:${CONTACT.phoneIntl}`} className="btn btn-red">
          <PhoneIcon />
          <span className="numeral">{CONTACT.phoneDisplay}</span>
        </a>
      </PageHero>

      {/* 第一次來？ */}
      <section className="grain grain-paper section bg-paper-2">
        <div className="container-x">
          <Eyebrow className="rv text-vermilion">{m.how.eyebrow}</Eyebrow>
          <h2 className="t-h2 rv mt-6 max-w-3xl">{m.how.title}</h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-ink/15 md:grid-cols-3">
            {m.how.steps.map((st, i) => (
              <li key={st.t} className="rv bg-paper-2 p-8 md:p-10">
                <span className="numeral text-6xl font-black text-vermilion/90">{i + 1}</span>
                <h3 className="t-h3 mt-4">{st.t}</h3>
                <p className="mt-3 opacity-80">{st.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 完整菜單 */}
      <section className="grain grain-paper section bg-paper">
        <div className="container-x">
          {/* 分類快速跳轉 */}
          <nav
            aria-label="Menu categories"
            className="sticky top-[72px] z-30 -mx-[var(--gutter)] mb-14 overflow-x-auto bg-paper/90 px-[var(--gutter)] py-3 backdrop-blur-md md:top-[84px]"
          >
            <ul className="flex w-max gap-2">
              {MENU.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold tracking-wider ring-1 ring-ink/20 transition-colors hover:bg-ink hover:text-cream"
                  >
                    {c.name[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16 lg:columns-2 lg:gap-x-16 lg:space-y-0 [&>section]:break-inside-avoid lg:[&>section]:mb-16">
            {MENU.map((cat) => (
              <section key={cat.id} id={cat.id} className="rv scroll-mt-40">
                <h2 className={`menu-tab text-lg md:text-xl ${ACCENT[cat.accent]}`}>{cat.name[locale]}</h2>
                {cat.note && <p className="mt-4 text-sm font-semibold text-vermilion">{cat.note[locale]}</p>}
                <ul className="mt-4">
                  {cat.items.map((it) => (
                    <li key={it.name.zh} className="flex gap-4 border-b border-dashed border-ink/20 py-4">
                      {it.img ? (
                        <Image
                          src={`/images/menu/${it.img}.jpg`}
                          alt={`${it.name[locale]} — ${it.name.en}`}
                          width={400}
                          height={400}
                          sizes="(min-width: 640px) 112px, 88px"
                          className="h-[88px] w-[88px] shrink-0 rounded-xl object-cover ring-1 ring-ink/10 sm:h-28 sm:w-28"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-paper-2 ring-1 ring-ink/10 sm:h-28 sm:w-28"
                        >
                          <Image
                            src="/images/mascot.png"
                            alt=""
                            fill
                            sizes="112px"
                            className="object-contain p-3 opacity-45 grayscale"
                          />
                        </span>
                      )}
                      <div className="min-w-0 flex-1 self-center">
                        <div className="flex items-baseline gap-3">
                          <span className="text-[1.08rem] font-bold leading-snug">
                            {it.name[locale]}
                            {it.size && <span className="ml-2 text-sm font-medium opacity-55">{it.size}</span>}
                          </span>
                          {it.badge && (
                            <span className="shrink-0 -translate-y-[1px] rounded-sm bg-vermilion px-2 py-0.5 text-[0.7rem] font-bold tracking-wider text-cream">
                              {badge(it.badge)}
                            </span>
                          )}
                          <span className="leader" aria-hidden />
                          <span className="numeral shrink-0 text-xl font-bold text-vermilion">
                            {dict.common.nt}
                            {it.price}
                          </span>
                        </div>
                        {(it.modes || it.note) && (
                          <p className="mt-1 text-sm opacity-60">
                            {it.modes && <span className="mr-3 font-semibold">{dict.common.soupOrDry}</span>}
                            {it.note?.[locale]}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-16 max-w-3xl text-sm leading-7 opacity-65">
            {m.priceNote}
            <br />
            {m.photoNote}
            <br />
            {m.alcohol}
          </p>
        </div>
      </section>

      {/* 加量不加價 */}
      <section className="grain bg-vermilion py-16 text-cream md:py-24">
        <div className="container-x grid items-center gap-8 md:grid-cols-12">
          <h2 className="t-h2 md:col-span-6">{m.promise.title}</h2>
          <p className="t-lead md:col-span-6 opacity-90">{m.promise.body}</p>
        </div>
      </section>

      {/* 訂餐與紙本菜單 */}
      <section className="grain bg-ink section text-cream">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="rv text-ember">{m.order.title}</Eyebrow>
            <a
              href={`tel:${CONTACT.phoneIntl}`}
              className="numeral rv mt-6 block text-[clamp(2.6rem,7vw,6rem)] font-black leading-none hover:text-ember"
            >
              {CONTACT.phoneDisplay}
            </a>
            <p className="t-lead rv mt-8 max-w-xl opacity-85">{m.order.body}</p>
            <div className="rv mt-10 flex flex-wrap gap-3">
              <a href={`tel:${CONTACT.phoneIntl}`} className="btn btn-red">
                <PhoneIcon />
                {m.order.cta}
              </a>
              <a href="/images/menu-poster.jpg" target="_blank" rel="noopener" className="btn btn-line">
                {m.posterCta}
              </a>
            </div>
            <Link href={localePath(locale, "/faq")} className="link-arrow rv mt-8 text-sm">
              {dict.nav.faq}
              <Arrow />
            </Link>
          </div>
          <a
            href="/images/menu-poster.jpg"
            target="_blank"
            rel="noopener"
            aria-label={m.posterTitle}
            className="rv-img mx-auto block w-[min(80vw,340px)] rotate-[2.5deg] bg-cream p-2.5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:rotate-0 lg:col-span-5"
          >
            <Image
              src="/images/menu-poster.jpg"
              alt={m.posterTitle}
              width={1024}
              height={1536}
              sizes="340px"
              className="h-auto w-full"
            />
          </a>
        </div>
      </section>
    </>
  );
}
