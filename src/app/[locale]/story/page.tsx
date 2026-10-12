import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/schema";
import { Arrow, Lines } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

export async function generateMetadata({ params }: PageProps<"/[locale]/story">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/story", await getDict(locale));
}

export default async function StoryPage({ params }: PageProps<"/[locale]/story">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const s = dict.story;
  const L = (p: string) => localePath(locale, p);

  const art = (
    <Image
      aria-hidden
      alt=""
      src="/images/brush-cream.png"
      width={1728}
      height={928}
      sizes="60vw"
      className="pointer-events-none absolute -right-[8vw] bottom-[-6vw] w-[62vw] max-w-[900px] opacity-[0.07]"
    />
  );

  return (
    <>
      <JsonLd
        data={pageSchema(locale, "/story", dict, {
          type: "AboutPage",
          name: dict.meta.pages.story.title,
          description: dict.meta.pages.story.description,
        })}
      />
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} sub={s.hero.sub} art={art} />

      {s.chapters.map((c, i) => {
        const dark = i % 2 === 1;
        const shell = dark
          ? "grain bg-ink text-cream"
          : "grain grain-paper " + (i === 2 ? "bg-paper-2" : "bg-paper");
        return (
          <section key={c.no} className={`${shell} section`}>
            <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p
                  className={`rv font-serif text-[clamp(5rem,12vw,10rem)] font-black leading-none ${
                    dark ? "text-ember/90" : "text-vermilion/90"
                  }`}
                  aria-hidden
                >
                  {c.no}
                </p>
                <h2 className="t-h2 rv mt-4">{c.title}</h2>
              </div>

              <div className="lg:col-span-8">
                <div className="space-y-6 lg:pt-6">
                  {c.body.map((para, k) => (
                    <p
                      key={k}
                      className={`rv t-lead max-w-2xl ${k === 0 ? "text-[clamp(1.2rem,1.9vw,1.6rem)] font-semibold leading-[1.8]" : "opacity-85"}`}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* 貳：脆嫩彈潤 */}
                {"chips" in c && c.chips && (
                  <ul className="rv mt-12 flex flex-wrap gap-3 md:gap-5">
                    {c.chips.map((chip) => (
                      <li
                        key={chip}
                        className="flex aspect-square min-w-[6.5rem] items-center justify-center rounded-full border border-cream/35 px-5 font-serif text-2xl font-black md:min-w-[8rem] md:text-3xl"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                )}

                {/* 參：四語海報 + 吉祥物 */}
                {i === 2 && (
                  <div className="mt-14 grid items-center gap-10 md:grid-cols-2">
                    <figure className="rv-img mx-auto w-full max-w-[420px] bg-cream p-3 shadow-[0_40px_80px_-30px_rgba(19,15,13,0.5)]">
                      <Image
                        src="/images/brush-poster.jpg"
                        alt="豬雜 · ホルモン · 돼지 내장 · Pork Offal"
                        width={1100}
                        height={1100}
                        sizes="420px"
                        className="h-auto w-full"
                      />
                    </figure>
                    <div className="rv flex items-center gap-6">
                      <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full bg-cream shadow-xl ring-1 ring-ink/10 md:h-44 md:w-44">
                        <Image src="/images/mascot.png" alt="" fill sizes="176px" className="object-contain p-2" />
                      </div>
                      <div>
                        <p className="t-h3">{s.mascot.title}</p>
                        <p className="mt-3 text-[0.98rem] opacity-80">{s.mascot.body}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 肆：四個規矩 */}
                {i === 3 && (
                  <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-cream/15 sm:grid-cols-2">
                    {s.values.items.map((v, k) => (
                      <li key={v.title} className="rv bg-ink p-8 md:p-10">
                        <span className="numeral text-sm font-bold text-ember">0{k + 1}</span>
                        <h3 className="t-h3 mt-3">{v.title}</h3>
                        <p className="mt-3 text-[0.98rem] opacity-75">{v.desc}</p>
                      </li>
                    ))}
                  </ol>
                )}

                {/* 伍：前往加盟 */}
                {"cta" in c && c.cta && (
                  <div className="rv mt-12">
                    <Link href={L("/franchise")} className="link-arrow">
                      {c.cta}
                      <Arrow />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* 收尾：回菜單 */}
      <section className="grain bg-vermilion py-16 text-cream md:py-24">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="t-h2">
            <Lines text={dict.home.signature.title} />
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href={L("/menu")} className="btn btn-cream">
              {dict.common.viewMenu}
              <Arrow />
            </Link>
            <Link href={L("/stores")} className="btn btn-line">
              {dict.common.visit}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
