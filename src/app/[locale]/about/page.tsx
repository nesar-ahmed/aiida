import { getTranslations } from "next-intl/server";
import { BookOpenIcon, HeartHandshakeIcon, SunriseIcon, CircleChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHero, SectionKicker } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { TEAM, FACILITIES } from "@/content/team";
import { localized } from "@/content/config";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function AboutPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("aboutPage");
  const tc = await getTranslations("common");

  const values = [
    {
      icon: SunriseIcon,
      title: t("valueFaithTitle"),
      body: t("valueFaithBody"),
    },
    {
      icon: HeartHandshakeIcon,
      title: t("valueHospitalityTitle"),
      body: t("valueHospitalityBody"),
    },
    {
      icon: BookOpenIcon,
      title: t("valueKnowledgeTitle"),
      body: t("valueKnowledgeBody"),
    },
  ];

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto w-full max-w-6xl px-4 py-20 text-justify">
        <Reveal>
          <SectionKicker>{t("storyTitle")}</SectionKicker>
          <div className="mt-5 space-y-5 text-pretty leading-relaxed text-muted-foreground [&>p]:text-base sm:[&>p]:text-lg">
            <p>{t("story1")}</p>
            <p>{t("story2")}</p>
            <p>{t("story3")}</p>
          </div>
        </Reveal>
      </section>

      <section className="border-y bg-card/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              {t("valuesTitle")}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border bg-background p-7 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("teamTitle")}
          </h2>
          <p className="mt-2 text-muted-foreground">{t("teamSubtitle")}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.06}>
              <div className="flex h-full items-start gap-4 rounded-2xl border bg-card p-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-gold/20 text-lg font-bold text-primary">
                  {member.name
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm font-semibold text-primary">
                    {localized(member.role, locale)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {localized(member.bio, locale)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t bg-card/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-20">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("facilitiesTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("facilitiesSubtitle")}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map((f, i) => (
              <Reveal key={f.title.en} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border bg-background p-6">
                  <h3 className="font-bold">{localized(f.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {localized(f.description, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">{t("joinTitle")}</h2>
          <p className="mx-auto mt-3 text-muted-foreground">
            {t("joinBody")}
          </p>
          <Button
            size="lg"
            render={<Link href="/contact" />}
            className="mt-6 rounded-full"
          >
            {tc("planVisit")}
            <CircleChevronRight className="size-6" />
          </Button>
        </Reveal>
      </section>
    </>
  );
}
