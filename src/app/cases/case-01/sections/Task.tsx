"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";

// 02 Задача — 1:1 из Figma (node 1961:29100). Витрина категорий — "зум энд
// кроп": ОДНО изображение (state-2.svg) непрерывно масштабируется/сдвигается
// (см. комментарий у SCALE_START/OFFSET_Y_START — точный коэффициент найден
// сравнением координат одинаковых элементов в state-1.svg/state-2.svg).
//
// Пин — на ВЕСЬ блок целиком (заголовок+описание+витрина+доодл), как в "01
// Проблема", а НЕ только на витрину: якорная точка — момент, когда весь блок
// "Задача" естественно встал на экран (top top секции), а не когда сама
// картинка долистала до верха (раньше было так — из-за этого к моменту
// старта анимации заголовок с описанием уже уезжали за край экрана, что и
// было багом). Пока идёт scrub — ВЕСЬ блок неподвижен (ничего не уезжает
// наверх), меняется только окно/картинка внутри; после — пин отпускает и
// скролл продолжается обычным образом.
const A = "/cases/case-01/sections/task-assets";
const STATE2 = "/cases/case-01/sections/task-states/state-2.svg";
const NATIVE2 = { w: 1348, h: 703 };
const WINDOW_START = { w: 838, h: 525 };
const WINDOW_END = { w: 1348, h: 703 };
const SCALE_START = 3.77114;
const SCALE_END = 1;
const OFFSET_Y_START = -57.2148;
const OFFSET_Y_END = 0;

const SECTION_H = 1196; // полная высота блока (заголовок..доодл), как в Figma
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

  useGSAP(
    () => {
      if (reduced || !wrapRef.current || !pinRef.current) return;

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

      // Доодл-«молния» — появление при входе блока в экран (до пина).
      gsap.set(".task-doodle", { opacity: 0, scale: 0.86, rotate: -6 });
      const doodleST = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top 72%",
        once: true,
        onEnter: () =>
          gsap.to(".task-doodle", { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: "siteEase" }),
      });

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
        doodleST.kill();
      };
    },
    { scope: wrapRef, dependencies: [reduced] }
  );

  const content = (
    <>
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">02</p>
        <p className="text-[#121212]">ЗАДАЧА</p>
      </div>
      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Перед нами стояла задача провести аудит библиотеки, устранить несоответствия и создать
        основу для дальнейшего масштабирования единой системы.
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

      <div className="task-doodle absolute left-[692.95px] top-[1041px] h-[120.909px] w-[92.566px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={`${A}/doodle-flash.svg`} className="block size-full max-w-none" />
      </div>
    </>
  );

  // При "уменьшить анимацию" — без pin/scroll-jack, сразу конечное
  // состояние (все 7 категорий), обычный поток, обычная вёрстка секции.
  if (reduced) {
    return (
      <section className="relative w-full bg-[#fafafa]" style={{ height: SECTION_H }}>
        <div className="relative mx-auto w-[1440px]" style={{ height: SECTION_H }}>
          <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
            <p className="text-[#008cff]">02</p>
            <p className="text-[#121212]">ЗАДАЧА</p>
          </div>
          <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
            Перед нами стояла задача провести аудит библиотеки, устранить несоответствия и создать
            основу для дальнейшего масштабирования единой системы.
          </p>
          <div className="absolute left-[46px] top-[318px] overflow-hidden" style={{ width: WINDOW_END.w, height: WINDOW_END.h }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Витрина категорий иконок: аудит библиотеки" src={STATE2} className="block" style={{ width: NATIVE2.w, height: NATIVE2.h }} />
          </div>
          <div className="absolute left-[692.95px] top-[1041px] h-[120.909px] w-[92.566px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={`${A}/doodle-flash.svg`} className="block size-full max-w-none" />
          </div>
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
