"use client";

import RevealImg from "@/components/RevealImg";
import DrawIn from "@/components/DrawIn";
import TrackArrows from "@/components/TrackArrows";
import { useLang } from "@/lib/lang";
import { useCarouselEdgeFade } from "@/lib/useCarouselEdgeFade";
import { useStepCarousel } from "@/lib/useStepCarousel";
import { C2 } from "../i18n";

// Блок 3 «02 Шаблоны» — 1:1 из Figma (1440 / 1280 / 834 / 375 = node
// 3330:24380 / 3641:83727 / 3641:84475 / 3641:85211). Заголовок-дисплей
// (175/100/26px), вводный текст, доодл-звезда, лента из 20 шаблонов постов
// (5 групп по 4: Blue / Dark / Lilac / Photo / White), доодл-стрелка, текст
// про документацию и две карточки документации.
//
// Лента — карусель групп (механика как у «Вариантов», VariantsCarousel):
// активная группа по центру и КРУПНАЯ, остальные мельче; при перелистывании
// старая уменьшается, новая вырастает. Шаг: колесо мыши/горизонтальный жест
// трекпада (один жест = одна группа), перетаскивание, боковые кнопки ‹ ›.
// Стартовое состояние (группа 1 крупная и по центру) = макет: на 1440/1280/
// 834/375 первая группа стоит ровно по центру (283/203/62/11 от края), справа
// выглядывает кусок второй. Размеры карточек — CSS-переменные по брейкпоинтам.
// Раскладка — единый поток с брейкпоинтами: xl (≥1440, холст 1440), lg
// (1024–1439, reflow 1280), sm (640–1023, reflow 834), base (<640, reflow 375).
const A = "/cases/case-02/templates";

// Имена слоёв из Figma — для alt. Порядок = файлы t01…t20, по 4 в группе.
const NAMES = [
  "HeadlineOnly", "LogoHeadline v2", "LogoHeadline", "LogoHeadlineBody", // Blue
  "GeoBody", "HeadlineBody", "Headline v3", "HeadlineOnly", // Dark
  "3DObject", "BigNumber v3", "BigNumber", "HeadlineURL", // Lilac
  "Headline", "LogoBody", "Headline v3", "Tags", // Photo
  "HeadlinePhoto", "PhotoHeadline", "HeadlineURL", "PhotoLogoBody", // White
];
const GROUPS = [0, 1, 2, 3, 4];

