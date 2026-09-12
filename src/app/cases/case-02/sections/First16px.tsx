"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import { useCanvasWide } from "@/lib/breakpoint";
import DrawIn from "@/components/DrawIn";

// 05 сначала 16px — 1:1 из актуальной Figma (node 2009:12761). Заголовок
// 32px, два абзаца слева, итоговая мысль с подчёркиванием.
//
// Иконка (Figma node 2009:12797, left 726 / top 318, 640×640) — два слоя:
// чёрный контур финальной версии 600×600 (статичен) и голубая 16px-версия,
// которая растёт с 16 до 640.
//
// Анимация (ТЗ пользователя):
//  1) блок доходит до якорной точки (top top) и закрепляется;
//  2) дальше прокрутка «тратится» на рост иконки (scrub), 16 → 640,
//     прозрачность 100 → 80 %;
//  3) конечное состояние ЛАТЧИТСЯ — при скролле назад иконка не
//     уменьшается, состояние держится до перезагрузки страницы;
//  4) после этого пин отпускает, страница скроллится дальше.
//
// Ниже 1200 (планшет/мобайл, см. RESPONSIVE.md) пин отключён: контент —
// статичный поток в сетке, иконка сразу в финальном размере.
const A = "/cases/case-02/sections";

const RENDER_SIZE = 640;
const SCALE_START = 16 / RENDER_SIZE;
const OPACITY_START = 1;
const OPACITY_END = 0.8;

