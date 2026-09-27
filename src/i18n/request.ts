import { locale } from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, hasLocale } from "./routing";

export default getRequestConfig(async () => {
  const requested = await locale();
  const localeValue = hasLocale(requested) ? requested : defaultLocale;

  return {
    locale: localeValue,
    messages: (await import(`../../messages/${localeValue}.json`)).default,
  };
});