export default function Templates() {
  const t = C2[useLang()];
  // Механика шаговой карусели (колесо/трекпад/драг/стрелки) — общий хук, как у
  // карусели графов в блоке «Weavy.AI» и «Вариантов».
  const { trackRef, index, setIndex, step, dragging, bind, dragDX, reduced, last } = useStepCarousel(GROUPS.length);

  // Затухание краёв трека в прозрачность — как у «Вариантов»
  const fade = useCarouselEdgeFade(trackRef, "[data-active]", [index]);

  const EASE = "cubic-bezier(0.33,1,0.68,1)";
  const dur = (ms: number) => (reduced ? "0ms" : `${ms}ms`);

  return (
    <section className="relative flex w-full flex-col gap-[32px] overflow-x-clip bg-[#fafafa] py-[64px] max-sm:pb-[65px] sm:gap-[64px] sm:py-[72px] lg:pb-[71px] xl:pb-[189px] xl:pt-[45px]">
      {/* ─ Заголовок + вводный текст (+ звезда) ─ */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-[12px] px-[20px] sm:gap-[32px] max-sm:pt-[1px] sm:px-[28px] lg:px-[40px] lg:pt-[2px] xl:pl-[46px] xl:pr-0 xl:pt-0">
        <div className="flex flex-row gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:items-center sm:gap-[18px] sm:text-[min(100px,11.99vw)] sm:tracking-normal lg:flex-col lg:items-start lg:gap-0 lg:text-[min(175px,13.67vw)] xl:flex-row xl:items-center xl:gap-[24px] xl:text-[175px]">
          <span className="text-[#008cff]">02</span>
          <span className="text-[#121212]">{t.tplHeading}</span>
        </div>
        <div className="flex w-[335px] max-w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 max-sm:mt-[1px] sm:max-lg:mt-[1px] sm:w-full lg:w-[594px] xl:w-[668px]">
          <p>{t.tplIntro1}</p>
          <p>{t.tplIntro2}</p>
        </div>
        {/* Доодл-звезда: 834 — правее колонки (-5 от края), 1280 — сразу под
            вводным, 1440 — абсолют (1066/383). На 375 в макете за кадром. */}
        <DrawIn
          src={`${A}/star.svg`}
          className="pointer-events-none absolute hidden h-[125px] w-[158px] sm:-right-[5px] sm:top-[205px] sm:block lg:right-[40px] lg:top-[calc(100%+1px)] xl:left-[1066px] xl:right-auto xl:top-[338px]"
        />
      </div>

      {/* ─ Лента шаблонов: карусель групп (full-bleed) ─ */}
      <div className="relative xl:mt-[169px]">
        <div
          ref={trackRef}
          style={fade}
          {...(reduced ? {} : bind)}
          className={`relative h-[234px] w-full touch-pan-y select-none overflow-hidden [--bh:99.32px] [--bw:79.46px] [--g:23.57px] [--gs:12px] [--sh:56.4px] [--sw:45.12px] sm:h-[320px] sm:[--bh:210.67px] sm:[--bw:168.54px] sm:[--g:50px] sm:[--sh:119.63px] sm:[--sw:95.71px] lg:h-[507px] lg:[--bh:262px] lg:[--bw:209.6px] lg:[--g:100px] lg:[--gs:6.82px] lg:[--sh:149px] lg:[--sw:119px] xl:h-[262px] ${
            reduced ? "" : dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {/* Полоса групп: левый край на середине окна, сдвиг так, чтобы центр
              активной (крупной) группы стоял по центру; слева от неё — группы
              в мелком размере. 4·bw+36 — ширина крупной, 4·sw+3·gs — мелкой. */}
          <div
            className="absolute left-1/2 top-0 flex h-full items-center will-change-transform"
            style={
              {
                "--i": index,
                gap: "var(--g)",
                transform: `translateX(calc(var(--i) * -1 * (4 * var(--sw) + 3 * var(--gs) + var(--g)) - (4 * var(--bw) + 36px) / 2 + ${dragging ? dragDX : 0}px))`,
                transition: dragging ? "none" : `transform ${dur(550)} ${EASE}`,
              } as React.CSSProperties
            }
          >
            {GROUPS.map((g) => {
              const act = g === index;
              return (
                <div
                  key={g}
                  onClick={() => setIndex(g)}
                  data-active={act || undefined}
                  className={`flex shrink-0 items-center ${act ? "" : "cursor-pointer"}`}
                  style={{
                    gap: act ? "12px" : "var(--gs)",
                    transition: `gap ${dur(450)} ${EASE}`,
                  }}
                >
                  {NAMES.slice(g * 4, g * 4 + 4).map((name, i) => {
                    const n = g * 4 + i + 1;
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={n}
                        alt={`${t.tplAlt}: ${name}`}
                        src={`${A}/t${String(n).padStart(2, "0")}.webp`}
                        draggable={false}
                        className="block shrink-0 object-cover outline outline-1 -outline-offset-1"
                        style={{
                          width: act ? "var(--bw)" : "var(--sw)",
                          height: act ? "var(--bh)" : "var(--sh)",
                          outlineColor: act ? "rgba(18,18,18,0.1)" : "rgba(18,18,18,0.4)",
                          transition: `width ${dur(450)} ${EASE}, height ${dur(450)} ${EASE}, outline-color ${dur(450)} ${EASE}`,
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        {/* Боковые кнопки ‹ › — снаружи трека (не уезжают с лентой) */}
        <TrackArrows
          className="absolute inset-0"
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          canPrev={index > 0}
          canNext={index < last}
        />
      </div>

      {/* ─ Текст про документацию (+ доодл-стрелка вниз) ─ */}
      <div className="relative mx-auto w-full max-w-[1440px] px-[20px] max-sm:mt-[2px] sm:px-[28px] sm:max-lg:mt-[1px] lg:mt-[1px] lg:px-[40px] xl:mt-[86px] xl:px-0">
        <p className="w-[335px] max-w-full text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:ml-auto sm:w-full lg:w-[594px] xl:ml-[726px] xl:w-[655px]">
          {t.tplDoc}
        </p>
        <DrawIn
          src={`${A}/hooks-down.svg`}
          className="pointer-events-none absolute hidden h-[125px] w-[158px] lg:left-[129px] lg:top-[-13px] lg:block xl:left-[216px] xl:top-[-21px]"
        />
      </div>

      {/* ─ Две карточки документации ─ */}
      <div className="mx-auto w-full max-w-[1440px] px-[20px] max-sm:mt-[1px] sm:px-[28px] lg:mt-[1px] lg:px-[40px] xl:-mt-[13px] xl:px-0">
        <div className="mx-auto flex w-full flex-col gap-[12px] sm:flex-row lg:max-w-[1008px] xl:w-[1008px]">
          {[
            { src: `${A}/doc-1.webp`, alt: t.tplDocAlt1 },
            { src: `${A}/doc-2.webp`, alt: t.tplDocAlt2 },
          ].map((d, i) => (
            <RevealImg key={d.src} delay={i * 0.06} alt={d.alt} src={d.src} className="block aspect-[498/446] w-full object-cover sm:w-[calc(50%-6px)] lg:w-[calc(50%-6px)]" />
          ))}
        </div>
      </div>
    </section>
  );
}
