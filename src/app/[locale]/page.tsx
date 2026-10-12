import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/schema";
import { Arrow, Eyebrow, Lines } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { OpenStatus } from "@/components/OpenStatus";
import { GoogleBadge } from "@/components/GoogleBadge";
import { VisitBlock } from "@/components/VisitBlock";

const css = (o: Record<string, string>) => o as CSSProperties;

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/", await getDict(locale));
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const h = dict.home;
  const L = (p: string) => localePath(locale, p);

  const sigImages = [
    { src: "/images/food-offal.jpg", pos: "50% 50%" },
    { src: "/images/food-bento.jpg", pos: "58% 50%" },
    { src: "/images/food-soup.jpg", pos: "50% 50%" },
  ];

  return (
    <>
      <JsonLd
        data={pageSchema(locale, "/", dict, {
          name: dict.meta.pages.home.title,
          description: dict.meta.pages.home.description,
        })}
      />

      {/* ───────────── HERO ───────────── */}
      <section className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream">
        <div aria-hidden className="hero-glow" />
        <div aria-hidden className="steam" style={css({ left: "4%", bottom: "-12%", width: "40vw", height: "58vh", "--dx": "7%" })} />
        <div aria-hidden className="steam" style={css({ left: "34%", bottom: "-18%", width: "34vw", height: "62vh", "--dx": "-5%", animationDelay: "-6s" })} />
        <div aria-hidden className="steam" style={css({ right: "6%", bottom: "-14%", width: "36vw", height: "56vh", "--dx": "-8%", animationDelay: "-11s" })} />

        <div className="container-x relative z-10 flex flex-1 flex-col pb-8 pt-[92px] md:pt-[108px]">
          <div className="relative flex flex-1 items-center justify-center py-4 md:py-6">
            <div className="relative w-[min(92vw,calc(54svh*1.86),980px)]">
              <Image
                src="/images/brush-cream.png"
                alt="豬雜"
                width={1728}
                height={928}
                priority
                sizes="(min-width: 1024px) 980px, 92vw"
                className="brush-in h-auto w-full"
              />
              <span
                className="seal rise absolute right-[1%] top-[2%] text-[clamp(0.85rem,1.9vw,1.55rem)]"
                style={css({ "--d": "1.7s" })}
              >
                {dict.brand.short}
              </span>
            </div>
          </div>

          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
            <h1 className="t-display rise md:col-span-7" style={css({ "--d": "0.5s" })}>
              <span className="sr-only">{dict.brand.name} — </span>
              <span className="block">{h.hero.line1}</span>
              <span className="block text-ember">{h.hero.line2}</span>
            </h1>
            <div className="rise md:col-span-5" style={css({ "--d": "0.75s" })}>
              <p className="t-eyebrow mb-4 text-ember">{h.hero.eyebrow}</p>
              <p className="t-lead opacity-85">{h.hero.sub}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={L("/menu")} className="btn btn-red">
                  {h.hero.ctaMenu}
                  <Arrow />
                </Link>
                <Link href={L("/stores")} className="btn btn-line">
                  {dict.common.visit}
                </Link>
              </div>
              <OpenStatus labels={dict.status} className="mt-6 text-sm font-semibold opacity-85" />
            </div>
          </div>

          <ul className="rise mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-cream/15 pt-6 text-sm font-semibold tracking-[0.14em] opacity-80 md:flex md:flex-wrap md:gap-x-12" style={css({ "--d": "1s" })}>
            {h.hero.facts.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="text-ember" aria-hidden>
                  ✦
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <span className="scroll-cue absolute bottom-6 right-[var(--gutter)] hidden md:block" aria-label={h.hero.scroll} />
      </section>

      {/* ───────────── MARQUEE ───────────── */}
      <section className="bg-vermilion text-cream" aria-hidden>
        <Marquee items={h.marquee} />
      </section>

      {/* ───────────── 四種說法 ───────────── */}
      <section className="grain grain-paper section bg-paper">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Eyebrow className="rv text-vermilion">{h.names.eyebrow}</Eyebrow>
            <h2 className="t-h2 rv mt-6">
              <Lines text={h.names.title} />
            </h2>
            <ul className="rv mt-10 border-t border-ink/20">
              {h.names.lines.map((l) => (
                <li key={l.word} className="flex items-baseline justify-between gap-6 border-b border-ink/20 py-4 md:py-5">
                  <span className="t-eyebrow opacity-55">{l.region}</span>
                  <span className="font-serif text-[clamp(1.9rem,4.2vw,3.5rem)] font-black leading-tight">{l.word}</span>
                </li>
              ))}
            </ul>
            <p className="t-lead rv mt-10 max-w-xl opacity-85">{h.names.body}</p>
          </div>
          <div className="lg:col-span-5">
            <figure className="rv-img relative mx-auto max-w-[460px] bg-cream p-3 shadow-[0_40px_80px_-30px_rgba(19,15,13,0.55)]">
              <Image
                src="/images/brush-poster.jpg"
                alt={h.names.caption}
                width={1100}
                height={1100}
                sizes="(min-width: 1024px) 460px, 90vw"
                className="h-auto w-full"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ───────────── 24 小時・Google 評分 ───────────── */}
      <section className="grain section overflow-hidden bg-ink-2 text-cream">
        <div className="container-x relative z-10 grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <div className="rv md:col-span-5">
            <span
              className="numeral block text-[clamp(9rem,24vw,21rem)] font-black leading-[0.8] text-transparent [-webkit-text-stroke:2px_var(--color-ember)]"
              aria-hidden
            >
              24
            </span>
            <span className="t-eyebrow mt-4 block text-ember" aria-hidden>
              HOURS
            </span>
          </div>
          <div className="rv md:col-span-7">
            <Eyebrow className="text-ember">{h.trust.eyebrow}</Eyebrow>
            <h2 className="t-h2 mt-6">
              <Lines text={h.trust.title} />
            </h2>
            <p className="t-lead mt-6 max-w-xl opacity-85">{h.trust.body}</p>
            <p className="mt-3 text-xs tracking-wider opacity-50">— {h.trust.source}</p>
            <div className="mt-9">
              <GoogleBadge
                ratingLabel={h.trust.ratingLabel}
                reviews={h.trust.reviews}
                cta={h.trust.viewReviews}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 招牌三味 ───────────── */}
      <section className="grain grain-paper section bg-paper">
        <div className="container-x">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <Eyebrow className="rv text-vermilion">{h.signature.eyebrow}</Eyebrow>
              <h2 className="t-h2 rv mt-6">{h.signature.title}</h2>
            </div>
            <div className="rv md:col-span-4 md:text-right">
              <p className="opacity-75">{h.signature.intro}</p>
            </div>
          </div>

          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {h.signature.items.map((it, i) => (
              <li key={it.name} className={`rv group ${i === 1 ? "md:mt-14" : i === 2 ? "md:mt-28" : ""}`}>
                <div className="photo relative aspect-[4/5] rounded-[1.75rem]">
                  <Image
                    src={sigImages[i].src}
                    alt={`${it.name} — ${it.en}`}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-cover"
                    style={{ objectPosition: sigImages[i].pos }}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-vermilion px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-cream">
                    {it.tag}
                  </span>
                  {i === 2 && (
                    <Image
                      src="/images/sign-heibaiqie.png"
                      alt=""
                      width={1000}
                      height={515}
                      sizes="260px"
                      className="absolute -right-3 bottom-5 w-[62%] drop-shadow-[0_14px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <span className="numeral absolute bottom-3 left-5 text-6xl font-black text-cream/90 drop-shadow-lg">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="t-h3">{it.name}</h3>
                  <span className="numeral shrink-0 text-xl font-bold text-vermilion">{it.price}</span>
                </div>
                <p className="t-eyebrow mt-1 opacity-50">{it.en}</p>
                <p className="mt-4 opacity-80">{it.desc}</p>
              </li>
            ))}
          </ol>

          <div className="rv mt-14 md:mt-24">
            <Link href={L("/menu")} className="btn btn-ink">
              {h.signature.cta}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── 加量不加價 ───────────── */}
      <section className="grain relative overflow-hidden bg-vermilion py-16 text-cream md:py-24">
        <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow className="rv">{h.promise.eyebrow}</Eyebrow>
            <h2 className="t-display rv mt-6">{h.promise.title}</h2>
            <p className="t-lead rv mt-6 max-w-xl opacity-90">{h.promise.body}</p>
            <div className="rv mt-8 flex flex-wrap items-center gap-2.5">
              <span className="t-eyebrow mr-2 opacity-80">{h.promise.label}</span>
              {h.promise.items.map((it) => (
                <span
                  key={it}
                  className="rounded-full border border-cream/45 px-4 py-1.5 text-sm font-bold tracking-wider"
                >
                  + {it}
                </span>
              ))}
            </div>
          </div>
          <div className="rv relative lg:col-span-5">
            <div className="photo relative aspect-[5/4] overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-cream/20">
              <Image
                src="/images/menu/noodle-offal.jpg"
                alt={`${dict.menu.promise.title} — ${h.promise.items.join(" / ")}`}
                fill
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute -left-3 -top-5 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-cream text-vermilion shadow-xl md:-left-8 md:-top-8 md:h-36 md:w-36"
            >
              <span className="numeral text-3xl font-black leading-none md:text-4xl">+NT$0</span>
              <span className="mt-1.5 px-2 text-center text-[0.68rem] font-bold tracking-wider md:text-xs">
                {h.promise.label}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 品牌故事預告 ───────────── */}
      <section className="grain grain-paper section bg-paper-2">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:col-span-6">
            <div className="photo relative rv-img aspect-[4/5] w-[78%] rounded-[1.75rem]">
              <Image
                src="/images/store-front.jpg"
                alt={dict.stores.gallery.front}
                fill
                sizes="(min-width: 1024px) 38vw, 70vw"
                className="object-cover"
              />
            </div>
            <div className="photo rv-img absolute -bottom-8 right-0 aspect-[4/3] w-[58%] rounded-[1.5rem] shadow-2xl ring-8 ring-paper-2">
              <Image
                src="/images/store-inside-2.jpg"
                alt={dict.stores.gallery.inside}
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow className="rv text-vermilion">{h.storyTeaser.eyebrow}</Eyebrow>
            <h2 className="t-h2 rv mt-6">
              <Lines text={h.storyTeaser.title} />
            </h2>
            <p className="t-lead rv mt-8 max-w-lg opacity-85">{h.storyTeaser.body}</p>
            <div className="rv mt-10">
              <Link href={L("/story")} className="btn btn-line btn-line-dark">
                {h.storyTeaser.cta}
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 加盟（精簡版，不搶主視覺） ───────────── */}
      <section className="grain relative overflow-hidden bg-ink-2 py-14 text-cream md:py-20">
        <div className="container-x relative z-10 grid items-center gap-8 md:grid-cols-12 md:gap-12">
          <div className="rv md:col-span-8">
            <Eyebrow className="text-ember">{h.franchise.eyebrow}</Eyebrow>
            <h2 className="t-h3 mt-4 !text-[clamp(1.5rem,2.8vw,2.3rem)]">
              <Lines text={h.franchise.title.replace("\n", "")} />
            </h2>
            <p className="mt-4 max-w-2xl text-[0.98rem] opacity-75">{h.franchise.body}</p>
            <Link href={L("/franchise")} className="link-arrow mt-6 text-sm">
              {h.franchise.cta}
              <Arrow />
            </Link>
          </div>
          <div className="rv hidden justify-self-end md:block md:col-span-4">
            <div className="relative h-36 w-36 overflow-hidden rounded-full bg-cream shadow-xl lg:h-44 lg:w-44">
              <Image src="/images/mascot.png" alt="" fill sizes="176px" className="object-contain p-3" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 來店 ───────────── */}
      <section className="grain grain-paper section bg-paper">
        <VisitBlock locale={locale} dict={dict} heading={h.visit} />
      </section>
    </>
  );
}
