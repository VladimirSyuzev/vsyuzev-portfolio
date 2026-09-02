"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// «03 Key visual» — в Figma это ОДИН раздел из двух слайдов (node
// 2034:15752 «1 из 2» — метро-билборд; node 2094:18224 «2 из 2» — кропы с
// обводками). Механика 1:1 как «Проблема / Экран» в кейсе 1
// (ProblemScreen.tsx): тёмный фон растянут на весь экран (full-bleed),
// блок закреплён (pin), контент слайдов кроссфейдится на одном месте за
// ОДНО движение колеса, прогресс-индикатор переключается вместе с
// контентом. onRefresh дублирует пороговую проверку onUpdate.
const A = "/cases/case-04/sections";

// Обводки-круги слайда 2 (Figma nodes 2288:4279 / 4283 / 4267). circle2/
// circle3 — bbox из метаданных достоверный. У circle1 (большой, вокруг
// пары) bbox завышен и смещён вправо-вверх («wavy-path artifact»): по
// сверке со скриншотом Figma реальный контур — 855/390, ~440×415 (почти
// натуральный viewBox 443×431, без растяжения; центр ≈ пара на фото).
// Анимируются по очереди, пока слайд 2 активен: пауза 2с → каждый
// проявляется и гаснет ~1с по очереди → пауза 4с → цикл.
const CIRCLES: [string, number, number, number, number][] = [
  ["circle2.svg", 99, 44, 260.62, 383.7],
  ["circle3.svg", 434.23, 204.92, 225.97, 225.27],
  ["circle1.svg", 855, 390, 440, 415],
];

