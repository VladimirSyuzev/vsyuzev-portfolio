"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import { useCanvasWide } from "@/lib/breakpoint";
import Reveal from "@/components/Reveal";
import SlideProgress from "@/components/SlideProgress";
import FullBleedScale from "@/components/FullBleedScale";
import { useLang } from "@/lib/lang";
import { C4 } from "../i18n";

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
  const t = C4[useLang()];
  return (
    <>
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">03</p>
        <p className="text-white">KEY VISUAL</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        {t.kvS1Para}
      </p>

      {/* Доодл-«глаз» (Figma node 2284:40104 → 1155 / 188, 157×110). */}
      <Reveal variant="doodle" className="kv-s1-doodle absolute left-[1155px] top-[188px] z-10 h-[110px] w-[157px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/eye.png`} />
      </Reveal>

      {/* Метро-билборд (Figma frame 2094:18197 → x46 / y318, 1348×536). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[46px] top-[318px] h-[536px] w-[1348px] object-cover"
        src={`${A}/kv1-subway.jpg`}
      />
    </>
  );
}

function Slide2() {
  const t = C4[useLang()];
  return (
    <>
      {/* Кроп 1 — телефон (Figma frame 2094:18626 → x46 / y44, 328×399). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[46px] top-[44px] h-[399px] w-[328px] object-cover"
        src={`${A}/crops-1.jpg`}
      />
      {/* Кроп 2 — ключи (Figma frame 2094:18627 → x386 / y181, 328×262). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[386px] top-[181px] h-[262px] w-[328px] object-cover"
        src={`${A}/crops-2.jpg`}
      />

      <p className="absolute left-[726px] top-[181px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        {t.kvS2Para}
      </p>

      {/* Кроп 3 — пара (Figma frame 2094:18628 → x726 / y455, 668×399). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
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
        {t.kvQuote}
      </p>
      {/* Подчёркивание (Figma node 2399:35412 → x192 / y736, 275×29). */}
      <Reveal variant="line" start="top 92%" className="absolute left-[192px] top-[736px] h-[29px] w-[275px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/crops-underline.svg`} />
      </Reveal>
    </>
  );
}

// ─── 1280-раскладка (reflow-фреймы 2739:17992 «04» / 2739:18008 «05») ───
// На <1440 пин отключён: два тёмных full-bleed блока подряд, каждый —
// FullBleedScale-канвас 1280. Кольца-обводки слайда 2 анимируются по
// очереди — та же механика, что в 1440-версии (пауза 2с → каждое
// проявляется и гаснет ~1с по очереди → пауза 4с → цикл), но запуск не по
// пину, а по ScrollTrigger когда блок в экране.
const CIRCLES_1280: [string, number, number, number, number, string][] = [
  // [файл, left, top, w, h, inset-класс] — координаты уже со сдвигом +40/+72.
  ["crops-circle1-1280.svg", 60, 78, 240, 353.331, "inset-[-0.85%_-1.25%]"],
  ["crops-circle2-1280.svg", 376, 235, 200, 199.376, "inset-[-1.5%]"],
  ["crops-circle3-1280.svg", 731.42, 488.28, 422.464, 398.845, "inset-[-0.75%_-0.71%]"],
];

function KeyVisual1280() {
  const t = C4[useLang()];
  return (
    <div className="relative flex h-[776px] w-[1280px] flex-col items-start gap-[64px] overflow-clip bg-[#121212] px-[40px] py-[72px]">
      <div className="flex w-[594px] flex-col items-start gap-[12px]">
        <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <span className="text-[#008cff]">03</span>
          <span className="text-white">KEY VISUAL</span>
        </div>
        <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          {t.kvS1Para}
        </p>
      </div>
      {/* Метро-билборд (2739:17996, bg #212121, 1200×470). */}
      <div className="relative h-[470px] w-[1200px] shrink-0 overflow-clip bg-[#212121]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
          src={`${A}/kv1-subway-1280.jpg`}
        />
      </div>
      {/* Доодл-«глаз» (Vector, 1040.69/71.52, 149.174×92.405). */}
      <Reveal
        variant="doodle"
        className="absolute left-[1040.69px] top-[71.52px] z-10 h-[92.405px] w-[149.174px]"
      >
        <div className="absolute inset-[-3.25%_-2.01%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/kv-eye-1280.svg`} />
        </div>
      </Reveal>
    </div>
  );
}

