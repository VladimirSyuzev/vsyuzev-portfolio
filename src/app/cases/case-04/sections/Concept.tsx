"use client";

import DrawIn from "@/components/DrawIn";
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
            не фикс-px 1415) — раньше EN-текст оборачивался естественно (5
            строк), фикс-позиция налезала на «A PERSON». Теперь EN — ручные
            переносы в 4 строки (как в RU), но «WE SHOW THE OUTCOME» шире
            406px (~426px) — блоку нужна ширина 430px на EN, иначе браузер
            всё равно переносит эту строку сам. */}
        <div className={`absolute left-[46px] top-[1265px] ${lang === "en" ? "w-[430px]" : "w-[406px]"}`}>
          <p className="whitespace-nowrap font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-black opacity-70">
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

      {/* <1440 — единый резиновый flow: раньше 3 холста (375/834/1280)
          держали 14px-абзацы и 11px-подписи слогана внутри масштабируемого
          канваса — текст «плыл» вместе с холстом на промежуточных ширинах.
          Слоган-слова (SVG) и картинки — как есть, без канваса, декор.
          Ряд слов слогана заменён с абсолютных px-координат под фикс-холст
          на flex+justify-between — гаттеры чуть отличаются от Figma
          (≈50-60px там vs равномерные здесь), но текст/подписи больше не
          зависят от масштаба холста. */}
      <div className="flex w-full flex-col gap-[32px] overflow-clip bg-[#fafafa] sm:gap-[64px] xl:hidden">
        <div className="flex flex-col px-[20px] pt-[64px] font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:px-[28px] sm:pt-[72px] sm:text-[100px] sm:leading-none sm:tracking-[3px] lg:px-[40px] lg:pt-[72px] lg:text-[152px] lg:tracking-[4.56px]">
          <span className="text-[#008cff]">02</span>
          <span className="text-[#121212]">{t.conceptHeading}</span>
        </div>

        {/* Блок 1 — текст идеи + билборд. 375/834: текст сверху, картинка
            под ним. 1280: рядом (текст 293 слева, картинка справа). */}
        <div className="flex w-full flex-col gap-[24px] px-[20px] sm:gap-[32px] sm:px-[28px] lg:flex-row lg:items-start lg:gap-[11px] lg:px-[40px]">
          <div className="flex w-[290px] max-w-full flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] sm:w-[384px] lg:w-[293px] lg:shrink-0">
            <div>
              <p className="opacity-70">{t.conceptIdeaLabel}</p>
              <p className="font-medium uppercase opacity-70">{t.conceptSlogan}</p>
            </div>
            <p className="w-[335px] max-w-full opacity-70 sm:w-full">{t.conceptIntro}</p>
          </div>
          <div className="w-full overflow-clip bg-[#ececec] sm:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={t.conceptBillboardAlt} className="block aspect-[375/322] w-full object-cover" src={`${A}/concept-billboard-375.jpg`} />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.conceptBillboardAlt} className="hidden aspect-[778/262] w-full object-cover sm:block lg:hidden" src={`${A}/concept-billboard-834.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.conceptBillboardAlt} className="hidden aspect-[896/262] w-full object-cover lg:block lg:min-w-0 lg:flex-1" src={`${A}/concept-billboard-1280.jpg`} />
        </div>

        {/* Блок 2 — текст слогана + слова CRYPTO/PAYMENTS/SETTLED. 375 —
            стопкой по центру, у каждого слова своё фото. 834/1280 — ряд слов
            + подписи, общая кроп-картинка ниже. */}
        <div className="flex w-full flex-col gap-[24px] px-[20px] sm:gap-[32px] sm:px-[28px] lg:px-[40px]">
          <p className="w-full text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[383px] lg:w-[291px]">
            {t.conceptSloganPre}
            <span className="font-medium">{t.conceptSloganBold}</span>
            {t.conceptSloganPost}
          </p>

          {/* Порог переключения — 800px, не 640 (sm): ряду CRYPTO/PAYMENTS/
              SETTLED (следующий блок) не хватает места вплоть до ~798px —
              flex-wrap ломал раскладку (SETTLED съезжал под CRYPTO). Вместо
              кривого переноса — вся раскладка 375 (стопкой, с фото у
              каждого слова) держится до реального появления места. */}
          <div className="flex w-full flex-col items-center gap-[24px] min-[800px]:hidden">
            {SLOGAN_375.map((s, i) => (
              <div key={s.svg} className="flex flex-col items-center gap-[12px]">
                <div className="flex flex-col items-center gap-[6px]" style={{ width: s.capW }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={s.svg.replace("slogan-", "").replace(".svg", "")}
                    className="block h-[39.174px] max-w-none"
                    style={{ width: s.w }}
                    src={`${A}/${s.svg}`}
                  />
                  <p className={`text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212] opacity-70 ${i === 0 ? "" : "text-center"}`}>
                    {CAPTIONS[i]}
                  </p>
                </div>
                <div className="overflow-clip" style={{ width: s.imgW, height: s.imgH }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none object-cover" src={`${A}/${s.img}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="hidden w-full flex-col gap-[24px] min-[800px]:flex">
            <div className="flex w-full flex-wrap items-start justify-between gap-x-[20px] gap-y-[16px]">
              {SLOGAN.map((s, i) => (
                <div key={s.svg} className="flex flex-col items-start gap-[6px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={s.svg.replace("slogan-", "").replace(".svg", "")}
                    className="block h-[39px] w-auto max-w-none lg:h-[44.583px]"
                    src={`${A}/${s.svg}`}
                  />
                  <p className="whitespace-nowrap text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212] opacity-70">
                    {CAPTIONS[i]}
                  </p>
                </div>
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={t.conceptCropsAlt} className="block aspect-[778/230.21] w-full object-cover lg:hidden" src={`${A}/concept-crops-834.jpg`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={t.conceptCropsAlt} className="hidden aspect-[896/262] w-full object-cover lg:block" src={`${A}/concept-crops-1280.jpg`} />
          </div>
        </div>

        {/* Блок 3 — хайлайт в обводке-эллипсе. Эллипс — фикс-px оффсет
            внутри центрированной строки (не % от текста), не зависит от
            ширины холста — работает без изменений в резиновом flow. */}
        <div className="relative flex w-full items-center justify-center px-[20px] py-[64px] sm:px-[28px] sm:py-[44px] lg:px-[40px] lg:py-[64px]">
          <div className="pointer-events-none absolute left-1/2 top-[21.91px] z-0 h-[171px] w-[319px] -translate-x-1/2 sm:hidden">
            <DrawIn src={`${A}/concept-ellipse-375.svg`} className="absolute inset-[-1.75%_-0.94%]" />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-[14.9px] z-0 hidden h-[171px] w-[505px] -translate-x-1/2 sm:block lg:hidden">
            <DrawIn src={`${A}/concept-ellipse-834.svg`} className="absolute inset-[-1.75%_-0.59%]" />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-[25px] z-0 hidden h-[218.922px] w-[504.596px] -translate-x-1/2 lg:block">
            <DrawIn src={`${A}/concept-ellipse-1280.svg`} className="absolute inset-[-1.37%_-0.59%]" />
          </div>
          <p className="relative z-10 w-[311px] max-w-full text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-black opacity-80 sm:w-[406px] sm:text-[28px] sm:tracking-[0.84px] lg:text-[32px] lg:tracking-[0.96px]">
            {t.conceptQuote}
          </p>
        </div>
      </div>
    </>
  );
}
