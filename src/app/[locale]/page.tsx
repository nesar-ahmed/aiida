import {
  BookOpenIcon,
  ClockIcon,
  GlobeIcon,
  HandHeartIcon,
  HeartIcon,
  LandmarkIcon,
  SparklesIcon,
  UsersIcon,
  ArrowRightIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { GeometricPattern } from "@/components/pattern";
import { SectionKicker } from "@/components/page-hero";
import { EventsList } from "@/components/event-card";
import { SERVICES } from "@/content/services";
import { EVENTS } from "@/content/events";
import { localized } from "@/content/config";
import { lisbonToday } from "@/lib/prayer";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  clock: ClockIcon,
  mosque: LandmarkIcon,
  heart: HeartIcon,
  hands: HandHeartIcon,
  book: BookOpenIcon,
  sparkles: SparklesIcon,
  users: UsersIcon,
  globe: GlobeIcon,
};

export default async function HomePage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const th = await getTranslations({ locale, namespace: "home.hero" });

  const today = lisbonToday();
  const upcoming = EVENTS.filter((e) => e.date >= today)
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden">
        <GeometricPattern
          id="home-hero"
          className="absolute inset-0 h-full w-full mask-[radial-gradient(70%_70%_at_50%_30%,black,transparent)]"
        />
        <div className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-24 size-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:py-24 lg:py-28">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {th("kicker")}
            </p>
            <p
              className="font-arabic mt-4 text-2xl text-gold"
              dir="rtl"
              lang="ar"
            >
              {th("arabic")}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {th("titleLead")}{" "}
              <span className="bg-linear-to-r from-primary via-primary to-gold bg-clip-text text-transparent">
                {th("titleHighlight")}
              </span>
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {th("subtitle")}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                render={<Link href="/prayer" />}
                className="rounded-full"
              >
                {th("ctaPrimary")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/contact" />}
                className="rounded-full"
              >
                {th("ctaSecondary")}
                <ArrowRightIcon className="size-4" />
              </Button>
            </div>
            <figure className="mt-9 max-w-xl border-l-2 border-gold/60 pl-4 text-left">
              <blockquote className="text-sm italic leading-relaxed text-muted-foreground sm:text-base">
                {th("verse")}
              </blockquote>
              <figcaption className="mt-1.5 text-xs font-semibold text-gold">
                {th("verseRef")}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-y bg-secondary/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center">
          <Reveal className="max-w-2xl">
            <h2 className="text-lg font-bold sm:text-xl">
              {t("welcome.title")}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              {t("welcome.body")}
            </p>
          </Reveal>
          <Button
            variant="outline"
            render={<Link href="/about" />}
            className="shrink-0 rounded-full"
          >
            {t("welcome.cta")}
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionKicker>{t("about.kicker")}</SectionKicker>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {t("about.title")}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {t("about.body")}
            </p>
            <Button
              variant="link"
              render={<Link href="/about" />}
              className="mt-4 h-auto gap-1 p-0 font-semibold text-primary"
            >
              {t("about.cta")}
              <ArrowRightIcon className="size-4" />
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-4/3 w-full max-w-md">
              <div className="absolute inset-0 rounded-t-full border-2 border-primary/20 bg-linear-to-b from-primary/10 via-background to-background" />
              <div className="absolute inset-4 rounded-t-full border border-gold/40" />
              <GeometricPattern
                id="about-card"
                className="absolute inset-6 rounded-t-full opacity-60"
              />
              <p
                className="font-arabic absolute inset-0 flex items-center justify-center pt-12 text-3xl text-primary sm:text-4xl"
                dir="rtl"
              >
                مسجد الحي
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t bg-card/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>{t("services.kicker")}</SectionKicker>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {t("services.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("services.subtitle")}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 4).map((service, i) => {
              const Icon = ICONS[service.icon];
              return (
                <Reveal key={service.id} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {Icon ? <Icon className="size-5" /> : null}
                    </div>
                    <h3 className="mt-4 font-semibold">
                      {localized(service.title, locale)}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {localized(service.body, locale)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              render={<Link href="/services" />}
              className="rounded-full"
            >
              {t("services.cta")}
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      {upcoming.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-4 py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionKicker>{t("events.kicker")}</SectionKicker>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {t("events.title")}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {t("events.subtitle")}
              </p>
            </div>
            <Button
              variant="ghost"
              render={<Link href="/events" />}
              className="gap-1 font-semibold text-primary"
            >
              {t("events.cta")}
              <ArrowRightIcon className="size-4" />
            </Button>
          </Reveal>
          <Reveal className="mt-8" delay={0.1}>
            <EventsList events={upcoming} locale={locale} />
          </Reveal>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-6xl px-4 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-primary to-primary/85 p-10 text-primary-foreground sm:p-14">
            <GeometricPattern
              id="donate-band"
              className="absolute inset-0 h-full w-full opacity-20 text-primary-foreground"
            />
            <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-soft">
                  {t("donate.kicker")}
                </p>
                <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("donate.title")}
                </h2>
                <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed opacity-90 sm:text-base">
                  {t("donate.body")}
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 lg:items-end">
                <Button
                  size="lg"
                  variant="secondary"
                  render={<Link href="/donate" />}
                  className="rounded-full font-bold"
                >
                  {t("donate.cta")}
                  <ArrowRightIcon className="size-4" />
                </Button>
                <p className="text-xs opacity-80">{t("donate.note")}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
