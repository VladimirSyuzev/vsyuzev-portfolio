import type { Lang } from "@/lib/lang";

// Тексты кейса 001. Английский пишется один раз и подставляется во все
// брейкпоинт-раскладки; ручные переносы строк (<br>) для EN, как правило,
// не нужны — текст переносится по ширине контейнера сам (кроме мест, где
// у EN тоже задан жёсткий перенос — см. соответствующий ключ).
type Dict = {
  // page.tsx — обложка / «О проекте»
  aboutHeading: string;
  aboutIntro: string;
  metaRole: string;
  metaRoleValue: string;
  metaTeam: string;
  metaTeamValue: string;
  metaClient: string;
  metaClientValue: string;

  // Stats
  stats: [string, string][]; // [строка 1, строка 2]

  // 01 Проблема / Экран
  problemHeading: string;
  problemIntro: string;
  libOldName: string;
  libNewName: string;
  libOldDesc: string;
  libNewDesc: string;
  screenPara1: string;
  screenPara2: string;
  weFound: string;
  problemBullets: string[];

  // 02 Задача
  taskHeading: string;
  taskIntro: string;

  // 03 Аудит библиотеки
  auditHeading: string[]; // строки заголовка (АУДИТ / БИБЛИОТЕКИ)
  auditIntro: string;
  auditResultLabel: string;
  auditBullets: string[];
  auditQuote: string;

  // 04 Построение процесса
  pipelineHeading: string;
  pipelineIntro: string;
  catDesign: string;
  catLead: string;
  catClient: string;
  steps: { title: string; text: string }[];

  // 05 Руководство для команды
  guideHeading: string[];
  guideSubhead: string;
  guideIntro: string;
  guideBullets: string[];
  guideSteps: string[];
  guideQuote: string;

  // Guide (страницы гайда)
  guidePagesCaption: string;
  tapToExpand: string;

  // 06 Контроль консистентности
  consistencyHeading: string[];
  consistencyIntro: string;
  consistencyQuote: string;

  // 07 Итог
  summaryHeading: string;
  summaryPara1: string;
  summaryPara2: string;
  summaryPhonesAlt: string;
};

