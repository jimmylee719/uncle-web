"use client";

import { useEffect, useState } from "react";
import { HOURS, TIMEZONE } from "@/content/site";

type Labels = {
  open: string;
  openUntil: string;
  closed: string;
  today: string;
  nextOpen: string;
  days: string[];
};

const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

function taipeiNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: WEEK.indexOf(get("weekday")),
    min: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
  };
}

function compute(labels: Labels) {
  const { day, min } = taipeiNow();
  const todays = HOURS.filter((h) => h.days.includes(day));
  const current = todays.find((h) => toMin(h.open) <= min && min < toMin(h.close));
  if (current) {
    return { open: true, text: `${labels.open} · ${labels.openUntil.replace("{time}", current.close)}` };
  }
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7;
    const slots = HOURS.filter((h) => h.days.includes(d))
      .filter((h) => offset > 0 || toMin(h.open) > min)
      .sort((a, b) => toMin(a.open) - toMin(b.open));
    if (slots[0]) {
      const dayLabel = offset === 0 ? labels.today : labels.days[d];
      return {
        open: false,
        text: `${labels.closed} · ${labels.nextOpen.replace("{day}", dayLabel).replace("{time}", slots[0].open)}`,
      };
    }
  }
  return { open: false, text: labels.closed };
}

export function OpenStatus({ labels, className = "" }: { labels: Labels; className?: string }) {
  const [state, setState] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const tick = () => setState(compute(labels));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [labels]);

  if (!state) return <span className={`inline-block h-[1.6em] ${className}`} aria-hidden />;

  return (
    <span className={`inline-flex items-center gap-3 ${className}`} role="status">
      <span className="relative flex h-2.5 w-2.5">
        {state.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${state.open ? "bg-emerald-400" : "bg-stone-400"}`}
        />
      </span>
      <span>{state.text}</span>
    </span>
  );
}
