import { LINKS } from "@/content/site";

export function MapEmbed({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-ink-3 ${className}`}>
      <iframe
        title={title}
        src={LINKS.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0 [filter:grayscale(.85)_sepia(.28)_contrast(1.05)] transition-[filter] duration-700 hover:[filter:none]"
      />
    </div>
  );
}