const ru: Dict = {
  aboutHeading: "О ПРОЕКТЕ",
  aboutIntro:
    "Аудит библиотеки из 226 иконок Яндекса: расхождение между Icons Regular и Icons Symbols мешало единому стилю интерфейса. По итогам собрали план устранения технического долга и внутренний гайд, который помог команде работать быстро и консистентно.",
  metaRole: "Позиция",
  metaRoleValue: "Lead designer",
  metaTeam: "Команда",
  metaTeamValue: "2 дизайнера",
  metaClient: "Клиент",
  metaClientValue: "Яндекс",

  stats: [
    ["недели на аудит", "библиотеки"],
    ["иконок", "проверено"],
    ["готовых", "иконок"],
    ["иконок нужно", "было создать"],
    ["варианта", "размера иконок"],
    ["иконок создано", "и обновлено"],
  ],

  problemHeading: "ПРОБЛЕМА",
  problemIntro:
    "К началу проекта внутри Яндекса одновременно существовали две библиотеки иконок:",
  libOldName: "Symbols",
  libNewName: "Regular",
  libOldDesc: "более старая библиотека.",
  libNewDesc: "новая библиотека, которая постепенно развивалась вместе с продуктами.",
  screenPara1:
    "Новые иконки появлялись под конкретные задачи и ближайшие релизы. Такой подход помогал быстро закрывать потребности отдельных команд, но со временем привёл к техническому долгу.",
  screenPara2:
    "На одном экране могли одновременно использоваться иконки из разных библиотек, из-за чего интерфейс терял визуальную целостность.",
  weFound: "МЫ ОБНАРУЖИЛИ:",
  problemBullets: [
    "различные пропорции",
    "неодинаковую толщину линий",
    "разные радиусы скруглений",
    "различия в принципах построения",
    "разный визуальный вес иконок",
    "дубли одинаковых иконок",
    "отсутствие необходимых размеров",
    "отсутствие outline- или filled-вариантов",
  ],

  taskHeading: "ЗАДАЧА",
  taskIntro:
    "Главной задачей было превратить две разрозненные библиотеки в единую масштабируемую систему",

  auditHeading: ["АУДИТ", "БИБЛИОТЕКИ"],
  auditIntro:
    "Работу начали с полной ревизии. Мы объединили обе библиотеки, распределили иконки по категориям и проанализировали каждую позицию.",
  auditResultLabel: "В РЕЗУЛЬТАТЕ АУДИТА была собрана таблица:",
  auditBullets: [
    "определили существующие иконки",
    "нашли дубли",
    "выявили отсутствующие размеры",
    "определили недостающие outline- и filled-версии",
    "обнаружили полностью отсутствующие иконки",
    "расставили приоритеты производства",
  ],
  auditQuote:
    "Полная карта библиотеки показала, что уже есть, чего не хватает и что нужно сделать в первую очередь",

  pipelineHeading: "ПОСТРОЕНИЕ ПРОЦЕССА",
  pipelineIntro:
    "После того как основные принципы стали понятны, мы превратили их в рабочий процесс и зафиксировали внутренние правила: работу с метафорами, последовательность этапов и критерии перехода между ними.",
  catDesign: "ДИЗАЙН",
  catLead: "ДИЗАЙН-ЛИД",
  catClient: "ЯНДЕКС",
  steps: [
    { title: "Подбор метафоры", text: "Исследуем смысл и контекст, ищем подходящие визуальные метафоры" },
    { title: "Разработка эскизов", text: "Создаём несколько быстрых эскизов для поиска формы" },
    { title: "Проверка дизайн-лидом", text: "Дизайн-лид оценивает идею, форму и соответствие стилистике" },
    { title: "Согласование с клиентом", text: "Выбранные эскизы презентуются команде Яндекса и получаем обратную связь" },
    { title: "Отрисовка версии 24×24", text: "Отрисовываем основную версию 24×24 по всем правилам" },
    { title: "Проверка дизайн-лидом", text: "Проверяем геометрию, вес, баланс и читаемость" },
    { title: "Согласование с клиентом", text: "Отправляем клиенту и получаем финальное подтверждение" },
    { title: "Построение остальных размеров", text: "Адаптируем иконку под все необходимые размеры: 32, 20, 16, 12 px" },
    { title: "Проверка дизайн-лидом", text: "Проверяем все размеры на баланс, консистентность и читаемость" },
    { title: "Согласование с клиентом", text: "Выбранные эскизы презентуются команде Яндекса и получаем обратную связь" },
    { title: "Сборка компонентов", text: "Собираем иконки в компоненты по структуре библиотеки" },
    { title: "Передача библиотеки клиенту", text: "Передаем готовые компоненты в общую библиотеку Яндекса" },
  ],

  guideHeading: ["РУКОВОДСТВО", "ДЛЯ КОМАНДЫ"],
  guideSubhead: "Внутри гайда были описаны:",
  guideIntro:
    "Чтобы два дизайнера работали синхронно и получали предсказуемый результат, я подготовил внутренний гайд по созданию иконок. Он объединил требования Яндекса и опыт, накопленный командой во время проекта.",
  guideBullets: [
    "рабочие сетки (32 / 24 / 20 / 16 / 12 px)",
    "толщина линий и радиусы скруглений",
    "поиск метафор и работа над эскизами",
    "правила работы с примитивами и компонентами",
    "принципы ресайза",
    "типичные ошибки",
    "рекомендации из обратной связи команды Яндекса",
  ],
  guideSteps: [
    "Выбрали образ, изменяем его в сетке",
    "Выбираем контур из сетки для формата иконки",
    "Помещаем в него образ, пока что он не попадает в визуальный вес сетки",
    "Размещаем объект в контуре, с компенсационными вылетами",
  ],
  guideQuote:
    "Гайд превратил создание иконок из набора отдельных решений в единый производственный процесс",

  guidePagesCaption:
    "Страницы внутреннего гайда: пиксельная сетка компонента, примеры ресайза иконок и три состояния «Плохо / Хорошо / Круто»",
  tapToExpand: "нажмите, чтобы раскрыть",

  consistencyHeading: ["КОНТРОЛЬ", "КОНСИСТЕНТНОСТИ"],
  consistencyIntro:
    "Чтобы новые иконки оставались частью единой системы, мы использовали несколько инструментов проверки. Главным из них стал Balance Board: общая сетка, в которой существующие и новые иконки можно было сравнить между собой в одном контексте. Это позволяло быстро оценить их визуальный вес, пропорции, толщину линий, характер скруглений и общий баланс библиотеки.",
  consistencyQuote:
    "Balance Board помогал находить несоответствия и принимать решения ещё до передачи работы клиенту",

  summaryHeading: "ИТОГ",
  summaryPara1:
    "После завершения аудита клиент получил структурированную библиотеку без дублей, понимание недостающих элементов и прозрачный процесс дальнейшего производства. По итогам проекта было создано и обновлено более 100 иконок для разных продуктовых направлений, включая финансы, медицину, социальные сервисы и голосового AI-ассистента.",
  summaryPara2:
    "Как лид-дизайнер, я выстроил и контролировал процесс работы над проектом: проверял каждую иконку на промежуточных этапах и следил за консистентностью всей библиотеки. Также я разработал производственный гайд — от поиска метафоры до сборки компонентов. Он стал основой дальнейшей работы команды и помог поддерживать единое качество на протяжении всего проекта.",
  summaryPhonesAlt:
    "Итоговая система иконок в интерфейсе голосового ассистента Алиса на трёх экранах",
};

