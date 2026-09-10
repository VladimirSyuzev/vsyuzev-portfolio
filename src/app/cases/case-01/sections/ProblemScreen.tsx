"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import { useCanvasWide } from "@/lib/breakpoint";
import Dot from "@/components/Dot";
import DrawIn from "@/components/DrawIn";
import SlideProgress from "@/components/SlideProgress";

// «01 Проблема» — в Figma это ОДИН раздел из двух слайдов ("слайд 1 из 2" —
// Problem.tsx, "слайд 2 из 2" — было Screen.tsx), с общим прогресс-
// индикатором. Раньше это были два отдельных min-h-screen блока, между
// которыми скроллом просто уезжаешь вверх — по просьбе переделано в один
// закреплённый (pin) блок: фон/каркас остаётся на месте, контент слайдов
// кроссфейдится друг в друга на том же месте, прогресс-индикатор
// переключается вместе с контентом.
//
// Техника — как в предыдущих проектах (см. память "Scrub-freeze pattern",
// "Parent-opacity gotcha", "ScrollTrigger onRefresh desync"):
// - НЕ scrub:true напрямую на opacity (даёт "заморозку" кроссфейда на
//   середине, если скролл останавливается ровно на границе) — вместо
//   этого onUpdate/onRefresh проверяют порог прогресса (0.5) и запускают
//   ОБЫЧНый (не scrubbed) gsap.to() один раз при пересечении порога.
// - Слои-слайды — СИБЛИНГИ с независимой анимацией opacity, не вложены
//   друг в друга (не гасим общий родитель, который спрятал бы оба сразу).
// - onRefresh дублирует ту же пороговую проверку, что и onUpdate — иначе
//   resize/refresh может рассинхронизировать видимый слой с self.progress.
//
// Ниже 1440 (нет фикс-холста, см. RESPONSIVE.md) — пина нет: два слайда
// идут обычным потоком, каждый в сетке (reflow).
const A = "/cases/case-01/sections/screen-assets";

const BULLETS = [
  "различные пропорции",
  "неодинаковую толщину линий",
  "разные радиусы скруглений",
  "различия в принципах построения",
  "разный визуальный вес иконок",
  "дубли одинаковых иконок",
  "отсутствие необходимых размеров",
  "отсутствие outline- или filled-вариантов",
];

function ProblemContent() {
  return (
    <>
      {/* Заголовок — крупный дисплейный (Figma node 1964:41878, 175px,
          leading-none, top 152). */}
      <div className="absolute left-[46px] top-[152px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold leading-none tracking-[5.25px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-white">ПРОБЛЕМА</p>
      </div>

      {/* Вводный абзац (Figma node 2359:4421). */}
      <p className="absolute left-[46px] top-[455.52px] w-[309.664px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        К началу проекта внутри Яндекса одновременно существовали две библиотеки иконок:
      </p>

      {/* ICONS SYMBOLS / ICONS REGULAR — подписи-блоки (Figma node 2381:20941). */}
      <div className="absolute left-[46px] top-[592.52px] w-[333.648px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
        <div className="flex flex-col gap-[6px]">
          <div className="flex flex-col">
            <p>ICONS</p>
            <p className="font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px]">Symbols</p>
          </div>
          <p className="opacity-70">более старая библиотека.</p>
        </div>
        <div className="mt-[24px] flex flex-col gap-[6px]">
          <div className="flex flex-col">
            <p>ICONS</p>
            <p className="font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px]">Regular</p>
          </div>
          <p className="opacity-70">новая библиотека, которая постепенно развивалась вместе с продуктами.</p>
        </div>
      </div>

      <p className="absolute left-[556px] top-[429px] w-[329px] text-[12px] leading-[1.2] tracking-[0.24px] text-white opacity-70">
        ICONS SYMBOLS
      </p>
      <p className="absolute left-[896px] top-[429px] w-[329px] text-[12px] leading-[1.2] tracking-[0.24px] text-white opacity-70">
        ICONS REGULAR
      </p>

      <div className="absolute left-[556px] top-[455.52px] flex items-center gap-[12px]">
        <div className="prob-board relative size-[328px] bg-white">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-union.svg" />
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-tmp.svg" />
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <img alt="" className="size-[328px]" src="/cases/case-01/sections/problem-train.svg" />
          </div>
        </div>
        <div className="prob-board relative size-[328px] bg-white">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-union2.svg" />
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-tmp2.svg" />
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <img alt="" className="size-[328px]" src="/cases/case-01/sections/problem-railway.svg" />
          </div>
        </div>
      </div>

      {/* Доодл-«звезда» справа сверху (Figma node 2359:4422 → 1210 / 376.70). */}
      <DrawIn
        src="/cases/case-01/sections/problem-star-doodle.svg"
        fit="contain"
        className="absolute left-[1210px] top-[376.7px] h-[191.363px] w-[200.725px]"
      />

      {/* Стрелка-доодл под правой колонкой (Figma node 2284:39939 → 884 / 756.18). */}
      <div className="absolute left-[884px] top-[756.18px] flex h-[112.796px] w-[389.623px] items-center justify-center">
        <DrawIn
          src="/cases/case-01/sections/problem-arrow.svg"
          fit="contain"
          className="h-[66.502px] w-[384.386px] rotate-[6.99deg]"
        />
      </div>
    </>
  );
}

