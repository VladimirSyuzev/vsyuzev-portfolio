// Данные блока «Кейсы» — минимальный набор полей, нужный для списка на
// главной и обложки кейс-страницы. Контент и порядок — 1:1 из Figma
// (fileKey uXIe7bEowMDHzjdKOHKuUz, node 1446:14364), см. FIGMA-BRIEF.md §5-6.
// Полное тело каждой страницы (разделы 01/02/03…) — следующий проход,
// сейчас здесь только то, что нужно для рабочих ссылок из блока «Кейсы».
export type CaseItem = {
  slug: string;
  index: string;
  title: string;
  client: string;
  description: string;
  // Акцентный цвет обложки кейса в макете (не общий синий акцент сайта) —
  // используется фоном на /cases/[slug] обложке.
  accent: string;
  accentDark?: boolean; // true → белый текст поверх accent (тёмные/красные обложки)
};

export const CASES: CaseItem[] = [
  {
    slug: "case-01",
    index: "001",
    title: "От аудита к единому стилю",
    client: "Яндекс",
    description:
      "Аудит библиотеки из 226 иконок и выстраивание процесса, который позволил масштабировать систему без потери консистентности.",
    accent: "#121212",
    accentDark: true,
  },
  {
    slug: "case-02",
    index: "002",
    title: "Иконки Yandex Cloud",
    client: "Яндекс",
    description: "Визуальный язык и процесс производства иконок для Yandex Cloud.",
    accent: "#1c1c1c",
    accentDark: true,
  },
  {
    slug: "case-03",
    index: "003",
    title: "3D-иллюстрации для финтех-продукта",
    client: "Stablegate",
    description: "3D-иллюстрации для криптофинансового продукта — от кошелька до онбординга.",
    accent: "#2b3fe0",
    accentDark: true,
  },
  {
    slug: "case-04",
    index: "004",
    title: "Key Visuals для outdoor-кампании",
    client: "Stablegate",
    description: "Ключевые визуалы наружной рекламной кампании «Crypto. Payments. Settled.».",
    accent: "#3b6fe0",
    accentDark: true,
  },
  {
    slug: "case-05",
    index: "005",
    title: "Карты для пэтролхэдов",
    client: "Т-Банк",
    description: "Иллюстрации редких и культовых автомобилей для серии банковских карт.",
    accent: "#b3161a",
    accentDark: true,
  },
];
