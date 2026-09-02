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
// тёмном фоне без подложки. Слайд 2 — сплит на ДВЕ половины 50/50 (как фон,
// так и содержимое): 3D-стек монет по центру левой (тёмной) половины,
// карта+замок по центру правой (светлой), текст и подчёркивание —
// относительно левого края правой половины; прогресс-индикатор жмётся к
// левому краю экрана. Объекты — в родном размере (524px), не масштабируются.
const A = "/cases/case-03/sections";

// Сферы: [файл, left, top, size] в координатах фрейма 2022:14745
// (сам фрейм — 104.88 / 318). Порядок массива = порядок наложения в Figma
// (children фрейма 2022:14745, сверху вниз = снизу вверх по стопке):
// material 5, 6, 1, 2, 4, 7, 3 — т.е. крайняя правая маленькая сфера (s4)
// лежит ПОД синим кругом (s7) и большой светлой (s3).
const SPHERES: [string, number, number, number][] = [
  ["s5", 1.45, 195.66, 141.814],
  ["s6", 23.51, 149.79, 234.785],
  ["s1", 116.48, 85.83, 360.003],
  ["s2", 306.86, -42.08, 617.147],
  ["s4", 1088.69, 195.66, 141.814],
  ["s7", 972.58, 149.79, 234.785],
  ["s3", 754.39, 85.83, 360.003],
];

function Slide1() {
  return (
    <div className="relative h-[900px] w-full">
      {/* Заголовок, текст, сферы и доодл — в центрированной 1440-сетке. */}
      <div className="relative mx-auto h-full w-[1440px]">
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
            <div key={name} className="absolute" style={{ left, top, width: size, height: size }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={`${A}/spheres/${name}.png`} />
            </div>
          ))}
        </div>

        {/* Доодл «//» (Figma node 2284:39895 → 802 / 324) — поверх сфер. */}
        <Reveal variant="doodle" className="absolute left-[802px] top-[324px] z-10 h-[125px] w-[158px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/principles1-doodle.svg`} />
        </Reveal>
      </div>

      {/* Прогресс-индикатор 1 из 2 — у левого края экрана. */}
      <div className="absolute left-[46px] top-[852px] flex gap-[12px]">
        <div className="h-[2px] w-[44.833px] bg-white" />
        <div className="h-[2px] w-[44.833px] bg-white opacity-30" />
      </div>
    </div>
  );
}

function Slide2Content() {
  return (
    <div className="relative h-[900px] w-full">
      {/* Левая (тёмная) половина — 3D-стек монет по центру. */}
      <div className="absolute inset-y-0 left-0 w-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="3D-стек монет Stablegate с галочкой"
          className="absolute left-1/2 top-1/2 size-[524px] max-w-none -translate-x-1/2 -translate-y-1/2"
          src={`${A}/pr2-coin.png`}
        />
      </div>

      {/* Правая (светлая) половина — карта+замок по центру, текст и
          подчёркивание относительно её левого края. */}
      <div className="absolute inset-y-0 right-0 w-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="3D-иллюстрация: карта Stablegate, замок и Face ID"
          className="absolute left-1/2 top-[calc(50%-2.5px)] size-[524px] max-w-none -translate-x-1/2 -translate-y-1/2"
          src={`${A}/pr2-lock.png`}
        />

        <p className="absolute left-[44px] top-[728px] w-[599px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
          Материалы добавляли характер, сохраняя простоту и ясность формы
        </p>

        {/* Подчёркивание (Figma node 2284:45800) — 468×35, наклон 1.76°. */}
        <Reveal variant="line" start="top 80%" className="absolute left-[214px] top-[832px] h-[35px] w-[468px]">
          <div className="rotate-[1.76deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src={`${A}/pr2-underline.svg`} />
          </div>
        </Reveal>
      </div>

      {/* Прогресс-индикатор 2 из 2 — у левого края экрана. */}
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

      // Механика как «Проблема / Экран» в кейсе 1 (ProblemScreen.tsx), но
      // пин КОРОЧЕ — 0.55 экрана вместо целого. Так после кроссфейда на
      // пороге 0.5 слайд 2 почти сразу отпускает пин и снизу наезжает
      // «Процесс»: нет длинной «мёртвой» зоны, где висит статичный светлый
      // слайд 2 (переключение блоков ощущается как один скролл).
      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: () => "+=" + Math.round(window.innerHeight * 0.55),
        pin: pinRef.current,
        pinSpacing: true,
        onUpdate: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
        onRefresh: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
      });

      return () => st.kill();
    },
    { scope: wrapRef, dependencies: [reduced] }
  );

  // Фон слайда 2 — сплит тёмная/светлая половины, тянется на весь экран
  // (содержимое поверх остаётся в 1440-сетке). Каждая половина — экспорт
  // соответствующего фрейма-фона из Figma (node 2022:14801 — тёмная,
  // node 2022:14760 — светлая): неоднородный градиент + размытые
  // блики + зерно, а не плоская CSS-заливка. Растягиваем на всю высоту
  // блока (object-cover), опорная точка — верх.
  const bgLayer = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden
        className="absolute inset-y-0 left-0 h-full w-1/2 object-cover object-top"
        src={`${A}/pr2-bg-left.jpg`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden
        className="absolute inset-y-0 right-0 h-full w-1/2 object-cover object-top"
        src={`${A}/pr2-bg-right.jpg`}
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
    <div ref={wrapRef} className="relative w-full" style={{ height: "155vh" }}>
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
