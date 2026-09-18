"use client";

// 05 Цвет — 1:1 из Figma (node 2210:74847, высота 1265). Крупный
// дисплейный заголовок «05 / ЦВЕТ» (175px), два абзаца, доодл-«шеврон».
// Палитра — реальный DOM: две большие плитки (Auto Red / T-bank Yellow)
// и восемь малых (2 столбца × 4 ряда), каждая — цвет + название +
// мини-таблица HEX / RGB / CMYK. Auto Red обведён рукописным овалом.
//
// Анимация (по ТЗ пользователя): «волна» появления палитры — плитки
// выходят по очереди слева направо, сверху вниз (порядок = порядок
// массива SWATCHES). Для каждой плитки СНАЧАЛА появляется цветной блок,
// ПОТОМ текст внутри него. После всех плиток — рукописный овал Auto Red.
//
// <1440 — единый резиновый flow (без FullBleedScale): раньше 3 холста
// (375/834/1280) держали 14–18.72px текст внутри масштабируемого канваса —
// «плыл» вместе с холстом на промежуточных ширинах. Малые плитки — резиновая
// CSS-сетка (см. TileFluid/SWATCHES_SMALL/ORDER_834 ниже). GSAP-«волны» на
// <1440 нет — только Reveal на доодлах (в макете статично).
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import DrawIn from "@/components/DrawIn";
import { useBreakpoint } from "@/lib/breakpoint";
import { useLang } from "@/lib/lang";
import { C5 } from "../i18n";

const A = "/cases/case-05/sections";

type Swatch = {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  left?: number;
  top?: number;
  big?: boolean;
  dark?: boolean;
};

const SWATCHES: Swatch[] = [
  { name: "Auto Red", hex: "E60000", rgb: "230/0/0", cmyk: "0/100/100/0", left: 46, top: 592.6, big: true, dark: true },
  { name: "T-bank Yellow", hex: "FFDD2D", rgb: "255/221/45", cmyk: "0/13/100/0", left: 386, top: 592.6, big: true },
  { name: "Ivory", hex: "E1E1DB", rgb: "225/225/219", cmyk: "0/0/3/12", left: 726, top: 592.6 },
  { name: "Blush Sand", hex: "E3B7A0", rgb: "227/183/160", cmyk: "0/19/30/11", left: 1066, top: 592.6 },
  { name: "Travertine", hex: "B2AA9A", rgb: "178/170/154", cmyk: "0/4/13/30", left: 726, top: 729.6 },
  { name: "Taupe", hex: "B0977D", rgb: "176/151/125", cmyk: "0/14/29/31", left: 1066, top: 729.6 },
  { name: "Chestnut", hex: "765446", rgb: "118/84/70", cmyk: "0/29/41/54", left: 726, top: 867.6, dark: true },
  { name: "Graphite", hex: "696363", rgb: "105/99/99", cmyk: "0/6/6/59", left: 1066, top: 866.6, dark: true },
  { name: "Espresso", hex: "342C2B", rgb: "52/44/43", cmyk: "0/15/17/80", left: 726, top: 1003.6, dark: true },
  { name: "Black", hex: "000000", rgb: "0/0/0", cmyk: "0/0/0/100", left: 1066, top: 1003.6, dark: true },
];

// Малые плитки — единый исходный порядок (совпадает с 375 И 1280,
// расходится только на 834 — там правится через CSS order, см. ORDER_834).
const SMALL_ORDER = ["Ivory", "Travertine", "Chestnut", "Espresso", "Blush Sand", "Taupe", "Graphite", "Black"];
const SWATCHES_SMALL: Swatch[] = SMALL_ORDER.map((name) => SWATCHES.find((s) => s.name === name)!);
const ORDER_834: Record<string, number> = {
  Ivory: 1,
  Travertine: 2,
  "Blush Sand": 3,
  Taupe: 4,
  Chestnut: 5,
  Espresso: 6,
  Graphite: 7,
  Black: 8,
};

