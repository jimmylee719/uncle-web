type Item = { main: string; sub: string };

export function Marquee({ items }: { items: Item[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-8 pr-8 md:gap-12 md:pr-12">
          <span className="font-serif text-[clamp(1.6rem,3.4vw,2.8rem)] font-black leading-none tracking-wide">
            {it.main}
          </span>
          <span className="t-eyebrow hidden opacity-70 sm:inline">{it.sub}</span>
          <span className="text-[1.1em] opacity-60" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee py-5 md:py-7" role="presentation">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
