// Данные блока «Кейсы» на главной — 1:1 из Figma, секция «варианты кейсов»
// (get_design_context/get_metadata, node 2286:3887): «Кейсы_состояние 1»
// (свёрнутый вид — номер+название) и «Кейсы_состояние 3» (по наведению —
// + описание + обложка). Описание здесь — короткая версия для тизера,
// отличается от текста «О проекте» на самой странице кейса (так и в Figma).
//
// cover — реальный ассет из Figma в его РОДНОМ разрешении (2700–4100px по
// длинной стороне — фактические загруженные фото/рендеры, не screenshot
// канвы), coverOffset/coverSize — те же координаты обрезки/масштаба,
// что и в самом макете (обложка 668×536 — просто окно поверх картинки
// большего размера, ровно как в Figma). Раньше здесь стоял отдельный
// screenshot самого 668×536-контейнера — на вид тот же кадр, но
// зафиксированный в 1x (без запаса плотности пикселей, отсюда мыльность
// на любом Retina-экране). Теперь картинка — тот же файл, что и на
// странице самого кейса, просто использован ещё раз с другим окном.
export type CaseItem = {
  slug: string;
  index: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  cover: string;
  coverOffset: { left: number; top: number };
  coverSize: { width: number; height: number };
};

export const CASES: CaseItem[] = [
  {
    slug: "case-01",
    index: "001",
    title: "От аудита к единому стилю",
    titleEn: "From audit to a unified style",
    description:
      "Аудит библиотеки из 226 иконок Яндекса: расхождение между Icons Regular и Icons Symbols мешало единому стилю интерфейса. По итогам собрали план устранения технического долга и внутренний гайд, который помог команде работать быстро и консистентно.",
    descriptionEn:
      "An audit of Yandex's 226-icon library: the gap between Icons Regular and Icons Symbols was breaking the interface's visual consistency. The audit produced a plan for paying down the technical debt and an internal guide that helped the team work fast and consistently.",
    cover: "/cases/case-01/cover.png",
    coverOffset: { left: -84, top: 0 },
    coverSize: { width: 962, height: 536 },
  },
  {
    slug: "case-02",
    index: "002",
    title: "ИКОНКИ YANDEX CLOUD",
    titleEn: "YANDEX CLOUD ICONS",
    description:
      "В начале 2026 года Yandex Cloud обновлял визуальный язык продукта. За три недели команда разработала 34 иконки в двух размерах: 16×16 px для интерфейса, 640×640 px для иллюстраций на сайте — при этом стиль ещё не был зафиксирован и уточнялся по ходу работы вместе с арт-директором клиента: толщина линий, радиусы скруглений, форма. Успели точно в срок, это было ключевым условием клиента.",
    descriptionEn:
      "In early 2026 Yandex Cloud was updating the product's visual language. In three weeks the team designed 34 icons in two sizes — 16×16 px for the interface, 640×640 px for illustrations on the site — while the style itself was still being defined together with the client's art director: line weight, corner radii, shape. We hit the deadline exactly, which was the client's key requirement.",
    cover: "/cases-teaser/case-02-macbook.png",
    coverOffset: { left: -113, top: -29 },
    coverSize: { width: 893, height: 595 },
  },
  {
    slug: "case-03",
    index: "003",
    title: "3D-иллюстраций для финтех-продукта",
    titleEn: "3D ILLUSTRATIONS FOR A FINTECH PRODUCT",
    description:
      "Для Stablegate разработана система 3D key visuals: 3D выбрали вместо плоских иллюстраций, потому что так лучше вписывается в дизайн сайта. Сегодня в библиотеке 12 иллюстраций, готовый набор сокращает подготовку новых материалов вдвое — команда берёт готовую иллюстрацию вместо поиска на стоках или генерации с нуля.",
    descriptionEn:
      "For Stablegate we built a system of 3D key visuals: 3D was chosen over flat illustration because it fits the site's design better. The library now holds 12 illustrations, and the ready-made set cuts the time to prepare new materials in half — the team reuses an existing illustration instead of searching stock or generating one from scratch.",
    cover: "/cases-teaser/case-03-behance.png",
    coverOffset: { left: -215, top: -87 },
    coverSize: { width: 938, height: 624 },
  },
  {
    slug: "case-04",
    index: "004",
    title: "KEY VISUALS ДЛЯ OUTDOOR-КАМПАНИИ",
    titleEn: "KEY VISUALS FOR AN OUTDOOR CAMPAIGN",
    description:
      "Для Stablegate разработана outdoor-кампания, которая объясняет crypto через реальные жизненные сценарии: покупку дома, автомобиля, яхты. Идею тестировали в соцсетях, и наибольший отклик получили именно реалистичные сценарии вроде покупки квартиры. После запуска число новых пользователей выросло в полтора раза.",
    descriptionEn:
      "For Stablegate we developed an outdoor campaign that explains crypto through real-life scenarios: buying a house, a car, a yacht. The idea was tested on social media, and the realistic scenarios, like buying an apartment, got the strongest response. After launch, new-user sign-ups grew by half.",
    cover: "/cases-teaser/case-04-billboard.png",
    coverOffset: { left: -682, top: -100 },
    coverSize: { width: 1469, height: 677 },
  },
  {
    slug: "case-05",
    index: "005",
    title: "Карты для пэтролхэдов",
    titleEn: "CARDS FOR PETROLHEADS",
    description:
      "Для коллаборации Авто.ру и Т-Банка над лимитированными картами позвали четырёх иллюстраторов: каждый переосмыслил культовый автомобиль в своём стиле, чтобы объединить аудитории обоих брендов. Мне достался DeLorean, и команда клиента сразу выбрала постапокалиптическую версию вместо привычного образа машины времени.",
    descriptionEn:
      "For a limited-edition card collaboration between Avto.ru and T-Bank, four illustrators were invited to reinterpret an iconic car each in their own style, bringing together both brands' audiences. I got the DeLorean, and the client's team went straight for a post-apocalyptic take instead of the familiar time-machine look.",
    cover: "/cases-teaser/case-05-cards.png",
    coverOffset: { left: -545, top: -6 },
    coverSize: { width: 1289, height: 547 },
  },
];