const en: Dict = {
  aboutHeading: "ABOUT THE PROJECT",
  aboutIntro:
    "An audit of Yandex's 226-icon library: the gap between Icons Regular and Icons Symbols was breaking the interface's unified style. The audit produced a plan for paying down the technical debt and an internal guide that helped the team work fast and consistently.",
  metaRole: "Role",
  metaRoleValue: "Lead designer",
  metaTeam: "Team",
  metaTeamValue: "2 designers",
  metaClient: "Client",
  metaClientValue: "Yandex",

  stats: [
    ["weeks to audit", "the library"],
    ["icons", "reviewed"],
    ["existing", "icons"],
    ["icons had to", "be created"],
    ["size", "variants"],
    ["icons created", "and updated"],
  ],

  problemHeading: "PROBLEM",
  problemIntro:
    "By the start of the project, Yandex had two icon libraries running in parallel:",
  libOldName: "Symbols",
  libNewName: "Regular",
  libOldDesc: "the older library.",
  libNewDesc: "the newer library that grew gradually alongside the products.",
  screenPara1:
    "New icons were made for specific tasks and upcoming releases. That approach helped cover individual teams' needs quickly, but over time it built up technical debt.",
  screenPara2:
    "A single screen could use icons from different libraries at once, so the interface lost its visual coherence.",
  weFound: "WE FOUND:",
  problemBullets: [
    "different proportions",
    "inconsistent line weights",
    "different corner radii",
    "differences in construction principles",
    "uneven visual weight",
    "duplicate icons",
    "missing sizes",
    "missing outline or filled variants",
  ],

  taskHeading: "TASK",
  taskIntro:
    "The main goal was to turn two disjointed libraries into a single scalable system",

  auditHeading: ["LIBRARY", "AUDIT"],
  auditIntro:
    "We started with a full review. We merged both libraries, sorted the icons into categories and analysed every entry.",
  auditResultLabel: "THE AUDIT PRODUCED A TABLE:",
  auditBullets: [
    "mapped the existing icons",
    "found duplicates",
    "spotted missing sizes",
    "identified missing outline and filled versions",
    "found icons that were missing entirely",
    "set production priorities",
  ],
  auditQuote:
    "The full map of the library showed what already existed, what was missing and what to do first",

  pipelineHeading: "BUILDING THE PROCESS",
  pipelineIntro:
    "Once the core principles were clear, we turned them into a working process and fixed the internal rules: working with metaphors, the sequence of stages and the criteria for moving between them.",
  catDesign: "DESIGN",
  catLead: "DESIGN LEAD",
  catClient: "YANDEX",
  steps: [
    { title: "Choosing a metaphor", text: "We explore the meaning and context and look for fitting visual metaphors" },
    { title: "Sketching", text: "We make a few quick sketches to search for the form" },
    { title: "Design-lead review", text: "The design lead assesses the idea, the form and how it fits the style" },
    { title: "Client sign-off", text: "The chosen sketches are presented to the Yandex team and we collect feedback" },
    { title: "Drawing the 24×24 version", text: "We draw the main 24×24 version by all the rules" },
    { title: "Design-lead review", text: "We check geometry, weight, balance and legibility" },
    { title: "Client sign-off", text: "We send it to the client and get final confirmation" },
    { title: "Building the other sizes", text: "We adapt the icon to every required size: 32, 20, 16, 12 px" },
    { title: "Design-lead review", text: "We check every size for balance, consistency and legibility" },
    { title: "Client sign-off", text: "The chosen sketches are presented to the Yandex team and we collect feedback" },
    { title: "Assembling components", text: "We assemble the icons into components following the library structure" },
    { title: "Handover to the client", text: "We hand the finished components to the shared Yandex library" },
  ],

  guideHeading: ["TEAM", "GUIDE"],
  guideSubhead: "The guide covered:",
  guideIntro:
    "So the two designers could work in sync and get a predictable result, I put together an internal guide to making icons. It combined Yandex's requirements with the experience the team built up during the project.",
  guideBullets: [
    "working grids (32 / 24 / 20 / 16 / 12 px)",
    "line weights and corner radii",
    "finding metaphors and working on sketches",
    "rules for working with primitives and components",
    "resizing principles",
    "common mistakes",
    "notes from the Yandex team's feedback",
  ],
  guideSteps: [
    "We pick an image and adjust it to the grid",
    "We choose an outline from the grid for the icon format",
    "We place the image into it while it doesn't yet match the grid's visual weight",
    "We fit the object into the outline with compensating overshoots",
  ],
  guideQuote:
    "The guide turned making icons from a set of separate decisions into one production process",

  guidePagesCaption:
    "Pages from the internal guide: the component's pixel grid, icon-resizing examples and three states — “Bad / Good / Great”",
  tapToExpand: "tap to expand",

  consistencyHeading: ["CONSISTENCY", "CONTROL"],
  consistencyIntro:
    "To keep new icons part of one system, we used several review tools. The main one was the Balance Board: a shared grid where existing and new icons could be compared side by side in one context. It made it quick to judge their visual weight, proportions, line weights, the character of the corners and the overall balance of the library.",
  consistencyQuote:
    "The Balance Board helped catch mismatches and make decisions before the work went to the client",

  summaryHeading: "OUTCOME",
  summaryPara1:
    "After the audit, the client had a structured library with no duplicates, a clear picture of what was missing and a transparent process for further production. Over the project, more than 100 icons were created and updated across different product areas — finance, healthcare, social services and the voice AI assistant.",
  summaryPara2:
    "As the lead designer, I built and ran the project process: I reviewed every icon at the interim stages and kept the whole library consistent. I also created a production guide — from finding a metaphor to assembling components. It became the basis for the team's further work and helped hold a single level of quality throughout the project.",
  summaryPhonesAlt:
    "The final icon system in the Alisa voice-assistant interface across three screens",
};

export const C1: Record<Lang, Dict> = { ru, en };
