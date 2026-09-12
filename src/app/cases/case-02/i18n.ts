import type { Lang } from "@/lib/lang";

// Тексты кейса 002. См. комментарий в case-01/i18n.ts — тот же принцип:
// EN пишется один раз и подставляется во все брейкпоинт-раскладки, ручные
// переносы (<br>) добавляются в EN только там, где это проверено в браузере
// и не создаёт «висячих» одиночных слов.
type Dict = {
  // page.tsx — обложка / «О проекте»
  coverLine1: string;
  coverLine2: string;
  aboutHeading: string;
  aboutIntro: string;
  metaRole: string;
  metaRoleValue: string;
  metaTeam: string;
  metaTeamValue: string;
  metaClient: string;
  metaClientValue: string;
  coverAlt: string;
  mockup1Alt: string;
  mockup2Alt: string;

  // 01 Задача
  taskHeading: string;
  taskIntro1: string;
  taskIntro2: string;
  taskQuote: string;
  keyOldAlt: string;
  keyNewAlt: string;

  // 02 Исследование
  researchHeading: string;
  researchIntro1: string;
  researchIntro2: string;
  cardsAlt: string;
  collapseCardsLabel: string;
  expandCardsLabel: string;
  tapToExpand: string;

  // 03 Визуальный язык
  visualHeading: string;
  visualPara1: string;
  visualPara2: string;
  visualQuote: string;
  visualPhotoAlt: string;

  // 04 Процесс
  processHeading: string;
  processIntro1: string;
  processIntro2: string;
  steps: { title: string; desc: string }[];

  // 05 сначала 16px
  first16Heading: string;
  first16Para1Lead: string;
  first16Para1Tail: string;
  first16Para2: string;
  first16Para2Extra: string;
  first16Quote: string;
  iconGrownAlt: string;

  // 06 Итог
  summaryHeading: string;
  summaryPara1: string;
  summaryPara2: string;
  summaryPara3: string;
  iconWallAlt: string;
};

