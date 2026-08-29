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
  "различные пропорции",
  "неодинаковую толщину линий",
  "разные радиусы скруглений",
  "различия в принципах построения",
  "разный визуальный вес иконок",
  "дубли одинаковых иконок",
  "отсутствие необходимых размеров",
  "отсутствие outline- или filled-вариантов",
];

function ProblemContent() {
  return (
    <>
      {/* Заголовок — крупный дисплейный (Figma node 1964:41878, 175px,
          leading-none, top 152). */}
      <div className="absolute left-[46px] top-[152px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold leading-none tracking-[5.25px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-white">ПРОБЛЕМА</p>
      </div>

      {/* Вводный абзац (Figma node 2359:4421). */}
      <p className="absolute left-[46px] top-[455.52px] w-[309.664px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        К началу проекта внутри Яндекса одновременно существовали две библиотеки иконок:
      </p>

      {/* ICONS SYMBOLS / ICONS REGULAR — подписи-блоки (Figma node 2381:20941). */}
      <div className="absolute left-[46px] top-[592.52px] w-[333.648px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
        <div className="flex flex-col gap-[6px]">
          <div className="flex flex-col">
            <p>ICONS</p>
            <p className="font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">Symbols</p>
          </div>
          <p className="opacity-70">более старая библиотека.</p>
        </div>
        <div className="mt-[24px] flex flex-col gap-[6px]">
          <div className="flex flex-col">
            <p>ICONS</p>
            <p className="font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">Regular</p>
          </div>
          <p className="opacity-70">новая библиотека, которая постепенно развивалась вместе с продуктами.</p>
        </div>
      </div>

      <p className="absolute left-[556px] top-[429px] w-[329px] text-[12px] leading-[1.2] tracking-[0.24px] text-white opacity-70">
        ICONS SYMBOLS
      </p>
      <p className="absolute left-[896px] top-[429px] w-[329px] text-[12px] leading-[1.2] tracking-[0.24px] text-white opacity-70">
        ICONS REGULAR
      </p>

      <div className="absolute left-[556px] top-[455.52px] flex items-center gap-[12px]">
        <div className="prob-board relative size-[328px] bg-white">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-union.svg" />
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-tmp.svg" />
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <img alt="" className="size-[328px]" src="/cases/case-01/sections/problem-train.svg" />
          </div>
        </div>
        <div className="prob-board relative size-[328px] bg-white">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-union2.svg" />
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-tmp2.svg" />
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <img alt="" className="size-[328px]" src="/cases/case-01/sections/problem-railway.svg" />
          </div>
        </div>
      </div>

      {/* Доодл-«звезда» справа сверху (Figma node 2359:4422 → 1210 / 376.70). */}
      <div className="prob-doodle absolute left-[1210px] top-[376.7px] flex h-[191.363px] w-[200.725px] items-center justify-center">
        <img alt="" className="h-[125px] w-[158px] max-w-none" src="/cases/case-01/sections/problem-star-doodle.svg" />
      </div>

      {/* Стрелка-доодл под правой колонкой (Figma node 2284:39939 → 884 / 756.18). */}
      <div className="prob-doodle absolute left-[884px] top-[756.18px] flex h-[112.796px] w-[389.623px] items-center justify-center">
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
      <div className="absolute left-[46px] top-[181px] flex w-[337.139px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        <p>
          Новые иконки появлялись под конкретные задачи и ближайшие релизы. Такой подход помогал
          быстро закрывать потребности отдельных команд, но со временем привёл к техническому долгу.
        </p>
        <p className="w-[328px]">
          На одном экране могли одновременно использоваться иконки из разных библиотек, из-за чего
          интерфейс терял визуальную целостность.
        </p>
      </div>

      <div className="absolute left-[47px] top-[510px] flex w-[327px] flex-col gap-[12px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.42px] text-white">
          МЫ ОБНАРУЖИЛИ:
        </p>
        <ul className="flex flex-col gap-[6px]">
          {BULLETS.map((item) => (
            <li key={item} className="scr-bullet flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
              <Dot />
              <span className="opacity-70">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="scr-doodle absolute left-[353px] top-[623px] h-[125px] w-[158px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/doodle-hooks.svg`} />
      </div>

      {/* Телефон + аннотация — два слоя, тот же холст, друг на друге
          (Figma node 1965:41937 → 517 / 162, 746×576). При появлении
          слайда 2: сначала мокап (scr-mock), затем аннотация с пунктиром/
          подписями раскрывается от центра к краям (scr-anno). */}
      <div className="absolute left-[517px] top-[162px] h-[576px] w-[746px]">
        <img alt="" className="scr-mock absolute inset-0 block size-full max-w-none" src={`${A}/screen-layer-1.svg`} />
        <img
          alt="Экран приложения с одновременным использованием иконок из Icons Regular и Icons Symbols"
          className="scr-anno absolute inset-0 block size-full max-w-none"
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

      // --- Слайд 1: появление досок + доодлов при входе блока в экран ---
      gsap.set(".prob-board", { opacity: 0, scale: 0.94 });
      gsap.set(".prob-doodle", { opacity: 0, scale: 0.86, rotate: -5 });
      const introST = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(".prob-board", { opacity: 1, scale: 1, duration: 0.55, ease: "siteEase", stagger: 0.1 });
          gsap.to(".prob-doodle", { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: "siteEase", stagger: 0.12, delay: 0.15 });
        },
      });

      // --- Слайд 2: заранее прячем внутренние элементы, чтобы проиграть
      //     последовательность при активации слайда ---
      gsap.set(".scr-bullet", { opacity: 0, x: -10 });
      gsap.set(".scr-mock", { opacity: 0, scale: 0.97 });
      gsap.set(".scr-anno", { clipPath: "inset(50% 50% 50% 50%)", opacity: 0 });
      gsap.set(".scr-doodle", { opacity: 0, scale: 0.86, rotate: -5 });
      let screenPlayed = false;
      function playScreenIn() {
        if (screenPlayed) return;
        screenPlayed = true;
        gsap
          .timeline({ defaults: { ease: "siteEase" } })
          .to(".scr-bullet", { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, clearProps: "opacity" })
          .to(".scr-mock", { opacity: 1, scale: 1, duration: 0.5 }, "-=0.1")
          .to(".scr-anno", { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.15")
          .to(".scr-doodle", { opacity: 1, scale: 1, rotate: 0, duration: 0.5 }, "-=0.3");
      }

      const state = { slide: 1 };
      function showSlide(slide: number) {
        if (state.slide === slide) return;
        state.slide = slide;
        gsap.to(problemRef.current, { opacity: slide === 1 ? 1 : 0, duration: 0.5, ease: "siteEase" });
        gsap.to(screenRef.current, { opacity: slide === 2 ? 1 : 0, duration: 0.5, ease: "siteEase" });
        gsap.to(bar1Ref.current, { opacity: slide === 1 ? 1 : 0.3, duration: 0.5, ease: "siteEase" });
        gsap.to(bar2Ref.current, { opacity: slide === 2 ? 1 : 0.3, duration: 0.5, ease: "siteEase" });
        if (slide === 2) playScreenIn();
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
        introST.kill();
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
