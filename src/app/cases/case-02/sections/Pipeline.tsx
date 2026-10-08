"use client";

import { useEffect, useRef, useState } from "react";
import DrawIn from "@/components/DrawIn";
import EdgeFade from "@/components/EdgeFade";
import GlassBubble from "@/components/GlassBubble";
import TrackArrows from "@/components/TrackArrows";
import { useCanvasWide } from "@/lib/breakpoint";
import { useLang } from "@/lib/lang";
import { useScrollTrack } from "@/lib/useScrollTrack";
import { C2 } from "../i18n";

// Блок 4 «03 Пайплайн» — тёмный full-bleed. 1:1 из Figma: 1440 = 3527:74176
// (высота 992), 1280 = 3641:84199 (828), 834 = 3644:87841 (698), 375 =
// 3641:85682 (748). Заголовок 32px (375 — 26), два абзаца, трек из 8
// стеклянных шагов 328×125 с шагом 340 и линейка-риска за ним (отдельный
// SVG на каждый размер, стоит на месте, пока карточки листаются), на
// десктопе — доодл-стрелка «→» под треком. Механика трека — как «Процесс» в
// других кейсах: драг/тач/колесо (useScrollTrack) + стрелки ‹ ›.
const A = "/cases/case-02/pipeline";
const PITCH = 340; // шаг между карточками (x в Figma: 0, 340, 680 … 2380)
const TRACK_W = 7 * PITCH + 328; // 2708

export default function Pipeline() {
  const t = C2[useLang()];
  const sectionRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(1440);
  const { trackRef, bind, dragging, canPrev, canNext, scrollByStep } = useScrollTrack();
  // matchMedia(min-width:1440px) — тот же порог, что у CSS xl: (в отличие от
  // clientWidth, который на ровно 1440 при вертикальном скроллбаре даёт 1425).
  const wide = useCanvasWide();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setTrackWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const track = (
    <div
      ref={trackRef}
      {...bind}
      onScroll={(e) => {
        if (rulerRef.current) rulerRef.current.style.transform = `translateX(${e.currentTarget.scrollLeft}px)`;
      }}
      className={`no-scrollbar relative h-[286px] w-full touch-pan-y select-none overflow-x-auto [container-type:inline-size] xl:absolute xl:left-0 xl:top-[446px] ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Левый отступ карточек из макета: 18 / 28 / 40; на ≥1440 — 46 от края
          холста (cqw = ширина окна трека, гаттер = (W−1440)/2). */}
      {/* правый отступ = полэкрана − полкарточки: последний бабл докручивается до центра */}
      <div style={{ paddingRight: "max(20px, calc(50cqw - 164px))" }} className="box-content h-[125px] w-max pb-[81px] pl-[18px] pt-[80px] sm:pl-[28px] lg:pl-[40px] xl:pl-[calc(max(0px,(100cqw-1440px)/2)+46px)]">
        <div className="relative h-[125px]" style={{ width: TRACK_W }}>
          {/* Линейка-риска: отдельный слой секции — карточки листаются, она
              стоит (translateX = scrollLeft). Точные экспорты Figma под размер. */}
          <div
            ref={rulerRef}
            // Слой линейки ограничен шириной ВИДИМОГО окна трека (cqw − левый
            // отступ) и клипуется: иначе, переносясь на scrollLeft вправо, он
            // сам раздвигал бы scrollWidth и трек «дотягивался» дальше последней
            // карточки (max-scroll рос на каждую прокрутку).
            className="pointer-events-none absolute top-[-80px] h-[286px] overflow-clip will-change-transform max-sm:-left-[18px] max-sm:w-[min(375px,100cqw)] sm:left-0 sm:w-[min(778px,calc(100cqw-28px))] lg:w-[min(1200px,calc(100cqw-40px))] xl:w-[1348px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden className="absolute left-0 top-0 h-[286px] w-[375px] max-w-none sm:hidden" src={`${A}/stripes-375.svg`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden className="absolute left-0 top-0 hidden h-[286px] w-[778px] max-w-none sm:block lg:hidden" src={`${A}/stripes-834.svg`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden className="absolute left-0 top-0 hidden h-[286px] w-[1200px] max-w-none lg:block xl:hidden" src={`${A}/stripes-1280.svg`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden className="absolute left-0 top-0 hidden h-[286px] w-[1348px] max-w-none xl:block" src={`${A}/stripes-1440.svg`} />
          </div>
          {t.pipeSteps.map((s, i) => (
            <div key={s.title} className="absolute h-[125px] w-[328px] shrink-0" style={{ left: i * PITCH, top: 0 }}>
              {/* Единый <GlassBubble> для всех треков «процесс»: без «занавеса»,
                  акцент слева — дочерний элемент, а не border. */}
              <GlassBubble className="flex size-full flex-col justify-center gap-[8px]">
                <p
                  className="text-[14px] font-bold uppercase leading-[1.2] tracking-[0.84px] text-[#008cff]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-white">{s.title}</p>
                <p className="text-[11px] leading-[1.2] tracking-[0.66px] text-white">{s.desc}</p>
              </GlassBubble>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={sectionRef}
      // isolate + свой слой композитинга: иначе frost-карточки (backdrop-filter
      // + will-change) в Chrome «протекают» за overflow-clip и размывают
      // соседние блоки.
      className="relative w-full overflow-clip bg-[#121212] [isolation:isolate] [transform:translateZ(0)] xl:h-[992px]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[12px] px-[20px] pt-[65px] sm:px-[28px] sm:pt-[72px] lg:px-[40px] lg:pt-[73px] xl:absolute xl:left-1/2 xl:top-0 xl:block xl:h-full xl:w-[1440px] xl:max-w-none xl:-translate-x-1/2 xl:p-0">
        <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px] xl:absolute xl:left-[46px] xl:top-[135px]">
          <span className="text-[#008cff]">03</span>
          <span className="text-white">{t.pipeHeading}</span>
        </div>
        <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 max-sm:mt-[1px] sm:max-lg:mt-[1px] lg:w-[594px] xl:absolute xl:left-[46px] xl:top-[183px] xl:w-[668px]">
          <p>{t.pipeIntro1}</p>
          <p>{t.pipeIntro2}</p>
        </div>
        {/* Стрелка-доодл «→» под треком — только ≥1024 (на 834/375 в макете нет). */}
        <DrawIn
          src={`${A}/arrow.svg`}
          className="pointer-events-none absolute hidden h-[63px] w-[99px] lg:right-[46px] lg:top-[656px] lg:block xl:left-[1236px] xl:right-auto xl:top-[749px] xl:z-10"
        />
      </div>

      {/* Трек + край-фейд + стрелки ‹ › (СНАРУЖИ скролл-контейнера — иначе
          уезжали бы с лентой). На xl обёртка contents → абсолюты считаются от
          секции. */}
      <div className="relative mt-[35px] sm:mt-[97px] lg:mt-[105px] xl:contents">
        {track}
        <EdgeFade width={trackWidth} className="absolute inset-0 xl:left-0 xl:top-[446px] xl:h-[286px]" />
        <TrackArrows
          onPrev={() => scrollByStep(-1)}
          onNext={() => scrollByStep(1)}
          canPrev={canPrev}
          canNext={canNext}
          className="absolute left-0 right-0"
          style={{ top: wide ? 446 + 80 : 80, height: 125 }}
        />
      </div>

      <div className="h-[63px] sm:h-[71px] lg:h-[160px] xl:hidden" aria-hidden />
    </div>
  );
}
