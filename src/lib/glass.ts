// Единый «стеклянный» бабл для треков «Построение процесса» (кейс 1,
// Pipeline.tsx) и «Процесс» (кейс 2, Process.tsx). По требованию заказчика
// настройки бабла в обоих кейсах ДОЛЖНЫ быть идентичны — цвет фона,
// прозрачность и эффекты. Значения 1:1 из Figma (компонент Step, эффект
// Glass): фон white/20, скругление 20, левая граница 3px, дроп-тень
// E8E8E8/25% (0 4 10), Frost (backdrop-blur) 6.
//
// Полностью эффект Figma Glass (Refraction 19 / Depth 40 / Dispersion 50 /
// Light 80° −45° / Splay 0) в CSS не воспроизводится — переносим только
// Frost как backdrop-blur. Если правится здесь — меняется сразу в обоих
// кейсах, разъехаться они больше не могут.
export const GLASS_BUBBLE =
  "overflow-clip rounded-[20px] border-l-[3px] bg-white/20 p-[16px] shadow-[0px_4px_10px_0px_rgba(232,232,232,0.25)] backdrop-blur-[6px]";
