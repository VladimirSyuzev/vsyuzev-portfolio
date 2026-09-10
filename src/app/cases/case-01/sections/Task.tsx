"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import { useCanvasWide } from "@/lib/breakpoint";
import DrawIn from "@/components/DrawIn";

// 02 Задача — 1:1 из Figma (node 1961:29100). Витрина категорий — "зум энд
// кроп": ОДНО изображение (state-2.svg) непрерывно масштабируется/сдвигается
// (см. комментарий у SCALE_START/OFFSET_Y_START — точный коэффициент найден
// сравнением координат одинаковых элементов в state-1.svg/state-2.svg).
//
// Пин — на ВЕСЬ блок целиком (заголовок+описание+витрина+доодл), как в "01
// Проблема", а НЕ только на витрину. Пока идёт scrub — ВЕСЬ блок неподвижен,
// меняется только окно/картинка внутри; после — пин отпускает.
//
// Ниже 1440 (нет фикс-холста, см. RESPONSIVE.md) — пина нет: сразу конечное
// состояние (вся витрина), обычный поток в сетке.
const A = "/cases/case-01/sections/task-assets";
const R = "/cases/case-01/sections/reflow";
const STATE2 = "/cases/case-01/sections/task-states/state-2.svg";
const NATIVE2 = { w: 1348, h: 703 };
const WINDOW_START = { w: 838, h: 525 };
const WINDOW_END = { w: 1348, h: 703 };
const SCALE_START = 3.77114;
const SCALE_END = 1;
const OFFSET_Y_START = -57.2148;
const OFFSET_Y_END = 0;

const SECTION_H = 1196; // полная высота блока (заголовок..доодл), 1:1 из Figma (frame 1961:29100)
const SCRUB_PX = 640; // сколько px скролла отведено на саму анимацию, пока страница запинена

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Task() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();
  const wide = useCanvasWide();
  const animate = wide && !reduced;

  useGSAP(
    () => {
      if (!animate || !wrapRef.current || !pinRef.current) return;

      function render(t: number) {
        const w = lerp(WINDOW_START.w, WINDOW_END.w, t);
        const h = lerp(WINDOW_START.h, WINDOW_END.h, t);
        const scale = lerp(SCALE_START, SCALE_END, t);
        const offsetY = lerp(OFFSET_Y_START, OFFSET_Y_END, t);
        if (windowRef.current) {
          windowRef.current.style.width = `${w}px`;
          windowRef.current.style.height = `${h}px`;
        }
        if (imgRef.current) {
          imgRef.current.style.width = `${NATIVE2.w * scale}px`;
          imgRef.current.style.height = `${NATIVE2.h * scale}px`;
          imgRef.current.style.top = `${offsetY}px`;
        }
      }

      render(0);

      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: `+=${SCRUB_PX}`,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.4,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      });

      return () => {
        st.kill();
      };
    },
    { scope: wrapRef, dependencies: [animate] }
  );

  const content = (
    <>
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">02</p>
        <p className="text-[#121212]">ЗАДАЧА</p>
      </div>
      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
        Главной задачей было превратить две разрозненные библиотеки в единую масштабируемую систему
      </p>

      <div ref={windowRef} className="absolute left-[46px] top-[318px] overflow-hidden" style={{ width: WINDOW_START.w, height: WINDOW_START.h }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          alt="Витрина категорий иконок: аудит библиотеки"
          src={STATE2}
          className="absolute left-0 max-w-none"
          style={{ width: NATIVE2.w * SCALE_START, height: NATIVE2.h * SCALE_START, top: OFFSET_Y_START }}
        />
      </div>

      <DrawIn
        src={`${A}/doodle-flash.svg`}
        fit="contain"
        className="absolute left-[692.95px] top-[1045px] h-[120.909px] w-[92.566px]"
      />
    </>
  );

  // Ниже 1440 / reduced — без pin/scroll-jack. ЗАХОД 1: точные значения
  // 375 (Figma 2559:11090). 834/1280 — заходы 2/3.
  if (!animate) {
    return (
      // секция: 375 pad 64/20 gap 32 · 834 pad 72/28 gap 64 · 1280 pad 72/40
      <section className="relative w-full overflow-clip bg-[#fafafa] px-[20px] py-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px]">
        <div className="flex flex-col gap-[32px] sm:gap-[64px]">
          {/* Frame 2147231947/2147231931 — блок заголовка, vertical gap 12, UPPERCASE */}
          <div className="flex flex-col gap-[12px] uppercase">
            {/* h — flex-wrap baseline. 375: Wix Bold 26 / lh 110% / ls 0.8 / col-gap 10.
                834/1280: Wix Bold 32 / ls 0.96 / col-gap 12. */}
            <div className="flex flex-wrap items-baseline gap-x-[10px] whitespace-nowrap font-heading text-[26px] font-bold leading-[1.1] tracking-[0.8px] sm:gap-x-[12px] sm:text-[32px] sm:tracking-[0.96px]">
              <span className="text-[#008cff]">02</span>
              <span className="text-[#121212]">Задача</span>
            </div>
            {/* интро. 375: Inter Medium 14 / 130% / ls 0.2, w335.
                834: Aeonik Medium 14 / 120% / ls 0.28, w382. 1280: w498 (Figma 2533:8975).
                Точки разрыва одинаковы (после «превратить» и «библиотеки»). */}
            <p className="w-[335px] max-w-full font-inter text-[14px] font-medium leading-[1.3] tracking-[0.2px] text-[#121212] sm:w-[382px] sm:font-body sm:leading-[1.2] sm:tracking-[0.28px] lg:w-[498px]">
              Главной задачей было превратить{" "}
              <br />
              две разрозненные библиотеки{" "}
              <br />в единую масштабируемую систему
            </p>
          </div>

          {/* Section — витрина категорий, готовый SVG из макета.
              375: task-section-375.svg 335×466. 834: task-section-834.svg 778×407. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Витрина категорий иконок: аудит библиотеки"
            src={`${R}/task-section-375.svg`}
            className="block w-[335px] max-w-full sm:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            aria-hidden
            alt=""
            src={`${R}/task-section-834.svg`}
            className="hidden w-[778px] max-w-full sm:block lg:w-[1200px]"
          />
        </div>

        {/* ДУДЛ-молния Vector 234257381 — только ≥640 (макет 2547:21097).
            834: AABB 93×121 @ x368 y601 в секции 712 → низ обрезан ~10px (bottom −10).
            1280: AABB 93×121 @ x594 y831 в секции 962 → bottom 10, не обрезается.
            Наклон +14° (rotation −14.02 в Figma = по часовой). */}
        <div className="pointer-events-none hidden sm:absolute sm:-bottom-[10px] sm:left-[366px] sm:flex sm:h-[121px] sm:w-[93px] sm:items-center sm:justify-center lg:bottom-[10px] lg:left-[594px]">
          <DrawIn
            src={`${R}/task-doodle-834.svg`}
            fit="contain"
            className="h-[91px] w-[69px] rotate-[14deg]"
          />
        </div>
      </section>
    );
  }

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: SECTION_H + SCRUB_PX }}>
      <div ref={pinRef} className="relative flex w-full items-start justify-center overflow-hidden bg-[#fafafa]" style={{ height: SECTION_H }}>
        <div className="relative w-[1440px]" style={{ height: SECTION_H }}>
          {content}
        </div>
      </div>
    </div>
  );
}
