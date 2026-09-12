import type { Lang } from "@/lib/lang";

// Тексты кейса 003. См. I18N-RULES.md — общие правила перевода (авто-
// лэйаут вместо дублирующихся фикс-offset'ов, повтор RU-переносов строк
// с проверкой на «висячие» слова, % vs фикс-px для декоративных обводок).
type Dict = {
  // page.tsx — обложка / «О проекте»
  coverLine1: string;
  coverLine2: string;
  coverAlt: string;
  aboutHeading: string;
  aboutIntro: string;
  metaRole: string;
  metaRoleValue: string;
  metaClient: string;
  metaClientStablegate: string;
  metaClientYandex: string;

  // SiteFeatures
  siteFeaturesAlt: string;
  collapseSiteLabel: string;
  expandSiteLabel: string;
  tapToExpand: string;

  // 01 Задача
  taskHeading: string;
  taskIntro: string;
  systemMustLabel: string;
  reqs: [string, string][];
  coinAlt: string;
  taskQuote: string;
  cardAlt1: string;
  cardAlt2: string;
  cardAlt3: string;
  cardAlt4: string;

  // 02 Исследование
  researchHeading: string;
  researchIntro1: string;
  researchIntro2: string;
  moodboardAlt: string;
  moodboardCaptionsSr: string;

  // 03 Визуальная система
  visualHeading1: string;
  visualHeading2: string;
  visualPara1: string;
  visualPara2: string;
  conferencePhotoAlt: string;
  visualQuote: string;

  // 04 Принципы дизайна
  principlesHeading: string;
  principlesPara1: string;
  principlesPara2: string;
  tileWalletAlt: string;
  tileExchangeAlt: string;
  tileCoinAlt: string;
  tileFeesAlt: string;
  principlesQuote: string;
  slide2CoinAlt: string;
  slide2LockAlt: string;

  // 05/06 Процесс + Дизайн-система
  processHeading: string;
  processIntro1: string;
  processIntro2: string;
  steps: { title: string; desc: string }[];
  dsystemHeading: string;
  dsystemIntro: string;
  processQuoteLine1: string;
  processQuoteLine2: string;

  // 07 Итог
  summaryHeading: string;
  summaryPara1: string;
  summaryPara2: string;
  summaryMockupAlt: string;
};

