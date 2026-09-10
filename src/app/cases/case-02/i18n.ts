import type { Lang } from "@/lib/lang";

type Dict = {
  aboutHeading: string;
  aboutIntro: string;
  metaRole: string;
  metaRoleValue: string;
  metaTeam: string;
  metaTeamValue: string;
  metaClient: string;
  metaClientValue: string;

  taskHeading: string;
  taskPara1: string;
  taskPara2: string;
  taskQuote: string;

  researchHeading: string;
  researchPara1: string;
  researchPara2: string;

  visualHeading: string;
  visualPara1: string;
  visualPara2: string;
  visualQuote: string;

  processHeading: string;
  processPara1: string;
  processPara2: string;
  steps: { title: string; desc: string }[];

  first16Heading: string;
  first16Para1: string;
  first16Para2: string;
  first16Para2Tail: string;
  first16Quote: string;

  summaryHeading: string;
  summaryPara1: string;
  summaryPara2: string;
  summaryPara3: string;

  tapToExpand: string;
};

const ru: Dict = {
  aboutHeading: "О ПРОЕКТЕ",
  aboutIntro:
    "В начале 2026 года Yandex Cloud обновлял визуальный язык продукта. За три недели нашей команде нужно было разработать 34 иконки в двух размерах, параллельно формируя принципы нового стиля.",
  metaRole: "Позиция",
  metaRoleValue: "Lead designer",
  metaTeam: "Команда",
  metaTeamValue: "1 дизайнер",
  metaClient: "Клиент",
  metaClientValue: "Яндекс",

  taskHeading: "Задача",
  taskPara1:
    "Главной особенностью проекта стала высокая степень неопределённости. На старте у нас были существующие метафоры сервисов, несколько примеров и общее направление, но не было полноценной системы правил для ежедневной работы.",
  taskPara2:
    "Требования менялись по ходу проекта, поэтому часть иконок приходилось пересобирать и повторно согласовывать с командой Yandex Cloud. Процесс требовал гибкости и постоянной синхронизации.",
  taskQuote:
    "Мы создавали библиотеку одновременно с правилами, по которым она должна была работать",

  researchHeading: "Исследование",
  researchPara1:
    "Метафоры сервисов уже существовали, поэтому мы не искали новые образы, а переосмысляли знакомые символы внутри нового визуального языка. Для этого анализировали предыдущую библиотеку, первые примеры новых иконок и визуальные референсы.",
  researchPara2:
    "Главной целью было сохранить узнаваемость сервисов и привести их к единому стилю.",

  visualHeading: "Визуальный язык",
  visualPara1:
    "Самой сложной задачей было найти простой принцип, который помогал бы всей команде понимать границы нового визуального языка. Такой метафорой стала деталь, вырезанная из цельного листа металла: если форму нельзя было представить вырезанной таким способом, значит, она не соответствовала стилю.",
  visualPara2:
    "Этот принцип изменил подход к проектированию иконок. Вместо того чтобы строить их из линий и контуров, мы начинали с цельной формы и постепенно убирали всё лишнее.",
  visualQuote: "Новый стиль строился не из линий, а из цельной формы",

  processHeading: "Процесс",
  processPara1:
    "После того как основные принципы стали понятны, мы превратили их в рабочий процесс и зафиксировали внутренние правила: работу с метафорами, последовательность этапов и критерии перехода между ними.",
  processPara2:
    "Документ стал опорой для команды и помогал сохранять единый стиль и качество иконок, даже когда официальный гайдлайн продолжал развиваться.",
  steps: [
    { title: "Анализ", desc: "Изучаем метафору сервиса и требования клиента" },
    { title: "Референсы", desc: "Собираем визуальные ориентиры нового стиля" },
    { title: "Эскизы", desc: "Проверяем несколько вариантов композиции и формы" },
    { title: "Ревью", desc: "Выбираем решение и согласовываем направление" },
    { title: "16×16 px", desc: "Отрабатываем силуэт, баланс и читаемость" },
    { title: "640×640 px", desc: "Адаптируем форму для крупного размера, добавляя детали" },
    { title: "Финализация", desc: "Проверяем, оформляем и передаем результат клиенту" },
  ],

  first16Heading: "сначала 16px",
  first16Para1:
    "Каждая иконка создавалась в двух размерах: 16 × 16 px и 640 × 640 px. Работу всегда начинали с маленькой версии.",
  first16Para2:
    "После её утверждения создавали большую. Это было не простое масштабирование: менялись пропорции, толщина линий и радиусы скруглений, появлялись дополнительные детали.",
  first16Para2Tail:
    " Большая версия становилась самостоятельной иллюстрацией, сохраняя характер маленькой.",
  first16Quote:
    "Маленький размер проверял главное: силуэт, композицию и читаемость.",

  summaryHeading: "Итог",
  summaryPara1:
    "За три недели команда из двух человек разработала 34 иконки в двух размерах для разных сценариев использования.",
  summaryPara2:
    "Для меня главным результатом стали не только готовые иконки, но и опыт построения процесса в ситуации, когда сама дизайн-система ещё находилась в разработке.",
  summaryPara3:
    "Простые принципы, понятный процесс и постоянный диалог с клиентом помогли сохранить целостность библиотеки и выполнить проект в сжатые сроки.",

  tapToExpand: "нажмите, чтобы раскрыть",
};

