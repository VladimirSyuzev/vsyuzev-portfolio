import Dot from "@/components/Dot";
import Reveal from "@/components/Reveal";

// 05 Руководство для команды — 1:1 из актуальной Figma (node 1961:32233,
// высота 1539). Пользователь перекомпоновал секцию: убрал GuideScale,
// а на его место встал интерактивный 4-шаговый компонент из бывшего
// раздела «Роль» (Up_1..Up_4, hover-раскрытие диаграммы). Доодл-«рожица»
// уехал в правый верхний угол (node 2279:39642 → 896 / 286.62), итоговая
// фраза — вниз (node 1961:32279 → top 1227.22), в обводке-эллипсе
// (экспорт узла 2322:5169).
const RA = "/cases/case-01/sections/role-assets";

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

// 4 шага (Figma frame 2009:11514, x46 / y561): диаграмма 328×328 + подпись.
const STEPS = [
  { number: "001", text: "Выбрали образ,\nизменяем его в сетке", image: `${RA}/role-diagram-1.svg` },
  { number: "002", text: "Выбираем контур\nиз сетки для формата иконки", image: `${RA}/role-diagram-2.svg` },
  {
    number: "003",
    text: "Помещаем в него образ, пока\nчто он не попадает в визуальный вес сетки",
    image: `${RA}/role-diagram-3.svg`,
  },
  { number: "004", text: "Размещаем объект в контуре,\nс компенсационными вылетами", image: `${RA}/role-diagram-4.svg` },
];

export default function TeamGuide() {
  return (
    <div className="relative h-[1539px] w-[1440px] overflow-clip bg-[#fafafa]">
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

      {/* «Внутри гайда были описаны» — две колонки буллетов
          (Figma node 1961:32245, left 46 / top 289). */}
      <div className="absolute left-[46px] top-[289px] flex w-[668px] flex-col gap-[12px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Внутри гайда были описаны:
        </p>
        <div className="flex items-start gap-[12px]">
          <ul className="flex w-[328px] flex-col gap-[6px]">
            {BULLETS_LEFT.map((item, i) => (
              <li key={item} className="flex items-start gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <Dot seed={63 + i} className="mt-[4px] size-[12px] shrink-0" />
                <span className="whitespace-pre-line opacity-70">{item}</span>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-[6px]">
            {BULLETS_RIGHT.map((item, i) => (
              <li key={item} className="flex items-start gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <Dot seed={79 + i} className="mt-[4px] size-[12px] shrink-0" />
                <span className={`opacity-70 ${i === 2 ? "block w-[235.762px]" : "whitespace-nowrap"}`}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Доодл-«рожица с языком» — правый верхний угол (Figma node 2279:39642
          → 820 / 311.62). Экспорт узла: наклон уже запечён. */}
      <Reveal variant="doodle" className="absolute left-[820px] top-[311.62px] h-[278.349px] w-[317.495px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/guide-face-doodle.svg" />
      </Reveal>

      {/* 4-шаговый компонент (Figma frame 2009:11514, x46 / y561). В покое —
          только «+» / номер / подпись; по наведению диаграмма 328×328
          раскрывается снизу вверх. Механика 1:1 из бывшего раздела «Роль». */}
      <div className="absolute left-[46px] top-[561px] flex items-start gap-[12px]">
        {STEPS.map((step, i) => (
          <div key={step.number} className="group flex w-[328px] flex-col gap-[24px]">
            <div className="h-[328px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block size-[328px] origin-bottom scale-[0.96] [clip-path:inset(100%_0_0_0)] transition-[clip-path,transform] duration-[450ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none group-hover:scale-100 group-hover:[clip-path:inset(0px)]"
                src={step.image}
              />
            </div>

            <div className="flex h-[78px] flex-col gap-[12px]">
              <div className="flex items-center gap-[16px]">
                <Reveal variant="doodle" delay={i * 0.09} className="shrink-0">
                  <div className="relative size-[24px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      className="absolute inset-0 size-full transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-0"
                      src="/cases/case-01/sections/role-plus.svg"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-100"
                      src="/cases/case-01/sections/role-minus.svg"
                    />
                  </div>
                </Reveal>
                <p className="text-[14px] font-medium tracking-[0.28px] text-[#121212]">{step.number}</p>
              </div>
              <p className="w-[215px] whitespace-pre-line text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212] opacity-80">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Обводка-эллипс вокруг итоговой фразы (Figma node 2322:5169). */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute left-[340px] top-[1163px] h-[248px] w-[760px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full" src="/cases/case-01/sections/guide-summary-ellipse.svg" />
      </Reveal>

      {/* Итоговая фраза — центрированный блок, Wix Madefor Display Regular
          (Figma node 1961:32279 → top 1227.22, w-709). */}
      <p className="absolute left-1/2 top-[1227.22px] w-[709px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Гайд превратил создание иконок из набора отдельных решений в единый производственный процесс
      </p>
    </div>
  );
}
