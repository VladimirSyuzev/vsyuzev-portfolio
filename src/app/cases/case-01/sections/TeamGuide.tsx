"use client";

import { useCanvasWide } from "@/lib/breakpoint";
import Dot from "@/components/Dot";
import Reveal from "@/components/Reveal";
import DrawIn from "@/components/DrawIn";

// 05 Руководство для команды.
// ≥1440 (node 1961:32233) — абсолют 1:1: hover раскрывает диаграммы, эллипс/
// доодл на своих местах.
// <1440 (node 2559:11154) — поток: заголовок стопкой + интро, буллеты
// стопкой (7 шт), 4 шага стопкой (диаграмма 328 + подпись), мысль-цитата
// с обводкой-эллипсом (Vector 234257391, поворот 32.67°). Смайл-доодла нет.
const RA = "/cases/case-01/sections/role-assets";
const R = "/cases/case-01/sections/reflow";

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

// --- Reflow <1440 (Figma 2559:11154). ---
// 7 буллетов стопкой + порядок скетч-точек из get_design_context.
const GUIDE_BULLETS: { text: string; dot: number }[] = [
  { text: "рабочие сетки (32 / 24 / 20 / 16 / 12 px)", dot: 2 },
  { text: "толщина линий и радиусы скруглений", dot: 3 },
  { text: "поиск метафор и работа над эскизами", dot: 2 },
  { text: "правила работы с примитивами и компонентами", dot: 1 },
  { text: "принципы ресайза", dot: 2 },
  { text: "типичные ошибки", dot: 3 },
  { text: "рекомендации из обратной связи команды Яндекса", dot: 4 },
];

