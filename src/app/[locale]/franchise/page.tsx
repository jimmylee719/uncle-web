import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { faqSchema, franchiseServiceSchema, pageSchema } from "@/lib/schema";
import { CONTACT } from "@/content/site";
import { Arrow, Eyebrow, Lines, PhoneIcon } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { FranchiseForm } from "@/components/FranchiseForm";

export async function generateMetadata({ params }: PageProps<"/[locale]/franchise">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/franchise", await getDict(locale));
}

export default async function FranchisePage({ params }: PageProps<"/[locale]/franchise">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const f = dict.franchise;

  const art = (
    <div
      aria-hidden
      className="absolute bottom-[-8vw] right-[3vw] hidden h-[34vw] max-h-[460px] w-[34vw] max-w-[460px] overflow-hidden rounded-full bg-cream/95 opacity-95 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)] md:block"
    >
      <Image src="/images/mascot.png" alt="" fill sizes="460px" className="object-contain p-4" />
    </div>
  );

  return (
    <>
      <JsonLd data={faqSchema(locale, "/franchise", f.faq.items)} />
      <JsonLd data={franchiseServiceSchema(locale, dict)} />
      <JsonLd
        data={pageSchema(locale, "/franchise", dict, {
          type: "ContactPage",
          name: dict.meta.pages.franchise.title,
          description: dict.meta.pages.franchise.description,
        })}
      />

      <PageHero eyebrow={f.hero.eyebrow} title={f.hero.title} sub={f.hero.sub} art={art}>
        <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-sm font-bold tracking-wider ring-1 ring-cream/25">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          {f.hero.badge}
        </span>
        <a href="#contact" className="btn btn-red">
          {f.hero.cta}
          <Arrow />
        </a>
        <a href="#formats" className="btn btn-line">
          {f.hero.cta2}
        </a>
      </PageHero>

      {/* Why */}
      <section className="grain grain-paper section bg-paper">
        <div className="container-x">
          <Eyebrow className="rv text-vermilion">{f.why.eyebrow}</Eyebrow>
          <h2 className="t-h2 rv mt-6">{f.why.title}</h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {f.why.items.map((it, i) => (
              <li key={it.title} className="rv bg-paper p-8 transition-colors duration-500 hover:bg-cream md:p-10">
                <span className="numeral text-sm font-bold text-vermilion">0{i + 1}</span>
                <h3 className="t-h3 mt-4">{it.title}</h3>
                <p className="mt-4 text-[0.98rem] opacity-80">{it.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formats */}
      <section id="formats" className="grain scroll-mt-20 bg-ink section text-cream">
        <div className="container-x">
          <Eyebrow className="rv text-ember">{f.formats.eyebrow}</Eyebrow>
          <h2 className="t-h2 rv mt-6 max-w-3xl">{f.formats.title}</h2>
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {f.formats.items.map((it) => (
              <li
                key={it.title}
                className="rv group relative overflow-hidden rounded-3xl bg-cream/[0.05] p-8 ring-1 ring-cream/15 transition-colors duration-500 hover:bg-cream/[0.1] md:p-10"
              >
                <span
                  aria-hidden
                  className="numeral absolute -right-3 -top-8 text-[9rem] font-black leading-none text-cream/[0.06] transition-colors duration-500 group-hover:text-ember/20"
                >
                  {it.tag}
                </span>
                <h3 className="t-h3 relative">{it.title}</h3>
                <p className="relative mt-4 opacity-80">{it.desc}</p>
                <p className="relative mt-6 border-t border-cream/15 pt-4 text-sm font-semibold text-ember">{it.fit}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HQ support */}
      <section className="grain grain-paper section bg-paper-2">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow className="rv text-vermilion">{f.support.eyebrow}</Eyebrow>
              <h2 className="t-h2 rv mt-6">{f.support.title}</h2>
              <p className="rv mt-8 text-sm leading-7 opacity-60">{f.support.disclaimer}</p>
            </div>
          </div>
          <ol className="lg:col-span-7">
            {f.support.items.map((it, i) => (
              <li key={it.title} className="rv grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ink/20 py-7 last:border-b md:grid-cols-[5rem_1fr]">
                <span className="numeral text-3xl font-black text-vermilion md:text-4xl">0{i + 1}</span>
                <div>
                  <h3 className="t-h3">{it.title}</h3>
                  <p className="mt-2 opacity-75">{it.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Investment */}
      <section className="grain grain-paper section bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Eyebrow className="rv text-vermilion">{f.investment.eyebrow}</Eyebrow>
            <h2 className="t-h2 rv mt-6">{f.investment.title}</h2>
            <p className="t-lead rv mt-8 opacity-80">{f.investment.body}</p>
          </div>
          <div className="lg:col-span-7">
            <ul className="rv overflow-hidden rounded-3xl ring-1 ring-ink/15">
              {f.investment.items.map((it, i) => (
                <li
                  key={it.title}
                  className={`grid gap-1 px-6 py-5 md:grid-cols-[1fr_auto] md:items-center md:px-8 ${i % 2 ? "bg-ink/[0.03]" : ""}`}
                >
                  <div>
                    <p className="font-serif text-lg font-black">{it.title}</p>
                    <p className="text-sm opacity-65">{it.desc}</p>
                  </div>
                  <p className="text-sm font-bold text-vermilion">{f.investment.amountLabel}</p>
                </li>
              ))}
            </ul>
            <p className="rv mt-6 text-sm leading-7 opacity-60">{f.investment.note}</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="grain bg-ink section text-cream">
        <div className="container-x">
          <Eyebrow className="rv text-ember">{f.process.eyebrow}</Eyebrow>
          <h2 className="t-h2 rv mt-6 max-w-3xl">{f.process.title}</h2>
          <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-x-8 md:gap-y-14">
            {f.process.steps.map((st, i) => (
              <li key={st.title} className="rv relative border-t border-cream/25 pt-6">
                <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-ember" aria-hidden />
                <span className="numeral text-sm font-bold text-ember">STEP 0{i + 1}</span>
                <h3 className="t-h3 mt-3">{st.title}</h3>
                <p className="mt-3 opacity-75">{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Partner */}
      <section className="grain grain-paper section bg-paper-2">
        <div className="container-x grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Eyebrow className="rv text-vermilion">{f.partner.eyebrow}</Eyebrow>
            <h2 className="t-h2 rv mt-6">{f.partner.title}</h2>
            <p className="rv mt-8 font-serif text-xl font-black text-vermilion">{f.partner.note}</p>
          </div>
          <ul className="lg:col-span-7">
            {f.partner.items.map((it) => (
              <li key={it} className="rv flex items-start gap-5 border-t border-ink/20 py-6 last:border-b">
                <span className="mt-1.5 text-vermilion" aria-hidden>
                  ✦
                </span>
                <span className="text-[1.1rem] font-semibold leading-8">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="grain grain-paper section bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Eyebrow className="rv text-vermilion">{f.faq.eyebrow}</Eyebrow>
            <h2 className="t-h2 rv mt-6">{f.faq.title}</h2>
          </div>
          <div className="lg:col-span-8">
            {f.faq.items.map((it) => (
              <details key={it.q} className="faq rv border-t border-ink/20 last:border-b">
                <summary className="flex items-center justify-between gap-6 py-6 font-serif text-[1.15rem] font-black md:text-xl">
                  {it.q}
                  <span className="plus text-vermilion" aria-hidden />
                </summary>
                <p className="faq-body max-w-2xl pb-7 opacity-80">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="grain relative scroll-mt-16 overflow-hidden bg-ink section text-cream">
        <div
          aria-hidden
          className="absolute -left-[16vw] top-0 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(165,35,28,0.45),transparent_70%)]"
        />
        <div className="container-x relative z-10 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Eyebrow className="rv text-ember">{f.contact.eyebrow}</Eyebrow>
            <h2 className="t-display rv mt-6">
              <Lines text={f.contact.title} />
            </h2>
            <p className="t-lead rv mt-8 opacity-85">{f.contact.body}</p>
            <div className="rv mt-10 border-t border-cream/20 pt-6">
              <p className="t-eyebrow opacity-60">{f.contact.callLabel}</p>
              <a
                href={`tel:${CONTACT.franchisePhoneIntl}`}
                className="numeral mt-3 inline-flex items-center gap-3 text-4xl font-black hover:text-ember"
              >
                <PhoneIcon className="h-7 w-7" />
                {CONTACT.franchisePhoneDisplay}
              </a>
            </div>
          </div>
          <div className="rv lg:col-span-7">
            <FranchiseForm locale={locale} labels={f.form} />
          </div>
        </div>
      </section>
    </>
  );
}
