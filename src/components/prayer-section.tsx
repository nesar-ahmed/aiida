import { getTranslations } from "next-intl/server";
import { getTodayPrayerTimes } from "@/lib/prayer";
import { PrayerCard } from "@/components/prayer-card";

export async function PrayerSection() {
  let day;
  let loadFailed = false;
  try {
    day = await getTodayPrayerTimes();
  } catch {
    loadFailed = true;
  }
  const t = await getTranslations("prayerPage");
  if (loadFailed || !day) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground">
        {t("loadError")}
      </div>
    );
  }
  return <PrayerCard day={day} />;
}