// TileFluid — резиновая плитка палитры (без FullBleedScale): раньше 3
// холста (375/834/1280) держали 14–18.72px текст внутри масштабируемого
// канваса — «плыл» вместе с холстом на промежуточных ширинах. Порядок
// малых плиток на 834 отличается от 375/1280 (не сеткой, а перестановкой) —
// правится через CSS order; grid-позиция на 1280 (col-start/row-start/span)
// — ОБЕ через inline style, вычисленные через useBreakpoint(), а НЕ через
// className: динамические Tailwind-классы вида `lg:row-start-${i+1}`,
// собранные строковой интерполяцией, не находятся статическим сканером
// Tailwind (в исходнике нет буквальной подстроки "row-start-2" и т.п.) —
// класс просто не попадает в собранный CSS, что и ломало сетку (плитки
// проваливались в дефолтный auto-placement). Инлайн-style гарантированно
// работает независимо от сборки.
function TileFluid({
  s,
  big,
  gridCol,
  gridRow,
  gridRowSpan,
}: {
  s: Swatch;
  big?: boolean;
  gridCol?: number;
  gridRow?: number;
  gridRowSpan?: number;
}) {
  const bp = useBreakpoint();
  const isLg = bp === "tabletL";
  const fg = s.dark ? "text-white" : "text-[#121212]";
  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-[14px] p-[18.72px] lg:rounded-[12px] ${fg} ${
        big
          ? "aspect-[335/125] w-full sm:aspect-[381/262] lg:aspect-[291/536]"
          : "aspect-[162/125] min-w-0 flex-1 sm:aspect-[185.5/125] lg:aspect-auto lg:h-full lg:w-full"
      }`}
      style={{
        backgroundColor: `#${s.hex}`,
        order: !big && bp === "tabletP" ? ORDER_834[s.name] : undefined,
        gridColumn: isLg && gridCol ? gridCol : undefined,
        gridRow: isLg && gridRow ? (gridRowSpan ? `${gridRow} / span ${gridRowSpan}` : gridRow) : undefined,
      }}
    >
      <p className="whitespace-nowrap text-[18.72px] leading-[0.9] tracking-[-0.19px] lg:text-[14px] lg:font-medium lg:leading-[1.2] lg:tracking-[0.28px]">
        {s.name}
      </p>
      <div className="flex gap-[9.36px] whitespace-nowrap text-[11.7px] uppercase leading-[1.2] tracking-[0.23px] lg:gap-[9px] lg:text-[9px] lg:leading-[1.55] lg:tracking-[0.18px] lg:opacity-80">
        <div className="flex flex-col">
          <span>HEX</span>
          <span>RGB</span>
          <span>CMYK</span>
        </div>
        <div className="flex flex-col">
          <span>{s.hex}</span>
          <span>{s.rgb}</span>
          <span>{s.cmyk}</span>
        </div>
      </div>
    </div>
  );
}

