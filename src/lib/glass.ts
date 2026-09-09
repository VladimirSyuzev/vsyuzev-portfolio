// Единый «стеклянный» бабл для треков «Построение процесса» (кейс 1,
// Pipeline.tsx) и «Процесс» (кейсы 2/3, Process.tsx). Настройки во всех
// трёх кейсах ДОЛЖНЫ быть идентичны — цвет фона, прозрачность, эффекты.
// Значения 1:1 из Figma (компонент Step, эффект Glass): фон white/20,
// скругление 20, дроп-тень E8E8E8/25% (0 4 10), Frost (backdrop-blur) 6.
//
// ⚠️ Акцентная полоса слева (3px, цвет категории) — НЕ `border`, а
// отдельный дочерний элемент (см. <GlassBubble>). `border` на элементе с
// backdrop-filter + overflow-clip + border-radius в Chrome даёт цветной
// ореол-свечение вокруг всей карточки (в Figma свечения нет). Полностью
// эффект Figma Glass (Refraction/Depth/Dispersion/Light/Splay) в CSS не
// воспроизводится — переносим только Frost как backdrop-blur.
//
// Дроп-тень: Figma-эффект #E8E8E8/25% blur 10. Blur в Chrome «расплывается»
// сильнее, чем в Figma (на тёмном фоне читается как свечение) — уводим до
// blur 6 / 18%, чтобы визуально совпасть с макетом.
export const GLASS_BUBBLE =
  "overflow-clip rounded-[20px] bg-white/20 p-[16px] shadow-[0px_4px_6px_0px_rgba(232,232,232,0.18)] backdrop-blur-[6px]";
