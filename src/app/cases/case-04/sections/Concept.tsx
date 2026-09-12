"use client";

import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";
import { useLang } from "@/lib/lang";
import { C4 } from "../i18n";

// 02 Концепция — 1:1 из актуальной Figma (node 2034:15738, высота 1539).
// Крупный дисплейный заголовок «02 / КОНЦЕПЦИЯ» (175px). Левая колонка —
// текст идеи и слогана. Справа — билборд «Your crypto, ready for real
// life.» (растр) и раскладка слогана CRYPTO · PAYMENTS · SETTLED с
// подписями + три кроп-фото (растр). Подчёркивание-доодл слева снизу.
//
// 1024–1439 — reflow «case-04 · 1280» (node 2736:17999, 1280×1517).
//  640–1023 — reflow «case-04 · 834»  (node 2748:4706,  834×1560.897).
//     <640  — reflow «case-04 · 375»  (node 2759:18069, 375×2002.89):
//             слоган-блоки стопкой, у каждого своё AI-фото.
const A = "/cases/case-04/sections";

// Слоган CRYPTO · PAYMENTS · SETTLED — теперь векторные подписи
// (Figma nodes 2440:62462 / 62463 / 62464), а не текст. Подписи под ними —
// текст, приходит из i18n (SLOGAN_CAPTIONS ниже), поэтому caption здесь не
// хранится — только позиционирование, общее для языков.
const SLOGAN: { svg: string; w: number; left: number; capLeft: number; capW: number }[] = [
  { svg: "slogan-crypto.svg", w: 224, left: 556, capLeft: 556, capW: 222 },
  { svg: "slogan-payments.svg", w: 291, left: 819, capLeft: 847, capW: 234 },
  { svg: "slogan-settled.svg", w: 245, left: 1149, capLeft: 1216, capW: 111 },
];

// 1280: те же ассеты слогана, свои left/width из reflow-фрейма 2736:17999.
const SLOGAN_1280: { svg: string; w: number; left: number; capLeft: number }[] = [
  { svg: "slogan-crypto.svg", w: 223.172, left: 323, capLeft: 324 },
  { svg: "slogan-payments.svg", w: 290.621, left: 606, capLeft: 634 },
  { svg: "slogan-settled.svg", w: 244.613, left: 947, capLeft: 1014 },
];

// 834: те же ассеты, свои left/width из reflow-фрейма 2748:4706.
const SLOGAN_834: { svg: string; w: number; left: number; capLeft: number }[] = [
  { svg: "slogan-crypto.svg", w: 194.65, left: 13, capLeft: 0 },
  { svg: "slogan-payments.svg", w: 253.479, left: 260, capLeft: 270 },
  { svg: "slogan-settled.svg", w: 213.351, left: 557, capLeft: 609 },
];

// 375: 3 блока стопкой по центру — слоган-SVG + подпись + AI-фото под ним
// (reflow-фрейм 2819:36176). Ширина/высота слогана и картинки — из макета.
const SLOGAN_375: { svg: string; w: number; capW: number; img: string; imgW: number; imgH: number }[] = [
  { svg: "slogan-crypto.svg", w: 194.65, capW: 222, img: "concept-img-1-375.jpg", imgW: 229, imgH: 229 },
  { svg: "slogan-payments.svg", w: 253.479, capW: 253.479, img: "concept-img-2-375.jpg", imgW: 228.516, imgH: 230.21 },
  { svg: "slogan-settled.svg", w: 213.351, capW: 213.351, img: "concept-img-3-375.jpg", imgW: 228.516, imgH: 230.21 },
];