function Tile({ s }: { s: Swatch }) {
  const w = 328;
  const h = s.big ? 536 : 125;
  const fg = s.dark ? "text-white" : "text-[#121212]";
  return (
    <div
      className={`clr-tile absolute overflow-hidden rounded-[12px] ${fg}`}
      style={{ left: s.left, top: s.top, width: w, height: h, backgroundColor: `#${s.hex}` }}
    >
      <div className="clr-tile-body">
        <p className="absolute left-[18.7px] top-[18.7px] text-[14px] font-medium leading-[1.2] tracking-[0.28px]">
          {s.name}
        </p>
        <div
          className="absolute left-[18.7px] flex gap-[9px] text-[9px] uppercase leading-[1.55] tracking-[0.18px] opacity-80"
          style={s.big ? { bottom: 18.7 } : { top: 64.3 }}
        >
          <div className="flex flex-col">
            <span>HEX</span>
            <span>RGB</span>
            <span>CMYK</span>
          </div>
          <div className="flex flex-col">
            <span>{s.hex}</span>
            <span>{s.rgb}</span>
            <span>{s.cmyk}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Color() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const t = C5[useLang()];

  useGSAP(
    () => {
      if (reduced || !scope.current) return;

      const tiles = gsap.utils.toArray<HTMLElement>(".clr-tile");
      const bodies = gsap.utils.toArray<HTMLElement>(".clr-tile-body");
      const circle = scope.current.querySelector<HTMLElement>(".clr-circle");

      // Начальное состояние — прячем явным set, вскрываем to-твинами.
      // ВАЖНО: clearProps ТОЛЬКО по анимируемым свойствам (opacity/
      // visibility/transform). Раньше стоял clearProps:"all" — он сносил и
      // инлайновый React-style плиток (left/top/width/height/background),
      // из-за чего после анимации цветные блоки полностью исчезали.
      const targets = [...tiles, ...bodies, ...(circle ? [circle] : [])];
      const RESET = "opacity,visibility,transform";
      gsap.set(tiles, { autoAlpha: 0, scale: 0.92 });
      gsap.set(bodies, { autoAlpha: 0, y: 8 });
      if (circle) gsap.set(circle, { autoAlpha: 0, scale: 0.5, rotate: -8 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
      });

      const STEP = 0.12;
      tiles.forEach((tile, i) => {
        tl.to(tile, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)", clearProps: RESET }, i * STEP);
        tl.to(bodies[i], { autoAlpha: 1, y: 0, duration: 0.3, ease: "siteEase", clearProps: RESET }, i * STEP + 0.22);
      });

      if (circle) {
        tl.to(
          circle,
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.55, ease: "back.out(2)", clearProps: RESET },
          ">-0.05",
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        // тир-даун (HMR/размонтирование): гарантированно возвращаем видимость,
        // но НЕ трогаем позиционные/цветовые инлайн-стили React.
        gsap.set(targets, { clearProps: RESET });
      };
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <>
      <div ref={scope} className="relative hidden h-[1265px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
      {/* Дисплейный заголовок (Figma frame 2210:74850 → x46 / y143, 175px). */}
      <div className="absolute left-[46px] top-[143px] flex items-baseline gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <span className="text-[#008cff]">05</span>
        <span className="text-[#121212]">{t.colorHeading}</span>
      </div>

      <div className="absolute left-[46px] top-[364px] flex w-[668px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        <p>
          {t.colorPara1}
        </p>
        <p>{t.colorPara2}</p>
      </div>

      {/* Доодл-«шеврон» (Figma node 2413:4343 → x726 / y347, 158×125). */}
      <DrawIn
            src={`${A}/chevron.svg`}
            fit="contain"
            className="absolute left-[726px] top-[347px] z-10 h-[125px] w-[158px]"
          />

      {SWATCHES.map((s) => (
        <Tile key={s.name} s={s} />
      ))}

      {/* Рукописный овал вокруг Auto Red (Figma node 2289:4284 → x52 / y557).
          Появляется последним — GSAP-таймлайн секции (класс .clr-circle). */}
      <div className="clr-circle pointer-events-none absolute left-[36px] top-[560px] z-10 h-[133px] w-[171px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/color-circle.svg`} />
      </div>
      </div>

      <div className="relative flex w-full flex-col gap-[32px] bg-[#fafafa] px-[19px] py-[64px] sm:gap-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px] lg:py-[72px] xl:hidden">
        <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:gap-[24px] sm:text-[100px] sm:leading-none sm:tracking-[3px] lg:text-[175px] lg:tracking-[5.25px]">
          <span className="text-[#008cff]">05</span>
          <span className="text-[#121212]">{t.colorHeading}</span>
        </div>

        <div className="flex w-[335px] max-w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[776px] lg:w-[594px]">
          <p>{t.colorPara1}</p>
          <p>{t.colorPara2}</p>
        </div>

        {/* Доодл — двойной шеврон вправо — только 1280 (в 834/375 его нет).
            Координаты — фикс-px 1:1 из Figma (frame 2828:45414, node
            2827:44904: секция 611/296.074), НЕ %: родитель — вся секция
            (padding lg:px-40/py-72 уже даёт тот же отсчёт, что и в Figma-
            канвасе), а фикс-px не «плывёт» при изменении высоты контента
            ниже (в отличие от % от переменной общей высоты секции — на
            этом словили баг при первом фиксе грида палитры). */}
        <DrawIn
          src={`${A}/chevron-1280.svg`}
          fit="contain"
          className="pointer-events-none absolute z-10 hidden h-[125px] w-[158px] lg:block"
          style={{ left: 611, top: 296.074 }}
        />

        {/* Рукописный овал вокруг Auto Red — 834/1280 (в 375 его нет).
            Координаты — фикс-px 1:1 из Figma (Vector 234257393: 834 —
            2835:53399 секция 15.836/362.957; 1280 — 2835:53396 секция
            23.836/471.902), относительно всей секции — см. коммент у
            шеврона выше. */}
        <div className="pointer-events-none absolute z-10 hidden h-[69.55px] w-[157.069px] sm:block lg:hidden" style={{ left: 15.836, top: 362.957 }}>
          <DrawIn src={`${A}/color-circle-834.svg`} className="absolute" style={{ inset: "-4.313% -1.91%" }} />
        </div>
        <div className="pointer-events-none absolute z-10 hidden h-[69.55px] w-[157.07px] lg:block" style={{ left: 23.836, top: 471.902 }}>
          <DrawIn src={`${A}/color-circle-1280.svg`} className="absolute" style={{ inset: "-4.313% -1.91%" }} />
        </div>

        {/* Палитра. 375/834 — большие плитки ОТДЕЛЬНЫМ блоком НАД малыми
            (стопкой на 375, рядом на 834; малые — своя сетка ниже). 1280 —
            ОДНА строка из 4 колонок (2 больших + 2 колонки по 4 малых бок о
            бок, не блоками друг под другом — сверено с Figma frame
            2828:45414): обёртки становятся lg:contents, сами плитки несут
            явные col/row-start — реализация через CSS-грид на общем
            родителе. */}
        <div className="flex w-[336px] max-w-full shrink-0 flex-col gap-[12px] sm:w-full lg:grid lg:w-full lg:grid-cols-4 lg:grid-rows-4">
          <div className="flex flex-col gap-[12px] sm:flex-row lg:contents">
            <TileFluid s={SWATCHES[0]} big gridCol={1} gridRow={1} gridRowSpan={4} />
            <TileFluid s={SWATCHES[1]} big gridCol={2} gridRow={1} gridRowSpan={4} />
          </div>
          <div className="grid grid-cols-2 grid-rows-4 gap-[12px] sm:grid-cols-4 sm:grid-rows-2 lg:contents">
            {SWATCHES_SMALL.map((s, i) => (
              <TileFluid key={s.name} s={s} gridCol={i < 4 ? 3 : 4} gridRow={(i % 4) + 1} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
