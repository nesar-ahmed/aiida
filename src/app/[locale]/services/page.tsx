import {
  BookOpenIcon,
  ClockIcon,
  GlobeIcon,
  HandHeartIcon,
  HeartIcon,
  LandmarkIcon,
  SparklesIcon,
  UsersIcon,
  MessageSquareIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SERVICES, FAQS } from "@/content/services";
import { localized } from "@/content/config";

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

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ServicesPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("servicesPage");

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal key={service.id} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {Icon ? <Icon className="size-5" /> : null}
                  </div>
                  <h2 className="mt-4 font-bold">
                    {localized(service.title, locale)}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {localized(service.body, locale)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t bg-card/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">
              {t("faqTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("faqSubtitle")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion className="mt-8" defaultValue={["faq-0"]}>
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-base">
                    {localized(faq.question, locale)}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed">
                    {localized(faq.answer, locale)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
        <Reveal>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
            <MessageSquareIcon className="size-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-2 text-muted-foreground">
            {t("ctaBody")}
          </p>
          <Button
            size="lg"
            render={<Link href="/contact" />}
            className="mt-6 rounded-full"
          >
            {t("ctaButton")}
          </Button>
        </Reveal>
      </section>
    </>
  );
}
