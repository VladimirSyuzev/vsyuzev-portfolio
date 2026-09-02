"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import SlideProgress from "@/components/SlideProgress";

// 04 Принципы дизайна — в Figma ОДИН раздел из двух слайдов (node
// 2492:4430 «1 из 2» и 2022:14758 «2 из 2»). Механика как у «Проблема /
// Экран» в кейсе 1: тёмный фон растянут на весь экран (full-bleed), блок
// закреплён (pin), контент кроссфейдится на одном месте по скроллу,
// прогресс-индикатор переключается. ScrollTrigger.snap([0,1]) —
// переключение слайдов происходит за одно движение колеса.
//
// Слайд 1 (node 2492:4430) — вводный текст на всю ширину (w668) + четыре
// 3D-рендера, закадрированные окном 328×399 (Wallet / Exchange / Coin /
// Fees). Слайд 2 — сплит на ДВЕ половины 50/50 (как фон, так и содержимое):
// 3D-стек монет по центру левой (тёмной) половины, карта+замок по центру
// правой (светлой), текст и подчёркивание — относительно левого края правой
// половины; прогресс-индикатор жмётся к левому краю экрана. Объекты — в
// родном размере (524px), не масштабируются.
const A = "/cases/case-03/sections";

// Четыре объекта-иллюстрации (Figma nodes 2492:4481 / 2493:4490 / 2493:4487
// / 2493:4484). Каждый — большой 3D-рендер, обрезанный окном 328×399 на
// одной высоте (top 324). Слева направо: Wallet, Exchange, Coin, Fees.
// `img` — позиция и размер вложенного рендера внутри окна, 1:1 из Figma.
const TILES: {
  src: string;
  alt: string;
  left: number;
  img: { left: number; top: number; size: number };
}[] = [
  {
    src: "principles1-wallet.png",
    alt: "3D-иллюстрация Wallet: телефон со списком крипто-активов",
    left: 46,
    img: { left: -519.4, top: -184.29, size: 924.094 },
  },
  {
    src: "principles1-exchainge.png",
    alt: "3D-иллюстрация Exchange: стрелка обмена и евро-монета",
    left: 386,
    img: { left: -347, top: -273.25, size: 738 },
  },
  {
    src: "principles1-coin.png",
    alt: "3D-иллюстрация Coin: стопка монет",
    left: 726,
    img: { left: -138, top: -109, size: 652 },
  },
  {
    src: "principles1-fees.png",
    alt: "3D-иллюстрация Fees: синяя стеклянная форма",
    left: 1066,
    img: { left: -53, top: -408.25, size: 1024 },
  },
];

function Slide1() {
  return (
    <div className="relative h-[900px] w-full">
      {/* Заголовок, текст и рендеры — в центрированной 1440-сетке. */}
      <div className="relative mx-auto h-full w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">Принципы дизайна</p>
        </div>

        <div className="absolute left-[46px] top-[181px] flex w-[668px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
          <p className="opacity-70">
            В основе визуального языка лежат простые округлые формы, реалистичные материалы и
            ограниченная фирменная палитра. Во всех сценах использовались пластик, стекло и металл, а
            также единая схема освещения.
          </p>
          <p className="opacity-70">
            Приоритетом была не максимальная реалистичность, а ясность формы и быстрое считывание
            смысла композиции.
          </p>
        </div>

        {/* Четыре закадрированных 3D-рендера (node 2492:4430). */}
        {TILES.map((t) => (
          <div
            key={t.src}
            className="absolute top-[324px] h-[399px] w-[328px] overflow-hidden"
            style={{ left: t.left }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.alt}
              className="absolute max-w-none"
              style={{ left: t.img.left, top: t.img.top, width: t.img.size, height: t.img.size }}
              src={`${A}/${t.src}`}
            />
          </div>
        ))}
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
    </div>
  );
}

export default function PrinciplesSlides() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(1);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !pinRef.current || !wrapRef.current) return;

      const state = { slide: 1 };
      function showSlide(next: number) {
        if (state.slide === next) return;
        state.slide = next;
        setSlide(next);
        gsap.to(slide1Ref.current, { opacity: next === 1 ? 1 : 0, duration: 0.45, ease: "siteEase" });
        gsap.to(slide2Ref.current, { opacity: next === 2 ? 1 : 0, duration: 0.45, ease: "siteEase" });
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
            <SlideProgress active={0} className="absolute left-[46px] top-[852px] z-20" />
          </div>
        </section>
        <section className="relative w-full overflow-clip">
          <div className="relative h-[900px] w-full">
            {bgLayer}
            <div className="absolute inset-0 flex items-center justify-center">
              <Slide2Content />
            </div>
            <SlideProgress active={1} className="absolute left-[46px] top-[852px] z-20" />
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

        {/* Общий индикатор «1 из 2» — не в слоях-слайдах, поэтому при
            переключении ширина/прозрачность сегментов «перетекают». */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="relative h-[900px] w-full">
            <SlideProgress active={slide - 1} className="absolute left-[46px] top-[852px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
