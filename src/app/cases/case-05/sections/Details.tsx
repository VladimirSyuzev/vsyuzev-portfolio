"use client";

import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C5 } from "../i18n";

// 04 Работа с деталями — 1:1 из Figma (node 2210:75540, высота 1401).
// Тёмный full-bleed. Заголовок «04 РАБОТА С ДЕТАЛЯМИ» (32px), два абзаца
// с подчёркиванием, коллаж из пяти кропов иллюстрации и крупная мысль в
// обводке-эллипсе.
//
// <1440 — единый резиновый flow (без FullBleedScale): раньше 3 холста
// (375/834/1280) держали 14px-текст внутри масштабируемого канваса — «плыл»
// вместе с холстом на промежуточных ширинах. Коллаж 1280 (5 кропов, кастомная
// мозаика, а не сетка) — % от relative-контейнера (aspect-[1206/673]),
// коллаж 834/375 — общая раскладка 4 ряда [2,1,2,1] (аспекты кропов совпадают
// между тирами, разные только файлы-исходники). Двойной штрих под интро —
// только на 1280 (в 834/375-макете его нет). Мысль в обводке — только на
// 1280 (в 834/375-макете финальной цитаты нет).
const A = "/cases/case-05/sections";

// [файл, left, top, ширина, высота] — координаты кроп-окон (Figma frames
// 2228:91710 / 91711 / 91707 / 91708 / 91709).
const CROPS: [string, number, number, number, number][] = [
  ["detail-tc.jpg", 726, 44, 328, 399],
  ["detail-tr.jpg", 1066, 181, 328, 262],
  ["detail-bl.jpg", 46, 455, 498, 399],
  ["detail-bc.jpg", 556, 455, 498, 262],
  ["detail-br.jpg", 1066, 455, 328, 399],
];

// Кроп-окна коллажа для 1280 (Figma frame 2827:45400, 1206×673 →
// [файл, left, top, w, h]). Порядок: верх-центр, верх-право, низ-лево,
// низ-центр, низ-право.
const CROPS_1280: [string, number, number, number, number][] = [
  ["detail-1280-5.jpg", 302, 0, 291, 262],
  ["detail-1280-2.jpg", 606, 0, 594, 262],
  ["detail-1280-1.jpg", 0, 274.074, 593, 399],
  ["detail-1280-3.jpg", 606, 274, 291, 399],
  ["detail-1280-4.jpg", 909, 274, 291, 399],
];

// Коллаж 834 (Figma frame 2833:52963, 778×1412) — 4 ряда по 344, gap 12:
// ряд 1 [383+383], ряд 2 [778], ряд 3 [383+383], ряд 4 [778]. Один и тот
// же исходник иллюстрации, свои окна-кропы (экспорт кроп-фреймов @2x).
const DETAIL_ROWS_834: string[][] = [
  ["detail-834-1.jpg", "detail-834-2.jpg"],
  ["detail-834-3.jpg"],
  ["detail-834-4.jpg", "detail-834-5.jpg"],
  ["detail-834-6.jpg"],
];

// Коллаж 375 (Figma frame 2836:53735, 335×607.995) — 4 ряда по 148.123,
// gap 5.167: ряд 1 [164.916+164.916], ряд 2 [335], ряд 3 [164.916+164.916],
// ряд 4 [335]. Экспорт кроп-фреймов 2836:53737/53739/53741/53744/53746/53748.
const DETAIL_ROWS_375: string[][] = [
  ["detail-375-1.jpg", "detail-375-2.jpg"],
  ["detail-375-3.jpg"],
  ["detail-375-4.jpg", "detail-375-5.jpg"],
  ["detail-375-6.jpg"],
];