const en: Dict = {
  aboutHeading: "ABOUT THE PROJECT",
  aboutIntro:
    "In early 2026 Yandex Cloud was updating the product's visual language. In three weeks our team had to design 34 icons in two sizes while shaping the principles of the new style in parallel.",
  metaRole: "Role",
  metaRoleValue: "Lead designer",
  metaTeam: "Team",
  metaTeamValue: "1 designer",
  metaClient: "Client",
  metaClientValue: "Yandex",

  taskHeading: "Task",
  taskPara1:
    "The defining feature of the project was a high degree of uncertainty. At the start we had the existing service metaphors, a few examples and a general direction, but no full set of rules for day-to-day work.",
  taskPara2:
    "Requirements kept changing as the project went on, so some icons had to be rebuilt and re-approved with the Yandex Cloud team. The process demanded flexibility and constant syncing.",
  taskQuote:
    "We were building the library and the rules it had to work by at the same time",

  researchHeading: "Research",
  researchPara1:
    "The service metaphors already existed, so we weren't looking for new images — we were rethinking familiar symbols inside the new visual language. For that we analysed the previous library, the first examples of new icons and visual references.",
  researchPara2:
    "The main goal was to keep the services recognisable and bring them to one style.",

  visualHeading: "Visual language",
  visualPara1:
    "The hardest task was finding a simple principle that would help the whole team understand the boundaries of the new visual language. That metaphor became a part cut from a single sheet of metal: if a shape couldn't be imagined cut out that way, it didn't fit the style.",
  visualPara2:
    "This principle changed the approach to designing icons. Instead of building them from lines and outlines, we started with a solid shape and gradually removed everything unnecessary.",
  visualQuote: "The new style was built not from lines but from a solid shape",

  processHeading: "Process",
  processPara1:
    "Once the core principles were clear, we turned them into a working process and fixed the internal rules: working with metaphors, the sequence of stages and the criteria for moving between them.",
  processPara2:
    "The document became the team's anchor and helped keep the icons' style and quality consistent, even while the official guideline kept evolving.",
  steps: [
    { title: "Analysis", desc: "We study the service metaphor and the client's requirements" },
    { title: "References", desc: "We gather visual reference points for the new style" },
    { title: "Sketches", desc: "We test a few options for composition and form" },
    { title: "Review", desc: "We pick a solution and agree on the direction" },
    { title: "16×16 px", desc: "We work out the silhouette, balance and legibility" },
    { title: "640×640 px", desc: "We adapt the shape for the large size, adding detail" },
    { title: "Finalisation", desc: "We check, package and hand the result to the client" },
  ],

  first16Heading: "16px first",
  first16Para1:
    "Every icon was made in two sizes: 16 × 16 px and 640 × 640 px. We always started with the small version.",
  first16Para2:
    "Once it was approved, we made the large one. It wasn't a simple scale-up: proportions, line weights and corner radii changed, and extra detail appeared.",
  first16Para2Tail:
    " The large version became an illustration in its own right while keeping the character of the small one.",
  first16Quote:
    "The small size tested the essentials: silhouette, composition and legibility.",

  summaryHeading: "Outcome",
  summaryPara1:
    "In three weeks a team of two designed 34 icons in two sizes for different use cases.",
  summaryPara2:
    "For me the main result was not only the finished icons but the experience of building a process while the design system itself was still being developed.",
  summaryPara3:
    "Simple principles, a clear process and constant dialogue with the client helped keep the library coherent and deliver the project on a tight schedule.",

  tapToExpand: "tap to expand",
};

export const C2: Record<Lang, Dict> = { ru, en };
