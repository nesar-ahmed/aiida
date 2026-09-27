import { defineRouting } from "next-intl/routing";

export const locales = ["en", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const hasLocale = (value: unknown): value is Locale =>
  locales.includes(value as Locale);

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
