import GuideScale from "./GuideScale";
import Dot from "@/components/Dot";
import Reveal from "@/components/Reveal";

// 05 Руководство для команды — 1:1 из актуальной Figma (node 1961:32233,
// высота 1172). Сверено по свежим метаданным (пользователь перекомпоновал
// секцию): заголовок + вводный абзац + список «внутри гайда» — в ЛЕВОЙ
// колонке (left 46), список сразу под абзацем (top 289); диаграмма
// размер/толщина/скругления — справа (node 1961:32281 → left 726 / top 318,
// экспорт 668×363); доодл-«рожица» — слева по центру (node 2279:39642 →
// 132 / 583.62); итоговая фраза (Wix Madefor Display Regular, по центру)
// top 932 в обводке-эллипсе (экспорт узла 2322:5169, 760×248, начало в
// координатах секции 327.16 / 866.8).
const BULLETS_LEFT = [
  "рабочие сетки (32 / 24 / 20 / 16 / 12 px)",
  "толщина линий и радиусы скруглений",
  "поиск метафор и работа над эскизами",
  "правила работы с примитивами\nи компонентами",
];
const BULLETS_RIGHT = [
  "принципы ресайза",
  "типичные ошибки",
  "рекомендации из обратной связи команды Яндекса",
];

export default function TeamGuide() {
  return (
    <div className="relative h-[1172px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* Заголовок (Figma node 1961:32238, left 46, top 134). */}
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">05</p>
        <p className="text-[#121212]">РУКОВОДСТВО ДЛЯ КОМАНДЫ</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[635.535px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Чтобы два дизайнера работали синхронно и получали предсказуемый результат,
        <br />я подготовил внутренний гайд по созданию иконок. Он объединил требования Яндекса
        <br />и опыт, накопленный командой во время проекта.
      </p>

      {/* «Внутри гайда были описаны» — левая колонка, две колонки буллетов
          (Figma node 1961:32245, left 46 / top 289). */}
      <div className="absolute left-[46px] top-[289px] flex w-[668px] flex-col gap-[12px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Внутри гайда были описаны:
        </p>
        <div className="flex items-start gap-[12px]">
          <ul className="flex w-[328px] flex-col gap-[6px]">
            {BULLETS_LEFT.map((item) => (
              <li key={item} className="flex items-start gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <Dot className="mt-[4px] size-[12px] shrink-0" />
                <span className="whitespace-pre-line opacity-70">{item}</span>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-[6px]">
            {BULLETS_RIGHT.map((item, i) => (
              <li key={item} className="flex items-start gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <Dot className="mt-[4px] size-[12px] shrink-0" />
                <span className={`opacity-70 ${i === 2 ? "block w-[235.762px]" : "whitespace-nowrap"}`}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <GuideScale />

      {/* Доодл-«рожица с языком» — слева по центру (Figma node 2279:39642).
          Экспорт узла: наклон уже запечён, доп. rotate не нужен. */}
      <Reveal variant="doodle" className="absolute left-[132px] top-[583.62px] h-[278.349px] w-[317.495px]">
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/guide-face-doodle.svg" />
      </Reveal>

      {/* Обводка-эллипс вокруг итоговой фразы (Figma node 2322:5169) —
          экспорт узла с запечённым наклоном; начало SVG соответствует
          координате секции 327.16 / 866.8. */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute"
        style={{ left: 327.16, top: 866.8, width: 760, height: 248 }}
      >
        <img alt="" className="block size-full" src="/cases/case-01/sections/guide-summary-ellipse.svg" />
      </Reveal>

      {/* Итоговая фраза — центрированный блок, Wix Madefor Display Regular
          (Figma node 1961:32279, top 932.22, w-709). */}
      <p className="absolute left-1/2 top-[932.22px] w-[709px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Гайд превратил создание иконок из набора отдельных решений
        <br />в единый производственный процесс
      </p>
    </div>
  );
}
