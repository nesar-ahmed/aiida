"use client";

import { useTranslations } from "next-intl";
import type { DayPrayerTimes } from "@/lib/prayer";
import {
  computeCurrentPrayer,
  computeNextPrayer,
  formatCountdown,
} from "@/lib/prayer";
import { useNow } from "@/lib/use-now";

export function HeroPrayerPanel({ day }: { day: DayPrayerTimes }) {
  const t = useTranslations("prayer");
  const now = useNow();
  const current = now === null ? null : computeCurrentPrayer(day.entries, now);
  const next = now === null ? null : computeNextPrayer(day.entries, now);
  const progress =
    now === null || !next
      ? 0
      : Math.min(
          1,
          Math.max(0, (now - next.prevTs) / (next.nextTs - next.prevTs))
        );

  return (
    <div className="w-full space-y-3 text-center">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border bg-background/80 px-2 py-3 backdrop-blur-sm">
          <span className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
            {t("current")}
          </span>
          <p className="mt-1 min-h-5 text-sm leading-5 font-semibold">
            {current ? t(current.name) : "\u00A0"}
          </p>
          <p className="min-h-7 text-xl leading-7 font-bold tabular-nums">
            {current ? current.adhan : "\u2013:\u2013"}
          </p>
          {current?.iqamah ? (
            <p className="text-[11px] leading-4 tabular-nums text-muted-foreground/70">
              {t("iqamah")} {current.iqamah}
            </p>
          ) : (
            <span className="block h-4" />
          )}
        </div>
        <div className="rounded-xl bg-primary px-2 py-3 text-primary-foreground shadow-lg shadow-primary/25">
          <span className="text-[10px] font-bold tracking-[0.12em] text-primary-foreground/70 uppercase">
            {t("next")}
          </span>
          <p className="mt-1 min-h-5 text-sm leading-5 font-semibold">
            {next ? t(next.next.name) : "\u00A0"}
          </p>
          <p className="min-h-7 text-xl leading-7 font-bold tabular-nums">
            {next ? next.next.adhan : "\u2013:\u2013"}
          </p>
          {next?.next.iqamah ? (
            <p className="text-[11px] leading-4 tabular-nums text-primary-foreground/70">
              {t("iqamah")} {next.next.iqamah}
            </p>
          ) : (
            <span className="block h-4" />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary/15">
          <div
            className="h-full w-0 rounded-full bg-linear-to-r from-primary to-gold transition-[width] duration-1000 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="shrink-0 rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-bold tabular-nums text-gold">
          {next && now !== null
            ? t("in", { time: formatCountdown(next.nextTs - now) })
            : "\u2013:\u2013"}
        </span>
      </div>
    </div>
  );
}
