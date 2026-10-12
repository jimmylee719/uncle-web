import { GOOGLE } from "@/content/site";
import { Arrow, StarIcon } from "@/components/ui";

type Props = {
  ratingLabel: string;
  reviews: string;
  cta: string;
  tone?: "dark" | "light";
};

/** Google 評分徽章：連到 Google 商家頁看評論與照片 */
export function GoogleBadge({ ratingLabel, reviews, cta, tone = "dark" }: Props) {
  const stars = [1, 2, 3, 4, 5].map((n) => Math.max(0, Math.min(1, GOOGLE.rating - (n - 1))));
  const dark = tone === "dark";
  return (
    <a
      href={GOOGLE.shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl px-5 py-4 transition-colors ${
        dark
          ? "bg-cream/[0.07] text-cream ring-1 ring-cream/20 hover:bg-cream/[0.14]"
          : "bg-ink/[0.04] text-ink ring-1 ring-ink/15 hover:bg-ink/[0.08]"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className="numeral text-4xl font-bold leading-none">{GOOGLE.rating.toFixed(1)}</span>
        <span className="flex flex-col gap-1">
          <span className="flex text-gold">
            {stars.map((f, i) => (
              <StarIcon key={i} fill={f} className="h-[18px] w-[18px]" />
            ))}
          </span>
          <span className="text-xs opacity-80">
            {ratingLabel} · {reviews.replace("{n}", String(GOOGLE.reviewCount))}
          </span>
        </span>
      </span>
      <span className="inline-flex items-center gap-2 text-sm font-bold">
        {cta}
        <Arrow className="transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );
}
