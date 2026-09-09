// ─────────────────────────────────────────────────────────────────────────
//  Кейс 4 «KEY VISUALS для outdoor-кампании» (Stablegate) — токены
// ─────────────────────────────────────────────────────────────────────────
//  Значения выверены по макету Figma (file uXIe7bEowMDHzjdKOHKuUz).
//  Разбор по размерам:
//   • 1440 — десктоп-эталон (frame 2034:15643), координаты в коде секций.
//   • 1280 — reflow-эталон  (frame 2730:17992 «case-04 · 1280 (адаптив reflow)»)
//   • 834 / 375 — только в Figma (2747:18016 / 2759:18046), в код не заложены.
//  Тип-скейл и структурная сетка 1280 — по кейсу 2 · 1280.
// ─────────────────────────────────────────────────────────────────────────

/** Цвета кейса. */
export const C4_COLORS = {
  blue: "#008cff",
  ink: "#121212",
  paper: "#fafafa",
  /** Плейсхолдер под изображение в reflow-фреймах. */
  placeholder: "#ececec",
  /** Тёмная плашка под кроп-изображениями (04/05). */
  frameDark: "#212121",
  /** Near-black фон мокап-секций 07/09. */
  nearBlack: "#01030a",
  white: "#ffffff",
} as const;

// ── Структурная сетка 1280 (reflow, по кейсу 2 · 1280) ───────────────────
export const C4_LAYOUT_1280 = {
  /** Боковое поле контента во всех reflow-секциях. */
  gutter: 40,
  /** Ширина контентной колонки (1280 − 2×40). */
  content: 1200,
  /** Верх заголовка / поток-паддинг секции сверху. */
  padY: 72,
  /** Зазор между блоками внутри секции (flex-col gap). */
  sectionGap: 64,
  /** Зазор лейбл(заголовок)→текст. */
  headingGap: 12,
  /** Зазор между абзацами интро. */
  paraGap: 6,
} as const;

// ── Тайп-скейл 1280 (готовые строки Tailwind-классов) ────────────────────
export const C4_TEXT_1280 = {
  /** «004» в HERO — Wix Madefor Display Bold 152, lh 120%, tracking 4.56 (3%). */
  heroNum: "font-heading text-[152px] font-bold leading-[1.2] tracking-[4.56px]",
  /** Заголовок HERO — Wix Madefor Display Bold 52, lh 120%, tracking 1.04. */
  heroTitle: "font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px]",
  /** Дисплейный опенер (Концепция / Адаптация) — Wix Madefor Display Bold
   *  152, leading-none, tracking 4.56; стопкой (номер над словом). */
  displayOpener: "font-heading text-[152px] font-bold uppercase leading-none tracking-[4.56px]",
  /** Лейбл секции (01/03/04/06…) — Wix Madefor Display Bold 32, lh 110%,
   *  tracking 0.96 (3%). */
  sectionLabel: "font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]",
  /** Крупные цитаты / послесловия — Wix Madefor Display Regular 31–32,
   *  lh 110%, tracking 0.93–0.96, UPPERCASE. Прозрачность на месте
   *  (opacity-70 / -80). */
  quote: "font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px]",
  /** Тело — 14, lh 120%, tracking 0.28 (2%). Прозрачность: opacity-70. */
  body: "text-[14px] leading-[1.2] tracking-[0.28px]",
  /** Мелкие подписи (11) — lh 120%, tracking 0.66 (6%). */
  caption: "text-[11px] leading-[1.2] tracking-[0.66px]",
} as const;

/** Высота холста каждого reflow-фрейма 1280 (для FullBleedScale height).
 *  = Figma `height` секций фрейма 2730:17992. */
export const C4_CANVAS_1280 = {
  hero: 828,
  about: 283,
  task: 786,
  concept: 1517,
  keyVisual: 776,
  crops: 976,
  series: 1181.524,
  mockup1: 720,
  adaptation: 1558,
  mockup2: 900,
  summary: 1148,
  mockup3: 800,
  footer: 213,
} as const;

/** Доодлы 1280 — [x, y, w, h] на холсте секции + inset картинки внутри
 *  фикс-бокса (viewBox SVG больше bbox ноды). Обводка 6px #008CFF. */
export const C4_DOODLES_1280 = {
  /** Vector 234257363 — подчёркивание под метой «01 О проекте». */
  aboutUnderline: [1066, 158, 180, 6.699, "-44.78%_-1.67%"],
  /** Vector 234257391 — эллипс вокруг хайлайта «03 Концепция». */
  conceptEllipse: [/* центр */ -1, 25, 504.596, 218.922, "-1.37%_-0.59%"],
  /** Vector («глаз») — «04 Key visual». */
  kvEye: [1040.69, 71.52, 149.174, 92.405, "-3.25%_-2.01%"],
  /** «05 Кропы» — 3 рукописных кольца (анимируются по очереди). */
  cropsCircle1: [60, 78, 240, 353.331, "-0.85%_-1.25%"],
  cropsCircle2: [376, 235, 200, 199.376, "-1.5%"],
  cropsCircle3: [731.42, 488.28, 422.464, 398.845, "-0.75%_-0.71%"],
  /** Frame 2147232176 — подчёркивание под цитатой «05». */
  cropsUnderline: [135, 904, 329.56, 29.64, "0_-0.91%"],
  /** Vector 234257399 — эллипс вокруг мысли «06 Серия». */
  seriesEllipse: [293.39, 921.977, 693.378, 140.448, "-2.14%_-0.43%"],
  /** Vector 234257386 — эллипс вокруг мысли «08 Адаптация». */
  adaptEllipse: [390, 1248.477, 500, 207, "-1.41%_-0.59%"],
  /** Vector («стрелка») — «10 Итог». */
  finalArrow: [667.36, 154.2, 93.786, 72.845, "-4.12%_-3.2%"],
  /** Vector 234257394 — подчёркивание под мыслью «10 Итог». */
  finalUnderline: [649, 1016.29, 478.434, 28.047, "-10.7%_-0.63%"],
} as const;
