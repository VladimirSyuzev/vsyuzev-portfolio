"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// 05 сначала 16px — 1:1 из актуальной Figma (node 2009:12761, высота 1172).
// Заголовок 32px. Два абзаца слева (top 180 / 220). Итоговая мысль (Wix
// Madefor Display Regular) слева, top 853, с подчёркиванием.
//
// Иконка (Figma node 2009:12797 «Edit Key Management Service 640x640»,
// left 726 / top 318) — два слоя: чёрный контур финальной версии 600×600
// (статичен) и голубая 16px-версия (узел 2383:21184). Скролл-анимация по
// образцу «02 Задача» кейса 1 (Task.tsx): блок доходит до якорной точки
// (top top), пинится, и пока идёт scrub — голубой слой растёт с 16×16 до
// 640×640, а прозрачность падает со 100% до 80% (чёрный контур начинает
// просвечивать). После анимации пин отпускает, скролл продолжается.
const A = "/cases/case-02/sections";

const BOX = { left: 726, top: 318 };
const BLUE_START = 16;
const BLUE_END = 640;
const OPACITY_START = 1;
const OPACITY_END = 0.8;

const SECTION_H = 1172;
const SCRUB_PX = 700;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function First16px() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !wrapRef.current || !pinRef.current) return;

      function render(t: number) {
        const size = lerp(BLUE_START, BLUE_END, t);
        if (blueRef.current) {
          blueRef.current.style.width = `${size}px`;
          blueRef.current.style.height = `${size}px`;
          blueRef.current.style.opacity = `${lerp(OPACITY_START, OPACITY_END, t)}`;
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

      return () => st.kill();
    },
    { scope: wrapRef, dependencies: [reduced] }
  );

  const content = (endState: boolean) => (
    <>
      <div className="absolute left-[46px] top-[133px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">05</p>
        <p className="text-[#121212]">сначала 16px</p>
      </div>

      <p className="absolute left-[46px] top-[180px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        Каждая иконка создавалась в двух размерах: 16 × 16 px и 640 × 640 px. Работу всегда начинали
        с маленькой версии.
      </p>
      <p className="absolute left-[46px] top-[220px] w-[505px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        После её утверждения создавали большую. Это было не простое масштабирование: менялись
        пропорции, толщина линий и радиусы скруглений, появлялись дополнительные детали. Большая
        версия становилась самостоятельной иллюстрацией, сохраняя характер маленькой.
      </p>

      {/* Иконка: чёрный контур 600×600 (статичен) + голубая версия. */}
      <div className="absolute size-[640px]" style={{ left: BOX.left, top: BOX.top }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute left-0 top-0 size-[600px] max-w-none"
          src={`${A}/icon16-black.svg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={endState ? undefined : blueRef}
          alt="Иконка Key Management Service в размере 16px, увеличенная до 640px"
          className="absolute left-0 top-0 max-w-none"
          src={`${A}/icon16-blue.svg`}
          style={{
            width: endState ? BLUE_END : BLUE_START,
            height: endState ? BLUE_END : BLUE_START,
            opacity: endState ? OPACITY_END : OPACITY_START,
          }}
        />
      </div>

      {/* Доодл (Figma node 2383:21170 → 458.3 / 323.32). */}
      <Reveal variant="doodle" className="absolute left-[458.301px] top-[323.32px] h-[139px] w-[140px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/icon16-doodle.svg`} />
      </Reveal>

      {/* Подчёркивание под итоговой мыслью (Figma node 2383:21156 → 156 / 964.37). */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute"
        style={{ left: 156, top: 964.367, width: 524, height: 33 }}
      >
        <img alt="" className="block size-full" src={`${A}/icon16-underline.svg`} />
      </Reveal>

      <p className="absolute left-[46px] top-[853px] w-[589px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Маленький размер
        <br />
        проверял главное: силуэт, композицию и читаемость.
      </p>
    </>
  );

  if (reduced) {
    return (
      <section className="relative w-full bg-[#fafafa]" style={{ height: SECTION_H }}>
        <div className="relative mx-auto w-[1440px]" style={{ height: SECTION_H }}>
          {content(true)}
        </div>
      </section>
    );
  }

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: SECTION_H + SCRUB_PX }}>
      <div
        ref={pinRef}
        className="relative flex w-full items-start justify-center overflow-hidden bg-[#fafafa]"
        style={{ height: SECTION_H }}
      >
        <div className="relative w-[1440px]" style={{ height: SECTION_H }}>
          {content(false)}
        </div>
      </div>
    </div>
  );
}