function Slide1() {
  return (
    <>
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">03</p>
        <p className="text-white">KEY VISUAL</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        Первым сценарием стал дом, как один из самых сильных и понятных образов крупной покупки.
        Молодая пара стоит перед новым домом: мужчина показывает телефон, женщина держит ключи.
      </p>

      {/* Доодл-«глаз» (Figma node 2284:40104 → 1155 / 188, 157×110). */}
      <Reveal variant="doodle" className="kv-s1-doodle absolute left-[1155px] top-[188px] z-10 h-[110px] w-[157px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/eye.png`} />
      </Reveal>

      {/* Метро-билборд (Figma frame 2094:18197 → x46 / y318, 1348×536). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="KEY VISUAL Stablegate на билбордах в метро"
        className="absolute left-[46px] top-[318px] h-[536px] w-[1348px] object-cover"
        src={`${A}/kv1-subway.jpg`}
      />
    </>
  );
}

function Slide2() {
  return (
    <>
      {/* Кроп 1 — телефон (Figma frame 2094:18626 → x46 / y44, 328×399). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Крупный план: телефон Stablegate с завершённой покупкой"
        className="absolute left-[46px] top-[44px] h-[399px] w-[328px] object-cover"
        src={`${A}/crops-1.jpg`}
      />
      {/* Кроп 2 — ключи (Figma frame 2094:18627 → x386 / y181, 328×262). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Крупный план: женщина держит ключи от дома"
        className="absolute left-[386px] top-[181px] h-[262px] w-[328px] object-cover"
        src={`${A}/crops-2.jpg`}
      />

      <p className="absolute left-[726px] top-[181px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        В одном кадре соединяются crypto-актив, Stablegate и результат покупки. Зритель считывает
        простую последовательность: телефон → покупка → новая жизнь.
      </p>

      {/* Кроп 3 — пара (Figma frame 2094:18628 → x726 / y455, 668×399). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Пара перед новым домом с телефоном Stablegate"
        className="absolute left-[726px] top-[455px] h-[399px] w-[668px] object-cover"
        src={`${A}/crops-3.jpg`}
      />

      {/* Рукописные обводки-круги — анимируются по очереди (см. useGSAP). */}
      {CIRCLES.map(([src, left, top, w, h]) => (
        <div key={src} className="kv-circle absolute z-10" style={{ left, top, width: w, height: h }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/${src}`} />
        </div>
      ))}

      {/* Крупная мысль (Figma node 2399:35410 → x46 / y592, w485). */}
      <p className="absolute left-[46px] top-[592px] w-[485px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
        Crypto становится понятным, когда превращается
        <br />
        во что-то реальное
      </p>
      {/* Подчёркивание (Figma node 2399:35412 → x192 / y736, 275×29). */}
      <Reveal variant="line" start="top 92%" className="absolute left-[192px] top-[736px] h-[29px] w-[275px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/crops-underline.svg`} />
      </Reveal>
    </>
  );
}

function ProgressBars({
  bar1,
  bar2,
}: {
  bar1?: React.Ref<HTMLDivElement>;
  bar2?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div className="absolute left-[46px] top-[852px] z-20 flex gap-[12px]">
      <div ref={bar1} className="h-[2px] w-[44.833px] bg-white" />
      <div ref={bar2} className="h-[2px] w-[44.833px] bg-white opacity-30" />
    </div>
  );
}

export default function KeyVisualSlides() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !pinRef.current || !wrapRef.current) return;

      // Кольца слайда 2 — заранее спрятаны; цикл запускается, когда слайд 2
      // активен, и паузится обратно на слайде 1.
      const circles = gsap.utils.toArray<HTMLElement>(".kv-circle", pinRef.current);
      gsap.set(circles, { opacity: 0, scale: 0.92, transformOrigin: "50% 50%" });
      const circleTl = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 2, paused: true });
      circles.forEach((el, i) => {
        circleTl
          .to(el, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, i)
          .to(el, { opacity: 0, scale: 0.95, duration: 0.35, ease: "power2.in" }, i + 0.62);
      });

      const state = { slide: 1 };
      function showSlide(slide: number) {
        if (state.slide === slide) return;
        state.slide = slide;
        gsap.to(slide1Ref.current, { opacity: slide === 1 ? 1 : 0, duration: 0.5, ease: "siteEase" });
        gsap.to(slide2Ref.current, { opacity: slide === 2 ? 1 : 0, duration: 0.5, ease: "siteEase" });
        gsap.to(bar1Ref.current, { opacity: slide === 1 ? 1 : 0.3, duration: 0.5, ease: "siteEase" });
        gsap.to(bar2Ref.current, { opacity: slide === 2 ? 1 : 0.3, duration: 0.5, ease: "siteEase" });
        if (slide === 2) circleTl.play();
        else {
          circleTl.pause(0);
          gsap.set(circles, { opacity: 0, scale: 0.92 });
        }
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
        circleTl.kill();
      };
    },
    { scope: wrapRef, dependencies: [reduced] },
  );

  // reduced-motion — два отдельных full-bleed блока подряд, без пина.
  if (reduced) {
    return (
      <>
        <section className="w-full overflow-clip bg-[#121212]">
          <div className="relative mx-auto h-[900px] w-[1440px]">
            <Slide1 />
            <ProgressBars />
          </div>
        </section>
        <section className="w-full overflow-clip bg-[#121212]">
          <div className="relative mx-auto h-[900px] w-[1440px]">
            <Slide2 />
            <div className="absolute left-[46px] top-[852px] z-20 flex gap-[12px]">
              <div className="h-[2px] w-[44.833px] bg-white opacity-30" />
              <div className="h-[2px] w-[44.833px] bg-white" />
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: "200vh" }}>
      <div ref={pinRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#121212]">
        <div className="relative h-[900px] w-[1440px] shrink-0 overflow-clip">
          <div ref={slide1Ref} className="absolute inset-0">
            <Slide1 />
          </div>
          <div ref={slide2Ref} className="absolute inset-0" style={{ opacity: 0 }}>
            <Slide2 />
          </div>
          <ProgressBars bar1={bar1Ref} bar2={bar2Ref} />
        </div>
      </div>
    </div>
  );
}
