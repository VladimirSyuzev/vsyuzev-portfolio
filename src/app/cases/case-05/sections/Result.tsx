"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import DrawIn from "@/components/DrawIn";
import VariantsCarousel from "@/components/VariantsCarousel";
import { useBreakpoint } from "@/lib/breakpoint";
import { useLang } from "@/lib/lang";
import { C5 } from "../i18n";

// 06 Финальный результат — 1:1 из актуальной Figma (node 2210:78310,
// высота 1265). Заголовок «06 / ФИНАЛЬНЫЙ РЕЗУЛЬТАТ» и два абзаца слева,
// доодл-«звёздочка» справа, крупная мысль в обводке по центру.
//
// Ряд «варианты» (Figma frame 2440:56862) — общий VariantsCarousel:
// снап-карусель во всю ширину, перетаскивание вбок, бар снизу.
// Звёздочка «пульсирует» на каждом переключении карточки.
//
// <1440 — единый резиновый flow (без FullBleedScale): раньше 3 холста
// (375/834/1280) держали 14px-текст внутри масштабируемого канваса — «плыл»
// вместе с холстом на промежуточных ширинах. VariantsCarousel сам всегда
// position:absolute (уже адаптивен, как в case-03 Task.tsx) — резервируем
// под него высоту (hBig+бар) отдельным relative-блоком, без канваса.
const A = "/cases/case-05/sections";

const CARDS_META = [
  { src: `${A}/result-var-1.png`, w: 1265, h: 798 },
  { src: `${A}/result-var-2.png`, w: 1270, h: 798 },
  { src: `${A}/result-var-3.png`, w: 1271, h: 798 },
  { src: `${A}/result-var-4.png`, w: 1267, h: 798 },
];

