import type { Lang } from "@/lib/lang";

type Dict = {
  aboutHeading: string;
  aboutIntro: string;
  metaRole: string;
  metaRoleValue: string;
  metaClient: string;
  metaClientValue: string;
  metaClientAlt: string;

  taskHeading: string;
  taskPara: string;
  taskSystemMust: string;
  taskBullets: [string, string][];
  taskQuote: string;
  // Цитата с ручными переносами для фикс-холстов ≥1024 (1440/1280) — 1:1
  // с Figma (RU: 5 строк; EN: 4 строки). Рендерится строками через <br>
  // (не \n — его съедает типограф, приклеивая «ещё» неразрывным пробелом).
  taskQuoteXlLines: string[];

  researchHeading: string;
  researchPara1: string;
  researchPara2: string;

  visualSystemHeading: string;
  visualSystemPara1: string;
  visualSystemPara2: string;
  visualSystemQuote: string;

  principlesHeading: string;
  principlesPara1: string;
  principlesPara2: string;
  principlesQuote: string;

  processHeading: string;
  processPara1: string;
  processPara2: string;
  steps: { title: string; desc: string }[];

  dsystemHeading: string;
  dsystemPara: string;
  dsystemQuote: string;

  siteFeaturesCaption: string;
  tapToExpand: string;

  summaryHeading: string;
  summaryPara1: string;
  summaryPara2: string;
};

const ru: Dict = {
  aboutHeading: "О ПРОЕКТЕ",
  aboutIntro:
    "Для Stablegate я разработал систему 3D key visuals, которая помогает наглядно объяснять ключевые функции финтех-продукта. Проект охватил весь цикл работы: от поиска визуальных метафор и построения дизайн-системы до создания готовых иллюстраций для сайта, презентаций, email-рассылок и социальных сетей.",
  metaRole: "Позиция",
  metaRoleValue: "3D Artist",
  metaClient: "Клиент",
  metaClientValue: "Stablegate",
  metaClientAlt: "Яндекс",

  taskHeading: "Задача",
  taskPara:
    "Нужно было создать не набор отдельных иллюстраций, а визуальную систему, которая объясняет функциональность продукта без текста и работает в разных форматах и контекстах.",
  taskSystemMust: "Система должна была:",
  taskBullets: [
    ["Сохранять", "визуальную целостность"],
    ["Объяснять", "особенности продукта"],
    ["Масштабироваться", "в маркетинговых материалах"],
    ["Использоваться", "на любом фоне"],
  ],
  taskQuote:
    "Каждая иллюстрация должна была объяснять функцию продукта ещё до того, как пользователь прочитает текст",
  taskQuoteXlLines: [
    "Каждая иллюстрация",
    "должна была объяснять",
    "функцию продукта ещё",
    "до того, как пользователь",
    "прочитает текст",
  ],

  researchHeading: "Исследование",
  researchPara1:
    "Работа началась с изучения продукта и поиска визуальных метафор. Вместе с маркетологом мы определили ключевые функции и преимущества Stablegate, а затем искали для них понятные образы.",
  researchPara2:
    "От привычной банковской символики сознательно отказались в пользу более современных и технологичных решений. После этого я собрал референсы, сделал серию быстрых скетчей и определил принципы будущей системы.",

  visualSystemHeading: "Визуальная система",
  visualSystemPara1:
    "Первой иллюстрацией стала Wallet. После её утверждения я сформировал библиотеку материалов, настроил универсальную сцену освещения и определил правила построения композиций.",
  visualSystemPara2:
    "Новые изображения создавались не с нуля: каждая иллюстрация наследовала общие принципы работы с формой, материалами, цветом, светом и уровнем детализации.",
  visualSystemQuote:
    "Одна иллюстрация стала основой для масштабируемой визуальной системы",

  principlesHeading: "Принципы дизайна",
  principlesPara1:
    "В основе визуального языка лежат простые округлые формы, реалистичные материалы и ограниченная фирменная палитра. Во всех сценах использовались пластик, стекло и металл, а также единая схема освещения.",
  principlesPara2:
    "Приоритетом была не максимальная реалистичность, а ясность формы и быстрое считывание смысла композиции.",
  principlesQuote:
    "Материалы добавляли характер, сохраняя простоту и ясность формы",

  processHeading: "Процесс",
  processPara1:
    "Каждая иллюстрация проходила один рабочий цикл: поиск метафоры, быстрый скетч, построение композиции, настройка материалов и освещения, затем финальный рендер.",
  processPara2:
    "Такой подход позволял принимать ключевые решения на ранних этапах. Библиотека материалов и готовых объектов ускоряла создание новых сцен и помогала сохранять единый стиль.",
  steps: [
    { title: "Sketch", desc: "Поиск идеи и композиции" },
    { title: "Blocking", desc: "Построение базовых форм" },
    { title: "Modeling", desc: "Создание финальной геометрии" },
    { title: "Materials", desc: "Подбор материалов и настройка их параметров" },
    { title: "Lighting", desc: "Постановка света и акцентов" },
    { title: "Render", desc: "Финальный рендер и постобработка" },
    { title: "Final Key Visual", desc: "Готовая иллюстрация" },
  ],

  dsystemHeading: "Дизайн-система",
  dsystemPara:
    "Каждая иллюстрация создавалась как часть общей системы. Геометрия, материалы, освещение и цветовая палитра формировали единый визуальный язык независимо от темы конкретной сцены.",
  dsystemQuote: "Разные функции продукта. Один визуальный язык",

  siteFeaturesCaption:
    "Секция сайта Stablegate: Financial infrastructure built for modern businesses",
  tapToExpand: "нажмите, чтобы раскрыть",

  summaryHeading: "Итог",
  summaryPara1:
    "Сегодня иллюстрации используются маркетинговой командой Stablegate в презентациях, email-рассылках, социальных сетях и других коммуникационных материалах. Собственная библиотека помогла сократить использование стоковых изображений и ускорить подготовку новых материалов.",
  summaryPara2:
    "Главным результатом стала масштабируемая система 3D key visuals, которая помогает понятным визуальным языком объяснять сложные функции продукта и поддерживать единый стиль бренда во всех точках коммуникации.",
};

