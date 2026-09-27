import type { Metadata, Viewport } from "next";
import { Inter, Amiri } from "next/font/google";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { hasLocale, locales, type Locale } from "@/i18n/routing";
import { SITE } from "@/content/config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  weight: ["400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#12141f" },
  ],
};

async function getJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    "@context": "https://schema.org",
    "@type": "Mosque",
    name: SITE.fullName[locale === "pt" ? "pt" : "en"],
    alternateName: SITE.name,
    url: SITE.domain,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coordinates.latitude,
      longitude: SITE.coordinates.longitude,
    },
    description: t("description"),
    sameAs: Object.values(SITE.socials),
  };
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("title"),
      template: "%s · AIIDA Aveiro",
    },
    description: t("description"),
    metadataBase: new URL(SITE.domain),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: SITE.domain,
      siteName: "AIIDA",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const [jsonLd, messages] = await Promise.all([
    getJsonLd(locale),
    getMessages({ locale }),
  ]);

  return (
    <html
      lang={locale === "pt" ? "pt-PT" : "en"}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script src="/theme-init.js" async />
      </head>
      <body
        className={`${inter.variable} ${amiri.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter locale={locale} />
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
