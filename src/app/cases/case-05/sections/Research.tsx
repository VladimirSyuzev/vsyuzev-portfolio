"use client";

import DrawIn from "@/components/DrawIn";
import Dot from "@/components/Dot";
import { useBreakpoint } from "@/lib/breakpoint";
import { useLang } from "@/lib/lang";
import { C5 } from "../i18n";

// 01 Исследование — 1:1 из Figma (node 2210:74416, высота 1264).
// Заголовок «01 ИССЛЕДОВАНИЕ» (32px), два вводных абзаца, список из пяти
// ключевых признаков DeLorean, фото-референсы (растр), доодл-«лупа» и
// крупная мысль с двойным подчёркиванием.
//
// <1440 — единый резиновый flow (без FullBleedScale): раньше 3 холста
// (375/834/1280) держали 14px-текст внутри масштабируемого канваса — «плыл»
// вместе с холстом на промежуточных ширинах. Композиция фото/список
// РАЗНАЯ на всех трёх тирах (не только размерами — 1280: узкая колонка
// текста слева + 2 фото справа, список отдельным блоком ниже; 834: список
// вклеен ПОД первым фото в левую подколонку; 375: список отдельным блоком
// ПОСЛЕ всех фото) — это не выражается чистым CSS, поэтому структура берётся
// из useBreakpoint(), как в case-03 Task.tsx.
const A = "/cases/case-05/sections";

