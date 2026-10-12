import Link from "next/link";
import { CONTACT, LINKS } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";
import { PhoneIcon, PinIcon, Arrow } from "@/components/ui";

/** 手機版底部常駐列：來電、導航、加盟 */
export function MobileDock({
  locale,
  labels,
}: {
  locale: Locale;
  labels: { call: string; map: string; menu: string };
}) {
  return (
    <nav
      aria-label="Quick actions"
      className="no-print fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1 rounded-2xl bg-ink/92 p-1.5 text-cream shadow-[0_14px_40px_-10px_rgba(0,0,0,0.7)] ring-1 ring-cream/15 backdrop-blur-xl md:hidden"
    >
      <a
        href={`tel:${CONTACT.phoneIntl}`}
        className="flex flex-col items-center gap-1 rounded-xl py-2.5 text-[0.72rem] font-bold tracking-wider active:bg-cream/10"
      >
        <PhoneIcon />
        {labels.call}
      </a>
      <a
        href={LINKS.maps}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 rounded-xl py-2.5 text-[0.72rem] font-bold tracking-wider active:bg-cream/10"
      >
        <PinIcon />
        {labels.map}
      </a>
      <Link
        href={localePath(locale, "/menu")}
        className="flex flex-col items-center gap-1 rounded-xl py-2.5 text-[0.72rem] font-bold tracking-wider active:bg-cream/10"
      >
        <Arrow />
        {labels.menu}
      </Link>
    </nav>
  );
}
