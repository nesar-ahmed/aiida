"use client";

import { useLocale, useTranslations } from "next-intl";
import type { DayPrayerTimes } from "@/lib/prayer";
import {
  computeNextPrayer,
  formatCountdown,
  type NextPrayerInfo,
} from "@/lib/prayer";
import { useNow } from "@/lib/use-now";
import { cn } from "cn";

export function PrayerCard({ day }: { day: DayPrayerTimes }) {
  const t = useTranslations("prayer");
  const locale = useLocale();
  const now = useNow();
  const nextInfo: NextPrayerInfo | null =
    now === null ? null : computeNextPrayer(day.entries, now);
  const progress =
    now === null || !nextInfo
      ? 0
      : Math.min(
          1,
          Math.max(0, (now - nextInfo.prevTs) / (nextInfo.nextTs - nextInfo.prevTs))
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
          const isNext = nextInfo !== null && entry.name === nextInfo.next.name;
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
            <span className="text-foreground">
              {nextInfo ? t(nextInfo.next.name) : "\u00A0"}
            </span>{" "}
            {nextInfo ? (
              <span className="tabular-nums">({nextInfo.next.adhan})</span>
            ) : null}
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold tabular-nums text-primary">
            {nextInfo && now !== null
              ? t("in", { time: formatCountdown(nextInfo.nextTs - now) })
              : "\u2013:\u2013"}
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