function BulletList({ label, bullets, className }: { label: string; bullets: string[]; className?: string }) {
  return (
    <div className={`flex flex-col items-start gap-[12px] ${className ?? ""}`}>
      <p className="w-full text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 [word-break:break-word]">
        {label}
      </p>
      <ul className="flex w-full flex-col gap-[6px]">
        {bullets.map((item, i) => (
          <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
            <Dot seed={97 + i} />
            <span className="opacity-70">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Research() {
  const t = C5[useLang()];
  const BULLETS = t.bullets;
  const bp = useBreakpoint();
  const isLgUp = bp === "tabletL" || bp === "desktop";
  return (
    <>
      <div className="relative hidden h-[1264px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-[#121212]">{t.researchHeading}</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        {t.researchIntro1}
      </p>
      <p className="absolute left-[46px] top-[227px] w-[476px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        {t.researchIntro2}
      </p>

      {/* Список признаков (Figma frame 2210:79855 → x46 / y455). */}
      <div className="absolute left-[46px] top-[457px] flex w-[328px] flex-col gap-[12px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.bulletsLabel}
        </p>
        <ul className="flex flex-col gap-[6px]">
          {BULLETS.map((item, i) => (
            <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
              <Dot seed={97 + i} />
              <span className="opacity-70">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Фото-референсы (Figma frames 2215:79901 → x556 / y181, 838×262 —
          две фотографии; 2215:79895 → x556 / y455, 838×399 — одна). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={t.researchTopAlt}
        className="absolute left-[556px] top-[181px] h-[262px] w-[838px] object-cover"
        src={`${A}/research-top.jpg`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={t.researchSketchAlt}
        className="absolute left-[556px] top-[455px] h-[399px] w-[838px] object-cover"
        src={`${A}/research-bottom.jpg`}
      />

      {/* Доодл-«лупа» (Figma node 2412:4334 → x897 / y866, 158×125). */}
      <DrawIn
            src={`${A}/magnifier.svg`}
            fit="contain"
            className="absolute left-[897px] top-[866px] z-10 h-[125px] w-[158px]"
          />

      {/* Крупная мысль (Figma node 2411:4290 → x46 / y1003, w888) + двойное
          подчёркивание (2284:40129 / 2284:40174) — общая обёртка, обе линии
          привязаны к НИЗУ текста (top-[calc(100%+Npx)], не фикс-px) — не
          оторвутся при другом числе строк (перевод на английский). */}
      <div className="absolute left-[46px] top-[1003px] w-[888px]">
        <p className="relative z-10 font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
          {t.researchQuote}
        </p>
        <DrawIn
          src={`${A}/research-underline1.svg`}
          className="absolute left-[250px] top-[calc(100%+11px)] z-0 h-[35px] w-[663px]"
        />
        <DrawIn
          src={`${A}/research-underline2.svg`}
          delay={0.1}
          className="absolute left-[379px] top-[calc(100%+9px)] z-0 h-[49px] w-[578px]"
        />
      </div>
      </div>

      <div className="relative flex w-full flex-col gap-[32px] bg-[#fafafa] px-[20px] py-[64px] sm:gap-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px] lg:py-[72px] xl:hidden">
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px]">
            <span className="text-[#008cff]">01</span>
            <span className="text-[#121212]">{t.researchHeading}</span>
          </div>
          {!isLgUp && (
            <div className="flex w-[335px] max-w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] sm:w-[382px]">
              <p className="opacity-70">{t.researchIntro1}</p>
              <p className="opacity-70">{t.researchIntro2}</p>
            </div>
          )}
        </div>

        {isLgUp ? (
          <>
            {/* 1280 — узкая колонка текста слева + 2 фото справа. */}
            <div className="flex w-full items-start gap-[12px]">
              <div className="flex w-[291px] shrink-0 flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#333]">
                <p className="opacity-70">{t.researchIntro1}</p>
                <p className="opacity-70">{t.researchIntro2}</p>
              </div>
              <div className="mt-[47px] flex min-w-0 flex-1 items-center gap-[12px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={t.researchPhoto1Alt} className="block aspect-[594/281] min-w-0 flex-[594] object-cover" src={`${A}/research-photo-1-1280.jpg`} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={t.researchPhoto2Alt} className="block aspect-[291/281] min-w-0 flex-[291] object-cover" src={`${A}/research-photo-2-1280.jpg`} />
              </div>
            </div>

            {/* 1280 — список признаков слева + референсный скетч справа. */}
            <div className="flex w-full items-start gap-[12px]">
              <BulletList label={t.bulletsLabel} bullets={BULLETS} className="w-[328px] shrink-0 text-[#333]" />
              {/* Референсный скетч: рисунок чуть больше контейнера (компенсирует
                  左/right отступы скана) + 2 запечённые белые заплатки сверху/
                  снизу (закрывают края скана), позиции в % от контейнера. */}
              <div className="relative min-w-0 flex-1 overflow-clip" style={{ aspectRatio: "896 / 428" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={t.researchSketchAlt}
                  className="absolute block object-cover"
                  style={{ left: "-0.11%", top: "2.8%", width: "100.11%", height: "92.5%" }}
                  src={`${A}/research-sketch-1280.jpg`}
                />
                <div className="absolute bg-[#fcfcfc]" style={{ left: "-9.11%", top: "86.57%", width: "118.75%", height: "20.33%" }} />
                <div className="absolute bg-[#fcfcfc]" style={{ left: "-2.12%", top: "-4.21%", width: "104.8%", height: "21.03%" }} />
              </div>
            </div>
          </>
        ) : bp === "tabletP" ? (
          <>
            {/* 834 — левая подколонка (фото1 + список) + фото2 справа. */}
            <div className="flex w-full items-start gap-[10.421px]">
              <div className="flex w-[calc(50%-5px)] shrink-0 flex-col items-start gap-[12px]">
                <img alt={t.researchPhoto1Alt} className="block aspect-[383/197] w-full object-cover" src={`${A}/research-photo-1-834.jpg`} />
                <BulletList label={t.bulletsLabel} bullets={BULLETS} className="w-[328px] max-w-full text-[#333]" />
              </div>
              <img alt={t.researchPhoto2Alt} className="block aspect-[385.578/372.328] w-[calc(50%-5px)] shrink-0 object-cover" src={`${A}/research-photo-2-834.jpg`} />
            </div>
            {/* 834 — референсный скетч на всю ширину. */}
            <div className="relative w-full overflow-clip" style={{ aspectRatio: "778 / 371.634" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.researchSketchAlt}
                className="absolute block object-cover"
                style={{ left: "-0.11%", top: "2.8%", width: "100.11%", height: "92.6%" }}
                src={`${A}/research-sketch-834.jpg`}
              />
              <div className="absolute bg-[#fcfcfc]" style={{ left: "-9.11%", top: "86.57%", width: "118.75%", height: "20.33%" }} />
              <div className="absolute bg-[#fcfcfc]" style={{ left: "-2.12%", top: "-4.21%", width: "104.8%", height: "21.03%" }} />
            </div>
          </>
        ) : (
          <>
            {/* 375 — 3 фото стопкой, список отдельным блоком ниже. */}
            <div className="flex w-[335px] max-w-full shrink-0 flex-col items-start gap-[9.044px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={t.researchPhoto1Alt} className="block aspect-[335/213.42] w-full object-cover" src={`${A}/research-photo-1-375.jpg`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={t.researchPhoto2Alt} className="block aspect-square w-full object-cover" src={`${A}/research-photo-2-375.jpg`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={t.researchSketchAlt} className="block aspect-[335/160.022] w-full object-cover" src={`${A}/research-sketch-375.jpg`} />
            </div>
            <BulletList label={t.bulletsLabel} bullets={BULLETS} className="w-[328px] max-w-full" />
          </>
        )}

        {/* Крупная мысль + подчёркивание(-я) — привязаны к НИЗУ текста
            (top-[calc(100%±Npx)], не фикс-px) — не оторвутся при другом
            числе строк (перевод на английский). Двойное подчёркивание —
            только 1280; одинарное — 834/375 (разные файлы/позиции). */}
        <div className="relative flex w-full flex-col items-start justify-center gap-[10px] pb-[64px] pt-[32px] sm:pt-0">
          <p className="relative z-10 w-[294px] max-w-full font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-black opacity-80 [word-break:break-word] sm:w-[608px] lg:w-[888px] lg:text-[32px] lg:tracking-[0.96px]">
            {t.researchQuote}
          </p>
          <div className="pointer-events-none absolute left-[13px] top-[calc(100%+3px)] z-0 h-[28px] w-[322px] sm:hidden">
            <DrawIn src={`${A}/research-underline-375.svg`} className="absolute inset-[-10.72%_-0.93%]" />
          </div>
          <div className="pointer-events-none absolute left-[110px] top-[calc(100%-47px)] z-0 hidden h-[27.962px] w-[471px] sm:block lg:hidden">
            <DrawIn src={`${A}/research-underline-834.svg`} className="absolute inset-[-10.73%_-0.64%]" />
          </div>
          <div className="pointer-events-none absolute left-[257.489px] top-[calc(100%-47px)] z-0 hidden h-[35px] w-[663px] lg:block">
            <DrawIn src={`${A}/research-underline-1-1280.svg`} className="absolute inset-[-8.571%_-0.452%]" />
          </div>
          <div className="pointer-events-none absolute left-[366.114px] top-[calc(100%-36px)] z-0 hidden h-[35.031px] w-[576.809px] lg:block">
            <DrawIn src={`${A}/research-underline-2-1280.svg`} delay={0.1} className="absolute inset-[-8.564%_-0.52%]" />
          </div>
        </div>

        {/* Доодл-«лупа» — 834+ (в 375 её нет), позиция в % от секции. */}
        <DrawIn
          src={`${A}/magnifier.svg`}
          fit="contain"
          className="pointer-events-none absolute z-10 hidden h-[125px] w-[158px] sm:block lg:hidden"
          style={{ left: "68.585%", top: "75.85%" }}
        />
        <DrawIn
          src={`${A}/magnifier.svg`}
          fit="contain"
          className="pointer-events-none absolute z-10 hidden h-[125px] w-[158px] lg:block"
          style={{ left: "78.28%", top: "69.77%" }}
        />
      </div>
    </>
  );
}