export default function Concept() {
  const lang = useLang();
  const t = C4[lang];
  const CAPTIONS = [t.slogan1Caption, t.slogan2Caption, t.slogan3Caption];
  return (
    <>
      {/* ≥1440 — нативный холст 1440. */}
      <div className="relative hidden h-[1539px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
        {/* Дисплейный заголовок (Figma frame 2034:15742, 175px, leading-[1.1]). */}
        <div className="absolute left-[46px] top-[181px] flex flex-col font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <span className="text-[#008cff]">02</span>
          <span className="text-[#121212]">{t.conceptHeading}</span>
        </div>

        {/* Левая колонка. «{t.conceptIdeaLabel}» — обычный наборный
            текст: Aeonik Pro Regular, opacity 70 (Figma node 2034:15747). */}
        <p className="absolute left-[46px] top-[730px] w-[327px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.conceptIdeaLabel}
        </p>
        <p className="absolute left-[46px] top-[747px] w-[327px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.conceptSlogan}
        </p>
        <p className="absolute left-[46px] top-[776px] w-[327px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.conceptIntro}
        </p>
        <p className="absolute left-[46px] top-[1060px] w-[327px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.conceptSloganPre}
          <span className="font-medium">{t.conceptSloganBold}</span>
          {t.conceptSloganPost}
        </p>

        {/* Билборд (Figma frame 2082:18144 → x556 / y730, 838×262). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.conceptBillboardAlt}
          className="absolute left-[556px] top-[730px] h-[262px] w-[838px] object-cover"
          src={`${A}/concept-billboard.jpg`}
        />

        {/* Слоган CRYPTO · PAYMENTS · SETTLED — векторные подписи + мелкие
            пояснения под каждой (Figma nodes 2440:62462…62464 / 2083:18175…). */}
        {SLOGAN.map((s, i) => (
          <span key={s.svg}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={s.svg.replace("slogan-", "").replace(".svg", "")}
              className="absolute top-[1055px] block h-[45px] max-w-none"
              style={{ left: s.left, width: s.w }}
              src={`${A}/${s.svg}`}
            />
            <p
              className="absolute top-[1115px] text-[11px] leading-[1.2] tracking-[0.22px] text-[#121212] opacity-70"
              style={{ left: s.capLeft, width: s.capW }}
            >
              {CAPTIONS[i]}
            </p>
          </span>
        ))}

        {/* Три кроп-фото (Figma frame 2093:18192 → x556 / y1140, 836×262). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.conceptCropsAlt}
          className="absolute left-[556px] top-[1140px] h-[262px] w-[836px] object-cover"
          src={`${A}/concept-crops.jpg`}
        />

        {/* Хайлайт — крупная итоговая мысль (Wix Madefor Display Regular,
            uppercase) слева снизу, с рукописным подчёркиванием. 1:1 из Figma
            (текст 2399:35409 → (46, 1265), w406; underline 2399:35413 → (132,
            1415)). Подчёркивание привязано к НИЗУ текста (top-[calc(100%+9px)],
            не фикс-px 1415) — на EN текст естественно оборачивается в 5 строк
            вместо 4 у RU, фикс-позиция налезала на «A PERSON». */}
        <div className="absolute left-[46px] top-[1265px] w-[406px]">
          <p className="font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-black opacity-70">
            {lang === "ru" ? (
              <>
                Вместо технологии
                <br />
                мы показываем
                <br />
                результат, который
                <br />
                она даёт человеку
              </>
            ) : (
              <>
                Instead
                <br />
                of the technology,
                <br />
                we show the outcome
                <br />
                it gives a person
              </>
            )}
          </p>
          <DrawIn
            src={`${A}/concept-underline.svg`}
            className="absolute left-[86px] top-[calc(100%+9px)] h-[17px] w-[351px]"
          />
        </div>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-04 · 1280» (node
          2736:17999, 1280×1517). Поток flex-col gap-64 px-40 py-72. */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1517} mode="grow" className="w-full">
          <div className="relative flex h-[1517px] w-[1280px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[40px] py-[72px]">
            {/* Дисплейный заголовок «02 / КОНЦЕПЦИЯ» стопкой (h-304, 152px). */}
            <div className="relative h-[304px] w-[1042px] shrink-0 whitespace-nowrap font-heading text-[152px] font-bold uppercase leading-none tracking-[4.56px]">
              <span className="absolute left-0 top-0 text-[#008cff]">02</span>
              <span className="absolute left-0 top-[152px] text-[#121212]">{t.conceptHeading}</span>
            </div>

            {/* Блок 1 — текст идеи (w-293) + билборд-бейк (304, 0, 896×262). */}
            <div className="relative h-[262px] w-[1200px] shrink-0">
              <div className="absolute left-0 top-0 w-[293px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <p className="opacity-70">{t.conceptIdeaLabel}</p>
                <p className="font-medium uppercase opacity-70">{t.conceptSlogan}</p>
                <p className="mt-[12px] opacity-70">{t.conceptIntro}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.conceptBillboardAlt}
                className="absolute left-[304px] top-0 block h-[262px] w-[896px] max-w-none object-cover"
                src={`${A}/concept-billboard-1280.jpg`}
              />
            </div>

            {/* Блок 2 — текст слогана (w-291) + 3 SVG-слова + подписи + бейк
                3 кропов (304, 85, 896×262). */}
            <div className="relative h-[347px] w-[1200px] shrink-0">
              <p className="absolute left-0 top-0 w-[291px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                {t.conceptSloganPre}
                <span className="font-medium">{t.conceptSloganBold}</span>
                {t.conceptSloganPost}
              </p>
              {SLOGAN_1280.map((s, i) => (
                <span key={s.svg}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={s.svg.replace("slogan-", "").replace(".svg", "")}
                    className="absolute top-0 block h-[44.583px] max-w-none"
                    style={{ left: s.left, width: s.w }}
                    src={`${A}/${s.svg}`}
                  />
                  <p
                    className="absolute top-[59.69px] whitespace-nowrap text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212] opacity-70"
                    style={{ left: s.capLeft }}
                  >
                    {CAPTIONS[i]}
                  </p>
                </span>
              ))}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.conceptCropsAlt}
                className="absolute left-[304px] top-[85px] block h-[262px] w-[896px] max-w-none object-cover"
                src={`${A}/concept-crops-1280.jpg`}
              />
            </div>

            {/* Блок 3 — хайлайт в обводке-эллипсе (py-64, center). */}
            <div className="relative flex w-[1200px] shrink-0 items-center justify-center py-[64px]">
              <div className="absolute left-1/2 top-[25px] h-[218.922px] w-[504.596px] -translate-x-1/2">
                <DrawIn src={`${A}/concept-ellipse-1280.svg`} className="absolute inset-[-1.37%_-0.59%]" />
              </div>
              <p className="relative w-[406px] text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-black opacity-80">
                {lang === "ru" ? (
                  t.conceptQuote
                ) : (
                  <>
                    Instead
                    <br />
                    of the technology,
                    <br />
                    we show the outcome
                    <br />
                    it gives a person
                  </>
                )}
              </p>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-04 · 834» (node 2748:4706,
          834×1560.897). Поток flex-col gap-64 px-28 py-72. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1560.897} mode="grow" className="w-full">
          <div className="relative flex w-[834px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[28px] py-[72px]" style={{ height: 1560.897 }}>
            {/* Дисплейный заголовок «02 / КОНЦЕПЦИЯ» стопкой (h-200, 100px). */}
            <div className="relative h-[200px] w-[686px] shrink-0 whitespace-nowrap font-heading text-[100px] font-bold uppercase leading-none tracking-[3px]">
              <span className="absolute left-0 top-0 text-[#008cff]">02</span>
              <span className="absolute left-0 top-[100px] text-[#121212]">{t.conceptHeading}</span>
            </div>

            {/* Блок 1 — текст w-384 + билборд-бейк (778×262). gap 32. */}
            <div className="flex w-[778px] shrink-0 flex-col items-start gap-[32px]">
              <div className="flex w-[384px] flex-col items-start gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <div>
                  <p className="opacity-70">{t.conceptIdeaLabel}</p>
                  <p className="font-medium uppercase opacity-70">{t.conceptSlogan}</p>
                </div>
                <p className="opacity-70">{t.conceptIntro}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.conceptBillboardAlt}
                className="block h-[262px] w-[778px] max-w-none object-cover"
                src={`${A}/concept-billboard-834.jpg`}
              />
            </div>

            {/* Блок 2 — текст слогана w-383 + 3 SVG-слова + подписи + бейк
                3 кропов. gap 32. */}
            <div className="flex w-full shrink-0 flex-col items-start gap-[32px]">
              <p className="w-[383px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                {t.conceptSloganPre}
                <span className="font-medium">{t.conceptSloganBold}</span>
                {t.conceptSloganPost}
              </p>
              <div className="relative h-[304.897px] w-full">
                {SLOGAN_834.map((s, i) => (
                  <span key={s.svg}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={s.svg.replace("slogan-", "").replace(".svg", "")}
                      className="absolute top-0 block h-[39.174px] max-w-none"
                      style={{ left: s.left, width: s.w }}
                      src={`${A}/${s.svg}`}
                    />
                    <p
                      className="absolute top-[52.45px] whitespace-nowrap text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212] opacity-70"
                      style={{ left: s.capLeft }}
                    >
                      {CAPTIONS[i]}
                    </p>
                  </span>
                ))}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={t.conceptCropsAlt}
                  className="absolute left-1/2 top-[74.69px] block h-[230.21px] w-[781.489px] max-w-none -translate-x-1/2 object-cover"
                  src={`${A}/concept-crops-834.jpg`}
                />
              </div>
            </div>

            {/* Блок 3 — хайлайт в обводке-эллипсе (py-44, center). */}
            <div className="relative flex w-full shrink-0 items-center justify-center py-[44px]">
              <div className="absolute left-1/2 top-[14.9px] h-[171px] w-[505px] -translate-x-1/2">
                <DrawIn src={`${A}/concept-ellipse-834.svg`} className="absolute inset-[-1.75%_-0.59%]" />
              </div>
              <p className="relative w-[406px] text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-black opacity-80">
                {t.conceptQuote}
              </p>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-04 · 375» (node 2759:18069,
          375×2002.89). Поток flex-col gap-32 pt-64; слоган-блоки стопкой. */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={2002.89} mode="grow" className="w-full">
          <div className="relative flex h-[2002.89px] w-[375px] flex-col items-start gap-[32px] overflow-clip bg-[#fafafa] pt-[64px]">
            {/* Опенер «02 / КОНЦЕПЦИЯ» стопкой (px-20, 26px). */}
            <div className="flex flex-col px-[20px] font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px]">
              <span className="text-[#008cff]">02</span>
              <span className="text-[#121212]">{t.conceptHeading}</span>
            </div>

            {/* Блок 1 — текст идеи + билборд-бейк (375×322). Внутр. gap 24. */}
            <div className="flex w-full shrink-0 flex-col gap-[24px]">
              <div className="flex flex-col gap-[12px] px-[20px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <div className="w-[290px]">
                  <p className="opacity-70">{t.conceptIdeaLabel}</p>
                  <p className="font-medium uppercase opacity-70">{t.conceptSlogan}</p>
                </div>
                <p className="w-[335px] opacity-70">{t.conceptIntro}</p>
              </div>
              <div className="relative h-[322px] w-full overflow-clip bg-[#ececec]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={t.conceptBillboardAlt}
                  className="absolute inset-0 size-full max-w-none object-cover"
                  src={`${A}/concept-billboard-375.jpg`}
                />
              </div>
            </div>

            {/* Блок 2 — текст слогана + 3 блока (слоган-SVG + подпись + фото)
                стопкой по центру. Внутр. gap 24. */}
            <div className="flex w-full shrink-0 flex-col gap-[24px]">
              <p className="w-full px-[20px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                {t.conceptSloganPre}
                <span className="font-medium">
                  {t.conceptSloganBold}
                  <br />
                </span>
                {t.conceptSloganPost.trimStart()}
              </p>
              <div className="flex w-full flex-col items-center gap-[24px]">
                {SLOGAN_375.map((s, i) => (
                  <div key={s.svg} className="flex flex-col items-center gap-[12px]">
                    <div
                      className="flex flex-col items-center gap-[6px]"
                      style={{ width: s.capW }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={s.svg.replace("slogan-", "").replace(".svg", "")}
                        className="block h-[39.174px] max-w-none"
                        style={{ width: s.w }}
                        src={`${A}/${s.svg}`}
                      />
                      <p
                        className={`text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212] opacity-70 ${i === 0 ? "" : "text-center"}`}
                      >
                        {CAPTIONS[i]}
                      </p>
                    </div>
                    <div
                      className="overflow-clip"
                      style={{ width: s.imgW, height: s.imgH }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="block size-full max-w-none object-cover"
                        src={`${A}/${s.img}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Блок 3 — хайлайт в обводке-эллипсе (py-64, center). */}
            <div className="relative flex w-full shrink-0 items-center justify-center py-[64px]">
              <div className="absolute left-1/2 top-[21.91px] h-[171px] w-[319px] -translate-x-1/2">
                <DrawIn src={`${A}/concept-ellipse-375.svg`} className="absolute inset-[-1.75%_-0.94%]" />
              </div>
              <p className="relative w-[311px] text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-black opacity-80">
                {t.conceptQuote}
              </p>
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
