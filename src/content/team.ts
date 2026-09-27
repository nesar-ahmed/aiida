export type Member = {
  name: string;
  role: { en: string; pt: string };
  bio: { en: string; pt: string };
};

// TODO: replace with real names & photos from the board
export const TEAM: Member[] = [
  {
    name: "Imam Yusuf Rahman",
    role: { en: "Imam & Religious Advisor", pt: "Imão e conselheiro religioso" },
    bio: {
      en: "Leads the daily prayers and Jumu'ah khutbah, teaches the Quran circle and offers confidential guidance to community members.",
      pt: "Dirige as orações diárias e a khutbah de sexta-feira, leciona o círculo do Alcorão e oferece aconselhamento reservado aos membros da comunidade.",
    },
  },
  {
    name: "Abdelrahman Silva",
    role: { en: "President, Board of Directors", pt: "Presidente da direção" },
    bio: {
      en: "Coordinates the board, the mosque's relations with Portuguese authorities and the strategic development of the centre.",
      pt: "Coordena a direção, as relações da mesquita com as autoridades portuguesas e o desenvolvimento estratégico do centro.",
    },
  },
  {
    name: "Amina Fernandes",
    role: { en: "Sisters' & Family Programme Lead", pt: "Responsável pelo programa das mulheres e famílias" },
    bio: {
      en: "Oversees the sisters' area, family counselling, weekend madrasah and the welcome programme for newly arrived families.",
      pt: "Coordena a zona das mulheres, o aconselhamento familiar, a madrasah de fim de semana e o programa de acolhimento de novas famílias.",
    },
  },
  {
    name: "Bilal Chowdhury",
    role: { en: "Students & Youth Coordinator", pt: "Coordenador de estudantes e jovens" },
    bio: {
      en: "First point of contact for international students at Universidade de Aveiro, runs youth nights and the iftar season.",
      pt: "Primeiro contacto para os estudantes internacionais da Universidade de Aveiro, organiza as noites dos jovens e a época de iftar.",
    },
  },
];

export const FACILITIES: { title: { en: string; pt: string }; description: { en: string; pt: string } }[] = [
  {
    title: { en: "Main prayer hall", pt: "Sala de oração principal" },
    description: {
      en: "A calm, carpeted hall oriented towards the qibla, with space for over 200 worshippers.",
      pt: "Uma sala serena e alcatifada, orientada para a qibla, com espaço para mais de 200 fiéis.",
    },
  },
  {
    title: { en: "Sisters' prayer area", pt: "Zona de oração das mulheres" },
    description: {
      en: "Separate, comfortable prayer area with its own entrance, wudu facilities and direct view of the imam.",
      pt: "Zona de oração separada e confortável, com entrada própria, instalações de abluções e contacto visual com o imão.",
    },
  },
  {
    title: { en: "Wudu facilities", pt: "Instalações de abluções" },
    description: {
      en: "Modern ablution areas for brothers and sisters, with warm water year-round.",
      pt: "Instalações modernas de abluções para homens e mulheres, com água quente durante todo o ano.",
    },
  },
  {
    title: { en: "Classrooms & library", pt: "Salas de aula e biblioteca" },
    description: {
      en: "Teaching rooms for the madrasah and Arabic classes, plus a growing library in English, Portuguese and Arabic.",
      pt: "Salas de ensino para a madrasah e as aulas de árabe, e uma biblioteca em crescimento em inglês, português e árabe.",
    },
  },
  {
    title: { en: "Community hall", pt: "Sala comunitária" },
    description: {
      en: "A multipurpose space for events, iftars, weddings and open days, available for community use.",
      pt: "Um espaço polivalente para eventos, iftars, casamentos e dias abertos, disponível para a comunidade.",
    },
  },
  {
    title: { en: "Office & welcome desk", pt: "Secretariado e receção" },
    description: {
      en: "Where new visitors get answers, students get help and paperwork for Nikah or Janazah is handled with care.",
      pt: "Onde os novos visitantes encontram respostas, os estudantes recebem apoio e os processos de casamento ou janazah são tratados com cuidado.",
    },
  },
];
