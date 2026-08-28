"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import Dot from "@/components/Dot";

// «01 Проблема» — в Figma это ОДИН раздел из двух слайдов ("слайд 1 из 2" —
// Problem.tsx, "слайд 2 из 2" — было Screen.tsx), с общим прогресс-
// индикатором. Раньше это были два отдельных min-h-screen блока, между
// которыми скроллом просто уезжаешь вверх — по просьбе переделано в один
// закреплённый (pin) блок: фон/каркас остаётся на месте, контент слайдов
// кроссфейдится друг в друга на том же месте, прогресс-индикатор
// переключается вместе с контентом.
//
// Техника — как в предыдущих проектах (см. память "Scrub-freeze pattern",
// "Parent-opacity gotcha", "ScrollTrigger onRefresh desync"):
// - НЕ scrub:true напрямую на opacity (даёт "заморозку" кроссфейда на
//   середине, если скролл останавливается ровно на границе) — вместо
//   этого onUpdate/onRefresh проверяют порог прогресса (0.5) и запускают
//   ОБЫЧНый (не scrubbed) gsap.to() один раз при пересечении порога.
// - Слои-слайды — СИБЛИНГИ с независимой анимацией opacity, не вложены
//   друг в друга (не гасим общий родитель, который спрятал бы оба сразу).
// - onRefresh дублирует ту же пороговую проверку, что и onUpdate — иначе
//   resize/refresh может рассинхронизировать видимый слой с self.progress.
const A = "/cases/case-01/sections/screen-assets";

const BULLETS = [
  "разные соотношения ширины и высоты",
  "неодинаковую толщину линий",
  "разные радиусы скруглений",
  "различия в принципах построения",
  "разный визуальный вес иконок",
  "несколько вариантов одной и той же иконки",
  "отсутствие некоторых нужных размеров",
  "отсутствие outline- или filled-вариантов",
];

