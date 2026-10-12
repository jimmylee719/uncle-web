import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  name: string;
  tagline: string;
  label: string;
  className?: string;
};

export function Logo({ locale, name, tagline, label, className = "" }: Props) {
  return (
    <Link
      href={localePath(locale, "/")}
      aria-label={label}
      className={`group flex items-center gap-3 ${className}`}
    >
      <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full bg-cream ring-1 ring-cream/30 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105 md:h-12 md:w-12">
        <Image
          src="/images/mascot.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain p-[3px]"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.05rem] font-black tracking-wide md:text-[1.15rem]">{name}</span>
        <span className="mt-1.5 hidden text-[0.62rem] font-semibold uppercase tracking-[0.28em] opacity-70 sm:block">
          {tagline}
        </span>
      </span>
    </Link>
  );
}