export default function Details() {
  const lang = useLang();
  const t = C5[lang];
  return (
    <>
      <div className="hidden w-full overflow-clip bg-[#121212] xl:block">
      <div className="relative mx-auto h-[1401px] w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">{t.detailsHeading}</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          {t.detailsPara1}
        </p>
        <p className="absolute left-[46px] top-[238px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          {t.detailsPara2}
        </p>
        {/* Двойное подчёркивание (Figma nodes 2284:39987 / 2284:39990). */}
        <DrawIn
          src={`${A}/details-underline1.svg`}
          className="absolute left-[417px] top-[286px] h-[40px] w-[146px]"
        />
        <DrawIn
          src={`${A}/details-underline2.svg`}
          delay={0.1}
          className="absolute left-[487px] top-[306px] h-[24px] w-[89px]"
        />

        {CROPS.map(([src, left, top, w, h]) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            alt={t.detailsCropAlt}
            className="absolute object-cover"
            style={{ left, top, width: w, height: h }}
            src={`${A}/${src}`}
          />
        ))}

        {/* Мысль (Figma node 2412:4317) + обводка-эллипс (2412:4338) — общая
            центрированная обёртка (раньше были независимыми элементами с
            фикс-координатами), эллипс в % от блока текста (192.5%/107.64%)
            — масштабируется вместе с текстом при другом числе строк
            (перевод на английский). */}
        <div className="absolute left-1/2 top-[1134px] w-[668px] -translate-x-1/2 -translate-y-1/2">
          <p className="relative z-10 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
            {t.detailsQuote}
          </p>
          <DrawIn
            src={`${A}/details-ellipse.svg`}
            fit="contain"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[192.5%] w-[107.64%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      </div>

      <div className="flex w-full flex-col gap-[32px] bg-[#121212] px-[20px] py-[64px] sm:gap-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px] lg:py-[72px] xl:hidden">
        {/* Блок 1 — заголовок + 2 абзаца + (только lg) двойной штрих
            привязанный к НИЗУ абзацев (top-[calc(100%+4px)], не фикс-px) —
            не оторвётся при другом числе строк (перевод на английский). */}
        <div className="flex flex-col gap-[12px] [word-break:break-word]">
          <div className="flex flex-col font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:flex-row sm:items-center sm:gap-[12px] sm:text-[32px] sm:tracking-[0.96px]">
            <span className="text-[#008cff]">04</span>
            <span className="whitespace-pre-wrap text-white sm:hidden">
              {lang === "ru" ? (
                <>
                  Работа <br />с деталями
                </>
              ) : (
                t.detailsHeading
              )}
            </span>
            <span className="hidden whitespace-nowrap text-white sm:inline">{t.detailsHeading}</span>
          </div>
          <div className="relative flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white sm:w-[778px] lg:w-[588px]">
            <p className="opacity-70">{t.detailsPara1}</p>
            <p className="opacity-70">{t.detailsPara2}</p>
            {/* Двойной штрих (Vector 2835:53394) — только 1280 (в 834/375
                макете его нет). */}
            <div className="pointer-events-none absolute left-[489px] top-[calc(100%+4px)] z-10 hidden h-[27.56px] w-[161.08px] lg:block">
              <DrawIn src={`${A}/details-underline-1280.svg`} className="absolute inset-[-10.885%_-1.862%]" />
            </div>
          </div>
        </div>

        {/* Блок 2а — коллаж 1280: кастомная мозаика из 5 кропов (не сетка),
            позиции в % от relative-контейнера (aspect-[1206/673]) — честная
            резиновая раскладка без канваса. */}
        <div className="relative hidden w-full lg:block" style={{ aspectRatio: "1206 / 673" }}>
          {CROPS_1280.map(([src, left, top, w, h]) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              alt={t.detailsCropAlt}
              className="absolute block object-cover"
              style={{
                left: `${(left / 1206) * 100}%`,
                top: `${(top / 673) * 100}%`,
                width: `${(w / 1206) * 100}%`,
                height: `${(h / 673) * 100}%`,
              }}
              src={`${A}/${src}`}
            />
          ))}
        </div>

        {/* Блок 2б — коллаж 834/375: общая раскладка 4 ряда [2,1,2,1] —
            аспекты кропов совпадают между тирами (разные только файлы). */}
        <div className="flex w-full flex-col gap-[5.167px] sm:gap-[12px] lg:hidden">
          {DETAIL_ROWS_375.map((row375, ri) => {
            const row834 = DETAIL_ROWS_834[ri];
            const pair = row375.length === 2;
            return (
              <div key={ri} className="flex gap-[5.167px] sm:gap-[12px]">
                {row375.map((src375, ci) => (
                  <div key={src375} className={pair ? "min-w-0 flex-1" : "w-full"}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={t.detailsCropAlt}
                      className={`block w-full object-cover sm:hidden ${pair ? "aspect-[164.916/148.123]" : "aspect-[335/148.123]"}`}
                      src={`${A}/${src375}`}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={t.detailsCropAlt}
                      className={`hidden w-full object-cover sm:block ${pair ? "aspect-[383/344]" : "aspect-[778/344]"}`}
                      src={`${A}/${row834[ci]}`}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Блок 3 — мысль по центру в обводке-эллипсе — только 1280 (в
            834/375-макете финальной цитаты нет). Эллипс в % от блока текста
            — масштабируется вместе с текстом при другом числе строк. */}
        <div className="hidden w-full flex-col items-center justify-center gap-[10px] py-[64px] lg:flex">
          <div className="relative w-[668px] max-w-full">
            <p className="relative z-10 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70 [word-break:break-word]">
              {t.detailsQuote}
            </p>
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[159.18%] w-[104.89%] -translate-x-1/2 -translate-y-1/2">
              <DrawIn src={`${A}/details-ellipse-1280.svg`} className="absolute inset-[-1.34%_-0.43%]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
