import { getTranslations } from "next-intl/server";
import { InfoIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PrayerSection } from "@/components/prayer-section";
import { MonthlyPrayerTable } from "@/components/monthly-table";
import { SITE } from "@/content/config";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "prayerPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function PrayerPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("prayerPage");
  const tc = await getTranslations("common");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16">
        <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-[3fr_2fr]">
          <Reveal>
            <PrayerSection />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-lg font-bold">{tc("jumuahTitle")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("jumuahNote")}
              </p>
              <div className="mt-5 grid gap-3">
                {SITE.jumuah.map((j) => (
                  <div
                    key={j.prayer}
                    className="flex items-baseline justify-between rounded-xl bg-secondary/60 px-5 py-4"
                  >
                    <span className="text-sm font-semibold">
                      Jumu&apos;ah
                    </span>
                    <span className="tabular-nums">
                      <span className="text-xs text-muted-foreground">
                        {tc("khutbah")} {j.khutbah}
                      </span>{" "}
                      <span className="text-lg font-bold text-primary">
                        {j.prayer}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">
            {t("monthlyTitle")}
          </h2>
          <p className="mt-1 mb-5 text-sm text-muted-foreground">
            {t("monthlyNote")}
          </p>
          <MonthlyPrayerTable locale={locale} />
        </Reveal>

        <Reveal>
          <div className="space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-sm leading-relaxed text-muted-foreground">
            <p className="flex gap-2.5">
              <InfoIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              {t("methodNote")}
            </p>
            <p className="flex gap-2.5">
              <InfoIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              {t("ramadanNote")}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
