"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { DayPrayerTimes, PrayerEntry } from "@/lib/prayer";
import { cn } from "cn";

const DAY_MS = 86_400_000;

type NextInfo = {
  next: PrayerEntry;
  prev: PrayerEntry;
  nextTs: number;
  prevTs: number;
};

function computeNext(entries: PrayerEntry[], now: number): NextInfo {
  const prayers = entries.filter((e) => e.name !== "sunrise");
  for (let i = 0; i < prayers.length; i++) {
    if (prayers[i].adhanTs > now) {
      const prev = i > 0 ? prayers[i - 1] : prayers[prayers.length - 1];
      return {
        next: prayers[i],
        prev,
        nextTs: prayers[i].adhanTs,
        prevTs: i > 0 ? prev.adhanTs : prev.adhanTs - DAY_MS,
      };
    }
  }
  return {
    next: prayers[0],
    prev: prayers[prayers.length - 1],
    nextTs: prayers[0].adhanTs + DAY_MS,
    prevTs: prayers[prayers.length - 1].adhanTs,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatRemaining(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${pad(m)}m`;
  return `${pad(m)}:${pad(s)}`;
}

export function PrayerCard({ day }: { day: DayPrayerTimes }) {
  const t = useTranslations("prayer");
  const locale = useLocale();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const { next, nextTs, prevTs } = computeNext(day.entries, now);
  const progress = Math.min(
    1,
    Math.max(0, (now - prevTs) / (nextTs - prevTs))
  );

  const dateLabel = new Intl.DateTimeFormat(
    locale === "pt" ? "pt-PT" : "en-GB",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  ).format(new Date(`${day.gregorian}T12:00:00`));

  return (
    <div className="overflow-hidden rounded-3xl border bg-card shadow-xl shadow-primary/5">
      <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-5 text-primary-foreground">
        <p className="text-sm font-semibold capitalize opacity-90">
          {dateLabel}
        </p>
        <p className="mt-0.5 text-lg font-bold">
          {day.hijri} AH · Aveiro
        </p>
      </div>

      <div className="grid grid-cols-3 text-center min-[1024px]:grid-cols-6">
        {day.entries.map((entry) => {
          const isNext = entry.name === next.name;
          return (
            <div
              key={entry.name}
              className={cn(
                "flex flex-col gap-0.5 border-b border-r px-2 py-4 last:border-r-0",
                isNext && "bg-secondary/60"
              )}
            >
              <span
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-wider",
                  isNext ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t(entry.name)}
              </span>
              <span className="text-base font-bold tabular-nums">
                {entry.adhan}
              </span>
              {entry.iqamah ? (
                <span
                  className={cn(
                    "text-[11px] tabular-nums",
                    isNext ? "text-gold" : "text-muted-foreground/70"
                  )}
                >
                  {t("iqamah")} {entry.iqamah}
                </span>
              ) : (
                <span className="text-[11px] text-muted-foreground/50">—</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-6 py-5">
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="font-semibold text-muted-foreground">
            {t("next")}:{" "}
            <span className="text-foreground">{t(next.name)}</span>{" "}
            <span className="tabular-nums">({next.adhan})</span>
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold tabular-nums text-primary">
            {t("in", { time: formatRemaining(nextTs - now) })}
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-[width] duration-1000 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
