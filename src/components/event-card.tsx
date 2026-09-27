import { ClockIcon, MapPinIcon } from "lucide-react";
import type { MosqueEvent } from "@/content/events";
import { EVENT_CATEGORY_LABELS } from "@/content/events";
import { Badge } from "@/components/ui/badge";
import { localized } from "@/content/config";

function EventCard({
  event,
  locale,
}: {
  event: MosqueEvent;
  locale: string;
}) {
  const intl = locale === "pt" ? "pt-PT" : "en-GB";
  const date = new Date(`${event.date}T12:00:00`);
  const day = new Intl.DateTimeFormat(intl, { day: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat(intl, { month: "short" }).format(date);
  const weekday = new Intl.DateTimeFormat(intl, { weekday: "short" }).format(
    date
  );
  const timeLabel = event.end
    ? `${event.start} – ${event.end}`
    : event.start;

  return (
    <article className="group flex gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
        <span className="text-lg font-bold leading-none tabular-nums">
          {day}
        </span>
        <span className="text-[11px] font-semibold uppercase">
          {month} · {weekday}
        </span>
      </div>
      <div className="min-w-0 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            {EVENT_CATEGORY_LABELS[event.category][
              locale === "pt" ? "pt" : "en"
            ]}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ClockIcon className="size-3.5" /> {timeLabel}
          </span>
        </div>
        <h3 className="font-semibold leading-snug">{localized(event.title, locale)}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {localized(event.excerpt, locale)}
        </p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground/80">
          <MapPinIcon className="size-3.5" />
          {localized(event.location, locale)}
        </p>
      </div>
    </article>
  );
}

export function EventsList({
  events,
  locale,
}: {
  events: MosqueEvent[];
  locale: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {events.map((event) => (
        <EventCard key={event.id} event={event} locale={locale} />
      ))}
    </div>
  );
}
