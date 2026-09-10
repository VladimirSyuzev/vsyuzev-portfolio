"use client";

import { useRef, useState } from "react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import FullBleedScale from "@/components/FullBleedScale";
import VariantsCarousel from "@/components/VariantsCarousel";
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
// <1440 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:44577,
// 1280×1062): абсолютный холст (карусель full-bleed). Заголовок + 2 абзаца
// w-593 (у 2-го — 2 ручных переноса), звёздочка (обводка 8px), тот же
// VariantsCarousel с теми же CARDS (карточки 1268×798, трек «варианты»
// 1949.87), мысль w-668 в обводке (блок цитаты — доп. отступ сверху 20).
const A = "/cases/case-05/sections";

const CARDS = [
  { src: `${A}/result-var-1.png`, w: 1265, h: 798, alt: "" },
  { src: `${A}/result-var-2.png`, w: 1270, h: 798, alt: "" },
  { src: `${A}/result-var-3.png`, w: 1271, h: 798, alt: "" },
  { src: `${A}/result-var-4.png`, w: 1267, h: 798, alt: "" },
];

export default function Result() {
  const starRef = useRef<HTMLDivElement>(null);
  const star1280Ref = useRef<HTMLDivElement>(null);
  const starFirst = useRef(true);
  const reduced = useReducedMotion();
  const [, setIdx] = useState(0);
  const t = C5[useLang()];

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
          {t.resultQuote}
        </p>
      </div>

      {/* Снап-карусель «варианты» (Figma frame 2440:56862 → y386). */}
      <VariantsCarousel cards={CARDS} top={386} tone="light" onIndexChange={onIndexChange} />
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:44577,
          1280×1062). Абсолютный холст (карусель тянется на всю ширину). */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1062} mode="grow" className="w-full">
          <div className="relative h-[1062px] w-[1280px] overflow-x-clip bg-[#fafafa]">
            <div
              className="absolute flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]"
              style={{ left: 40, top: 72 }}
            >
              <span className="text-[#008cff]">06</span>
              <span className="text-[#121212]">{t.resultHeading}</span>
            </div>

            <div
              className="absolute flex w-[593px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]"
              style={{ left: 40, top: 119 }}
            >
              <p className="whitespace-pre-wrap opacity-70">
                {t.resultPara1}
              </p>
              <p className="whitespace-pre-wrap opacity-70">
                {t.resultPara2}
              </p>
            </div>

            {/* Доодл-«звёздочка» (node 2877:14347, 918/164.074, 158×125,
                обводка 8px). Позиция инлайн-стилем — см. [[feedback-stale-dev-css-hmr]]. */}
            <Reveal
              variant="doodle"
              className="z-10"
              style={{ position: "absolute", left: 918, top: 164.074, width: 158, height: 125 }}
            >
              <div ref={star1280Ref} className="size-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-full max-w-none" src={`${A}/result-star-1280.svg`} />
              </div>
            </Reveal>

            {/* Снап-карусель «варианты» (Figma frame 2828:45420, 1949.867
                шир., y274) — те же CARDS. */}
            <VariantsCarousel cards={CARDS} top={274} tone="light" onIndexChange={onIndexChange} />

            {/* Обводка-эллипс вокруг мысли (Vector 234257391, node
                2835:53397) — секция (311, 768.074), 655.774×209.751
                (опущена вслед за блоком цитаты: у текста стал больше
                верхний отступ). */}
            <Reveal
              variant="line"
              start="top 86%"
              className="z-0"
              style={{ position: "absolute", left: 311, top: 768.074, width: 655.774, height: 209.751 }}
            >
              <div className="absolute" style={{ inset: "-1.43% -0.457%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-full max-w-none" src={`${A}/result-ellipse-1280.svg`} />
              </div>
            </Reveal>
            {/* Мысль (text 2828:45509 → внутри блока 2827:44590 (266, 84) →
                холст (306, 821), w-668, по центру). */}
            <p
              className="absolute left-1/2 w-[668px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70"
              style={{ top: 821 }}
            >
              {t.resultQuote}
            </p>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-05 · 834» (node 2828:49083,
          834×1027). Абсолютный холст (карусель full-bleed). Звёздочки в 834 нет. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1027} mode="grow" className="w-full">
          <div className="relative h-[1027px] w-[834px] overflow-x-clip bg-[#fafafa]">
            <div
              className="absolute flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]"
              style={{ left: 28, top: 72 }}
            >
              <span className="text-[#008cff]">06</span>
              <span className="text-[#121212]">{t.resultHeading}</span>
            </div>

            <div
              className="absolute flex w-[777px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]"
              style={{ left: 28, top: 119 }}
            >
              <p className="opacity-70">
                {t.resultPara1}
              </p>
              <p className="opacity-70">
                {t.resultPara2}
              </p>
            </div>

            {/* Снап-карусель «варианты» (Figma frame 2835:53272, 1949.868
                шир., y240) — те же CARDS. */}
            <VariantsCarousel cards={CARDS} top={240} tone="light" onIndexChange={onIndexChange} />

            {/* Блок цитаты (Frame 2828:49093, 28/703, 777×252, flex center
                py-64) + обводка-эллипс (Vector 234257391, node 2835:53398). */}
            <div
              className="absolute flex w-[777px] items-center justify-center gap-[10px] py-[64px]"
              style={{ left: 28, top: 703 }}
            >
              <p className="w-[461px] whitespace-pre-wrap text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-[#121212] opacity-70 [word-break:break-word]">
                {t.resultQuote}
              </p>
              <Reveal
                variant="line"
                start="top 86%"
                className="absolute left-1/2 top-[29.13px] z-0 h-[183px] w-[513px] -translate-x-1/2"
              >
                <div className="absolute inset-[-1.64%_-0.58%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/result-ellipse-834.svg`} />
                </div>
              </Reveal>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-05 · 375» (node 2828:52696,
          375×838). Абсолютный холст. Звёздочки нет; обводка-эллипс есть.
          Блок цитаты сдвинут ниже макетных 574 на высоту бара карусели
          (~53px): в 375-макете бара «‹ •— ›» нет, у нас он остаётся. Зазор
          карусель→цитата = 32 (как в макете), считается от низа бара. */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={838} mode="grow" className="w-full">
          <div className="relative h-[838px] w-[375px] overflow-x-clip bg-[#fafafa]">
            <div className="absolute left-[20px] top-[64px] flex w-[335px] flex-col items-start gap-[16px] [word-break:break-word]">
              <div className="flex flex-col font-heading text-[26px] font-bold uppercase">
                <span className="leading-none text-[#008cff]">06</span>
                <span className="leading-[1.1] tracking-[0.78px] text-[#121212]">{t.resultHeading}</span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <p className="opacity-70">
                  {t.resultPara1}
                </p>
                <p className="whitespace-pre-wrap opacity-70">
                  {t.resultPara2}
                </p>
              </div>
            </div>

            {/* Снап-карусель «варианты» (Figma frame 2836:53986, y338 — зазор
                32 от низа заголовка) — те же CARDS (в 375-макете первый
                элемент — карта, остальные три — обрезанные фото; проект
                сохраняет единую карусель из 4 карт). */}
            <VariantsCarousel
              cards={CARDS}
              top={338}
              hSmall={150}
              hBig={204}
              maxActiveWidth={324}
              tone="light"
              onIndexChange={onIndexChange}
            />

            {/* Блок цитаты (Frame 2836:54216, 44/574, 287×200, pt-48/pb-32).
                top-627 = низ бара карусели (338 + 204 трек + ~53 бар) + зазор 32. */}
            <div className="absolute left-1/2 top-[627px] -translate-x-1/2 pb-[32px] pt-[48px]">
              <div className="relative flex items-center justify-center">
                <p className="relative z-10 w-[287px] whitespace-pre-wrap text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-[#121212] opacity-70 [word-break:break-word]">
                  {t.resultQuote}
                </p>
                {/* Обводка-эллипс (Vector 234257399, node 2836:54217) —
                    центрируется ровно по тексту (translate -50/-50). */}
                <Reveal
                  variant="line"
                  start="top 86%"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[174.067px] w-[313.598px] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="absolute inset-[-1.72%_-0.96%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" className="block size-full max-w-none" src={`${A}/result-ellipse-375.svg`} />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
