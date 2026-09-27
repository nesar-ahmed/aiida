export type MosqueEvent = {
  id: string;
  date: string; // ISO date, evaluated in Europe/Lisbon
  start: string; // HH:MM
  end?: string;
  category: "lecture" | "education" | "community" | "worship";
  title: { en: string; pt: string };
  excerpt: { en: string; pt: string };
  location: { en: string; pt: string };
};

// TODO: replace with real programme once published by the board
export const EVENTS: MosqueEvent[] = [
  {
    id: "quran-circle",
    date: "2026-10-04",
    start: "17:30",
    end: "19:00",
    category: "education",
    title: {
      en: "Weekly Quran Circle (Halaqah)",
      pt: "Círculo semanal do Alcorão (Halaqah)",
    },
    excerpt: {
      en: "Recitation, tajweed practice and reflection on the verses of the week, open to all levels.",
      pt: "Recitação, prática de tajwid e reflexão sobre os versículos da semana, aberto a todos os níveis.",
    },
    location: { en: "Study room 1", pt: "Sala de estudo 1" },
  },
  {
    id: "youth-night",
    date: "2026-10-09",
    start: "20:30",
    end: "22:30",
    category: "community",
    title: {
      en: "Youth Night: Faith & Future",
      pt: "Noite dos jovens: fé e futuro",
    },
    excerpt: {
      en: "A relaxed evening for students and young professionals — talk, questions, games and dinner.",
      pt: "Uma noite descontraída para estudantes e jovens profissionais — palestra, perguntas, jogos e jantar.",
    },
    location: { en: "Community hall", pt: "Sala comunitária" },
  },
  {
    id: "lecture-40-nawawi",
    date: "2026-10-16",
    start: "21:00",
    end: "22:30",
    category: "lecture",
    title: {
      en: "Series: Exploring the 40 Nawawi",
      pt: "Ciclo: Explorando os 40 Nawawi",
    },
    excerpt: {
      en: "Our imam walks through the classic collection of prophetic hadith, one tradition per month. English with Portuguese summary.",
      pt: "O nosso imão percorre a coleção clássica de hadith proféticos, um hadite por mês. Em inglês com resumo em português.",
    },
    location: { en: "Prayer hall", pt: "Sala de oração" },
  },
  {
    id: "open-day",
    date: "2026-11-07",
    start: "15:00",
    end: "18:00",
    category: "community",
    title: {
      en: "Open Day & Guided Visits",
      pt: "Dia aberto e visitas guiadas",
    },
    excerpt: {
      en: "Neighbours, schools and the wider Aveiro community are invited to tour the mosque and share tea and sweets.",
      pt: "Vizinhos, escolas e a comunidade de Aveiro são convidados a visitar a mesquita e a partilhar chá e doces.",
    },
    location: { en: "Throughout the mosque", pt: "Em toda a mesquita" },
  },
  {
    id: "eid-adha",
    date: "2026-12-18",
    start: "08:30",
    category: "worship",
    title: {
      en: "Eid Prayer & Community Breakfast",
      pt: "Oração do Eid e pequeno-almoço comunitário",
    },
    excerpt: {
      en: "Eid salah at 08:30 and 10:30, followed by a breakfast for the whole community. Overflow area for families with children.",
      pt: "Oração do Eid às 08:30 e às 10:30, seguida de pequeno-almoço para toda a comunidade. Zona de reforço para famílias com crianças.",
    },
    location: { en: "Prayer hall & overflow", pt: "Sala de oração e zona de reforço" },
  },
];

export const EVENT_CATEGORY_LABELS: Record<
  MosqueEvent["category"],
  { en: string; pt: string }
> = {
  lecture: { en: "Lecture", pt: "Palestra" },
  education: { en: "Education", pt: "Educação" },
  community: { en: "Community", pt: "Comunidade" },
  worship: { en: "Worship", pt: "Culto" },
};