const ru: Dict = {
  coverLine1: "ИКОНКИ",
  coverLine2: "YANDEX CLOUD",
  aboutHeading: "О ПРОЕКТЕ",
  aboutIntro:
    "В начале 2026 года Yandex Cloud обновлял визуальный язык продукта. За три недели команда разработала 34 иконки в двух размерах: 16×16 px для интерфейса, 640×640 px для иллюстраций на сайте — при этом стиль ещё не был зафиксирован и уточнялся по ходу работы вместе с арт-директором клиента: толщина линий, радиусы скруглений, форма. Успели точно в срок, это было ключевым условием клиента.",
  metaRole: "Позиция",
  metaRoleValue: "Lead designer",
  metaTeam: "Команда",
  metaTeamValue: "1 дизайнер",
  metaClient: "Клиент",
  metaClientValue: "Яндекс",
  coverAlt: "Сайт Yandex Cloud на экране ноутбука",
  mockup1Alt: "Сайт Yandex Cloud Stackland на экране ноутбука",
  mockup2Alt: "Архитектура Yandex Cloud Stackland на экранах двух ноутбуков",

  taskHeading: "Задача",
  taskIntro1:
    "Главной особенностью проекта стала высокая степень неопределённости. На старте у нас были существующие метафоры сервисов, несколько примеров и общее направление, но не было полноценной системы правил для ежедневной работы.",
  taskIntro2:
    "Требования менялись по ходу проекта, поэтому часть иконок приходилось пересобирать и повторно согласовывать с командой Yandex Cloud. Процесс требовал гибкости и постоянной синхронизации.",
  taskQuote:
    "Мы создавали библиотеку одновременно с правилами, по которым она должна была работать",
  keyOldAlt: "Иконка Identity and Access Management в старом стиле",
  keyNewAlt: "Иконка Identity and Access Management в новом визуальном языке",

  researchHeading: "Исследование",
  researchIntro1:
    "Метафоры сервисов уже существовали, поэтому мы не искали новые образы, а переосмысляли знакомые символы внутри нового визуального языка. Для этого анализировали предыдущую библиотеку, первые примеры новых иконок и визуальные референсы.",
  researchIntro2:
    "Главной целью было сохранить узнаваемость сервисов и привести их к единому стилю.",
  cardsAlt: "Список из 10 сервисов Yandex Cloud с метафорами, поиск формы иконок и итоговые иконки",
  collapseCardsLabel: "Свернуть карточки исследования",
  expandCardsLabel: "Раскрыть карточки исследования 1:1",
  tapToExpand: "нажмите, чтобы раскрыть",

  visualHeading: "Визуальный язык",
  visualPara1:
    "Самой сложной задачей было найти простой принцип, который помогал бы всей команде понимать границы нового визуального языка. Такой метафорой стала деталь, вырезанная из цельного листа металла: если форму нельзя было представить вырезанной таким способом, значит, она не соответствовала стилю.",
  visualPara2:
    "Этот принцип изменил подход к проектированию иконок. Вместо того чтобы строить их из линий и контуров, мы начинали с цельной формы и постепенно убирали всё лишнее.",
  visualQuote: "Новый стиль строился не из линий, а из цельной формы",
  visualPhotoAlt: "Лазерная резка детали из листа металла",

  processHeading: "Процесс",
  processIntro1:
    "После того как основные принципы стали понятны, мы превратили их в рабочий процесс и зафиксировали внутренние правила: работу с метафорами, последовательность этапов и критерии перехода между ними.",
  processIntro2:
    "Документ стал опорой для команды и помогал сохранять единый стиль и качество иконок, даже когда официальный гайдлайн продолжал развиваться.",
  steps: [
    { title: "Анализ", desc: "Изучаем метафору сервиса и требования клиента" },
    { title: "Референсы", desc: "Собираем визуальные ориентиры нового стиля" },
    { title: "Эскизы", desc: "Проверяем несколько вариантов композиции\nи формы" },
    { title: "Ревью", desc: "Выбираем решение и согласовываем направление" },
    { title: "16×16 px", desc: "Отрабатываем силуэт, баланс и читаемость" },
    { title: "640×640 px", desc: "Адаптируем форму для крупного размера, добавляя детали" },
    { title: "Финализация", desc: "Проверяем, оформляем и передаем результат клиенту" },
  ],

  first16Heading: "сначала 16px",
  first16Para1Lead: "Каждая иконка создавалась в двух размерах: 16 × 16 px и 640 × 640 px.",
  first16Para1Tail: "Работу всегда начинали с маленькой версии.",
  first16Para2:
    "После её утверждения создавали большую. Это было не простое масштабирование: менялись пропорции, толщина линий и радиусы скруглений, появлялись дополнительные детали.",
  first16Para2Extra:
    "Большая версия становилась самостоятельной иллюстрацией, сохраняя характер маленькой.",
  first16Quote: "Маленький размер проверял главное: силуэт, композицию и читаемость.",
  iconGrownAlt: "Иконка Key Management Service в размере 16×16, увеличенная до 640×640",

  summaryHeading: "Итог",
  summaryPara1:
    "За три недели команда из двух человек разработала 34 иконки в двух размерах для разных сценариев использования.",
  summaryPara2:
    "Для меня главным результатом стали не только готовые иконки, но и опыт построения процесса в ситуации, когда сама дизайн-система ещё находилась в разработке.",
  summaryPara3:
    "Простые принципы, понятный процесс и постоянный диалог с клиентом помогли сохранить целостность библиотеки и выполнить проект в сжатые сроки.",
  iconWallAlt: "Итоговая библиотека из 34 иконок сервисов Yandex Cloud",
};