function Crops1280() {
  const t = C4[useLang()];
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !rootRef.current) return;
      const circles = gsap.utils.toArray<HTMLElement>(".kv-circle-1280", rootRef.current);
      if (!circles.length) return;
      gsap.set(circles, { opacity: 0, scale: 0.92, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 2, paused: true });
      circles.forEach((el, i) => {
        tl.to(el, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, i).to(
          el,
          { opacity: 0, scale: 0.95, duration: 0.35, ease: "power2.in" },
          i + 0.62,
        );
      });

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 78%",
        end: "bottom top",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.pause(),
        onLeaveBack: () => {
          tl.pause(0);
          gsap.set(circles, { opacity: 0, scale: 0.92 });
        },
      });

      return () => {
        st.kill();
        tl.kill();
      };
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  return (
    <div ref={rootRef} className="relative h-[976px] w-[1280px] overflow-clip bg-[#121212]">
      {/* Кроп 1 (2739:18009 → 40/72, 291×410). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[40px] top-[72px] h-[410px] w-[291px] max-w-none bg-[#212121] object-cover"
        src={`${A}/crops-1-1280.jpg`}
      />
      {/* Кроп 2 (2739:18010 → 343/212, 291×270). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[343px] top-[212px] h-[270px] w-[291px] max-w-none bg-[#212121] object-cover"
        src={`${A}/crops-2-1280.jpg`}
      />
      {/* Кроп 3 — общий план (2739:18011 → 646/494, 594×410). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[646px] top-[494px] h-[410px] w-[594px] max-w-none bg-[#212121] object-cover"
        src={`${A}/crops-3-1280.jpg`}
      />

      <p className="absolute left-[646px] top-[212px] w-[291px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        {t.kvS2Para}
      </p>

      {/* Рукописные обводки-круги — анимируются по очереди (см. useGSAP).
          reduced-motion: остаются видимыми статично (opacity по умолчанию). */}
      {CIRCLES_1280.map(([src, left, top, w, h, insetClass]) => (
        <div
          key={src}
          className="kv-circle-1280 absolute z-10"
          style={{ left, top, width: w, height: h }}
        >
          <div className={`absolute ${insetClass}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src={`${A}/${src}`} />
          </div>
        </div>
      ))}

      {/* Крупная мысль (2739:18013 → 40/756, w520) + подчёркивание
          (2835:53369, 135/904, 329.56×29.64) под последней строкой. */}
      <div className="absolute left-[40px] top-[756px] w-[520px]">
        <p className="whitespace-pre-wrap font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          {t.kvQuote}
        </p>
        <Reveal
          variant="line"
          start="top 92%"
          className="pointer-events-none absolute left-[95px] top-[calc(100%+8px)] h-[29.64px] w-[329.56px]"
        >
          <div className="absolute inset-[0_-0.91%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src={`${A}/crops-underline-1280.svg`} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── 834-раскладка (reflow-фреймы 2750:4698 «04» / 2750:4715 «05») ───
// На 834 у «05 Кропы» колец-обводок НЕТ (в макете только эллипс вокруг
// цитаты) — статичный блок.
function KeyVisual834() {
  const t = C4[useLang()];
  return (
    <div className="relative flex h-[759px] w-[834px] flex-col items-start gap-[64px] overflow-clip bg-[#121212] px-[26px] py-[72px]">
      <div className="flex w-[778px] flex-col items-start gap-[12px]">
        <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <span className="text-[#008cff]">03</span>
          <span className="text-white">KEY VISUAL</span>
        </div>
        <p className="w-[778px] whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          {t.kvS1Para}
        </p>
      </div>
      {/* Метро-билборд (2818:29395, bg #212121, 778×470). */}
      <div className="relative h-[470px] w-[778px] shrink-0 overflow-clip bg-[#212121]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
          src={`${A}/subway-834.jpg`}
        />
      </div>
      {/* Доодл-«глаз» (Vector, 648.95/27.13, 119.337×73.924). */}
      <Reveal
        variant="doodle"
        className="absolute left-[648.95px] top-[27.13px] z-10 h-[73.924px] w-[119.337px]"
      >
        <div className="absolute inset-[-4.06%_-2.51%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/kv-eye-834.svg`} />
        </div>
      </Reveal>
    </div>
  );
}

function Crops834() {
  const t = C4[useLang()];
  return (
    <div className="relative h-[1215px] w-[834px] overflow-clip bg-[#121212]">
      {/* Кроп 1 (2750:4717 → 28/72, 383×383). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[28px] top-[72px] size-[383px] max-w-none bg-[#212121] object-cover"
        src={`${A}/crops-1-834.jpg`}
      />
      {/* Кроп 2 (2750:4719 → 423/205, 383×250). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[423px] top-[205px] h-[250px] w-[383px] max-w-none bg-[#212121] object-cover"
        src={`${A}/crops-2-834.jpg`}
      />
      <p className="absolute left-[424px] top-[72px] w-[380px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        {t.kvS2Para}
      </p>
      {/* Кроп 3 — общий план (2750:4721 → 28/467, 778×360). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[28px] top-[467px] h-[360px] w-[778px] max-w-none bg-[#212121] object-cover"
        src={`${A}/crops-3-834.jpg`}
      />

      {/* Цитата (2750:4723 → center, w-506, py-64) + обводка-эллипс
          (2835:53378, 454×197). Блок на y891. */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute left-1/2 top-[913.91px] h-[197px] w-[454px] -translate-x-1/2"
      >
        <div className="absolute inset-[-1.52%_-0.66%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/crops-ellipse-834.svg`} />
        </div>
      </Reveal>
      <p className="absolute left-1/2 top-[955px] w-[506px] -translate-x-1/2 whitespace-pre-wrap text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-white opacity-70">
        {t.kvQuote}
      </p>
    </div>
  );
}

// ─── 375-раскладка (reflow-фреймы 2760:4698 «04» / 2760:4715 «05») ───
// Как и на 834 — колец-обводок у «05 Кропы» нет, только тонкое
// подчёркивание под цитатой. Поток flex-col.
function KeyVisual375() {
  const t = C4[useLang()];
  return (
    <div className="relative flex h-[582px] w-[375px] flex-col items-start gap-[32px] overflow-clip bg-[#121212] py-[64px]">
      {/* Заголовок + абзац (px-20, gap 12). */}
      <div className="flex flex-col items-start gap-[12px] px-[20px]">
        <div className="flex w-[335px] flex-col items-start font-heading text-[26px] font-bold uppercase">
          <span className="leading-none text-[#008cff]">03</span>
          <span className="leading-[1.1] tracking-[0.78px] text-white">KEY VISUAL</span>
        </div>
        <p className="w-[335px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          {t.kvS1Para}
        </p>
      </div>
      {/* Метро-билборд (2760:4702, bg #212121, border #383838, 375×270). */}
      <div className="relative h-[270px] w-full shrink-0 overflow-clip border border-solid border-[#383838] bg-[#212121]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
          src={`${A}/subway-375.jpg`}
        />
      </div>
    </div>
  );
}

function Crops375() {
  const t = C4[useLang()];
  return (
    <div className="relative flex h-[1292px] w-[375px] flex-col items-start gap-[32px] overflow-clip bg-[#121212] px-[20px] py-[64px]">
      <p className="w-[335px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        {t.kvS2Para}
      </p>
      {/* 3 кропа стопкой (2820:36199, w-335, gap 12). */}
      <div className="flex w-[335px] shrink-0 flex-col items-start gap-[12px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block h-[280px] w-full max-w-none bg-[#212121] object-cover"
          src={`${A}/crop-1-375.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block h-[220px] w-full max-w-none bg-[#212121] object-cover"
          src={`${A}/crop-2-375.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block h-[280px] w-full max-w-none bg-[#212121] object-cover"
          src={`${A}/crop-3-375.jpg`}
        />
      </div>
      {/* Цитата (2760:4723, center, w-335, py-64) + тонкое подчёркивание
          (2835:53385, 329.443×12.036, y171.55). */}
      <div className="relative flex w-full shrink-0 flex-col items-center justify-center py-[64px]">
        <p className="w-[335px] whitespace-pre-wrap text-center font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.66px] text-white opacity-70">
          {t.kvQuote}
        </p>
        <Reveal
          variant="line"
          start="top 92%"
          className="absolute left-[0.12px] top-[171.55px] h-[12.036px] w-[329.443px]"
        >
          <div className="absolute inset-[-24.92%_-0.91%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src={`${A}/crops-underline-375.svg`} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function KeyVisualSlides() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(1);
  const reduced = useReducedMotion();
  // Пин + кроссфейд — только ≥1440. <1440 (и reduced-motion) — два
  // статичных full-bleed блока подряд (RESPONSIVE.md). useCanvasWide стартует
  // false (и на сервере, и на первом клиентском кадре) → пин никогда не
  // монтируется «на мгновение» на узких экранах (иначе GSAP-пин мутирует DOM
  // и React падает с removeChild при обратном свопе).
  const wide = useCanvasWide();
  const flow = reduced || !wide;

  useGSAP(
    () => {
      if (flow || !pinRef.current || !wrapRef.current) return;

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
      function showSlide(next: number) {
        if (state.slide === next) return;
        state.slide = next;
        setSlide(next);
        gsap.to(slide1Ref.current, { opacity: next === 1 ? 1 : 0, duration: 0.5, ease: "siteEase" });
        gsap.to(slide2Ref.current, { opacity: next === 2 ? 1 : 0, duration: 0.5, ease: "siteEase" });
        if (next === 2) circleTl.play();
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
    { scope: wrapRef, dependencies: [flow] },
  );

  // <1440 (и reduced-motion на десктопе) — два статичных full-bleed блока.
  if (flow) {
    return (
      <>
        {/* ≥1440 reduced-motion — статичные 1440-слайды. */}
        <div className="hidden xl:block">
          <section className="w-full overflow-clip bg-[#121212]">
            <div className="relative mx-auto h-[900px] w-[1440px]">
              <Slide1 />
              <SlideProgress active={0} className="absolute left-[46px] top-[852px] z-20" />
            </div>
          </section>
          <section className="w-full overflow-clip bg-[#121212]">
            <div className="relative mx-auto h-[900px] w-[1440px]">
              <Slide2 />
              <SlideProgress active={1} className="absolute left-[46px] top-[852px] z-20" />
            </div>
          </section>
        </div>

        {/* 1024–1439 — 1:1 из reflow-фреймов «case-04 · 1280» (04 node
            2739:17992 / 05 node 2739:18008). */}
        <div className="hidden w-full lg:block xl:hidden">
          <section className="w-full bg-[#121212]">
            <FullBleedScale width={1280} height={776} mode="grow" className="w-full">
              <KeyVisual1280 />
            </FullBleedScale>
          </section>
          <section className="w-full bg-[#121212]">
            <FullBleedScale width={1280} height={976} mode="grow" className="w-full">
              <Crops1280 />
            </FullBleedScale>
          </section>
        </div>

        {/* 640–1023 — 1:1 из reflow-фреймов «case-04 · 834» (04 node 2750:4698
            / 05 node 2750:4715). */}
        <div className="hidden w-full sm:block lg:hidden">
          <section className="w-full bg-[#121212]">
            <FullBleedScale width={834} height={759} mode="grow" className="w-full">
              <KeyVisual834 />
            </FullBleedScale>
          </section>
          <section className="w-full bg-[#121212]">
            <FullBleedScale width={834} height={1215} mode="grow" className="w-full">
              <Crops834 />
            </FullBleedScale>
          </section>
        </div>

        {/* <640 — 1:1 из reflow-фреймов «case-04 · 375» (04 node 2760:4698
            / 05 node 2760:4715). */}
        <div className="w-full sm:hidden">
          <section className="w-full bg-[#121212]">
            <FullBleedScale width={375} height={582} mode="grow" className="w-full">
              <KeyVisual375 />
            </FullBleedScale>
          </section>
          <section className="w-full bg-[#121212]">
            <FullBleedScale width={375} height={1292} mode="grow" className="w-full">
              <Crops375 />
            </FullBleedScale>
          </section>
        </div>
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
          <SlideProgress active={slide - 1} className="absolute left-[46px] top-[852px] z-20" />
        </div>
      </div>
    </div>
  );
}