function ScreenContent() {
  return (
    <>
      <div className="absolute left-[46px] top-[181px] flex w-[337.139px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        <p>
          Новые иконки появлялись под конкретные задачи и ближайшие релизы. Такой подход помогал
          быстро закрывать потребности отдельных команд, но со временем привёл к техническому долгу.
        </p>
        <p className="w-[328px]">
          На одном экране могли одновременно использоваться иконки из разных библиотек, из-за чего
          интерфейс терял визуальную целостность.
        </p>
      </div>

      <div className="absolute left-[47px] top-[510px] flex w-[327px] flex-col gap-[12px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.42px] text-white">
          МЫ ОБНАРУЖИЛИ:
        </p>
        <ul className="flex flex-col gap-[6px]">
          {BULLETS.map((item, i) => (
            <li key={item} className="scr-bullet flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
              <Dot seed={11 + i} />
              <span className="opacity-70">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <DrawIn
        src={`${A}/doodle-hooks.svg`}
        fit="contain"
        className="absolute left-[353px] top-[623px] h-[125px] w-[158px]"
      />

      {/* Телефон + аннотация — два слоя, тот же холст, друг на друге
          (Figma node 1965:41937 → 517 / 162, 746×576). При появлении
          слайда 2: сначала мокап (scr-mock), затем аннотация с пунктиром/
          подписями раскрывается от центра к краям (scr-anno). */}
      <div className="absolute left-[517px] top-[162px] h-[576px] w-[746px]">
        <img alt="" className="scr-mock absolute inset-0 block size-full max-w-none" src={`${A}/screen-layer-1.svg`} />
        <img
          alt="Экран приложения с одновременным использованием иконок из Icons Regular и Icons Symbols"
          className="scr-anno absolute inset-0 block size-full max-w-none"
          src={`${A}/screen-layer-2.svg`}
        />
      </div>
    </>
  );
}

// --- Reflow ниже 1440. ЗАХОД 1: точные значения 375 (Figma 2559:11032 /
// 2559:11051). 834/1280 — заходы 2/3. ---
const P = "/cases/case-01/sections";
const R = "/cases/case-01/sections/reflow";

function Board({ label, name, desc, union, tmp, bg }: {
  label: string; name: string; desc: string; union: string; tmp: string; bg: string;
}) {
  return (
    // 375: доска 335, gap доска→подпись 12. 834: доска 328, gap 10.
    <div className="flex flex-col gap-[12px] sm:w-[328px] sm:gap-[10px]">
      <div className="relative aspect-square w-full max-w-[335px] bg-white sm:max-w-[328px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={union} />
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={tmp} />
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <img alt="" className="size-full" src={bg} />
        </div>
      </div>
      {/* блок подписи — AL:V gap 6 */}
      <div className="flex flex-col gap-[6px] text-white">
        <div className="flex flex-col">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">ICONS</p>
          {/* name — 375: Wix Reg 24 / ls 0.8. 834: Wix Reg 28 / ls 0.96. */}
          <p className="font-heading text-[24px] font-normal uppercase leading-[1.1] tracking-[0.8px] sm:text-[28px] sm:tracking-[0.96px]">{name}</p>
        </div>
        <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{desc}</p>
      </div>
      <p className="sr-only">{label}</p>
    </div>
  );
}

function ProblemFlow() {
  return (
    // секция: 375 pad 64/20 gap 32 · 834 pad 72/28 gap 64 · 1280 pad 72/40
    <section className="relative w-full overflow-clip bg-[#121212] px-[20px] py-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px]">
      <div className="flex flex-col gap-[32px] sm:gap-[64px]">
        {/* заголовок + интро: 375 gap 12 · 834 gap 32 (Figma 2559:11933 — vertical AL, gap 12) */}
        <div className="flex flex-col gap-[12px] sm:gap-[32px]">
          {/* «01 ПРОБЛЕМА» — 375: Wix Bold 26 / leading-none / col-gap 12. 834: 100 / gap 24. 1280: 152. */}
          <div className="flex flex-wrap items-baseline gap-x-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-none sm:gap-x-[24px] sm:text-[100px] lg:text-[152px] lg:leading-[1.05]">
            <span className="text-[#008cff]">01</span>
            <span className="text-white">ПРОБЛЕМА</span>
          </div>
          {/* интро — 375 w335 · 834 w382 · 1280 w291 */}
          <p className="w-[335px] max-w-full text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:w-[382px] lg:w-[291px]">
            К началу проекта внутри Яндекса одновременно существовали две библиотеки иконок:
          </p>
        </div>

        {/* доски — 375 стопкой (gap 12) · 834/1280 в ряд по центру (gap 12, пара 668
            центрируется — Figma align CENTER) */}
        <div className="flex flex-col gap-[12px] sm:flex-row sm:justify-center sm:gap-[12px]">
          <Board
            label="ICONS SYMBOLS"
            name="Symbols"
            desc="более старая библиотека."
            union={`${P}/problem-union.svg`}
            tmp={`${P}/problem-tmp.svg`}
            bg={`${P}/problem-train.svg`}
          />
          <Board
            label="ICONS REGULAR"
            name="Regular"
            desc="новая библиотека, которая постепенно развивалась вместе с продуктами."
            union={`${P}/problem-union2.svg`}
            tmp={`${P}/problem-tmp2.svg`}
            bg={`${P}/problem-railway.svg`}
          />
        </div>
      </div>

      {/* Декор — линия-скетч Vector 234257366. 375: у низа секции, x26, ~тонкая.
          834: под описанием доски 2 (x411, чуть левее её левого края), bbox
          352×54 (артефакт волнистого штриха — реально плоская), центр ~y719
          при высоте секции 800 → bottom ~68; слабый подъём слева-направо. */}
      <div className="pointer-events-none absolute bottom-[38px] left-[26px] h-[17px] w-[300px] max-w-[calc(100%-40px)] sm:bottom-[48px] sm:left-[411px] sm:h-[22px] sm:w-[352px] sm:max-w-none lg:bottom-[36px] lg:left-[615px] lg:h-[22px] lg:w-[390px]">
        <DrawIn src={`${R}/problem-line-375.svg`} className="size-full sm:hidden" />
        <DrawIn src={`${R}/problem-line-834.svg`} className="hidden size-full sm:block" />
      </div>
    </section>
  );
}

// Порядок вариантов точек-скетчей в списке «МЫ ОБНАРУЖИЛИ» (из макета 2559:11057).
const DOT_VARIANTS = [1, 2, 3, 1, 3, 1, 4, 2];

function ScreenFlow() {
  return (
    // секция: 375 pad 32/20/64/20 gap 32 · 834 pad 28/28/72/28 gap 64 · 1280 pad 72/40
    <section className="relative w-full overflow-clip bg-[#121212] px-[20px] pb-[64px] pt-[32px] sm:px-[28px] sm:pb-[72px] sm:pt-[28px] lg:px-[40px] lg:pt-[72px]">
      <div className="flex flex-col gap-[32px] sm:gap-[64px]">
        {/* Frame 2147231942 — 2 абзаца. 375: w335, gap 12. 834: w383, gap 6. 1280: w498. */}
        <div className="flex w-[335px] max-w-full flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:w-[383px] sm:gap-[6px] lg:w-[498px]">
          <p>
            Новые иконки появлялись под конкретные задачи и ближайшие релизы. Такой подход помогал
            быстро закрывать потребности отдельных команд, но со временем привёл к техническому долгу.
          </p>
          <p>
            На одном экране могли одновременно использоваться иконки из разных библиотек, из-за чего
            интерфейс терял визуальную целостность.
          </p>
        </div>

        {/* Frame 2147231908/…474 — мокап телефона. 375: screen-375.svg w335.
            834: screen-834.svg 778×576 (телефон 746 по центру внутри). gap 64. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Экран приложения Яндекс с одновременным использованием иконок из Icons Regular и Icons Symbols"
          className="block w-[335px] max-w-full sm:hidden"
          src={`${R}/screen-375.svg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden
          alt=""
          className="hidden w-[778px] max-w-full sm:block lg:mx-auto lg:w-[746px]"
          src={`${R}/screen-834.svg`}
        />

        {/* Frame 2147231943 — «МЫ ОБНАРУЖИЛИ» + список. Блок gap 12, список gap 6.
            375: w335. 834: w327. 1280: одна колонка на всю ширину (Figma 1200). */}
        <div className="flex w-[335px] max-w-full flex-col gap-[12px] sm:w-[327px] lg:w-full">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-white">
            МЫ ОБНАРУЖИЛИ:
          </p>
          <ul className="flex flex-col gap-[6px]">
            {BULLETS.map((item, i) => (
              <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
                <img aria-hidden alt="" className="block size-[12px] shrink-0" src={`${R}/dot-${DOT_VARIANTS[i]}.svg`} />
                <span className="opacity-70">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ДУДЛ »» — только ≥640 (макет 2547:15535). Инстанс у ЛЕВОГО края
          (x −16, обрезается), y 700 (~62% высоты). Указывает на мокап. */}
      <DrawIn
        src={`${R}/screen-doodle-834.svg`}
        fit="contain"
        className="pointer-events-none hidden sm:absolute sm:left-[-16px] sm:top-[700px] sm:block sm:h-[125px] sm:w-[158px] lg:left-0 lg:top-[688px]"
      />
    </section>
  );
}

export default function ProblemScreen() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(1);
  const reduced = useReducedMotion();
  const wide = useCanvasWide();
  const animate = wide && !reduced;

  useGSAP(
    () => {
      if (!animate || !pinRef.current || !wrapRef.current) return;

      // --- Слайд 1: появление досок + доодлов при входе блока в экран ---
      gsap.set(".prob-board", { opacity: 0, scale: 0.94 });
      const introST = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(".prob-board", { opacity: 1, scale: 1, duration: 0.55, ease: "siteEase", stagger: 0.1 });
        },
      });

      // --- Слайд 2: заранее прячем внутренние элементы, чтобы проиграть
      //     последовательность при активации слайда ---
      gsap.set(".scr-bullet", { opacity: 0, x: -10 });
      gsap.set(".scr-mock", { opacity: 0, scale: 0.97 });
      gsap.set(".scr-anno", { clipPath: "inset(50% 50% 50% 50%)", opacity: 0 });
      let screenPlayed = false;
      function playScreenIn() {
        if (screenPlayed) return;
        screenPlayed = true;
        gsap
          .timeline({ defaults: { ease: "siteEase" } })
          .to(".scr-bullet", { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, clearProps: "opacity" })
          .to(".scr-mock", { opacity: 1, scale: 1, duration: 0.5 }, "-=0.1")
          .to(".scr-anno", { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.15");
      }

      const state = { slide: 1 };
      function showSlide(next: number) {
        if (state.slide === next) return;
        state.slide = next;
        setSlide(next);
        gsap.to(problemRef.current, { opacity: next === 1 ? 1 : 0, duration: 0.5, ease: "siteEase", overwrite: "auto" });
        gsap.to(screenRef.current, { opacity: next === 2 ? 1 : 0, duration: 0.5, ease: "siteEase", overwrite: "auto" });
        if (next === 2) playScreenIn();
      }

      // onLeave/onLeaveBack — мгновенно (gsap.set, не .to) фиксируют
      // корректное конечное состояние кроссфейда ровно в момент выхода за
      // границы пина, даже если 0.5с таймер ещё не доиграл (см. тот же
      // фикс и разбор в PrinciplesSlides.tsx, кейс 3, — там баг воспроизведён
      // и измерён с более коротким буфером скролла; здесь буфер целый экран
      // и гонка маловероятна, но защита ничего не стоит).
      const snapTo = (next: number) => {
        state.slide = next;
        setSlide(next);
        // killTweensOf — иначе ещё тикающий gsap.to() из предыдущего
        // showSlide() на следующем кадре перезапишет наш gsap.set()
        // своим интерполированным значением.
        gsap.killTweensOf([problemRef.current, screenRef.current]);
        gsap.set(problemRef.current, { opacity: next === 1 ? 1 : 0 });
        gsap.set(screenRef.current, { opacity: next === 2 ? 1 : 0 });
        if (next === 2) playScreenIn();
      };

      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight,
        pin: pinRef.current,
        pinSpacing: true,
        onUpdate: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
        onRefresh: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
        onLeave: () => snapTo(2),
        onLeaveBack: () => snapTo(1),
      });

      return () => {
        st.kill();
        introST.kill();
      };
    },
    { scope: wrapRef, dependencies: [animate] }
  );

  // Ниже 1440 / reduced — без pin/скролл-джекинга: два слайда обычным
  // потоком, каждый в сетке.
  if (!animate) {
    return (
      <>
        <ProblemFlow />
        <ScreenFlow />
      </>
    );
  }

  return (
    <div ref={wrapRef} data-snap-stop className="relative w-full" style={{ height: "200vh" }}>
      <div ref={pinRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#121212]">
        <div className="relative h-[900px] w-[1440px] shrink-0 overflow-clip">
          <div ref={problemRef} className="absolute inset-0">
            <ProblemContent />
          </div>
          <div ref={screenRef} className="absolute inset-0" style={{ opacity: 0 }}>
            <ScreenContent />
          </div>

          {/* Общий прогресс-индикатор — «перетекает» вместе с контентом. */}
          <SlideProgress active={slide - 1} className="absolute left-[46px] top-[852px] z-10" />
        </div>
      </div>
    </div>
  );
}