function GuideFlow() {
  const cols = [GUIDE_BULLETS.slice(0, 4), GUIDE_BULLETS.slice(4)];
  return (
    // Секция — 375 pad 64/20 gap 32 · 834 pad 72/28 gap 64 · 1280 pad 72/40 gap 32
    <section className="relative w-full overflow-clip bg-[#fafafa] px-[20px] py-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px]">
      <div className="flex flex-col gap-[32px] sm:gap-[64px] lg:gap-[32px]">
        {/* Frame 2147231950/…918 — заголовок + интро, vertical gap 12 */}
        <div className="flex flex-col gap-[12px]">
          {/* h. 375: стек Wix Bold 26 / lh 100 / без ls · 834: одна строка
              Wix Bold 32 / lh 110 / ls 0.96, gap 12 (Figma 2539:9130) */}
          <div className="flex flex-col font-heading text-[26px] font-bold uppercase leading-none sm:flex-row sm:items-baseline sm:gap-x-[12px] sm:text-[32px] sm:leading-[1.1] sm:tracking-[0.96px]">
            <span className="whitespace-nowrap text-[#008cff]">05</span>
            <span className="w-[283px] text-[#121212] sm:w-auto sm:whitespace-nowrap">
              Руководство{" "}
              <br className="sm:hidden" />
              для команды
            </span>
          </div>
          {/* интро — Aeonik Pro Regular 14 / 120% / ls 0.28 / opacity 70.
              375: w335 · 834: во всю ширину · 1280: w593 (Figma 2534:8992) */}
          <p className="w-[335px] max-w-full text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-full lg:w-[593px]">
            Чтобы два дизайнера работали синхронно и получали предсказуемый результат, я подготовил
            внутренний гайд по созданию иконок. Он объединил требования Яндекса и опыт, накопленный
            командой во время проекта.
          </p>
        </div>

        {/* «Внутри гайда были описаны:» + буллеты + 4 шага — общий блок,
            внутри gap 32 (Figma frame 2559:10669). */}
        <div className="flex flex-col gap-[32px]">
          {/* Frame 2147231949/…459 — подзаголовок + буллеты, vertical gap 12 */}
          <div className="flex flex-col gap-[12px]">
            <p className="w-[335px] max-w-full text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[230px]">
              Внутри гайда были описаны:
            </p>
            {/* 375: одна колонка из 7 · 834: две колонки 4+3 (w~384) · 1280: w291 / w256 */}
            <div className="flex flex-col gap-[6px] sm:flex-row sm:gap-[12px]">
              {cols.map((col, ci) => (
                <ul key={ci} className={`flex flex-col gap-[6px] sm:w-[384px] ${ci === 0 ? "lg:w-[291px]" : "lg:w-[256px]"}`}>
                  {col.map(({ text, dot }, i) => (
                    <li key={i} className="flex items-start gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                      <img aria-hidden alt="" className="mt-[2px] block size-[12px] shrink-0" src={`${R}/dot-${dot}.svg`} />
                      <span className="opacity-70">{text}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Frame 2147231957 — 4 шага. Компонент = 328 × 430 (диаграмма
              328×328 + gap 24 + подпись 78). 375 — стопкой gap 32.
              834 (Figma 2539:9159) и 1280 (Figma 2534:9022) — сетка 2×2:
              две колонки по (контент−12)/2 (383 на 834, 594 на 1280),
              зазор 12, компонент 328 прижат влево ячейки; шаг строк 442
              (h 430 + gap 12). */}
          <div className="flex flex-col gap-[32px] sm:grid sm:grid-cols-2 sm:gap-[12px]">
            {STEPS.map((step) => (
              <div key={step.number} className="flex w-[328px] max-w-full flex-col gap-[24px] sm:h-[430px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={step.image} className="block aspect-square w-[328px] max-w-full" />
                {/* текст-блок — vertical gap 12 */}
                <div className="flex flex-col gap-[12px]">
                  <div className="flex items-center gap-[16px]">
                    {/* декоративный знак — «−» (компонент Property 1=-, Vector 234257371) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img aria-hidden alt="" className="block size-[24px] shrink-0" src="/cases/case-01/sections/role-minus.svg" />
                    <p className="text-[14px] font-medium uppercase tracking-[0.28px] text-[#121212]">{step.number}</p>
                  </div>
                  <p className="w-[300px] max-w-full whitespace-pre-line text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212] opacity-80 sm:w-[328px]">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frame 2147231951/— центр — мысль-цитата + обводка-эллипс
            (Vector 234257391). center/center; 375: pad-y 32, Wix Reg 22 /
            ls 0.6, эллипс rot 32.67 · 834: pad-y 62, Wix Reg 28 / lh 110 /
            ls 0.96 / w709, эллипс guide-ellipse-834 rot −14.32. */}
        <div className="relative flex flex-col items-center justify-center py-[32px] sm:py-[62px]">
          <p className="relative z-10 w-[335px] max-w-full text-center font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.6px] text-[#121212] opacity-70 sm:w-[709px] sm:text-[28px] sm:leading-[1.1] sm:tracking-[0.96px]">
            Гайд превратил создание иконок
            <br className="sm:hidden" /> из набора отдельных решений в единый производственный процесс
          </p>
          <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[392px] w-[400px] -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-[320px] sm:w-[778px]">
            <DrawIn
              src={`${R}/guide-ellipse-375.svg`}
              fit="contain"
              className="h-[272.6px] w-[300px] rotate-[32.67deg] sm:hidden"
            />
            {/* 834 — у пути ~16° собственного наклона (CCW), а rotation −14.32
                в Figma его гасит → на макете эллипс почти горизонтальный.
                Компенсируем: rotate +14° (CW). */}
            <DrawIn
              src={`${R}/guide-ellipse-834.svg`}
              fit="contain"
              className="hidden h-[295.2px] w-[744px] rotate-[14deg] sm:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TeamGuide() {
  const wide = useCanvasWide();
  if (!wide) return <GuideFlow />;

  return (
    <section className="w-full bg-[#fafafa] xl:relative xl:mx-auto xl:h-[1539px] xl:w-[1440px] xl:overflow-clip">
      <div className="flex flex-col gap-[28px] px-[var(--grid-margin)] py-[72px] xl:contents">
        <div className="flex flex-wrap items-baseline gap-x-[12px] font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.96px] sm:text-[32px] xl:absolute xl:left-[46px] xl:top-[134px] xl:flex-nowrap xl:whitespace-nowrap xl:text-[32px]">
          <p className="text-[#008cff]">05</p>
          <p className="text-[#121212]">РУКОВОДСТВО ДЛЯ КОМАНДЫ</p>
        </div>

        <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:max-w-[636px] xl:absolute xl:left-[46px] xl:top-[181px] xl:w-[635.535px]">
          Чтобы два дизайнера работали синхронно и получали предсказуемый результат,{" "}
          <br className="hidden xl:inline" />я подготовил внутренний гайд по созданию иконок. Он объединил требования Яндекса{" "}
          <br className="hidden xl:inline" />и опыт, накопленный командой во время проекта.
        </p>

        <div className="flex flex-col gap-[12px] xl:absolute xl:left-[46px] xl:top-[289px] xl:w-[668px]">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
            Внутри гайда были описаны:
          </p>
          <div className="flex flex-col gap-[12px] sm:flex-row sm:items-start sm:gap-[12px]">
            <ul className="flex flex-col gap-[6px] sm:w-[328px]">
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
                  <span className={`opacity-70 ${i === 2 ? "block sm:w-[235.762px]" : "sm:whitespace-nowrap"}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4-шаговый компонент. На десктопе — hover раскрывает диаграмму. */}
        <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 xl:absolute xl:left-[46px] xl:top-[561px] xl:flex xl:items-start xl:gap-[12px]">
          {STEPS.map((step, i) => (
            <div key={step.number} className="group flex flex-col gap-[16px] xl:w-[328px] xl:gap-[24px]">
              <div className="aspect-square w-full max-w-[328px] overflow-hidden xl:h-[328px] xl:w-[328px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="block size-full origin-bottom max-xl:scale-100 max-xl:[clip-path:inset(0px)] xl:scale-[0.96] xl:[clip-path:inset(100%_0_0_0)] xl:transition-[clip-path,transform] xl:duration-[450ms] xl:ease-[cubic-bezier(0.33,1,0.68,1)] xl:group-hover:scale-100 xl:group-hover:[clip-path:inset(0px)] motion-reduce:transition-none"
                  src={step.image}
                />
              </div>

              <div className="flex flex-col gap-[12px] xl:h-[78px]">
                <div className="flex items-center gap-[16px]">
                  <Reveal variant="doodle" delay={i * 0.09} className="shrink-0">
                    <div className="relative size-[24px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="absolute inset-0 size-full transition-opacity duration-300 motion-reduce:transition-none xl:group-hover:opacity-0"
                        src="/cases/case-01/sections/role-plus.svg"
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 motion-reduce:transition-none xl:group-hover:opacity-100"
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

        {/* Обводка-эллипс вокруг итоговой мысли. */}
        <div className="relative mx-auto w-full max-w-[709px] xl:absolute xl:left-1/2 xl:top-[1227.22px] xl:w-[709px] xl:-translate-x-1/2">
          <DrawIn
            src="/cases/case-01/sections/guide-summary-ellipse.svg"
            fit="contain"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[112%] -translate-x-1/2 -translate-y-1/2 xl:h-[248px] xl:w-[760px]"
          />
          <p className="relative text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70 sm:text-[28px] xl:text-[32px]">
            Гайд превратил создание иконок из набора отдельных решений в единый производственный процесс
          </p>
        </div>
      </div>
    </section>
  );
}