const SECTION_H = 1200;
const SCRUB_PX = 1000; // прокрутка на анимацию роста (больше = медленнее)

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// easeInOutCubic — сильнее встроенной ease-in-out
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function First16px() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLImageElement>(null);
  const latch = useRef(0);
  const reduced = useReducedMotion();
  // Пин/скраб — только на фикс-холсте ≥1440 (см. RESPONSIVE.md).
  const animate = useCanvasWide() && !reduced;

  useGSAP(
    () => {
      const el = blueRef.current;
      if (!el) return;

      const render = (p: number) => {
        const e = easeInOut(p);
        el.style.transform = `scale(${lerp(SCALE_START, 1, e)})`;
        el.style.opacity = `${lerp(OPACITY_START, OPACITY_END, e)}`;
      };

      // Ниже 1440 / reduced-motion — пина нет: иконка в финальном размере.
      // (Явно сбрасываем: на десктопе при гидратации мог отработать
      //  render(0), пока useBreakpoint не отдал настоящее значение.)
      if (!animate || !wrapRef.current || !pinRef.current) {
        el.style.transform = "scale(1)";
        el.style.opacity = `${OPACITY_END}`;
        return;
      }

      // Десктоп: до первой отрисовки (useLayoutEffect) ужимаем до 16px —
      // вспышки «большая → маленькая» не будет.
      render(0);

      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: () => `+=${SCRUB_PX}`,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          latch.current = Math.max(latch.current, self.progress);
          render(latch.current);
        },
        onRefresh: (self) => {
          latch.current = Math.max(latch.current, self.progress);
          render(latch.current);
        },
      });

      return () => st.kill();
    },
    { scope: wrapRef, dependencies: [animate] },
  );

  const content = (
    <div className="mx-auto w-full max-w-[1440px] xl:relative xl:h-[1200px] xl:w-[1440px]">
      {/* 1280 (Figma 2613:16471): section gap 64, py 72.
          Группа 1 — заголовок + интро (gap 12; абзацы по 594, opacity 80).
          Группа 2 — блок h 640: иконка 640 справа (left calc(50%+280) center),
          текст «Маленький размер» 440 внизу-слева (top 500, наложение на иконку),
          стрелки-дудл, подчёркивание. */}
      <div className="flex flex-col gap-[32px] px-[var(--grid-margin)] py-[64px] sm:gap-[64px] sm:py-[72px] xl:contents">
        <div className="flex flex-col gap-[12px] xl:contents">
          <div className="flex flex-col whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:flex-row sm:items-center sm:gap-[12px] sm:text-[32px] sm:tracking-[0.96px] xl:absolute xl:left-[46px] xl:top-[134px] xl:text-[32px]">
            <p className="text-[#008cff]">05</p>
            <p className="text-[#121212]">сначала 16px</p>
          </div>

          {/* 1280 (Figma 2622:4702): абзацы по 594; п.1 — перенос после «px.»;
              п.2 без хвоста «Большая версия…» (он есть на 375/834/1440). */}
          <div className="flex flex-col gap-[6px] sm:max-w-[381px] lg:w-[594px] lg:max-w-full xl:contents">
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 xl:absolute xl:left-[46px] xl:top-[181px] xl:w-[496px]">
              Каждая иконка создавалась в двух размерах: 16 × 16 px и 640 × 640 px.{" "}
              <br className="hidden lg:inline xl:hidden" />
              Работу всегда начинали с маленькой версии.
            </p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 xl:absolute xl:left-[46px] xl:top-[221px] xl:w-[505px]">
              После её утверждения создавали большую. Это было не простое масштабирование: менялись
              пропорции, толщина линий и радиусы скруглений, появлялись дополнительные детали.
              <span className="lg:hidden xl:inline">
                {" "}Большая версия становилась самостоятельной иллюстрацией, сохраняя характер маленькой.
              </span>
            </p>
          </div>
        </div>

        {/* Группа 2 — наложение иконки и текста в блоке высотой 640. */}
        <div className="relative w-full lg:h-[640px] xl:contents">
          {/* Иконка: чёрный контур (статичен) + голубая версия (на десктопе
              растёт по скроллу, ниже 1440 — сразу в финальном размере). */}
          <div className="relative aspect-square w-full lg:absolute lg:left-[calc(50%+280px)] lg:top-0 lg:size-[640px] lg:-translate-x-1/2 xl:absolute xl:left-[726px] xl:top-[318px] xl:size-[640px] xl:translate-x-0 xl:bg-transparent">
            {/* <1440 — цельная композиция иконки (белый фон + конструкция +
                синий 0.8), экспорт из Figma (2609:28796). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              aria-hidden
              alt=""
              className="absolute inset-0 block size-full xl:hidden"
              src={`${A}/reflow/icon16-1280.svg`}
            />
            {/* ≥1440 — чёрный контур (статичен, с круглыми вырезами) + 16px-версия,
                растёт по скроллу до 640px. Экспорт 2009:12797_1440. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="absolute left-0 top-0 hidden size-full max-w-none xl:block"
              src={`${A}/reflow/icon16-black-1440.svg`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={blueRef}
              alt="Иконка Key Management Service в размере 16×16, увеличенная до 640×640"
              className="absolute left-0 top-0 hidden w-full max-w-none will-change-transform xl:block xl:size-[640px]"
              src={`${A}/icon16-blue.svg`}
              draggable={false}
              style={{
                transformOrigin: "top left",
                transform: "scale(1)",
                opacity: OPACITY_END,
              }}
            />
          </div>

          {/* Доодл-«стрелки» (Frame 2147231856) — 1280: (321,334) внутри блока,
              140×139, поворот −0.9°. Десктоп — своя позиция. */}
          <DrawIn
            src={`${A}/icon16-doodle.svg`}
            fit="contain"
            className="pointer-events-none hidden h-[139px] w-[140px] lg:absolute lg:left-[298px] lg:top-[311px] lg:block lg:-rotate-[0.9deg] xl:left-[481px] xl:top-[655px] xl:rotate-0"
          />

          {/* Текст «Маленький размер…» — 1280: (0,500) w440, наложение на иконку.
              ≥1440: выровнен НИЖНИМ краем по низу иконки (y958 = icon top318+
              size640) — xl:bottom-[242px] (1200−958) вместо фикс xl:top, иначе
              при другом числе строк (перевод) текст оторвался бы от иконки. */}
          <p className="mt-[32px] font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-[#121212] opacity-70 sm:w-[449px] sm:max-w-full sm:text-[32px] sm:tracking-[0.96px] lg:absolute lg:left-0 lg:top-[500px] lg:mt-0 lg:w-[440px] lg:text-[32px] xl:left-[46px] xl:top-auto xl:bottom-[242px] xl:w-[589px] xl:text-[32px]">
            Маленький размер{" "}<br className="hidden xl:inline" />
            проверял главное: силуэт, композицию и читаемость.
          </p>

          {/* Подчёркивание (Vector 234257394) — 375: w312; 834/1280: w427.
              Наклон +2.26° везде. 375/834 — в потоке под цитатой; 1280 —
              абсолют (27,628) в блоке. */}
          <DrawIn
            src={`${A}/reflow/icon16-underline-375.svg`}
            className="pointer-events-none mt-[10px] block h-[26.8px] w-[312px] max-w-full rotate-[2.26deg] sm:hidden"
          />
          <DrawIn
            src={`${A}/reflow/icon16-underline-1280.svg`}
            className="pointer-events-none mt-[10px] hidden h-[36.9px] w-[427px] max-w-full rotate-[2.26deg] sm:block lg:absolute lg:left-[27px] lg:top-[628px] lg:mt-0 xl:hidden"
          />
        </div>

        {/* Подчёркивание — десктоп (отдельный ассет 518×33). */}
        <DrawIn
          src={`${A}/icon16-underline.svg`}
          className="hidden xl:absolute xl:block"
          style={{ left: 161, top: 972, width: 518, height: 33 }}
        />
      </div>
    </div>
  );

  // ≥1440 — исходная структура пина 1:1 (жёсткие высоты, без overflow).
  // Ниже — обычный поток, высоты не задаём.
  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ height: animate ? SECTION_H + SCRUB_PX : undefined }}
    >
      <div
        ref={pinRef}
        className="relative w-full bg-[#fafafa]"
        style={{ height: animate ? SECTION_H : undefined }}
      >
        {content}
      </div>
    </div>
  );
}
