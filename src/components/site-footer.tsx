import { getTranslations } from "next-intl/server";
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE, localized, mapsLink } from "@/content/config";
import { Logo } from "@/components/logo";

const NAV_LINKS = [
  { key: "about", href: "/about" },
  { key: "prayer", href: "/prayer" },
  { key: "services", href: "/services" },
  { key: "events", href: "/events" },
  { key: "donate", href: "/donate" },
  { key: "contact", href: "/contact" },
] as const;

export async function SiteFooter({ locale }: { locale: string }) {
  const t = await getTranslations("common");
  const tn = await getTranslations("nav");
  const { street, postalCode, city, country } = SITE.address;

  return (
    <footer className="border-t bg-card/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-bold tracking-tight">AIIDA</span>
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {localized(SITE.fullName, locale)}
          </p>
          <div className="flex gap-2">
            <a
              href={SITE.socials.facebook}
              className="rounded-full border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Facebook
            </a>
            <a
              href={SITE.socials.instagram}
              className="rounded-full border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">
            {t("quickLinks")}
          </h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {tn(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">
            {t("contactTitle")}
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={mapsLink()} target="_blank" rel="noreferrer">
                {street}, {postalCode} {city}, {country}
              </a>
            </li>
            <li className="flex gap-2.5">
              <PhoneIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            </li>
            <li className="flex gap-2.5">
              <MailIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">
            {t("officeHours")}
          </h3>
          <p className="flex gap-2.5 text-sm text-muted-foreground">
            <ClockIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            {localized(SITE.officeHours, locale)}
          </p>
          <div className="rounded-xl border bg-background p-4">
            <p className="text-sm font-semibold">{t("jumuahTitle")}</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {SITE.jumuah.map((j, i) => (
                <li key={i} className="flex justify-between tabular-nums">
                  <span>
                    {t("khutbah")} {j.khutbah}
                  </span>
                  <span>
                    {t("prayerWord")} {j.prayer}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            {t("rights", {
              year: new Date().getFullYear(),
              name: SITE.name,
            })}
          </p>
          <p className="font-arabic text-sm text-primary/80" dir="rtl">
            السلام عليكم ورحمة الله وبركاته
          </p>
        </div>
      </div>
    </footer>
  );
}
