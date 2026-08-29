import GuideScale from "./GuideScale";
import Dot from "@/components/Dot";
import Reveal from "@/components/Reveal";

// 05 Руководство для команды — 1:1 из Figma (node 1961:32233, высота 1583).
// Сверено по Figma: заголовок + вводный абзац + список «внутри гайда» — в
// ПРАВОЙ половине (left 726); диаграмма размер/толщина/скругления по центру-
// слева (node 1961:32281 → left 215.21 / top 368.19, экспорт SVG, 838×456);
// доодл-«рожица» — слева сверху (node 2279:39642 → 54.1 / 105.85); итоговая
// фраза (Wix Madefor Regular, по центру) top 1214 в обводке-эллипсе.
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
    <div className="relative h-[1583px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* Заголовок — правая половина (Figma node 1961:32238, left 726). */}
      <div className="absolute left-[726px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">05</p>
        <p className="text-[#121212]">РУКОВОДСТВО ДЛЯ КОМАНДЫ</p>
      </div>

      <p className="absolute left-[726px] top-[181px] w-[635.535px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Чтобы два дизайнера работали синхронно и получали предсказуемый результат,
        <br />я подготовил внутренний гайд по созданию иконок. Он объединил требования Яндекса
        <br />и опыт, накопленный командой во время проекта.
      </p>

      {/* «Внутри гайда были описаны» — тоже правая половина, две колонки
          буллетов (Figma node 1961:32245, left 726 / top 866). */}
      <div className="absolute left-[726px] top-[866px] flex w-[668px] flex-col gap-[12px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Внутри гайда были описаны:
        </p>
        <div className="flex items-start gap-[12px]">
          <ul className="flex w-[328px] flex-col gap-[6px]">
            {BULLETS_LEFT.map((item, i) => (
              <li key={item} className="flex items-start gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <Dot index={i} className="mt-[4px] size-[12px] shrink-0" />
                <span className="whitespace-pre-line">{item}</span>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-[6px]">
            {BULLETS_RIGHT.map((item, i) => (
              <li key={item} className="flex items-start gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <Dot index={i} className="mt-[4px] size-[12px] shrink-0" />
                <span className={i === 2 ? "w-[235.762px]" : "whitespace-nowrap"}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <GuideScale />

      {/* Доодл-«рожица с языком» — слева сверху (Figma node 2279:39642).
          Экспорт узла: наклон −15.6° уже запечён, доп. rotate не нужен. */}
      <Reveal variant="doodle" className="absolute left-[54.1px] top-[105.85px] h-[278.349px] w-[317.495px]">
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/guide-face-doodle.svg" />
      </Reveal>

      {/* Обводка-эллипс вокруг итоговой фразы (Figma node 2322:5169) —
          экспорт узла с запечённым наклоном, по центру секции. */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: 1158, width: 760, height: 248 }}
      >
        <img alt="" className="block size-full" src="/cases/case-01/sections/guide-summary-ellipse.svg" />
      </Reveal>

      {/* Итоговая фраза — центрированный блок, Wix Madefor Display Regular
          (Figma node 1961:32279, top 1214.22, w-709). */}
      <p className="absolute left-1/2 top-[1214.22px] w-[709px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Гайд превратил создание иконок из набора отдельных решений
        <br />в единый производственный процесс
      </p>
    </div>
  );
}
