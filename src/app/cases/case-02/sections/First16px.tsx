"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// 05 сначала 16px — 1:1 из актуальной Figma (node 2009:12761). Заголовок
// 32px, два абзаца слева, итоговая мысль с подчёркиванием.
//
// Иконка (Figma node 2009:12797, left 726 / top 318, 640×640) — два слоя:
// чёрный контур финальной версии 600×600 (статичен) и голубая 16px-версия,
// которая растёт с 16 до 640.
//
// Анимация (ТЗ пользователя):
//  1) блок доходит до якорной точки (top top) и закрепляется;
//  2) дальше прокрутка «тратится» на рост иконки (scrub), 16 → 640,
//     прозрачность 100 → 80 %;
//  3) конечное состояние ЛАТЧИТСЯ — при скролле назад иконка не
//     уменьшается, состояние держится до перезагрузки страницы;
//  4) после этого пин отпускает, страница скроллится дальше.
//
// Тайминг по Эмилю Ковальски: это редкая «витринная» анимация (один раз
// за загрузку) — можно делать медленно и деликатно. Рост — движение на
// экране → ease-in-out (easeInOutCubic, сильнее CSS-кривой). Растянут на
// ~1000px прокрутки, чтобы читался как осознанный жест, а не рывок.
// Рост — через transform:scale() (GPU, без ре-растеризации SVG).
const A = "/cases/case-02/sections";

const BOX = { left: 726, top: 318 };
const RENDER_SIZE = 640;
const SCALE_START = 16 / RENDER_SIZE;
const OPACITY_START = 1;
const OPACITY_END = 0.8;

const SECTION_H = 1200;
const SCRUB_PX = 1000; // прокрутка на анимацию роста (больше = медленнее)

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// easeInOutCubic — сильнее встроенной ease-in-out
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function First16px() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLImageElement>(null);
  const latch = useRef(0);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !wrapRef.current || !pinRef.current) return;

      const render = (p: number) => {
        const el = blueRef.current;
        if (!el) return;
        const e = easeInOut(p);
        el.style.transform = `scale(${lerp(SCALE_START, 1, e)})`;
        el.style.opacity = `${lerp(OPACITY_START, OPACITY_END, e)}`;
      };
      render(0);

      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: () => `+=${SCRUB_PX}`,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          latch.current = Math.max(latch.current, self.progress);
          render(latch.current);
        },
        onRefresh: (self) => {
          latch.current = Math.max(latch.current, self.progress);
          render(latch.current);
        },
      });

      return () => st.kill();
    },
    { scope: wrapRef, dependencies: [reduced] },
  );

  const content = (
    <div className="relative mx-auto w-[1440px]" style={{ height: SECTION_H }}>
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">05</p>
        <p className="text-[#121212]">сначала 16px</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        Каждая иконка создавалась в двух размерах: 16 × 16 px и 640 × 640 px. Работу всегда начинали
        с маленькой версии.
      </p>
      <p className="absolute left-[46px] top-[221px] w-[505px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        После её утверждения создавали большую. Это было не простое масштабирование: менялись
        пропорции, толщина линий и радиусы скруглений, появлялись дополнительные детали. Большая
        версия становилась самостоятельной иллюстрацией, сохраняя характер маленькой.
      </p>

      {/* Иконка: чёрный контур 600×600 (статичен) + голубая версия 640×640
          (рост через transform:scale, origin top-left — совпадает с углом
          чёрного контура). */}
      <div className="absolute size-[640px]" style={{ left: BOX.left, top: BOX.top }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute left-0 top-0 size-[600px] max-w-none"
          src={`${A}/icon16-black.svg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={blueRef}
          alt="Иконка Key Management Service в размере 16×16, увеличенная до 640×640"
          className="absolute left-0 top-0 size-[640px] max-w-none will-change-transform"
          src={`${A}/icon16-blue.svg`}
          draggable={false}
          style={{
            transformOrigin: "top left",
            transform: `scale(${reduced ? 1 : SCALE_START})`,
            opacity: reduced ? OPACITY_END : OPACITY_START,
          }}
        />
      </div>

      {/* Доодл-«стрелки» (Figma node 2383:21170). */}
      <Reveal variant="doodle" className="absolute left-[481px] top-[655px] h-[139px] w-[140px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/icon16-doodle.svg`} />
      </Reveal>

      {/* Подчёркивание под итоговой мыслью (Figma node 2383:21156). */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute"
        style={{ left: 161, top: 972, width: 518, height: 33 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full" src={`${A}/icon16-underline.svg`} />
      </Reveal>

      <p className="absolute left-[46px] top-[853px] w-[589px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Маленький размер
        <br />
        проверял главное: силуэт, композицию и читаемость.
      </p>
    </div>
  );

  if (reduced) {
    return (
      <section className="relative w-full bg-[#fafafa]" style={{ height: SECTION_H }}>
        {content}
      </section>
    );
  }

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: SECTION_H + SCRUB_PX }}>
      <div ref={pinRef} className="relative w-full bg-[#fafafa]" style={{ height: SECTION_H }}>
        {content}
      </div>
    </div>
  );
}
