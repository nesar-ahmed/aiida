import type { MetadataRoute } from "next";
import { SITE } from "@/content/config";
import { locales } from "@/i18n/routing";

const PAGES = ["", "/about", "/prayer", "/services", "/events", "/donate", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    PAGES.map((page) => ({
      url: `${SITE.domain}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${SITE.domain}/${alt}${page}`])
        ),
      },
    }))
  );
}