export default function Result() {
  const starRef = useRef<HTMLDivElement>(null);
  const star1280Ref = useRef<HTMLDivElement>(null);
  const starFirst = useRef(true);
  const reduced = useReducedMotion();
  const [, setIdx] = useState(0);
  const lang = useLang();
  const t = C5[lang];
  const isMobile = useBreakpoint() === "mobile";
  const CARDS = CARDS_META.map((c, i) => ({ ...c, alt: t.cardAlt[i] }));

  // Пульс звёздочки при каждом переключении карточки (обе ветки —
  // видима только одна, анимация скрытой безвредна).
  const onIndexChange = (i: number) => {
    setIdx(i);
    if (starFirst.current) {
      starFirst.current = false;
      return;
    }
    const stars = [starRef.current, star1280Ref.current].filter(Boolean);
    if (reduced || !stars.length) return;
    gsap.fromTo(
      stars,
      { scale: 1, rotate: 0 },
      {
        scale: 1.22,
        rotate: -4,
        duration: 0.16,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        transformOrigin: "50% 50%",
        onComplete: () => gsap.set(stars, { clearProps: "scale,rotate" }),
      },
    );
  };

  // Доодл-«звёздочка» на <1440 держит постоянный офсет от верхнего правого
  // угла КЛЮЧЕВОЙ карточки на ЛЮБОЙ ширине экрана. Офсет -37.07/-109.93 —
  // из точных метаданных Figma «case-05 · 1280» (node 2827:44577): карточка
  // (frame «card» внутри «варианты») правый край x=955.07/y=274 (абсолютные
  // координаты 323+632.07 / 274), доодл (frame 2877:14347) x=918/y=164.074
  // → 918-955.07=-37.07, 164.074-274=-109.93 (НЕ -27/-116 — те были на глаз
  // со скриншота, неточно). Карточка центрируется в резиновом треке, её
  // позиция зависит от
  // ширины вьюпорта нелинейно, поэтому нужен живой замер активной карточки
  // (data-active), а не фикс-px/%. Только по ширине экрана (mount + resize),
  // НЕ по смене карточки — иначе доодл «прыгает» при драге/клике по
  // стрелкам, чего быть не должно. КРИТИЧНО: при ресайзе окна трек сам
  // доезжает активную карточку до нового центра CSS-transition'ом (550ms,
  // см. VariantsCarousel), поэтому замер сразу по событию resize ловит
  // карточку НА ЛЕТУ (в процессе анимации) — доодл «скакал» именно из-за
  // этого. Меряем с задержкой (debounce 600мс от последнего resize) —
  // после того как карточка уже доехала до места.
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const [starPos, setStarPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    const wrap = carouselWrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const card = wrap.querySelector<HTMLElement>("[data-active]");
      if (!card) return;
      const wr = wrap.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      setStarPos({ left: cr.right - wr.left - 37.07, top: cr.top - wr.top - 109.93 });
    };
    let debounce: number;
    const onResize = () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(measure, 600);
    };
    // Начальный замер: НЕ один кадр — если в момент rAF ещё не догрузился
    // шрифт (font-heading влияет на высоту абзацев выше по потоку, а значит
    // и на positon карусели) или изображение карточки, макет ещё не
    // устаканился и первый замер ловит неверную геометрию (доодл «зависает»
    // не на месте до первого ресайза). Перемеряем повторно после
    // document.fonts.ready и на 300/1000мс подстраховкой (тот же приём, что
    // и «clear» в самом VariantsCarousel — двойной замер после кадра).
    const raf = requestAnimationFrame(measure);
    const t1 = window.setTimeout(measure, 300);
    const t2 = window.setTimeout(measure, 1000);
    document.fonts?.ready?.then(measure);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(debounce);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  return (
    <>
      <div className="relative hidden h-[1265px] w-full overflow-x-clip bg-[#fafafa] xl:block">
      <div className="relative mx-auto h-full w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[16px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">06</p>
          <p className="text-[#121212]">{t.resultHeading}</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.resultPara1}
        </p>
        <p className="absolute left-[46px] top-[221px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.resultPara2}
        </p>

        {/* Доодл-«звёздочка» (Figma node 2284:39991 → x1009 / y270, 158×125). */}
        <div className="absolute left-[1009px] top-[270px] z-10 h-[125px] w-[158px]">
          <div ref={starRef} className="size-full">
            <DrawIn src={`${A}/result-star.svg`} fit="contain" className="size-full" />
          </div>
        </div>

        {/* Мысль (Figma node 2412:4341) + обводка-эллипс (2412:4342) — общая
            центрированная обёртка (раньше были независимыми элементами с
            фикс-координатами), эллипс в % от блока текста (240.5%/100.3%) —
            масштабируется вместе с текстом при другом числе строк (перевод
            на английский). */}
        <div className="absolute left-1/2 top-[1009px] w-[668px] -translate-x-1/2 -translate-y-1/2">
          <p className="relative z-10 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
            {lang === "en" ? (
              <>
                A recognizable car gained
                <br />
                a story that had never been
                <br />
                tied to it before
              </>
            ) : (
              t.resultQuote
            )}
          </p>
          <DrawIn
            src={`${A}/result-ellipse.svg`}
            fit="contain"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[240.5%] w-[100.3%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* Снап-карусель «варианты» (Figma frame 2440:56862 → y386). */}
      <VariantsCarousel cards={CARDS} top={386} tone="light" onIndexChange={onIndexChange} />
      </div>

      <div className="relative flex w-full flex-col gap-[32px] bg-[#fafafa] px-[20px] pt-[64px] sm:gap-[64px] sm:px-[28px] sm:pt-[72px] lg:px-[40px] lg:pt-[72px] xl:hidden">
        <div className="relative flex w-full flex-col gap-[16px] sm:gap-[12px]">
          <div className="flex flex-col font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:flex-row sm:items-center sm:gap-[12px] sm:whitespace-nowrap sm:text-[32px] sm:tracking-[0.96px]">
            <span className="leading-none text-[#008cff] sm:leading-[1.1]">06</span>
            <span className="text-[#121212]">{t.resultHeading}</span>
          </div>
          <div className="flex w-[335px] max-w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] sm:w-[777px] lg:w-[593px]">
            <p className="opacity-70">{t.resultPara1}</p>
            <p className="opacity-70">{t.resultPara2}</p>
          </div>
        </div>

        {/* Карусель «варианты» — сама всегда position:absolute, резервируем
            высоту (hBig + бар) отдельным relative-блоком. */}
        <div ref={carouselWrapRef} className="relative w-full" style={{ height: (isMobile ? 204 : 399) + 54 }}>
          <VariantsCarousel
            cards={CARDS}
            top={0}
            hSmall={isMobile ? 150 : 262}
            hBig={isMobile ? 204 : 399}
            maxActiveWidth={isMobile ? 324 : undefined}
            tone="light"
            onIndexChange={onIndexChange}
          />
          {/* Доодл-«звёздочка» — только 1280 (в 834/375 её нет), офсет
              (-27/-116px) от верхнего правого угла активной карточки — тот
              же, что в нативной раскладке ≥1440 (там звезда фикс-px, но тот
              же track-алгоритм центрирования). До первого замера не
              показываем (нет прыжка из угла). */}
          {starPos && (
            <div
              className="pointer-events-none absolute z-10 hidden h-[125px] w-[158px] lg:block"
              style={{ left: starPos.left, top: starPos.top }}
            >
              <div ref={star1280Ref} className="size-full">
                <DrawIn src={`${A}/result-star-1280.svg`} fit="contain" className="size-full" />
              </div>
            </div>
          )}
        </div>

        {/* Мысль + обводка-эллипс — общая центрированная обёртка, эллипс в %
            от блока текста — масштабируется вместе с текстом при другом
            числе строк (перевод на английский). */}
        <div className="flex w-full flex-col items-center justify-center gap-[10px] pb-[64px] sm:pb-[72px] lg:pb-[72px]">
          <div className="relative w-[287px] max-w-full sm:w-[461px] lg:w-[668px]">
            <p className="relative z-10 text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-[#121212] opacity-70 [word-break:break-word] sm:text-[28px] sm:tracking-[0.84px] lg:text-[32px] lg:tracking-[0.96px]">
              {lang === "en" ? (
                <>
                  A recognizable car gained
                  <br />
                  a story that had never been
                  <br />
                  tied to it before
                </>
              ) : (
                t.resultQuote
              )}
            </p>
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[174.067px] w-[313.598px] -translate-x-1/2 -translate-y-1/2 sm:hidden">
              <DrawIn src={`${A}/result-ellipse-375.svg`} className="absolute inset-[-1.72%_-0.96%]" />
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[148.59%] w-[111.28%] -translate-x-1/2 -translate-y-1/2 sm:block lg:hidden">
              <DrawIn src={`${A}/result-ellipse-834.svg`} className="absolute inset-[-1.64%_-0.58%]" />
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[198.64%] w-[98.17%] -translate-x-1/2 -translate-y-1/2 lg:block">
              <DrawIn src={`${A}/result-ellipse-1280.svg`} className="absolute inset-[-1.43%_-0.457%]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
