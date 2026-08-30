"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// 04 Принципы дизайна — в Figma ОДИН раздел из двух слайдов (node
// 2022:14721 «1 из 2» и 2022:14758 «2 из 2»). Механика как у «Проблема /
// Экран» в кейсе 1: тёмный фон растянут на весь экран (full-bleed), блок
// закреплён (pin), контент кроссфейдится на одном месте по скроллу,
// прогресс-индикатор переключается. ScrollTrigger.snap([0,1]) —
// переключение слайдов происходит за одно движение колеса.
//
// Слайд 1 — 7 отдельных PNG-сфер (прозрачные, node 2022:14745), лежат на
// тёмном фоне без подложки. Слайд 2 — сплит: ФОН (две половины) тянется на
// весь экран, а содержимое (3D-объекты, текст, подчёркивание, индикатор)
// остаётся в центрированной 1440-сетке в родном размере.
const A = "/cases/case-03/sections";

// Сферы: [файл, left, top, size] в координатах фрейма 2022:14745
// (сам фрейм — 104.88 / 318). Порядок = порядок наложения в Figma.
const SPHERES: [string, number, number, number][] = [
  ["s5", 1.45, 195.66, 141.814],
  ["s6", 23.51, 149.79, 234.785],
  ["s1", 116.48, 85.83, 360.003],
  ["s2", 306.86, -42.08, 617.147],
  ["s7", 972.58, 149.79, 234.785],
  ["s3", 754.39, 85.83, 360.003],
  ["s4", 1088.69, 195.66, 141.814],
];

function Slide1() {
  return (
    <div className="relative h-[900px] w-[1440px]">
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

      {/* 7 отдельных сфер (node 2022:14745) — прозрачные PNG. */}
      <div className="absolute left-[104.88px] top-[318px] h-[533px] w-[1231px]">
        {SPHERES.map(([name, left, top, size]) => (
          <div key={name} className="absolute overflow-hidden" style={{ left, top, width: size, height: size }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className={name === "s4" ? "absolute left-[-6.5%] top-[-4.9%] w-[113.16%] max-w-none" : "block size-full max-w-none"}
              src={`${A}/spheres/${name}.png`}
            />
          </div>
        ))}
      </div>

      {/* Доодл «//» (Figma node 2284:39895 → 802 / 324) — поверх сфер. */}
      <Reveal variant="doodle" className="absolute left-[802px] top-[324px] z-10 h-[125px] w-[158px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/principles1-doodle.svg`} />
      </Reveal>
    </div>
  );
}

function Slide2Content() {
  return (
    <div className="relative h-[900px] w-[1440px]">
      {/* 3D-стек монет — левая (тёмная) половина. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="3D-стек монет Stablegate с галочкой"
        className="absolute left-[53px] top-[230px] size-[524px] max-w-none"
        src={`${A}/pr2-coin.png`}
      />

      {/* Карта + замок + Face ID — правая (светлая) половина. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="3D-иллюстрация: карта Stablegate, замок и Face ID"
        className="absolute left-[818px] top-[185px] size-[524px] max-w-none"
        src={`${A}/pr2-lock.png`}
      />

      <p className="absolute left-[743px] top-[732px] w-[599px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Материалы добавляли характер, сохраняя простоту и ясность формы
      </p>

      {/* Подчёркивание (Figma node 2284:45800). */}
      <Reveal variant="line" start="top 80%" className="absolute left-[859px] top-[823px] h-[49px] w-[547px]">
        <div className="rotate-[1.76deg]">
          <img alt="" className="block size-full max-w-none" src={`${A}/pr2-underline.svg`} />
        </div>
      </Reveal>

      {/* Прогресс-индикатор 2 из 2. */}
      <div className="absolute left-[46px] top-[852px] flex gap-[12px]">
        <div className="h-[2px] w-[44.833px] bg-white opacity-30" />
        <div className="h-[2px] w-[44.833px] bg-white" />
      </div>
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
        gsap.to(slide1Ref.current, { opacity: slide === 1 ? 1 : 0, duration: 0.45, ease: "siteEase" });
        gsap.to(slide2Ref.current, { opacity: slide === 2 ? 1 : 0, duration: 0.45, ease: "siteEase" });
      }

      // Механика 1:1 как «Проблема / Экран» в кейсе 1 (ProblemScreen.tsx):
      // пин на одну высоту экрана, кроссфейд слайдов на пороге 0.5 —
      // одно движение колеса переключает слайд, ещё одно отпускает пин.
      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight,
        pin: pinRef.current,
        pinSpacing: true,
        onUpdate: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
        onRefresh: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
      });

      return () => st.kill();
    },
    { scope: wrapRef, dependencies: [reduced] }
  );

  // Фон слайда 2 — сплит тёмная/светлая половины с мягким синим свечением,
  // тянется на весь экран (содержимое поверх остаётся в 1440-сетке).
  const bgLayer = (
    <>
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#01030a]"
        style={{ backgroundImage: "radial-gradient(60% 55% at 34% 42%, rgba(58,78,230,0.28), transparent 70%)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#f4f6fa]"
        style={{ backgroundImage: "radial-gradient(70% 60% at 58% 32%, rgba(120,140,255,0.16), transparent 72%)" }}
      />
    </>
  );

  if (reduced) {
    return (
      <>
        <section className="relative w-full overflow-clip bg-[#121212]">
          <div className="relative mx-auto flex h-[900px] w-full items-center justify-center">
            <Slide1 />
          </div>
        </section>
        <section className="relative w-full overflow-clip">
          <div className="relative h-[900px] w-full">
            {bgLayer}
            <div className="absolute inset-0 flex items-center justify-center">
              <Slide2Content />
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: "200vh" }}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-[#121212]">
        {/* Слайд 1 — тёмный, центрированная 1440-сетка. */}
        <div ref={slide1Ref} className="absolute inset-0 flex items-center justify-center">
          <Slide1 />
        </div>

        {/* Слайд 2 — фон тянется на весь экран, контент в 1440-сетке. */}
        <div ref={slide2Ref} className="absolute inset-0" style={{ opacity: 0 }}>
          {bgLayer}
          <div className="absolute inset-0 flex items-center justify-center">
            <Slide2Content />
          </div>
        </div>
      </div>
    </div>
  );
}
