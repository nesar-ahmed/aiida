export type Service = {
  id: string;
  icon: string;
  title: { en: string; pt: string };
  body: { en: string; pt: string };
};

export const SERVICES: Service[] = [
  {
    id: "daily-prayers",
    icon: "clock",
    title: { en: "Five Daily Prayers", pt: "As cinco orações diárias" },
    body: {
      en: "Congregational salah five times a day, led by our imam. Brothers and sisters pray in separate, equally comfortable areas.",
      pt: "Oração em congregação cinco vezes por dia, dirigida pelo nosso imão. Homens e mulheres rezam em zonas separadas e igualmente confortáveis.",
    },
  },
  {
    id: "jumuah",
    icon: "mosque",
    title: { en: "Jumu'ah Prayer", pt: "Oração de sexta-feira (Jumu'ah)" },
    body: {
      en: "Two Jumu'ah services every Friday with the khutbah delivered in Arabic and English, translated for Portuguese speakers.",
      pt: "Duas sessões de Jumu'ah todas as sextas-feiras, com a khutbah em árabe e inglês, traduzida para falantes de português.",
    },
  },
  {
    id: "nikah",
    icon: "heart",
    title: { en: "Nikah & Family Matters", pt: "Casamento islâmico e família" },
    body: {
      en: "Nikah ceremonies, marriage preparation courses and family counselling in line with Islamic guidance and Portuguese law.",
      pt: "Cerimónias de casamento islâmico, cursos de preparação para o matrimónio e aconselhamento familiar segundo os princípios islâmicos e a lei portuguesa.",
    },
  },
  {
    id: "janazah",
    icon: "hands",
    title: { en: "Janazah — Funeral Services", pt: "Janazah — serviços funerários" },
    body: {
      en: "Guidance and practical support for ghusl, kafan, funeral prayer and burial, working with local authorities and cemeteries.",
      pt: "Apoio e orientação para ghusl, kafan, oração fúnebre e sepultamento, em articulação com as autoridades locais e os cemitérios.",
    },
  },
  {
    id: "education",
    icon: "book",
    title: { en: "Quran & Education", pt: "Alcorão e educação" },
    body: {
      en: "Quran recitation classes for children and adults, Arabic language courses, weekly halaqah and a young-learners madrasah at weekends.",
      pt: "Aulas de recitação do Alcorão para crianças e adultos, cursos de língua árabe, halaqah semanal e madrasah para os mais novos ao fim de semana.",
    },
  },
  {
    id: "new-muslims",
    icon: "sparkles",
    title: { en: "Reversion & Guidance", pt: "Conversão e acompanhamento" },
    body: {
      en: "A warm welcome and confidential, patient guidance for anyone taking the shahada or exploring Islam. No question is too small.",
      pt: "Um acolhimento caloroso e um acompanhamento reservado e paciente para quem pronuncia a shahada ou para quem está a descobrir o Islão. Não há perguntas pequenas.",
    },
  },
  {
    id: "students",
    icon: "users",
    title: { en: "Students & Newcomers", pt: "Estudantes e recém-chegados" },
    body: {
      en: "Special support for international students and newly arrived families: prayer spaces, iftar nights, buddy programme and practical help settling into Aveiro.",
      pt: "Apoio dedicado a estudantes internacionais e famílias recém-chegadas: espaços de oração, noites de iftar, programa de acompanhamento e ajuda prática na chegada a Aveiro.",
    },
  },
  {
    id: "outreach",
    icon: "globe",
    title: { en: "Community & Interfaith", pt: "Comunidade e diálogo inter-religioso" },
    body: {
      en: "Open days, guided visits for schools and neighbours, and dialogue with the wider Aveiro community — our doors are open to everyone.",
      pt: "Dias abertos, visitas guiadas para escolas e vizinhos e diálogo com a comunidade de Aveiro — as nossas portas estão abertas a todos.",
    },
  },
];

export type Faq = {
  question: { en: string; pt: string };
  answer: { en: string; pt: string };
};

export const FAQS: Faq[] = [
  {
    question: {
      en: "Can women pray at the mosque?",
      pt: "As mulheres podem rezar na mesquita?",
    },
    answer: {
      en: "Yes. We have a dedicated sisters' prayer area with its own entrance, wudu facilities and a direct view of the imam during congregational prayers.",
      pt: "Sim. Temos uma zona de oração exclusiva para as mulheres, com entrada própria, instalações de abluções e contacto direto com o imão durante as orações em congregação.",
    },
  },
  {
    question: {
      en: "What should I wear when visiting?",
      pt: "O que devo vestir quando visitar a mesquita?",
    },
    answer: {
      en: "Simple, loose-fitting clothing that covers the body is respectful. Women are asked to cover their hair in the prayer hall; scarves are available at the entrance. Shoes are removed before entering.",
      pt: "Roupa simples e larga que cubra o corpo é respeitosa. Pede-se às mulheres que cubram o cabelo na sala de oração; há lenços disponíveis à entrada. Os sapatos retiram-se antes de entrar.",
    },
  },
  {
    question: {
      en: "Is there parking near the mosque?",
      pt: "Há estacionamento perto da mesquita?",
    },
    answer: {
      en: "There is free street parking around the mosque and a public car park a two-minute walk away. For Jumu'ah we recommend arriving 15–20 minutes early.",
      pt: "Há estacionamento gratuito na rua junto à mesquita e um parque público a dois minutos a pé. À sexta-feira, recomendamos chegar com 15 a 20 minutos de antecedência.",
    },
  },
  {
    question: {
      en: "Can non-Muslims visit?",
      pt: "As pessoas não muçulmanas podem visitar?",
    },
    answer: {
      en: "Absolutely — guided tours for schools, universities and community groups can be arranged through the office. Many of our best conversations start with a visit.",
      pt: "Sem dúvida — podem ser organizadas visitas guiadas para escolas, universidades e grupos da comunidade através do secretariado. Muitas das nossas melhores conversas começam com uma visita.",
    },
  },
  {
    question: {
      en: "Are donations tax-deductible in Portugal?",
      pt: "Os donativos são dedutíveis no IRS em Portugal?",
    },
    answer: {
      en: "Donations to registered religious and cultural associations can benefit from tax deductions under Portuguese law (Estatuto do Mecenato). Ask the office for an official receipt (fatura-recibo).",
      pt: "Os donativos a associações religiosas e culturais registadas podem beneficiar de deduções fiscais nos termos da lei portuguesa (Estatuto do Mecenato). Peça ao secretariado um recibo oficial.",
    },
  },
];
