import type { Lang } from "@/lib/lang";

// Тексты главной страницы. Названия компаний — транслит (по просьбе).
export const T: Record<Lang, {
  navCases: string;
  navAbout: string;
  navContacts: string;
  aboutHeading: string;
  aboutBio: [string, string];
  casesHeading: string;
  footerTop: string;
}> = {
  ru: {
    navCases: "КЕЙСЫ",
    navAbout: "О СЕБЕ",
    navContacts: "КОНТАКТЫ",
    aboutHeading: "о себе",
    aboutBio: [
      "Дизайн-лид, который сочетает управление командой с практической работой в дизайне. Выстраиваю процессы, систематизирую большие объёмы задач и помогаю командам сохранять качество и темп работы.",
      "Сам создаю Key Visual, иллюстрации, 3D, иконографику и AI-визуалы: от идеи и поиска визуального направления до финального результата. Быстро разбираюсь в сложных задачах, беру ответственность за результат и развиваю визуальные направления вместе с командой.",
    ],
    casesHeading: "КЕЙСЫ",
    footerTop: "НАВЕРХ",
  },
  en: {
    navCases: "CASES",
    navAbout: "ABOUT",
    navContacts: "CONTACTS",
    aboutHeading: "about",
    aboutBio: [
      "A design lead who blends team management with hands-on design work. I build processes, structure large volumes of tasks and help teams keep their quality and pace.",
      "I create key visuals, illustrations, 3D, iconography and AI visuals myself — from the idea and visual direction to the final result. I get up to speed on complex problems fast, own the outcome and grow visual directions together with the team.",
    ],
    casesHeading: "CASES",
    footerTop: "TO TOP",
  },
};

export const CLIENTS: Record<Lang, string[]> = {
  ru: [
    "Яндекс Фабрика",
    "Яндекс Такси",
    "Яндекс 360",
    "Яндекс Cloud",
    "Яндекс Алиса",
    "Яндекс Самокаты",
    "Яндекс Еда",
    "Яндекс Лавка",
    "Stablegate",
    "МТС",
    "Т-Банк",
    "Звук",
    "Haier",
    "УралКалий",
    "Divan.ru",
    "Fort Telecom",
    "Sabotage brewery",
  ],
  en: [
    "Yandex Fabrika",
    "Yandex Taksi",
    "Yandex 360",
    "Yandex Cloud",
    "Yandex Alisa",
    "Yandex Samokaty",
    "Yandex Eda",
    "Yandex Lavka",
    "Stablegate",
    "MTS",
    "T-Bank",
    "Zvuk",
    "Haier",
    "UralKaliy",
    "Divan.ru",
    "Fort Telecom",
    "Sabotage brewery",
  ],
};
