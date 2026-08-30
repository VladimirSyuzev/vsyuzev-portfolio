"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// 04 Принципы дизайна — в Figma это ОДИН раздел из двух слайдов
// (node 2022:14721 «1 из 2» и 2022:14758 «2 из 2») с общим прогресс-
// индикатором. По просьбе — та же механика, что у «Проблема / Экран» в
// кейсе 1 (см. case-01/sections/ProblemScreen.tsx): тёмный фон растянут
// на весь экран (full-bleed), блок закреплён (pin), контент слайдов
// кроссфейдится на одном месте по скроллу, прогресс-индикатор
// переключается вместе с контентом. Порог 0.5 + обычный (не scrubbed)
// gsap.to() при пересечении — чтобы не было «заморозки» кроссфейда.
const A = "/cases/case-03/sections";

function Slide1() {
  return (
    <div className="relative h-[900px] w-[1440px]">
      {/* Прогресс-индикатор 1 из 2 (у слайда 2 он запечён в principles2.jpg,
          так что при кроссфейде слоёв индикатор переключается сам). */}
      <div className="absolute left-[46px] top-[852px] flex gap-[12px]">
        <div className="h-[2px] w-[44.833px] bg-white" />
        <div className="h-[2px] w-[44.833px] bg-white opacity-30" />
      </div>

      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">04</p>
        <p className="text-white">Принципы дизайна</p>
      </div>

      <div className="absolute left-[46px] top-[181px] flex w-[498px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
        <p className="opacity-70">
          В основе визуального языка лежат простые округлые формы, реалистичные материалы и
          ограниченная фирменная палитра.
          <br />
          Во всех сценах использовались пластик, стекло и металл, а также единая схема освещения.
        </p>
        <p className="w-[494px] opacity-70">
          Приоритетом была не максимальная реалистичность, а ясность формы и быстрое считывание
          смысла композиции.
        </p>
      </div>

      {/* Доодл «//» (Figma node 2284:39895 → 802 / 324). */}
      <Reveal variant="doodle" className="absolute left-[802px] top-[324px] h-[125px] w-[158px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/principles1-doodle.svg`} />
      </Reveal>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="3D-сферы из разных материалов: пластик, стекло, металл"
        className="absolute left-[104.88px] top-[318px] h-[532.984px] w-[1231.019px] max-w-none"
        src={`${A}/principles1-spheres.jpg`}
      />
    </div>
  );
}

export default function PrinciplesSlides() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !pinRef.current || !wrapRef.current) return;

      const state = { slide: 1 };
      function showSlide(slide: number) {
        if (state.slide === slide) return;
        state.slide = slide;
        gsap.to(slide1Ref.current, { opacity: slide === 1 ? 1 : 0, duration: 0.5, ease: "siteEase" });
        gsap.to(slide2Ref.current, { opacity: slide === 2 ? 1 : 0, duration: 0.5, ease: "siteEase" });
      }

      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
        onRefresh: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
      });

      return () => st.kill();
    },
    { scope: wrapRef, dependencies: [reduced] }
  );

  // «Уменьшить анимацию» — два блока подряд обычным потоком.
  if (reduced) {
    return (
      <>
        <section className="relative w-full overflow-clip bg-[#121212]">
          <div className="relative mx-auto flex h-[900px] w-full items-center justify-center">
            <Slide1 />
            <div className="absolute left-1/2 top-[852px] flex w-[1440px] -translate-x-1/2 justify-start gap-[12px] pl-[46px]">
              <div className="h-[2px] w-[44.833px] bg-white" />
              <div className="h-[2px] w-[44.833px] bg-white opacity-30" />
            </div>
          </div>
        </section>
        <div className="w-full bg-[#121212]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Материалы добавляли характер, сохраняя простоту и ясность формы — 3D-иллюстрации"
            className="block w-full"
            src={`${A}/principles2.jpg`}
          />
        </div>
      </>
    );
  }

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: "200vh" }}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-[#121212]">
        {/* Слайд 1 — тёмный, в центрированной 1440-сетке. */}
        <div ref={slide1Ref} className="absolute inset-0 flex items-center justify-center">
          <Slide1 />
        </div>

        {/* Слайд 2 — сплит тёмная/светлая, на весь экран (индикатор 2/2
            запечён в изображении). */}
        <div ref={slide2Ref} className="absolute inset-0" style={{ opacity: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Материалы добавляли характер, сохраняя простоту и ясность формы — 3D-иллюстрации"
            className="block size-full object-cover"
            src={`${A}/principles2.jpg`}
          />
        </div>
      </div>
    </div>
  );
}
