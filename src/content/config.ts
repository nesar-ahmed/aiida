export const SITE = {
  name: "AIIDA",
  fullName: {
    en: "AIIDA — Aveiro Islamic Mosque & Community",
    pt: "AIIDA — Mesquita e Comunidade Islâmica de Aveiro",
  },
  legalName: "Associação Cultural e Beneficente AIIDA",
  domain: "https://aiida.pt",
  // TODO: replace with the real registered address & contacts
  address: {
    street: "Rua Batalhão de Caçadores 10, 50SR",
    postalCode: "3810-064",
    city: "Aveiro",
    country: "Portugal",
  },
  phone: "+351 234 000 000",
  email: "info@aiida.pt",
  mbway: {
    phone: "+351 920 153 223",
    name: "AIIDA",
  },
  officeHours: {
    en: "Mon–Fri 10:00–13:00 & 17:00–19:30 · Sat 10:00–13:00",
    pt: "Seg–Sex 10:00–13:00 e 17:00–19:30 · Sáb 10:00–13:00",
  },
  coordinates: { latitude: 40.6405, longitude: -8.6539 },
  timezone: "Europe/Lisbon",
  prayerCalculationMethod: 3, // Muslim World League
  socials: {
    facebook: "https://facebook.com/aiida.aveiro",
    instagram: "https://instagram.com/aiida.aveiro",
  },
  jumuah: [{ khutbah: "13:15", prayer: "13:45" }],
  iqamahOffsetsMinutes: {
    fajr: 10,
    dhuhr: 15,
    asr: 10,
    maghrib: 3,
    isha: 15,
  },
  bankTransfer: {
    recipient: "AIIDA",
    iban: "PT50 0035 2004 0004 1108 0300 3",
    swift: "CGDIPTPL",
    note: {
      en: "Please add your name and the word Zakat or Sadaqah in the payment description.",
      pt: "Indique o seu nome e a palavra Zakat ou Sadaqá na descrição da transferência.",
    },
  },
};

export function localized<T extends { en: string; pt: string }>(
  value: T,
  locale: string
): string {
  return locale === "pt" ? value.pt : value.en;
}

export function mapsEmbedUrl(): string {
  const { street, postalCode, city, country } = SITE.address;
  const q = encodeURIComponent(`${street}, ${postalCode} ${city}, ${country}`);
  return `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
}

export function mapsLink(): string {
  const { street, postalCode, city, country } = SITE.address;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${street}, ${postalCode} ${city}, ${country}`
  )}`;
}
