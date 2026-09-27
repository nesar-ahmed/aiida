"use client";

import { useTranslations } from "next-intl";
import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-32 text-center">
      <AlertTriangleIcon className="size-10 text-gold" />
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t("body")}</p>
      {error.digest ? (
        <p className="mt-2 text-xs text-muted-foreground/60">{error.digest}</p>
      ) : null}
      <Button size="lg" onClick={reset} className="mt-8 rounded-full">
        {t("cta")}
      </Button>
    </div>
  );
}
