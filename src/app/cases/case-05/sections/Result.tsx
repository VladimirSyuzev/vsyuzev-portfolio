"use client";

import { useRef, useState } from "react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import VariantsCarousel from "@/components/VariantsCarousel";

// 06 Финальный результат — 1:1 из актуальной Figma (node 2210:78310,
// высота 1265). Заголовок «06 / ФИНАЛЬНЫЙ РЕЗУЛЬТАТ» и два абзаца слева,
// доодл-«звёздочка» справа, крупная мысль в обводке по центру.
//
// Ряд «варианты» (Figma frame 2440:56862) — общий VariantsCarousel:
// снап-карусель во всю ширину, перетаскивание вбок, бар снизу.
// Звёздочка «пульсирует» на каждом переключении карточки.
const A = "/cases/case-05/sections";

const CARDS = [
  { src: `${A}/result-var-1.png`, w: 1265, h: 798, alt: "Готовая карта Mad Max DeLorean" },
  { src: `${A}/result-var-2.png`, w: 1270, h: 798, alt: "Карта в интерьере проекта" },
  { src: `${A}/result-var-3.png`, w: 1271, h: 798, alt: "Карта среди других карт коллекции" },
  { src: `${A}/result-var-4.png`, w: 1267, h: 798, alt: "Фрагмент финальной иллюстрации" },
];

export default function Result() {
  const starRef = useRef<HTMLDivElement>(null);
  const starFirst = useRef(true);
  const reduced = useReducedMotion();
  const [, setIdx] = useState(0);

  // Пульс звёздочки при каждом переключении карточки.
  const onIndexChange = (i: number) => {
    setIdx(i);
    if (starFirst.current) {
      starFirst.current = false;
      return;
    }
    if (reduced || !starRef.current) return;
    gsap.fromTo(
      starRef.current,
      { scale: 1, rotate: 0 },
      {
        scale: 1.22,
        rotate: -4,
        duration: 0.16,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        transformOrigin: "50% 50%",
        onComplete: () => gsap.set(starRef.current, { clearProps: "scale,rotate" }),
      },
    );
  };

  return (
    <div className="relative h-[1265px] w-full overflow-x-clip bg-[#fafafa]">
      <div className="relative mx-auto h-full w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[16px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">06</p>
          <p className="text-[#121212]">Финальный результат</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Вместо очередной интерпретации машины времени появился новый образ культового автомобиля.
        </p>
        <p className="absolute left-[46px] top-[221px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          DeLorean сохранил узнаваемый силуэт, но оказался в другой реальности — мире, где главной
          ценностью становится не возможность путешествовать во времени, а способность выжить и
          продолжать движение вперёд.
        </p>

        {/* Доодл-«звёздочка» (Figma node 2284:39991 → x1009 / y270, 158×125). */}
        <Reveal variant="doodle" className="absolute left-[1009px] top-[270px] z-10 h-[125px] w-[158px]">
          <div ref={starRef} className="size-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src={`${A}/result-star.svg`} />
          </div>
        </Reveal>

        {/* Обводка-эллипс вокруг мысли (Figma node 2412:4342). */}
        <Reveal variant="line" start="top 86%" className="absolute left-[385px] top-[873px] h-[254px] w-[670px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/result-ellipse.svg`} />
        </Reveal>
        {/* Мысль (Figma node 2412:4341 → x386 / y955.7, w668, по центру). */}
        <p className="absolute left-1/2 top-[956px] w-[668px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
          Узнаваемый автомобиль получил историю, которую раньше с ним не связывали
        </p>
      </div>

      {/* Снап-карусель «варианты» (Figma frame 2440:56862 → y386). */}
      <VariantsCarousel cards={CARDS} top={386} tone="light" onIndexChange={onIndexChange} />
    </div>
  );
}
