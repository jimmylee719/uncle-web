import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { faqEntities, pageSchema } from "@/lib/schema";
import { faqItems, fillTokens, hoursText } from "@/lib/faq";
import { CONTACT } from "@/content/site";
import { Arrow, Eyebrow, PhoneIcon } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/faq", await getDict(locale));
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const f = dict.faq;
  const items = faqItems(locale, dict);
  const L = (p: string) => localePath(locale, p);

  const facts: [string, string][] = [
    [f.labels.name, f.values.name],
    [f.labels.cuisine, f.values.cuisine],
    [f.labels.address, CONTACT.address[locale]],
    [f.labels.hours, hoursText(dict)],
    [f.labels.phone, CONTACT.phoneDisplay],
    [f.labels.price, f.values.price],
    [f.labels.payment, f.values.payment],
    [f.labels.delivery, f.values.delivery],
    [f.labels.pets, f.values.pets],
    [f.labels.rating, fillTokens(f.values.rating, locale, dict)],
  ];

  return (
    <>
      <JsonLd
        data={pageSchema(locale, "/faq", dict, {
          type: "FAQPage",
          name: dict.meta.pages.faq.title,
          description: dict.meta.pages.faq.description,
          extra: { mainEntity: faqEntities(items) },
        })}
      />
      <PageHero eyebrow={f.hero.eyebrow} title={f.hero.title} sub={f.hero.sub} />

      {/* 重點資訊：給人、也給 AI 一眼讀完的事實表 */}
      <section className="grain grain-paper section bg-paper-2">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Eyebrow className="rv text-vermilion">{f.factsTitle}</Eyebrow>
          </div>
          <dl className="rv lg:col-span-8">
            {facts.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-t border-ink/20 py-4 last:border-b md:grid-cols-[9rem_1fr] md:gap-6">
                <dt className="t-eyebrow pt-1 opacity-60">{k}</dt>
                <dd className="font-semibold leading-8">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 問答 */}
      <section className="grain grain-paper section bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow className="rv text-vermilion">{f.hero.eyebrow}</Eyebrow>
              <h2 className="t-h2 rv mt-6">{f.hero.title}</h2>
            </div>
          </div>
          <div className="lg:col-span-8">
            {items.map((it, i) => (
              <details key={it.q} id={`q${i + 1}`} className="faq rv scroll-mt-28 border-t border-ink/20 last:border-b" open={i < 3}>
                <summary className="flex items-center justify-between gap-6 py-6 font-serif text-[1.15rem] font-black md:text-xl">
                  <h3>{it.q}</h3>
                  <span className="plus text-vermilion" aria-hidden />
                </summary>
                <p className="faq-body max-w-2xl pb-7 opacity-85">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="grain bg-ink section text-cream">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="t-h2 rv">{f.moreTitle}</h2>
            <p className="t-lead rv mt-4 opacity-80">{f.moreBody}</p>
          </div>
          <div className="rv flex flex-wrap gap-3">
            <a href={`tel:${CONTACT.phoneIntl}`} className="btn btn-red">
              <PhoneIcon />
              <span className="numeral">{CONTACT.phoneDisplay}</span>
            </a>
            <Link href={L("/menu")} className="btn btn-line">
              {dict.common.viewMenu}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
