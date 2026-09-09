// ─────────────────────────────────────────────────────────────────────────
//  Блок «заголовок секции + вводный текст» — 375 (mobile reflow)
//  Кейсы 1 и 2. Значения выверены по Figma:
//   • c1: 2559:12191 (Проблема), 2559:19085 (Аудит), 2559:20047 (Задача),
//         2559:20890 (Консистентность), 2559:21858 (Итог), 2559:10998 (О проекте)
//   • c2: 2640:38254 (Задача), 2631:4721 (Исследование), 2631:4740 (Процесс)
//  Кейс 3 отдельной 375-вёрстки не имеет (FullBleedScale 1280→375).
// ─────────────────────────────────────────────────────────────────────────
//
//  СТРУКТУРА АВТО-ЛЭЙАУТА (для воспроизведения во Figma по команде):
//
//  ┌ Frame «заголовок + текст»
//  │   layout      : VERTICAL
//  │   gap         : 12            ← «gap между заголовком и наборным текстом»
//  │   padding     : 0  (у секции свой: 64 верт / 20 гор, у некоторых px-20 на самом фрейме)
//  │   align       : start / start
//  │   sizing      : FILL width (335 на 375) × HUG height
//  │
//  ├─ Frame «h» (номер + заголовок)
//  │     Вариант A — INLINE (короткий заголовок: «Задача», «Процесс», «Проблема»,
//  │        «Итог»): layout HORIZONTAL, wrap ON, gap 10–12 (row 0 / col 10–12),
//  │        align BASELINE, sizing FILL×HUG, clip content, text nowrap.
//  │     Вариант B — STACKED (длинный: «Исследование», «Визуальный язык»,
//  │        «Аудит библиотеки», «Контроль консистентности», «Построение процесса»):
//  │        layout VERTICAL, gap 0, align start, sizing FILL×HUG, text nowrap.
//  │        Длинный заголовок часто разбит на несколько text-нод (по словам).
//  │     · Шрифт  : Wix Madefor Display / Bold / 26
//  │     · Leading: 100% (inline) либо 110% (stacked)
//  │     · Tracking: 0 (inline «Задача/Процесс/Проблема»), 0.8px (stacked и c1 «Задача»),
//  │                 1px (c1 «Итог»)
//  │     · Uppercase (кроме визуального регистра исходного текста)
//  │     · Номер   → #008CFF ;  Заголовок → #121212 (светлая секция) / #FFFFFF (тёмная)
//  │
//  └─ Frame «текст» (вводные абзацы)
//        layout VERTICAL, gap 6 (c1/c2 обычно) либо 12 (c2 «Процесс»),
//        align start, sizing HUG(≈335)×HUG
//        · Шрифт  : Aeonik Pro / Regular / 14   (иногда Medium; c1 «Задача/Процесс» — Inter)
//        · Leading: 120%  (Inter-варианты — 130%)
//        · Tracking: 0.28px (Aeonik) / 0.2px (Inter)
//        · Opacity : 70%  (mета-строки и «Аудит»-интро — 100%)
//        · Width   : 335
//
//  АДАПТИВ (Tailwind-брейкпоинты в проекте):
//   375 (base)  →  заголовок 26 / gap-блока 12
//   834 (sm)    →  «маленькие» заголовки 32 ; «дисплейные» (Задача/Процесс/Итог) 100 ; gap-блока 24–32
//   1280 (lg)   →  32 ; дисплейные 152
//   ≥1440 (xl)  →  32 ; дисплейные 175 ; часто absolute-координаты
// ─────────────────────────────────────────────────────────────────────────

/** Обёртка блока: вертикальный стек, gap 12 (заголовок → текст). На 375. */
export const SECTION_HEAD_BLOCK_375 = "flex flex-col gap-[12px]";

/** Заголовок «номер + текст», inline-с-переносом. 375. */
export const SECTION_HEAD_INLINE_375 =
  "flex flex-wrap items-baseline gap-x-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-none";

/** Заголовок «номер + текст», стопкой (длинный). 375. */
export const SECTION_HEAD_STACKED_375 =
  "flex flex-col whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.8px]";

/** Вводный абзац(ы). 375. Прозрачность (opacity-70) добавлять на месте. */
export const SECTION_BODY_375 =
  "flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px]";