function ProblemContent() {
  return (
    <>
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[16px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-white">ПРОБЛЕМА</p>
      </div>

      {/* Один левый столбец текста (Figma node 2359:4421) — раньше был
          разбит на отдельные блоки у колонок с иконками и внизу. */}
      <div className="absolute left-[46px] top-[181px] flex w-[498px] flex-col items-start gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
        <p className="w-[329px] opacity-70">
          На старте проекта внутри Яндекса одновременно существовали две библиотеки иконок.
        </p>
        <p className="w-[329px]">
          ICONS SYMBOLS{" "}
          <span className="text-white/70">была старой библиотекой, созданной несколькими годами ранее.</span>
        </p>
        <p className="w-[329px]">
          ICONS REGULAR{" "}
          <span className="text-white/70">
            развивалась вместе с продуктами и постепенно пополнялась новыми иконками.
          </span>
        </p>
        <p className="w-[337.139px] opacity-70">
          Иконки создавались по мере появления задач у разных команд. Их рисовали под конкретные
          релизы, поэтому со временем в библиотеке накопился технический долг.
        </p>
      </div>

      <p className="absolute left-[556px] top-[429px] w-[329px] text-[12px] leading-[1.2] tracking-[0.24px] text-white opacity-70">
        ICONS SYMBOLS
      </p>
      <p className="absolute left-[896px] top-[429px] w-[329px] text-[12px] leading-[1.2] tracking-[0.24px] text-white opacity-70">
        ICONS REGULAR
      </p>

      <div className="absolute left-[556px] top-[455.52px] flex items-center gap-[12px]">
        <div className="relative size-[328px] bg-white">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-union.svg" />
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-tmp.svg" />
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <img alt="" className="size-[328px]" src="/cases/case-01/sections/problem-train.svg" />
          </div>
        </div>
        <div className="relative size-[328px] bg-white">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-union2.svg" />
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-tmp2.svg" />
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <img alt="" className="size-[328px]" src="/cases/case-01/sections/problem-railway.svg" />
          </div>
        </div>
      </div>

      {/* Доодл-«звезда» справа сверху (Figma node 2279:32655) — новый. */}
      <div className="absolute left-[1124.64px] top-[223.15px] flex h-[191.363px] w-[200.725px] items-center justify-center">
        <img alt="" className="h-[125px] w-[158px] max-w-none" src="/cases/case-01/sections/problem-star-doodle.svg" />
      </div>

      {/* Стрелка-доодл под правой колонкой (Figma node 2284:39939). */}
      <div className="absolute left-[875.91px] top-[756.18px] flex h-[112.796px] w-[389.623px] items-center justify-center">
        <div className="rotate-[6.99deg]">
          <div className="relative h-[66.502px] w-[384.386px]">
            <div className="absolute inset-[-4.51%_-0.78%]">
              <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/problem-arrow.svg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ScreenContent() {
  return (
    <>
      <p className="absolute left-[46px] top-[181px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        На одном экране могли одновременно использоваться иконки из разных библиотек. В результате
        элементы интерфейса отличались по визуальным характеристикам, а единый стиль иконок
        нарушался.
      </p>

      <div className="absolute left-[47px] top-[510px] flex w-[327px] flex-col gap-[12px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.42px] text-white">
          МЫ ОБНАРУЖИЛИ:
        </p>
        <ul className="flex flex-col gap-[6px]">
          {BULLETS.map((item, i) => (
            <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
              <Dot index={i} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute left-[353px] top-[623px] h-[125px] w-[158px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/doodle-hooks.svg`} />
      </div>

      {/* Телефон + аннотация — два слоя, тот же холст, друг на друге. */}
      <div className="absolute left-[556px] top-[166px] h-[568px] w-[668px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/screen-layer-1.svg`} />
        <img
          alt="Экран приложения с одновременным использованием иконок из Icons Regular и Icons Symbols"
          className="absolute inset-0 block size-full max-w-none"
          src={`${A}/screen-layer-2.svg`}
        />
      </div>
    </>
  );
}

export default function ProblemScreen() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !pinRef.current || !wrapRef.current) return;

      const state = { slide: 1 };
      function showSlide(slide: number) {
        if (state.slide === slide) return;
        state.slide = slide;
        gsap.to(problemRef.current, { opacity: slide === 1 ? 1 : 0, duration: 0.5, ease: "siteEase" });
        gsap.to(screenRef.current, { opacity: slide === 2 ? 1 : 0, duration: 0.5, ease: "siteEase" });
        gsap.to(bar1Ref.current, { opacity: slide === 1 ? 1 : 0.3, duration: 0.5, ease: "siteEase" });
        gsap.to(bar2Ref.current, { opacity: slide === 2 ? 1 : 0.3, duration: 0.5, ease: "siteEase" });
      }

      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight,
        pin: pinRef.current,
        pinSpacing: true,
        onUpdate: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
        onRefresh: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
      });

      return () => {
        st.kill();
      };
    },
    { scope: wrapRef, dependencies: [reduced] }
  );

  // При "уменьшить анимацию" — без pin/скролл-джекинга, два блока подряд
  // обычным потоком (как было изначально).
  if (reduced) {
    return (
      <>
        <div className="flex min-h-screen w-full items-center justify-center bg-[#121212]">
          <div className="relative h-[900px] w-[1440px] shrink-0 overflow-clip">
            <ProblemContent />
            <div className="absolute left-[46px] top-[852px] flex gap-[12px]">
              <div className="h-[2px] w-[44.833px] bg-white" />
              <div className="h-[2px] w-[44.833px] bg-white opacity-30" />
            </div>
          </div>
        </div>
        <div className="flex min-h-screen w-full items-center justify-center bg-[#121212]">
          <div className="relative h-[900px] w-[1440px] shrink-0 overflow-clip">
            <ScreenContent />
            <div className="absolute left-[46px] top-[852px] flex gap-[12px]">
              <div className="h-[2px] w-[44.833px] bg-white opacity-30" />
              <div className="h-[2px] w-[44.833px] bg-white" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div ref={wrapRef} data-snap-stop className="relative w-full" style={{ height: "200vh" }}>
      <div ref={pinRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#121212]">
        <div className="relative h-[900px] w-[1440px] shrink-0 overflow-clip">
          <div ref={problemRef} className="absolute inset-0">
            <ProblemContent />
          </div>
          <div ref={screenRef} className="absolute inset-0" style={{ opacity: 0 }}>
            <ScreenContent />
          </div>

          {/* Общий прогресс-индикатор — переключается вместе с контентом. */}
          <div className="absolute left-[46px] top-[852px] z-10 flex gap-[12px]">
            <div ref={bar1Ref} className="h-[2px] w-[44.833px] bg-white" />
            <div ref={bar2Ref} className="h-[2px] w-[44.833px] bg-white opacity-30" />
          </div>
        </div>
      </div>
    </div>
  );
}
