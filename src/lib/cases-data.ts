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
      "Аудит библиотеки из 226 иконок и выстраивание процесса, который позволил масштабировать систему без потери консистентности.",
    descriptionEn:
      "An audit of a 226-icon library and building a process that let the system scale without losing consistency.",
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
      "В начале 2026 года Yandex Cloud обновлял визуальный язык продукта. За три недели нашей команде предстояло разработать 34 иконки в двух размерах, параллельно с формированием нового стиля.",
    descriptionEn:
      "In early 2026 Yandex Cloud was updating the product's visual language. In three weeks our team had to design 34 icons in two sizes, in parallel with shaping the new style.",
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
      "Для Stablegate разработана 3D-система key visuals, наглядно объясняющая функции и преимущества финтех-продукта. Проект охватывает создание визуальных метафор, дизайн-системы и финальных иллюстраций для сайта, презентаций, email и социальных сетей.",
    descriptionEn:
      "For Stablegate we built a 3D key-visual system that clearly explains the features and benefits of a fintech product. The project covered visual metaphors, a design system and final illustrations for the website, decks, email and social media.",
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
      "Для Stablegate разработана outdoor-концепция и серия key visuals, превращающая сложный crypto-продукт в понятные сценарии реальных покупок. Проект включал арт-дирекшн, генерацию изображений, типографику и адаптацию под разные форматы.",
    descriptionEn:
      "For Stablegate we developed an outdoor concept and a series of key visuals that turn a complex crypto product into clear real-purchase scenarios. The project included art direction, image generation, typography and adaptation for different formats.",
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
      "Для коллаборации Авто.ру и Т-Банка создана серия лимитированных карт с культовыми автомобилями. Четыре иллюстратора переосмыслили легендарные модели в собственных визуальных стилях.",
    descriptionEn:
      "For a collaboration between Avto.ru and T-Bank we created a series of limited-edition cards featuring iconic cars. Four illustrators reimagined legendary models in their own visual styles.",
    cover: "/cases-teaser/case-05-cards.png",
    coverOffset: { left: -545, top: -6 },
    coverSize: { width: 1289, height: 547 },
  },
];
