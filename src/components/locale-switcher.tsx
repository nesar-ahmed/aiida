"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "cn";

const ITEMS = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
] as const;

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full border bg-card/60 p-0.5 text-xs font-semibold",
        className
      )}
    >
      {ITEMS.map((item) => (
        <Link
          key={item.code}
          href={pathname}
          locale={item.code}
          scroll={false}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            locale === item.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
