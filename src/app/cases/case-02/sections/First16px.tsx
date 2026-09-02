"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// 05 сначала 16px — 1:1 из актуальной Figma (node 2009:12761, высота 1172).
// Заголовок 32px. Два абзаца слева (top 180 / 220). Итоговая мысль (Wix
// Madefor Display Regular) слева, top 853, с подчёркиванием.
//
// Иконка (Figma node 2009:12797, left 726 / top 318) — два слоя: чёрный
// контур финальной версии 600×600 (статичен) и голубая 16px-версия
// (узел 2383:21184). БЕЗ ПИНА: когда иконка доходит до точки на экране,
// один раз запускается реальная (не scrub) анимация — голубой слой растёт
// с 16×16 до 640×640, прозрачность падает со 100% до 80% (чёрный контур
// проступает). Раньше блок пинился и скрабился — на входе в пин всплывали
// артефакты, пользователь попросил убрать пин.
const A = "/cases/case-02/sections";

const BOX = { left: 726, top: 318 };
const BLUE_START = 16;
const BLUE_END = 640;
const OPACITY_START = 1;
const OPACITY_END = 0.8;

const SECTION_H = 1129;

export default function First16px() {
  const iconRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !iconRef.current || !blueRef.current) return;

      const tw = gsap.fromTo(
        blueRef.current,
        { width: BLUE_START, height: BLUE_START, opacity: OPACITY_START },
        {
          width: BLUE_END,
          height: BLUE_END,
          opacity: OPACITY_END,
          duration: 1.3,
          ease: "power2.inOut",
          immediateRender: false,
          scrollTrigger: { trigger: iconRef.current, start: "top 72%", once: true },
        },
      );

      return () => {
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    },
    { dependencies: [reduced] },
  );

  return (
    <section className="relative w-full bg-[#fafafa]" style={{ height: SECTION_H }}>
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

        {/* Иконка: чёрный контур 600×600 (статичен) + голубая версия
            (16→640, анимируется один раз при входе в кадр). */}
        <div ref={iconRef} className="absolute size-[640px]" style={{ left: BOX.left, top: BOX.top }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute left-0 top-0 size-[600px] max-w-none"
            src={`${A}/icon16-black.svg`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={blueRef}
            alt="Иконка Key Management Service в размере 16px, увеличенная до 640px"
            className="absolute left-0 top-0 max-w-none"
            src={`${A}/icon16-blue.svg`}
            style={{
              width: reduced ? BLUE_END : BLUE_START,
              height: reduced ? BLUE_END : BLUE_START,
              opacity: reduced ? OPACITY_END : OPACITY_START,
            }}
          />
        </div>

        {/* Доодл-«стрелки» (Figma node 2383:21170 → центр ~551 / 725; экспорт
            140×139, bbox из метаданных занижен — центрируем на позиции узла). */}
        <Reveal variant="doodle" className="absolute left-[481px] top-[655px] h-[139px] w-[140px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/icon16-doodle.svg`} />
        </Reveal>

        {/* Подчёркивание под итоговой мыслью (Figma node 2383:21156) —
            строго ПОД последней строкой, текст не перекрывает. */}
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
    </section>
  );
}
