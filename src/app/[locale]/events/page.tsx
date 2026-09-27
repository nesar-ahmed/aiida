import { getTranslations } from "next-intl/server";
import { CircleChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { EventsList } from "@/components/event-card";
import { EVENTS } from "@/content/events";
import { lisbonToday } from "@/lib/prayer";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "eventsPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function EventsPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("eventsPage");

  const today = lisbonToday();
  const sorted = [...EVENTS].sort((a, b) => (a.date < b.date ? -1 : 1));
  const upcoming = sorted.filter((e) => e.date >= today);
  const past = sorted.filter((e) => e.date < today).reverse();

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">
            {t("upcomingTitle")}
          </h2>
        </Reveal>
        {upcoming.length > 0 ? (
          <Reveal className="mt-6" delay={0.05}>
            <EventsList events={upcoming} locale={locale} />
          </Reveal>
        ) : (
          <p className="mt-6 rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            {t("emptyUpcoming")}
          </p>
        )}
      </section>

      {past.length > 0 ? (
        <section className="border-t bg-card/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-muted-foreground">
                {t("pastTitle")}
              </h2>
            </Reveal>
            <Reveal className="mt-6 opacity-80" delay={0.05}>
              <EventsList events={past} locale={locale} />
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
        <Reveal className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-2 text-muted-foreground">
            {t("ctaBody")}
          </p> 
          <Button
            render={<Link href="/contact" />}
            className="mt-6 rounded-full"
          >
            {t("location")}
            <CircleChevronRight className="size-6" />
          </Button>
        </Reveal>
      </section>
    </>
  );
}
