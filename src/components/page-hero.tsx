import { GeometricPattern } from "@/components/pattern";

export function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <GeometricPattern
        id={`hero-${title.length}`}
        className="absolute inset-0 h-full w-full opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/60 via-background/30 to-background" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 text-center sm:py-28">
        <p className="font-bold uppercase tracking-[0.25em] text-gold">
          {kicker}
        </p>
        <h1 className="mt-3 text-balance font-bold tracking-tight capitalize sm:text-5xl lg:text-3xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function SectionKicker({ children }: { children: string }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
      {children}
    </p>
  );
}
