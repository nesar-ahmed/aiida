import { SITE } from "@/content/config";

export type PrayerName = "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";

export const DAILY_PRAYERS: PrayerName[] = [
  "fajr",
  "sunrise",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
];

export type PrayerEntry = {
  name: PrayerName;
  adhan: string; // HH:MM local
  iqamah: string | null;
  adhanTs: number; // unix ms, Europe/Lisbon
  iqamahTs: number | null;
};

export type DayPrayerTimes = {
  gregorian: string; // "12 October 2026"-ish raw dd/mm/yyyy
  hijri: string; // "21 Shawwal 1448"
  entries: PrayerEntry[];
  fetchedAt: number;
};

const DAY_MS = 86_400_000;

export type NextPrayerInfo = {
  next: PrayerEntry;
  prev: PrayerEntry;
  nextTs: number;
  prevTs: number;
};

export function computeNextPrayer(
  entries: PrayerEntry[],
  now: number
): NextPrayerInfo {
  const prayers = entries.filter((e) => e.name !== "sunrise");
  for (let i = 0; i < prayers.length; i++) {
    if (prayers[i].adhanTs > now) {
      const prev = i > 0 ? prayers[i - 1] : prayers[prayers.length - 1];
      return {
        next: prayers[i],
        prev,
        nextTs: prayers[i].adhanTs,
        prevTs: i > 0 ? prev.adhanTs : prev.adhanTs - DAY_MS,
      };
    }
  }
  return {
    next: prayers[0],
    prev: prayers[prayers.length - 1],
    nextTs: prayers[0].adhanTs + DAY_MS,
    prevTs: prayers[prayers.length - 1].adhanTs,
  };
}

export function computeCurrentPrayer(
  entries: PrayerEntry[],
  now: number
): PrayerEntry {
  const prayers = entries.filter((e) => e.name !== "sunrise");
  for (let i = prayers.length - 1; i >= 0; i--) {
    if (prayers[i].adhanTs <= now) return prayers[i];
  }
  return prayers[prayers.length - 1];
}

export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (h > 0) return `${h}h ${pad(m)}m`;
  return `${pad(m)}:${pad(s)}`;
}

type AladhanTiming = Record<string, string>;

type AladhanDayResponse = {
  data: {
    timings: AladhanTiming;
    date: {
      gregorian: { date: string };
      hijri: { day: string; month: { en: string }; year: string };
    };
  };
};

function tzOffsetMs(instant: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(instant);
  const name = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+00:00";
  const m = name.match(/GMT([+-])(\d{2}):?(\d{2})?/);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  return sign * (Number(m[2]) * 60 + Number(m[3] ?? 0)) * 60_000;
}

function lisbonTimeToMs(date: string, time: string): number {
  const utcGuess = Date.parse(`${date}T${time}:00Z`);
  return utcGuess - tzOffsetMs(utcGuess, SITE.timezone);
}

function addMinutes(date: string, time: string, minutes: number): string {
  const ms = lisbonTimeToMs(date, time) + minutes * 60_000;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(ms);
}

export function lisbonToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(Date.now()); // YYYY-MM-DD
}

async function fetchAladhanDay(d: string): Promise<AladhanDayResponse["data"]> {
  const [dd, mm, yyyy] = d.split("-");
  const url =
    `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}` +
    `?latitude=${SITE.coordinates.latitude}&longitude=${SITE.coordinates.longitude}` +
    `&method=${SITE.prayerCalculationMethod}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Aladhan API error: ${res.status}`);
  const json = (await res.json()) as { data: AladhanDayResponse["data"] };
  return json.data;
}

function toDayPrayerTimes(data: AladhanDayResponse["data"]): DayPrayerTimes {
  const greg = data.date.gregorian.date.slice(0, 10); // dd-mm-yyyy
  const iso = `${greg.slice(6, 10)}-${greg.slice(3, 5)}-${greg.slice(0, 2)}`;
  const upper: Record<string, string> = Object.fromEntries(
    Object.entries(data.timings).map(([k, v]) => [k.toUpperCase(), v as string])
  );
  const entries: PrayerEntry[] = DAILY_PRAYERS.map((name) => {
    const raw = upper[name.toUpperCase()];
    const adhan = raw.slice(0, 5);
    const offset =
      SITE.iqamahOffsetsMinutes[name as keyof typeof SITE.iqamahOffsetsMinutes];
    const iqamah = offset != null ? addMinutes(iso, adhan, offset) : null;
    return {
      name,
      adhan,
      iqamah,
      adhanTs: lisbonTimeToMs(iso, adhan),
      iqamahTs: iqamah != null ? lisbonTimeToMs(iso, iqamah) : null,
    };
  });
  return {
    gregorian: iso,
    hijri: `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year}`,
    entries,
    fetchedAt: Date.now(),
  };
}

export async function getTodayPrayerTimes(): Promise<DayPrayerTimes> {
  const iso = lisbonToday();
  const [yyyy, mm, dd] = iso.split("-");
  const data = await fetchAladhanDay(`${dd}-${mm}-${yyyy}`);
  return toDayPrayerTimes(data);
}

export type MonthRow = {
  day: string;
  weekday: string;
  hijri: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

export async function getCurrentMonthPrayerTimes(): Promise<{
  rows: MonthRow[];
  monthLabel: string;
}> {
  const today = new Date(lisbonToday() + "T12:00:00Z");
  const yyyy = today.getUTCFullYear();
  const mm = today.getUTCMonth() + 1;
  const url =
    `https://api.aladhan.com/v1/calendar/${yyyy}/${mm}` +
    `?latitude=${SITE.coordinates.latitude}&longitude=${SITE.coordinates.longitude}` +
    `&method=${SITE.prayerCalculationMethod}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Aladhan API error: ${res.status}`);
  const json = (await res.json()) as {
    data: {
      timings: AladhanTiming;
      date: {
        readable: string;
        gregorian?: { weekday?: { en?: string } };
        hijri: {
          day: string;
          month: { en: string };
          year: string;
          weekday?: { en?: string };
        };
      };
    }[];
  };
  const rows: MonthRow[] = json.data.map((d) => {
    const t = (k: string) => (d.timings[k] as string).slice(0, 5);
    return {
      day: d.date.readable.split(" ")[0],
      weekday: d.date.gregorian?.weekday?.en ?? d.date.hijri.weekday?.en ?? "",
      hijri: `${d.date.hijri.day} ${d.date.hijri.month.en}`,
      fajr: t("Fajr"),
      sunrise: t("Sunrise"),
      dhuhr: t("Dhuhr"),
      asr: t("Asr"),
      maghrib: t("Maghrib"),
      isha: t("Isha"),
    };
  });
  const monthLabel = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: SITE.timezone,
  }).format(today);
  return { rows, monthLabel };
}
