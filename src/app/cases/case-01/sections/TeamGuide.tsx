import GuideScale from "./GuideScale";
import Dot from "@/components/Dot";

// 05 Руководство для команды — 1:1 из Figma (node 1961:32233). Диаграмма
// размер/толщина/скругления справа теперь настоящий SVG (GuideScale.tsx),
// не screenshot.
const BULLETS_LEFT = [
  "рабочие сетки (32 / 24 / 20 / 16 / 12 px)",
  "толщина линий",
  "радиусы скруглений",
  "правила использования примитивов",
  "построение компонентов",
];
const BULLETS_RIGHT = [
  "ресайзы",
  "поиск метафор",
  "работа над эскизами",
  "типичные ошибки",
  "рекомендации, полученные из обратной связи команды Яндекса",
];

export default function TeamGuide() {
  return (
    // Высота секции 1238px (Figma node 1961:32233, после переверстки):
    // итоговая фраза с обводкой-эллипсом уехала заметно ниже.
    <div className="relative h-[1238px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[44px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">05</p>
        <p className="text-[#121212]">РУКОВОДСТВО ДЛЯ КОМАНДЫ</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[636px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Чтобы два дизайнера могли работать синхронно и получать одинаковый результат, я подготовил
        внутренний гайд по созданию иконок. Документ объединял требования Яндекса и наш
        собственный опыт, накопленный во время работы над проектом.
      </p>

      <div className="absolute left-[46px] top-[455px] flex w-[325px] flex-col gap-[12px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Внутри гайда были описаны:
        </p>
        <div className="flex flex-col gap-[6px]">
          <ul className="flex flex-col gap-[6px]">
            {BULLETS_LEFT.map((item, i) => (
              <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <Dot index={i} />
                {item}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-[6px]">
            {BULLETS_RIGHT.map((item, i) => (
              <li key={item} className="flex items-start gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <Dot index={i} className="mt-[6px] size-[12px] shrink-0" />
                <span className="w-[312px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <GuideScale />

      {/* Доодл-«рожица с языком» справа сверху (Figma node 2279:39642) —
          заменил прежний «crown», позиция и наклон 1:1. */}
      <div className="absolute left-[977.21px] top-[206.5px] flex h-[221.291px] w-[276.034px] items-center justify-center">
        <div className="rotate-[1.65deg]">
          <img alt="" className="block h-[213.601px] w-[269.992px] max-w-none" src="/cases/case-01/sections/guide-face-doodle.svg" />
        </div>
      </div>

      {/* Обводка-эллипс вокруг фразы — SVG-экспорт ИТОГОВОГО узла Figma
          2322:5169: в самом узле поворот −12.85° уже применён к волнистому
          path, поэтому экспорт — это почти горизонтальный овал с «хвостиком»
          сверху-слева (≈+3.6° вверх-вправо, как в макете). Дополнительный
          CSS-rotate НЕ нужен — иначе овал завалится в другую сторону.
          viewBox расширен, чтобы «хвостик» и выступы path не обрезались. */}
      <img
        alt=""
        className="absolute"
        style={{ left: 330, top: 940, width: 780, height: 265 }}
        src="/cases/case-01/sections/guide-summary-ellipse.svg"
      />

      {/* Итоговая фраза — теперь самостоятельный центрированный блок
          (Figma node 1961:32279, top 1024.14, w-709, по центру секции). */}
      <p className="absolute left-1/2 top-[1024.14px] w-[709px] -translate-x-1/2 text-center font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        это стало внутренней системой производства иконок для нашей команды.
      </p>
    </div>
  );
}
