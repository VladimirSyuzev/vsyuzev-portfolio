// Данные тизера «Кейсы» на главной — 1:1 из Figma (get_design_context,
// node 2235:94070). В макете только строка 001 полностью оформлена
// (описание + обложка) — 002–005 показаны свёрнутыми, без описания/
// обложки: в самом файле для них этот контент ещё не заведён. Ничего не
// придумано поверх — см. FIGMA-BRIEF.md.
export type CaseItem = {
  slug: string;
  index: string;
  title: string;
  description?: string;
  cover?: string;
};

export const CASES: CaseItem[] = [
  {
    slug: "case-01",
    index: "001",
    title: "От аудита к единому стилю",
    description:
      "Аудит библиотеки из 226 иконок и выстраивание процесса, который позволил масштабировать систему без потери консистентности.",
    cover: "/cases/case-01/cover.png",
  },
  { slug: "case-02", index: "002", title: "ИКОНКИ YANDEX CLOUD" },
  { slug: "case-03", index: "003", title: "3D-иллюстраций для финтех-продукта" },
  { slug: "case-04", index: "004", title: "KEY VISUALS ДЛЯ OUTDOOR-КАМПАНИИ" },
  { slug: "case-05", index: "005", title: "Карты для пэтролхэдов" },
];
