import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/schema";
import { BRAND, CONTACT } from "@/content/site";
import { Arrow, Eyebrow, PhoneIcon } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { VisitBlock } from "@/components/VisitBlock";
import { GoogleBadge } from "@/components/GoogleBadge";

export async function generateMetadata({ params }: PageProps<"/[locale]/stores">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/stores", await getDict(locale));
}

export default async function StoresPage({ params }: PageProps<"/[locale]/stores">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const s = dict.stores;
  const L = (p: string) => localePath(locale, p);

  const infos = [
    { title: s.info.cash, desc: s.info.cashDesc, mark: "$" },
    { title: s.info.dogs, desc: s.info.dogsDesc, mark: "♥" },
    { title: s.info.dine, desc: s.info.dineDesc, mark: "✦" },
  ];

  return (
    <>
      <JsonLd
        data={pageSchema(locale, "/stores", dict, {
          type: "ContactPage",
          name: dict.meta.pages.stores.title,
          description: dict.meta.pages.stores.description,
        })}
      />
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} sub={s.hero.sub} />

      <section className="grain grain-paper section bg-paper">
        <VisitBlock
          locale={locale}
          dict={dict}
          heading={{ eyebrow: s.flagship.tag, title: s.flagship.name, body: dict.home.visit.body }}
        />
      </section>

      {/* 來店前先知道 + Google 商家資訊 */}
      <section className="grain bg-ink section text-cream">
        <div className="container-x">
          <Eyebrow className="rv text-ember">{s.info.title}</Eyebrow>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-cream/15 md:grid-cols-3">
            {infos.map((i) => (
              <li key={i.title} className="rv bg-ink p-8 md:p-10">
                <span className="numeral flex h-12 w-12 items-center justify-center rounded-full bg-vermilion text-xl font-black">
                  {i.mark}
                </span>
                <h3 className="t-h3 mt-6">{i.title}</h3>
                <p className="mt-3 opacity-75">{i.desc}</p>
              </li>
            ))}
          </ul>

          <div className="rv mt-10">
            <Link href={L("/faq")} className="link-arrow text-sm">
              {dict.nav.faq}
              <Arrow />
            </Link>
          </div>

          <div className="rv mt-10 grid items-center gap-8 rounded-3xl bg-cream/[0.06] p-8 ring-1 ring-cream/15 md:grid-cols-12 md:p-12">
            <div className="md:col-span-6">
              <p className="t-eyebrow text-ember">{s.google.title}</p>
              <p className="mt-4 text-sm opacity-60">{s.google.listedAs}</p>
              <p className="font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] font-black leading-snug">
                {BRAND.googleName}
              </p>
            </div>
            <div className="md:col-span-6 md:justify-self-end">
              <GoogleBadge
                ratingLabel={s.google.ratingLabel}
                reviews={s.google.reviews}
                cta={s.google.viewReviews}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Uber Eats */}
      <section className="grain bg-vermilion py-16 text-cream md:py-24">
        <div className="container-x grid items-center gap-8 md:grid-cols-12">
          <h2 className="t-h2 md:col-span-6">{s.delivery.title}</h2>
          <div className="md:col-span-6">
            <p className="t-lead opacity-90">{s.delivery.body}</p>
            <a href={`tel:${CONTACT.phoneIntl}`} className="btn btn-cream mt-8">
              <PhoneIcon />
              <span className="numeral">{CONTACT.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 照片 */}
      <section className="grain grain-paper section bg-paper-2">
        <div className="container-x">
          <h2 className="t-h2 rv">{s.gallery.title}</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-12">
            <div className="photo rv-img relative aspect-[4/5] rounded-3xl md:col-span-4">
              <Image src="/images/store-front.jpg" alt={s.gallery.front} fill sizes="(min-width:768px) 33vw, 90vw" className="object-cover" />
            </div>
            <div className="grid gap-4 md:col-span-8">
              <div className="photo rv-img relative aspect-[4/3] rounded-3xl md:aspect-[16/9]">
                <Image src="/images/store-inside-1.jpg" alt={s.gallery.inside} fill sizes="(min-width:768px) 66vw, 90vw" className="object-cover" />
              </div>
              <div className="photo rv-img relative aspect-[4/3] rounded-3xl md:aspect-[16/9]">
                <Image src="/images/store-inside-2.jpg" alt={s.gallery.inside} fill sizes="(min-width:768px) 66vw, 90vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 更多據點 */}
      <section className="grain bg-ink section text-cream">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="t-h2 rv">{s.soon.title}</h2>
            <p className="t-lead rv mt-6 max-w-xl opacity-80">{s.soon.body}</p>
          </div>
          <Link href={L("/franchise")} className="link-arrow rv">
            {s.soon.cta}
            <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