const ru: Dict = {
  coverLine1: "3D-иллюстраций",
  coverLine2: "для финтех-продукта",
  coverAlt: "Сайт Stablegate на экране ноутбука",
  aboutHeading: "О ПРОЕКТЕ",
  aboutIntro:
    "Для Stablegate разработана система 3D key visuals: 3D выбрали вместо плоских иллюстраций, потому что так лучше вписывается в дизайн сайта. Сегодня в библиотеке 12 иллюстраций, готовый набор сокращает подготовку новых материалов вдвое — команда берёт готовую иллюстрацию вместо поиска на стоках или генерации с нуля.",
  metaRole: "Позиция",
  metaRoleValue: "3D Artist",
  metaClient: "Клиент",
  metaClientStablegate: "Stablegate",
  metaClientYandex: "Яндекс",

  siteFeaturesAlt: "Секция сайта Stablegate: Financial infrastructure built for modern businesses",
  collapseSiteLabel: "Свернуть секцию сайта",
  expandSiteLabel: "Раскрыть секцию сайта для просмотра",
  tapToExpand: "нажмите, чтобы раскрыть",

  taskHeading: "Задача",
  taskIntro:
    "Нужно было создать не набор отдельных иллюстраций, а визуальную систему, которая объясняет функциональность продукта без текста и работает в разных форматах и контекстах.",
  systemMustLabel: "Система должна была:",
  reqs: [
    ["Сохранять", "визуальную целостность"],
    ["Объяснять", "особенности продукта"],
    ["Масштабироваться", "в маркетинговых материалах"],
    ["Использоваться", "на любом фоне"],
  ],
  coinAlt: "Стек 3D-монет Stablegate",
  taskQuote:
    "Каждая иллюстрация должна была объяснять функцию продукта ещё до того, как пользователь прочитает текст",
  cardAlt1: "Слайд презентации: Transparent pricing 0,5–2%",
  cardAlt2: "Пост: Move digital assets with confidence",
  cardAlt3: "Пост: Payments without delays",
  cardAlt4: "Пост: Real-time transactions",

  researchHeading: "Исследование",
  researchIntro1:
    "Работа началась с изучения продукта и поиска визуальных метафор. Вместе с маркетологом мы определили ключевые функции и преимущества Stablegate, а затем искали для них понятные образы.",
  researchIntro2:
    "От привычной банковской символики сознательно отказались в пользу более современных и технологичных решений. После этого я собрал референсы, сделал серию быстрых скетчей и определил принципы будущей системы.",
  moodboardAlt: "Мудборд 3D-референсов: материалы, форма, композиция, итог",
  moodboardCaptionsSr: "Категории мудборда: Material, Form, Composition, Result.",

  visualHeading1: "Визуальная",
  visualHeading2: "система",
  visualPara1:
    "Первой иллюстрацией стала Wallet. После её утверждения я сформировал библиотеку материалов, настроил универсальную сцену освещения и определил правила построения композиций.",
  visualPara2:
    "Новые изображения создавались не с нуля: каждая иллюстрация наследовала общие принципы работы с формой, материалами, цветом, светом и уровнем детализации.",
  conferencePhotoAlt: "Презентация иллюстраций Stablegate на конференции",
  visualQuote: "Одна иллюстрация стала основой для масштабируемой визуальной системы",

  principlesHeading: "Принципы дизайна",
  principlesPara1:
    "В основе визуального языка лежат простые округлые формы, реалистичные материалы и ограниченная фирменная палитра. Во всех сценах использовались пластик, стекло и металл, а также единая схема освещения.",
  principlesPara2:
    "Приоритетом была не максимальная реалистичность, а ясность формы и быстрое считывание смысла композиции.",
  tileWalletAlt: "3D-иллюстрация Wallet: телефон со списком крипто-активов",
  tileExchangeAlt: "3D-иллюстрация Exchange: стрелка обмена и евро-монета",
  tileCoinAlt: "3D-иллюстрация Coin: стопка монет",
  tileFeesAlt: "3D-иллюстрация Fees: синяя стеклянная форма",
  principlesQuote: "Материалы добавляли характер, сохраняя простоту и ясность формы",
  slide2CoinAlt: "3D-стек монет Stablegate с галочкой",
  slide2LockAlt: "3D-иллюстрация: карта Stablegate, замок и Face ID",

  processHeading: "Процесс",
  processIntro1:
    "Каждая иллюстрация проходила один рабочий цикл: поиск метафоры, быстрый скетч, построение композиции, настройка материалов и освещения, затем финальный рендер.",
  processIntro2:
    "Такой подход позволял принимать ключевые решения на ранних этапах. Библиотека материалов и готовых объектов ускоряла создание новых сцен и помогала сохранять единый стиль.",
  steps: [
    { title: "Sketch", desc: "Поиск идеи и композиции" },
    { title: "Blocking", desc: "Построение базовых форм" },
    { title: "Modeling", desc: "Создание финальной геометрии" },
    { title: "Materials", desc: "Выбираем решение и согласовываем направление" },
    { title: "Lighting", desc: "Постановка света и акцентов" },
    { title: "Render", desc: "Финальный рендер и постобработка" },
    { title: "Final Key Visual", desc: "Готовая иллюстрация" },
  ],
  dsystemHeading: "Дизайн-система",
  dsystemIntro:
    "Каждая иллюстрация создавалась как часть общей системы. Геометрия, материалы, освещение и цветовая палитра формировали единый визуальный язык независимо от темы конкретной сцены.",
  processQuoteLine1: "Разные функции продукта.",
  processQuoteLine2: "Один визуальный язык",

  summaryHeading: "Итог",
  summaryPara1:
    "Сегодня иллюстрации используются маркетинговой командой Stablegate в презентациях, email-рассылках, социальных сетях и других коммуникационных материалах. Собственная библиотека помогла сократить использование стоковых изображений и ускорить подготовку новых материалов.",
  summaryPara2:
    "Главным результатом стала масштабируемая система 3D key visuals, которая помогает понятным визуальным языком объяснять сложные функции продукта и поддерживать единый стиль бренда во всех точках коммуникации.",
  summaryMockupAlt: "Сайт Stablegate с 3D-иллюстрациями на экране ноутбука",
};

