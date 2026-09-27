import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-32 text-center">
      <p className="font-arabic text-6xl text-gold">﴾ ﴿</p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t("body")}</p>
      <Button
        size="lg"
        render={<Link href="/" />}
        className="mt-8 rounded-full"
      >
        {t("cta")}
      </Button>
    </div>
  );
}
