import {
  BanknoteIcon,
  BuildingIcon,
  CircleDollarSignIcon,
  HandCoinsIcon,
  QrCodeIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SITE, localized } from "@/content/config";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donatePage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function DonatePage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("donatePage");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border bg-card p-7">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BuildingIcon className="size-5" />
              </div>
              <h2 className="mt-4 text-lg font-bold capitalize">{t("bankTitle")}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {t("bankBody")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-justify">
                {t("bankHint")}
              </p>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 px-4 py-3">
                  <dt className="text-muted-foreground">
                    {t("recipientLabel")}
                  </dt>
                  <dd className="flex items-center gap-1 text-right font-semibold">
                    {SITE.bankTransfer.recipient}
                    <CopyButton value={SITE.bankTransfer.recipient} />
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 px-4 py-3">
                  <dt className="text-muted-foreground">{t("ibanLabel")}</dt>
                  <dd className="flex items-center gap-1 text-right font-mono font-semibold tracking-tight">
                    {SITE.bankTransfer.iban}
                    <CopyButton value={SITE.bankTransfer.iban} />
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 px-4 py-3">
                  <dt className="text-muted-foreground">{t("swiftLabel")}</dt>
                  <dd className="flex items-center gap-1 text-right font-mono font-semibold">
                    {SITE.bankTransfer.swift}
                    <CopyButton value={SITE.bankTransfer.swift} />
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {localized(SITE.bankTransfer.note, locale)}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-2xl border bg-card p-7">
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <QrCodeIcon className="size-5" />
                  </div>
                  <Badge variant="secondary">{t("mbwayStatus")}</Badge>
                </div>
                <h2 className="mt-4 text-lg font-bold">{t("mbwayTitle")}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground text-justify">
                  {t("mbwayBody")}
                </p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 px-4 py-3">
                    <dt className="text-muted-foreground">
                      {t("mbwayNameLabel")}
                    </dt>
                    <dd className="flex items-center gap-1 text-right font-semibold">
                      {SITE.mbway.name}
                      <CopyButton value={SITE.mbway.name} />
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 px-4 py-3">
                    <dt className="text-muted-foreground">
                      {t("mbwayNumberLabel")}
                    </dt>
                    <dd className="flex items-center gap-1 text-right font-mono font-semibold">
                      {SITE.mbway.phone}
                      <CopyButton value={SITE.mbway.phone} />
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl border bg-card p-7">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BanknoteIcon className="size-5" />
                </div>
                <h2 className="mt-4 text-lg font-bold">{t("officeTitle")}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {t("officeBody")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y bg-card/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight">
              {t("impactTitle")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <div className="h-full rounded-2xl border bg-background p-6 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <HandCoinsIcon className="size-6" />
                  </div>
                  <h3 className="mt-4 font-bold">{t(`impact${n}Title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`impact${n}Body`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-16 space-y-4">
        <Reveal>
          <div className="rounded-2xl border bg-card p-7">
            <div className="flex items-center gap-3">
              <CircleDollarSignIcon className="size-5 text-gold" />
              <h2 className="text-lg font-bold">{t("monthlyTitle")}</h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("monthlyBody")}
            </p>
            <Button
              variant="outline"
              render={<Link href="/contact" />}
              className="mt-4 rounded-full"
            >
              {t("officeTitle")}
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>{t("zakatNote")}</p>
            <p className="rounded-2xl bg-primary/5 p-4 text-pretty">
              <strong className="text-foreground">{t("receiptTitle")} </strong>
              {t("receiptBody")}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
