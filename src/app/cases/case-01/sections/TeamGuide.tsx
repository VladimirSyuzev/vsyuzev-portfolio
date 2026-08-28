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
    // Высота исправлена с 900 на настоящие 1003px (сверено повторным
    // запросом к Figma, designedHeight секции) — иначе итоговая
    // строка+эллипс ниже (см. отдельный TODO про них) обрезались бы.
    <div className="relative h-[1003px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[44px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">05</p>
        <p className="text-[#121212]">РУКОВОДСТВО ДЛЯ КОМАНДЫ</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[636px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Чтобы два дизайнера могли работать синхронно и получать одинаковый результат, я подготовил
        внутренний гайд по созданию иконок. Документ объединял требования Яндекса и наш
        собственный опыт, накопленный во время работы над проектом.
      </p>

      <div className="absolute left-[46px] top-[457px] flex w-[325px] flex-col gap-[12px]">
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

      {/* Позиция сверена напрямую по Figma (node 2279:39642) — раньше стояла
          на 1032.84-851.27≈182px левее и 188-84.36≈104px ниже нужного. */}
      <div className="absolute left-[1032.84px] top-[84.36px] h-[221.29px] w-[276.03px]">
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/guide-crown-doodle.svg" />
      </div>

      {/* Итоговая строка + обводка-эллипс вокруг неё — сверено по Figma
          (node 1961:32279 / 2322:5169), тот же приём, что и в "Аудите
          библиотеки". У эллипса инструмент репортил 764×444 — визуально
          (скачал PNG-рендер узла) это оказался обычный ПЛОСКИЙ овал, а не
          повёрнутый: 444 — артефакт измерения bounding box самим
          инструментом у волнистого path. Реальная высота пересчитана по
          пропорциям настоящего экспорта (747×208.5) под ширину 764.26 —
          получилось 213.36; top сдвинут так, чтобы центр остался на месте
          (перепроверено — итог совпадает с отступами текста от краёв
          эллипса в "Аудите библиотеки"). */}
      <div className="absolute left-[337.87px] top-[729.97px] h-[213.36px] w-[764.26px]">
        <img alt="" className="absolute inset-0 block size-full" src="/cases/case-01/sections/guide-summary-ellipse.svg" />
        <p className="absolute left-[27.63px] top-[62.02px] w-[709px] text-center font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
          это стало внутренней системой производства иконок для нашей команды.
        </p>
      </div>
    </div>
  );
}
