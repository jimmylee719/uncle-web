import type { CSSProperties, ReactNode } from "react";
import { Eyebrow, Lines } from "@/components/ui";

const steamStyle = (o: Record<string, string>) => o as CSSProperties;

/** 內頁共用的深色開場：墨黑底、紙張顆粒、朱紅光暈與蒸氣 */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  art,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children?: ReactNode;
  art?: ReactNode;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="absolute -right-[18vw] -top-[22vw] h-[62vw] w-[62vw] rounded-full bg-[radial-gradient(closest-side,rgba(165,35,28,0.5),rgba(165,35,28,0.12)_60%,transparent_72%)]"
      />
      <div
        aria-hidden
        className="steam"
        style={steamStyle({ left: "6%", bottom: "-30%", width: "34vw", height: "40vw", "--dx": "5%" })}
      />
      <div
        aria-hidden
        className="steam"
        style={steamStyle({ right: "10%", bottom: "-34%", width: "28vw", height: "34vw", "--dx": "-6%", animationDelay: "-8s" })}
      />
      {art}
      <div className="container-x relative z-10 pb-20 pt-40 md:pb-32 md:pt-60">
        <Eyebrow className="rise text-ember">{eyebrow}</Eyebrow>
        <h1 className="t-h1 rise mt-7 max-w-5xl" style={steamStyle({ "--d": "0.1s" })}>
          <Lines text={title} />
        </h1>
        {sub && (
          <p
            className="t-lead rise mt-8 max-w-2xl opacity-80"
            style={steamStyle({ "--d": "0.25s" })}
          >
            {sub}
          </p>
        )}
        {children && (
          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={steamStyle({ "--d": "0.4s" })}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
