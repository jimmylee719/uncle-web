import Image from "next/image";
import type { Dict } from "@/content/dict/zh";
import { CONTACT, HOURS, LINKS } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { Arrow, Eyebrow, PhoneIcon, PinIcon } from "@/components/ui";
import { OpenStatus } from "@/components/OpenStatus";
import { MapEmbed } from "@/components/MapEmbed";

/** 地址、營業時間、電話、地圖——首頁與門市頁共用 */
export function VisitBlock({
  locale,
  dict,
  heading,
}: {
  locale: Locale;
  dict: Dict;
  heading?: { eyebrow: string; title: string; body: string };
}) {
  const s = dict.stores;
  return (
    <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        {heading && (
          <>
            <Eyebrow className="text-vermilion">{heading.eyebrow}</Eyebrow>
            <h2 className="t-h2 mt-6">{heading.title}</h2>
            <p className="t-lead mt-6 opacity-80">{heading.body}</p>
          </>
        )}

        <dl className={`${heading ? "mt-10" : ""} divide-y divide-ink/15 border-y border-ink/15`}>
          <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-5">
            <dt className="t-eyebrow pt-1.5 opacity-60">{s.labels.address}</dt>
            <dd className="leading-8">
              {CONTACT.address[locale]}
              <br />
              <a
                href={LINKS.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-vermilion underline-offset-4 hover:underline"
              >
                <PinIcon className="h-4 w-4" />
                {dict.stores.google.openMaps}
              </a>
            </dd>
          </div>
          <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-5">
            <dt className="t-eyebrow pt-1.5 opacity-60">{s.labels.hours}</dt>
            <dd>
              <p className="font-bold">{s.hoursRows[0].day}</p>
              <p className="numeral mt-1 flex flex-wrap gap-x-6 text-xl font-semibold">
                {HOURS.map((h) => (
                  <span key={h.open} className="whitespace-nowrap">
                    {h.open} – {h.close}
                  </span>
                ))}
              </p>
              <OpenStatus labels={dict.status} className="mt-3 text-sm font-semibold opacity-80" />
            </dd>
          </div>
          <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-5">
            <dt className="t-eyebrow pt-1.5 opacity-60">{s.labels.phone}</dt>
            <dd>
              <a href={`tel:${CONTACT.phoneIntl}`} className="numeral text-3xl font-bold hover:text-vermilion">
                {CONTACT.phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`tel:${CONTACT.phoneIntl}`} className="btn btn-ink">
            <PhoneIcon />
            {dict.common.call}
          </a>
          <a href={LINKS.maps} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-line-dark">
            {dict.common.directions}
            <Arrow />
          </a>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="grid gap-4 md:grid-cols-5">
          <MapEmbed title={s.map} className="aspect-[4/3] rounded-3xl md:col-span-5 md:aspect-[16/9]" />
          <div className="photo relative aspect-[4/5] rounded-3xl md:col-span-2">
            <Image
              src="/images/store-front.jpg"
              alt={s.gallery.front}
              fill
              sizes="(min-width: 768px) 24vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="photo relative aspect-[4/3] rounded-3xl md:col-span-3 md:aspect-auto">
            <Image
              src="/images/store-inside-1.jpg"
              alt={s.gallery.inside}
              fill
              sizes="(min-width: 768px) 36vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