const en: Dict = {
  coverLine1: "3D Illustrations",
  coverLine2: "for a fintech product",
  coverAlt: "Stablegate website on a laptop screen",
  aboutHeading: "ABOUT THE PROJECT",
  aboutIntro:
    "For Stablegate we built a system of 3D key visuals: 3D was chosen over flat illustration because it fits the site's design better. The library now holds 12 illustrations, and the ready-made set cuts the time to prepare new materials in half — the team reuses an existing illustration instead of searching stock or generating one from scratch.",
  metaRole: "Role",
  metaRoleValue: "3D Artist",
  metaClient: "Client",
  metaClientStablegate: "Stablegate",
  metaClientYandex: "Yandex",

  siteFeaturesAlt: "Stablegate site section: Financial infrastructure built for modern businesses",
  collapseSiteLabel: "Collapse the site section",
  expandSiteLabel: "Expand the site section to view",
  tapToExpand: "tap to expand",

  taskHeading: "Task",
  taskIntro:
    "The goal was not a set of separate illustrations but a visual system that explains the product's functionality without text and works across different formats and contexts.",
  systemMustLabel: "The system had to:",
  reqs: [
    ["Preserve", "visual consistency"],
    ["Explain", "the product's features"],
    ["Scale", "across marketing materials"],
    ["Work", "on any background"],
  ],
  coinAlt: "Stablegate 3D coin stack",
  taskQuote:
    "Every illustration had to explain the product's function before the user even read the text",
  cardAlt1: "Presentation slide: Transparent pricing 0.5–2%",
  cardAlt2: "Post: Move digital assets with confidence",
  cardAlt3: "Post: Payments without delays",
  cardAlt4: "Post: Real-time transactions",

  researchHeading: "Research",
  researchIntro1:
    "The work began with studying the product and searching for visual metaphors. Together with the marketer, we identified Stablegate's key functions and strengths, then looked for clear imagery for each.",
  researchIntro2:
    "We deliberately moved away from familiar banking symbolism toward more modern, technological solutions. I then gathered references, made a series of quick sketches, and defined the principles of the future system.",
  moodboardAlt: "3D reference moodboard: material, form, composition, result",
  moodboardCaptionsSr: "Moodboard categories: Material, Form, Composition, Result.",

  visualHeading1: "Visual",
  visualHeading2: "system",
  visualPara1:
    "Wallet became the first illustration. Once it was approved, I built a materials library, set up a universal lighting scene, and defined the rules for composing scenes.",
  visualPara2:
    "New images were never built from scratch: every illustration inherited shared principles for shape, materials, color, light, and level of detail.",
  conferencePhotoAlt: "Stablegate illustrations presented at a conference",
  visualQuote: "One illustration became the foundation for a scalable visual system",

  principlesHeading: "Design principles",
  principlesPara1:
    "The visual language is built on simple rounded shapes, realistic materials, and a limited brand palette. Every scene used plastic, glass, and metal, plus a single lighting setup.",
  principlesPara2:
    "The priority wasn't maximum realism but clarity of form and instant readability of the composition's meaning.",
  tileWalletAlt: "3D illustration Wallet: a phone with a list of crypto assets",
  tileExchangeAlt: "3D illustration Exchange: an exchange arrow and a euro coin",
  tileCoinAlt: "3D illustration Coin: a stack of coins",
  tileFeesAlt: "3D illustration Fees: a blue glass shape",
  principlesQuote: "Materials added character while keeping the form simple and clear",
  slide2CoinAlt: "Stablegate 3D coin stack with a checkmark",
  slide2LockAlt: "3D illustration: a Stablegate card, a lock, and Face ID",

  processHeading: "Process",
  processIntro1:
    "Every illustration went through one production cycle: finding a metaphor, a quick sketch, building the composition, setting up materials and lighting, then the final render.",
  processIntro2:
    "This approach let us make key decisions early. A library of materials and ready objects sped up building new scenes and helped keep a consistent style.",
  steps: [
    { title: "Sketch", desc: "Searching for the idea and composition" },
    { title: "Blocking", desc: "Building the base shapes" },
    { title: "Modeling", desc: "Creating the final geometry" },
    { title: "Materials", desc: "Picking a solution and agreeing on direction" },
    { title: "Lighting", desc: "Setting up light and accents" },
    { title: "Render", desc: "Final render and post-processing" },
    { title: "Final Key Visual", desc: "The finished illustration" },
  ],
  dsystemHeading: "Design system",
  dsystemIntro:
    "Every illustration was built as part of a shared system. Geometry, materials, lighting, and the color palette formed a single visual language regardless of the scene's subject.",
  processQuoteLine1: "Different product features.",
  processQuoteLine2: "One visual language",

  summaryHeading: "Outcome",
  summaryPara1:
    "Today the illustrations are used by Stablegate's marketing team in presentations, email campaigns, social media, and other communication materials. The in-house library helped cut the use of stock images and speed up the preparation of new materials.",
  summaryPara2:
    "The main result was a scalable system of 3D key visuals that helps explain complex product features in a clear visual language and keeps the brand's style consistent across every touchpoint.",
  summaryMockupAlt: "Stablegate site with 3D illustrations on a laptop screen",
};

export const C3: Record<Lang, Dict> = { ru, en };
