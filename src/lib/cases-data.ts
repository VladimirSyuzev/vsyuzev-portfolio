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
  /** Кейс под NDA: обложка в блоке «Кейсы» закрывается плашкой NDA
      (см. CasesList.tsx), имя клиента и точные цифры в description не
      указываются. coverNda — плоский WebP окна 668×536 (2×) с уже
      запечённым блюром и затемнением; оригинал/SVG в DOM не попадают. */
  nda?: boolean;
  coverNda?: string;
};

export const CASES: CaseItem[] = [
  {
    slug: "case-01",
    index: "001",
    title: "От аудита к единому стилю",
    titleEn: "From audit to a unified style",
    description:
      "В экосистеме одновременно жили две библиотеки иконок: старая и новая, которая постепенно росла вместе с продуктами. В части интерфейсов иконки из обеих библиотек встречались рядом и ломали единый стиль. Мы с командой провели полную ревизию обеих библиотек и составили план производства недостающих иконок. Дальше я закрепил процесс их отрисовки по шагам и написал руководство для команды, чтобы два дизайнера стабильно попадали в один стиль.",
    descriptionEn:
      "The ecosystem had two icon libraries running in parallel: an older one and a newer one that kept growing alongside the products. In some interfaces, icons from both libraries ended up side by side and broke the visual consistency. My team and I audited both libraries in full and mapped out a production plan for the missing icons. From there I locked down a step-by-step drawing process and wrote a team guide, so two designers could stay in one style.",
    cover: "/cases/case-01/cover.png",
    coverOffset: { left: -84, top: 0 },
    coverSize: { width: 962, height: 536 },
    nda: true,
    coverNda: "/cases-teaser/case-01-grid-nda.webp",
  },
  {
    // Кейс 002 (Figma 2285:45966). Прежняя версия «Иконки для облачной
    // платформы» — в _archive/case-02-v1.
    slug: "case-02",
    index: "002",
    title: "AI-пайплайн для соцсетей",
    titleEn: "AI pipeline for social media",
    description:
      "Self-initiated проект. Я взял реальный продукт с реальной задачей и построил пайплайн производства постов для соцсетей. Stablegate — швейцарская финтех-платформа для трансграничных расчётов между криптой и банками. Контент выходит регулярно, задача типичная: держать темп публикаций и не терять качество визуала.",
    descriptionEn:
      "A self-initiated project. I took a real product with a real task and built a production pipeline for social media posts. Stablegate is a Swiss fintech platform for cross-border settlements between crypto and banks. Content goes out regularly, and the task is a typical one: keep up the publishing pace without losing visual quality.",
    cover: "/cases-teaser/case-02-pipeline.webp",
    coverOffset: { left: -146.67, top: 0 },
    coverSize: { width: 960.33, height: 536 },
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
      "Для лимитированной коллекции банковских карт культовые автомобили переосмыслили четыре иллюстратора, каждый в своём стиле. Мне достался DeLorean: вместо привычного образа машины времени я показал его постапокалиптическую версию, выжившую в пустоши. Разобрал автомобиль на узнаваемые признаки, проработал три концепции и довёл силуэт до предела читаемости в размере карты.",
    descriptionEn:
      "For a limited-edition bank card collection, four illustrators each reimagined an iconic car in their own style. I got the DeLorean: instead of the usual time-machine image, I gave it a post-apocalyptic take, weathered by life in the wasteland. I broke the car down into its recognizable features, worked through three concepts, and pushed the silhouette to stay legible at card size.",
    nda: true,
    coverNda: "/cases-teaser/case-05-cards-nda.webp",
    cover: "/cases-teaser/case-05-cards.png",
    coverOffset: { left: -545, top: -6 },
    coverSize: { width: 1289, height: 547 },
  },
];