const en: Dict = {
  coverLine1: "YANDEX CLOUD",
  coverLine2: "ICONS",
  aboutHeading: "ABOUT THE PROJECT",
  aboutIntro:
    "In early 2026 Yandex Cloud was updating the product's visual language. In three weeks the team designed 34 icons in two sizes — 16×16 px for the interface, 640×640 px for illustrations on the site — while the style itself was still being defined together with the client's art director: line weight, corner radii, shape. We hit the deadline exactly, which was the client's key requirement.",
  metaRole: "Role",
  metaRoleValue: "Lead designer",
  metaTeam: "Team",
  metaTeamValue: "1 designer",
  metaClient: "Client",
  metaClientValue: "Yandex",
  coverAlt: "Yandex Cloud website on a laptop screen",
  mockup1Alt: "Yandex Cloud Stackland website on a laptop screen",
  mockup2Alt: "Yandex Cloud Stackland architecture on two laptop screens",

  taskHeading: "Task",
  taskIntro1:
    "The project's main challenge was a high degree of uncertainty. At the start we had the services' existing metaphors, a few examples and a general direction, but no full set of rules for day-to-day work.",
  taskIntro2:
    "Requirements kept changing as the project went on, so some icons had to be rebuilt and re-approved with the Yandex Cloud team. The process demanded flexibility and constant syncing.",
  taskQuote:
    "We were building the library and the rules it had to follow at the same time",
  keyOldAlt: "Identity and Access Management icon in the old style",
  keyNewAlt: "Identity and Access Management icon in the new visual language",

  researchHeading: "Research",
  researchIntro1:
    "The services' metaphors already existed, so instead of looking for new imagery we rethought familiar symbols within the new visual language. For this we analysed the previous library, the first examples of new icons and visual references.",
  researchIntro2:
    "The main goal was to keep the services recognisable and bring them to a unified style.",
  cardsAlt: "A list of 10 Yandex Cloud services with metaphors, icon form exploration and the final icons",
  collapseCardsLabel: "Collapse the research cards",
  expandCardsLabel: "Expand the research cards to full size",
  tapToExpand: "tap to expand",

  visualHeading: "Visual language",
  visualPara1:
    "The hardest task was finding a simple principle that would help the whole team understand the boundaries of the new visual language. That metaphor became a part cut from a single sheet of metal: if a shape couldn't be imagined as cut this way, it didn't fit the style.",
  visualPara2:
    "This principle changed how we approached icon design. Instead of building icons out of lines and outlines, we started from a solid shape and gradually removed everything unnecessary.",
  visualQuote: "The new style was built not from lines, but from a solid shape",
  visualPhotoAlt: "Laser-cutting a part from a sheet of metal",

  processHeading: "Process",
  processIntro1:
    "Once the core principles were clear, we turned them into a working process and fixed the internal rules: working with metaphors, the sequence of stages and the criteria for moving between them.",
  processIntro2:
    "The document became a reference point for the team and helped keep a unified style and icon quality, even while the official guideline kept evolving.",
  steps: [
    { title: "Analysis", desc: "We study the service's metaphor and the client's requirements" },
    { title: "References", desc: "We gather visual references for the new style" },
    { title: "Sketches", desc: "We test a few options for composition\nand shape" },
    { title: "Review", desc: "We pick a solution and agree on the direction" },
    { title: "16×16 px", desc: "We refine the silhouette, balance and legibility" },
    { title: "640×640 px", desc: "We adapt the shape for the large size, adding detail" },
    { title: "Finalisation", desc: "We check, polish and hand the result to the client" },
  ],

  first16Heading: "16px first",
  first16Para1Lead: "Every icon was made in two sizes: 16 × 16 px and 640 × 640 px.",
  first16Para1Tail: "We always started with the small version.",
  first16Para2:
    "Once it was approved, we made the large one. It wasn't a simple scale-up: proportions, line weight and corner radii changed, and extra detail appeared.",
  first16Para2Extra:
    "The large version became a standalone illustration while keeping the character of the small one.",
  first16Quote: "The small size tested the essentials: silhouette, composition and legibility.",
  iconGrownAlt: "Key Management Service icon at 16×16, scaled up to 640×640",

  summaryHeading: "Outcome",
  summaryPara1:
    "In three weeks a team of two designed 34 icons in two sizes for different use cases.",
  summaryPara2:
    "For me the main result wasn't just the finished icons, but the experience of building a process while the design system itself was still being developed.",
  summaryPara3:
    "Simple principles, a clear process and constant dialogue with the client helped keep the library consistent and deliver the project on a tight schedule.",
  iconWallAlt: "The final library of 34 Yandex Cloud service icons",
};

export const C2: Record<Lang, Dict> = { ru, en };
