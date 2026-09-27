import { getTranslations } from "next-intl/server";
import { getCurrentMonthPrayerTimes, lisbonToday } from "@/lib/prayer";
import { cn } from "cn";

const COLUMNS = [
  "fajr",
  "sunrise",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
] as const;

export async function MonthlyPrayerTable({ locale }: { locale: string }) {
  const t = await getTranslations("prayerPage");
  const tp = await getTranslations("prayer");
  let data;
  try {
    data = await getCurrentMonthPrayerTimes();
  } catch {
    return (
      <p className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">
        {t("loadError")}
      </p>
    );
  }

  const intl = locale === "pt" ? "pt-PT" : "en-GB";
  const today = lisbonToday();
  const monthLabel = new Intl.DateTimeFormat(intl, {
    month: "long",
    year: "numeric",
  }).format(new Date(`${today}T12:00:00`));

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] text-sm">
          <thead>
            <tr className="border-b bg-secondary/50 text-left text-xs font-semibold uppercase tracking-wider">
              <th className="px-4 py-3">{t("headers.day")}</th>
              <th className="px-3 py-3">{t("headers.weekday")}</th>
              <th className="px-3 py-3">{t("headers.hijri")}</th>
              {COLUMNS.map((c) => (
                <th key={c} className="px-3 py-3 text-right">
                  {tp(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => {
              const isToday = row.day === today.slice(8, 10);
              return (
                <tr
                  key={i}
                  className={cn(
                    "border-b last:border-0",
                    isToday
                      ? "bg-primary/10 font-bold"
                      : i % 2 === 1
                        ? "bg-muted/30"
                        : ""
                  )}
                >
                  <td className="px-4 py-2.5 tabular-nums">{row.day}</td>
                  <td className="px-3 py-2.5">{row.weekday}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">
                    {row.hijri}
                  </td>
                  {COLUMNS.map((c) => (
                    <td key={c} className="px-3 py-2.5 text-right tabular-nums">
                      {row[c]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="border-t bg-secondary/30 px-4 py-2.5 text-xs text-muted-foreground">
        {monthLabel} · {t("monthlyNote")}
      </p>
    </div>
  );
}
