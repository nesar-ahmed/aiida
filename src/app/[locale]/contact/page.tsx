import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  NavigationIcon,
  PhoneIcon,
  CheckIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CopyButton } from "@/components/copy-button";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SITE, localized, mapsEmbedUrl, mapsLink } from "@/content/config";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("contactPage");
  const tc = await getTranslations("common");
  const { street, postalCode, city, country } = SITE.address;

  const lines = [t("before1"), t("before2"), t("before3")];

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1.25fr]">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">{t("infoTitle")}</h2>
          <ul className="mt-6 space-y-5">
            <li className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <PhoneIcon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{tc("callUs")}</p>
                <div className="mt-0.5 flex items-center gap-1">
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {SITE.phone}
                  </a>
                  <CopyButton value={SITE.phone} label={`${tc("copy")} — ${tc("callUs")}`} />
                </div>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MailIcon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{tc("emailUs")}</p>
                <div className="mt-0.5 flex items-center gap-1">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {SITE.email}
                  </a>
                  <CopyButton value={SITE.email} label={`${tc("copy")} — ${tc("emailUs")}`} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  {t("responseNote")}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPinIcon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{tc("addressLabel")}</p>
                <a
                  href={mapsLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-0.5 block text-sm text-muted-foreground hover:text-primary"
                >
                  {street}, {postalCode} {city}, {country}
                </a>
                <a
                  href={mapsLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  <NavigationIcon className="size-4" />
                  {tc("getDirections")}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClockIcon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{tc("officeHours")}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {localized(SITE.officeHours, locale)}
                </p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <h2 className="px-6 py-4 text-lg font-bold">{t("mapTitle")}</h2>
            <iframe
              title={tc("getDirections")}
              src={mapsEmbedUrl()}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>

        <Reveal
          delay={0.16}
          className="w-full max-w-2xl rounded-2xl border bg-card p-6 mx-auto lg:col-span-2"
        >
          <h2 className="text-lg font-bold">{t("beforeTitle")}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {lines.map((line) => (
              <li key={line} className="flex gap-2.5">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
