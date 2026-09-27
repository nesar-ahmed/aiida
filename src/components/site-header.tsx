"use client";

import { useTranslations } from "next-intl";
import { MenuIcon } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";

const NAV = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "prayer", href: "/prayer" },
  { key: "services", href: "/services" },
  { key: "events", href: "/events" },
  { key: "donate", href: "/donate" },
  { key: "contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">AIIDA</span>
            <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">
              Aveiro · PT
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <Button
            size="sm"
            render={
              <Link href="/donate" className="hidden lg:inline-flex" />
            }
          >
            {tc("donateCta")}
          </Button>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label={tc("siteTagline")}
                />
              }
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <Logo className="size-7" /> {tc("siteTagline")}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 py-2">
                {NAV.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <SheetClose
                      key={item.key}
                      nativeButton={false}
                      render={
                        <Link
                          href={item.href}
                          className={cn(
                            "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                            active
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                          )}
                        />
                      }
                    >
                      {t(item.key)}
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="mt-auto flex flex-col gap-3 border-t px-4 py-4">
                <LocaleSwitcher className="self-start" />
                <Button
                  size="sm"
                  render={
                    <Link href="/donate" className="w-full justify-center" />
                  }
                >
                  {tc("donateCta")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