const en: Dict = {
  aboutHeading: "ABOUT THE PROJECT",
  aboutIntro:
    "For Stablegate I built a system of 3D key visuals that helps explain the fintech product's core features at a glance. The project covered the full cycle: from finding visual metaphors and building a design system to producing finished illustrations for the website, decks, email campaigns and social media.",
  metaRole: "Role",
  metaRoleValue: "3D Artist",
  metaClient: "Client",
  metaClientValue: "Stablegate",
  metaClientAlt: "Yandex",

  taskHeading: "Task",
  taskPara:
    "The goal wasn't a set of separate illustrations but a visual system that explains the product's functionality without text and works across different formats and contexts.",
  taskSystemMust: "The system had to:",
  taskBullets: [
    ["Keep", "visual coherence"],
    ["Explain", "the product's features"],
    ["Scale", "across marketing materials"],
    ["Work", "on any background"],
  ],
  taskQuote:
    "Every illustration had to explain a product feature before the user even read the text",
  taskQuoteXlLines: [
    "Every illustration had",
    "to explain a product feature",
    "before the user even read",
    "the text",
  ],

  researchHeading: "Research",
  researchPara1:
    "The work started with studying the product and searching for visual metaphors. Together with a marketer we defined Stablegate's key features and benefits, then looked for clear images for them.",
  researchPara2:
    "We deliberately dropped the usual banking symbolism in favour of more modern, technological solutions. After that I gathered references, made a series of quick sketches and set the principles of the future system.",

  visualSystemHeading: "Visual system",
  visualSystemPara1:
    "The first illustration was Wallet. Once it was approved, I built a materials library, set up a universal lighting scene and defined the rules for building compositions.",
  visualSystemPara2:
    "New images weren't made from scratch: every illustration inherited the shared principles of working with form, materials, colour, light and level of detail.",
  visualSystemQuote:
    "One illustration became the basis for a scalable visual system",

  principlesHeading: "Design principles",
  principlesPara1:
    "The visual language is built on simple rounded shapes, realistic materials and a limited brand palette. Every scene used plastic, glass and metal, plus one lighting scheme.",
  principlesPara2:
    "The priority wasn't maximum realism but clarity of form and reading the meaning of a composition quickly.",
  principlesQuote:
    "Materials added character while keeping the form simple and clear",

  processHeading: "Process",
  processPara1:
    "Every illustration went through one working cycle: finding a metaphor, a quick sketch, building the composition, setting up materials and lighting, then the final render.",
  processPara2:
    "This approach let us make the key decisions early. The library of materials and ready-made objects sped up creating new scenes and helped keep one style.",
  steps: [
    { title: "Sketch", desc: "Searching for the idea and composition" },
    { title: "Blocking", desc: "Building the base shapes" },
    { title: "Modeling", desc: "Creating the final geometry" },
    { title: "Materials", desc: "Choosing materials and tuning their settings" },
    { title: "Lighting", desc: "Setting up light and accents" },
    { title: "Render", desc: "Final render and post-processing" },
    { title: "Final Key Visual", desc: "The finished illustration" },
  ],

  dsystemHeading: "Design system",
  dsystemPara:
    "Every illustration was made as part of one system. Geometry, materials, lighting and the colour palette formed a single visual language regardless of a scene's specific topic.",
  dsystemQuote: "Different product features. One visual language",

  siteFeaturesCaption:
    "A section of the Stablegate site: Financial infrastructure built for modern businesses",
  tapToExpand: "tap to expand",

  summaryHeading: "Outcome",
  summaryPara1:
    "The illustrations are now used by Stablegate's marketing team in decks, email campaigns, social media and other communication materials. The in-house library reduced the use of stock imagery and sped up preparing new materials.",
  summaryPara2:
    "The main result is a scalable system of 3D key visuals that explains the product's complex features in a clear visual language and keeps one brand style across every touchpoint.",
};

export const C3: Record<Lang, Dict> = { ru, en };
