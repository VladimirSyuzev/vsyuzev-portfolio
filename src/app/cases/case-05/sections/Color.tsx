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
// <1440 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41111,
// 1280×1091): поток flex-col gap-64 px-40 py-72. Заголовок «05 / ЦВЕТ»
// (175px), 2 абзаца w-594, доодл-«шеврон», палитра 1200×536 (2 большие
// плитки 291×536 + 2 столбца по 4 малые 291×125), овал вокруг Auto Red.
// GSAP-«волны» на 1280 нет — только Reveal на доодлах.
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import FullBleedScale from "@/components/FullBleedScale";

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

// Палитра для 1280 (Figma frame 2828:45414, 1200×536). Столбцовый
// порядок: 2 большие 291×536, затем столбец 3 (x606) сверху вниз, затем
// столбец 4 (x909). Плитка 291 шириной, малая 125 высотой, шаг 137.
const SWATCHES_1280: Swatch[] = [
  { name: "Auto Red", hex: "E60000", rgb: "230/0/0", cmyk: "0/100/100/0", left: 0, top: 0, big: true, dark: true },
  { name: "T-bank Yellow", hex: "FFDD2D", rgb: "255/221/45", cmyk: "0/13/100/0", left: 303, top: 0, big: true },
  { name: "Ivory", hex: "E1E1DB", rgb: "225/225/219", cmyk: "0/0/3/12", left: 606, top: 0 },
  { name: "Travertine", hex: "B2AA9A", rgb: "178/170/154", cmyk: "0/4/13/30", left: 606, top: 137 },
  { name: "Chestnut", hex: "765446", rgb: "118/84/70", cmyk: "0/29/41/54", left: 606, top: 274, dark: true },
  { name: "Espresso", hex: "342C2B", rgb: "52/44/43", cmyk: "0/15/17/80", left: 606, top: 411, dark: true },
  { name: "Blush Sand", hex: "E3B7A0", rgb: "227/183/160", cmyk: "0/19/30/11", left: 909, top: 0 },
  { name: "Taupe", hex: "B0977D", rgb: "176/151/125", cmyk: "0/14/29/31", left: 909, top: 137 },
  { name: "Graphite", hex: "696363", rgb: "105/99/99", cmyk: "0/6/6/59", left: 909, top: 274, dark: true },
  { name: "Black", hex: "000000", rgb: "0/0/0", cmyk: "0/0/0/100", left: 909, top: 411, dark: true },
];

// Палитра для 834 (Figma frame 2835:53164, 778×536). 2 большие 381×262
// (gap 12) + сетка 4×2 малых 185.5×125 (шаг 197.5 / 137). Порядок малых —
// столбцовый по 2: Ivory/Chestnut · Travertine/Espresso · Blush/Graphite ·
// Taupe/Black.
const SWATCHES_834: Swatch[] = [
  { name: "Auto Red", hex: "E60000", rgb: "230/0/0", cmyk: "0/100/100/0", left: 0, top: 0, big: true, dark: true },
  { name: "T-bank Yellow", hex: "FFDD2D", rgb: "255/221/45", cmyk: "0/13/100/0", left: 393, top: 0, big: true },
  { name: "Ivory", hex: "E1E1DB", rgb: "225/225/219", cmyk: "0/0/3/12", left: 0, top: 274 },
  { name: "Chestnut", hex: "765446", rgb: "118/84/70", cmyk: "0/29/41/54", left: 0, top: 411, dark: true },
  { name: "Travertine", hex: "B2AA9A", rgb: "178/170/154", cmyk: "0/4/13/30", left: 197.5, top: 274 },
  { name: "Espresso", hex: "342C2B", rgb: "52/44/43", cmyk: "0/15/17/80", left: 197.5, top: 411, dark: true },
  { name: "Blush Sand", hex: "E3B7A0", rgb: "227/183/160", cmyk: "0/19/30/11", left: 395, top: 274 },
  { name: "Graphite", hex: "696363", rgb: "105/99/99", cmyk: "0/6/6/59", left: 395, top: 411, dark: true },
  { name: "Taupe", hex: "B0977D", rgb: "176/151/125", cmyk: "0/14/29/31", left: 592.5, top: 274 },
  { name: "Black", hex: "000000", rgb: "0/0/0", cmyk: "0/0/0/100", left: 592.5, top: 411, dark: true },
];

// Палитра для 375 (Figma frame 2836:53962, 336×810). 2 большие плитки в
// стопку на всю ширину (336×125) + 3 группы по 2 ряда × 2 малые (162×125),
// gap 12 везде. Круга Auto Red и шеврона на 375 нет.
const SWATCHES_375: Swatch[] = [
  { name: "Auto Red", hex: "E60000", rgb: "230/0/0", cmyk: "0/100/100/0", big: true, dark: true },
  { name: "T-bank Yellow", hex: "FFDD2D", rgb: "255/221/45", cmyk: "0/13/100/0", big: true },
  { name: "Ivory", hex: "E1E1DB", rgb: "225/225/219", cmyk: "0/0/3/12" },
  { name: "Travertine", hex: "B2AA9A", rgb: "178/170/154", cmyk: "0/4/13/30" },
  { name: "Chestnut", hex: "765446", rgb: "118/84/70", cmyk: "0/29/41/54", dark: true },
  { name: "Espresso", hex: "342C2B", rgb: "52/44/43", cmyk: "0/15/17/80", dark: true },
  { name: "Blush Sand", hex: "E3B7A0", rgb: "227/183/160", cmyk: "0/19/30/11" },
  { name: "Taupe", hex: "B0977D", rgb: "176/151/125", cmyk: "0/14/29/31" },
  { name: "Graphite", hex: "696363", rgb: "105/99/99", cmyk: "0/6/6/59", dark: true },
  { name: "Black", hex: "000000", rgb: "0/0/0", cmyk: "0/0/0/100", dark: true },
];

function Tile375({ s, big }: { s: Swatch; big?: boolean }) {
  const fg = s.dark ? "text-white" : "text-[#121212]";
  return (
    <div
      className={`flex h-[125px] flex-col justify-between overflow-hidden rounded-[14px] p-[18.72px] ${
        big ? "w-full" : "min-w-0 flex-1"
      } ${fg}`}
      style={{ backgroundColor: `#${s.hex}` }}
    >
      <p className="whitespace-nowrap text-[18.72px] leading-[0.9] tracking-[-0.19px]">{s.name}</p>
      <div className="flex gap-[9.36px] whitespace-nowrap text-[11.7px] uppercase leading-[1.2] tracking-[0.23px]">
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

function Tile834({ s }: { s: Swatch }) {
  const fg = s.dark ? "text-white" : "text-[#121212]";
  return (
    <div
      className={`absolute flex flex-col justify-between overflow-hidden rounded-[14px] p-[18.72px] ${fg}`}
      style={{
        left: s.left,
        top: s.top,
        width: s.big ? 381 : 185.5,
        height: s.big ? 262 : 125,
        backgroundColor: `#${s.hex}`,
      }}
    >
      <p className="whitespace-nowrap text-[18.72px] leading-[0.9] tracking-[-0.19px]">{s.name}</p>
      <div className="flex gap-[9.36px] whitespace-nowrap text-[11.7px] uppercase leading-[1.2] tracking-[0.23px]">
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

function Tile1280({ s }: { s: Swatch }) {
  const h = s.big ? 536 : 125;
  const fg = s.dark ? "text-white" : "text-[#121212]";
  return (
    <div
      className={`absolute overflow-hidden rounded-[12px] ${fg}`}
      style={{ left: s.left, top: s.top, width: 291, height: h, backgroundColor: `#${s.hex}` }}
    >
      <p className="absolute left-[18.72px] top-[18.72px] text-[14px] font-medium leading-[1.2] tracking-[0.28px]">
        {s.name}
      </p>
      <div
        className="absolute left-[18.72px] flex gap-[9px] text-[9px] uppercase leading-[1.55] tracking-[0.18px] opacity-80"
        style={s.big ? { bottom: 18.72 } : { top: 64.28 }}
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
        <span className="text-[#121212]">цвет</span>
      </div>

      <div className="absolute left-[46px] top-[364px] flex w-[668px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        <p>
          Цветовая палитра определялась брифом: в иллюстрации нужно было использовать фирменные
          цвета Авто.ру и Т-Банка — красный и жёлтый. Они стали основой цветового решения всей
          композиции.
        </p>
        <p>
          Главным цветом DeLorean стал фирменный красный Авто.ру — #E60000. Он выделил автомобиль
          как центральный объект и помог сохранить его выразительность даже в небольшом формате.
        </p>
      </div>

      {/* Доодл-«шеврон» (Figma node 2413:4343 → x726 / y347, 158×125). */}
      <Reveal variant="doodle" className="absolute left-[726px] top-[347px] z-10 h-[125px] w-[158px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/chevron.png`} />
      </Reveal>

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

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41111,
          1280×1091). Поток flex-col gap-64 px-40 py-72. */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1091} mode="grow" className="w-full">
          <div className="relative flex h-[1091px] w-[1280px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[40px] py-[72px]">
            {/* Дисплейный заголовок «05 / ЦВЕТ» (Frame 2828:45403, 734×175). */}
            <div className="flex shrink-0 items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-none tracking-[5.25px]">
              <span className="text-[#008cff]">05</span>
              <span className="text-[#121212]">цвет</span>
            </div>

            {/* 2 абзаца (Frame 2828:45407, w-594). */}
            <div className="flex w-[594px] shrink-0 flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              <p>
                Цветовая палитра определялась брифом: в иллюстрации нужно было использовать фирменные
                цвета Авто.ру и Т-Банка — красный и жёлтый. Они стали основой цветового решения всей
                композиции.
              </p>
              <p>
                Главным цветом DeLorean стал фирменный красный Авто.ру — #E60000. Он выделил
                автомобиль как центральный объект и помог сохранить его выразительность даже в
                небольшом формате.
              </p>
            </div>

            {/* Палитра (Frame 2828:45414, 1200×536). */}
            <div className="relative w-[1200px] shrink-0" style={{ height: 536 }}>
              {SWATCHES_1280.map((s) => (
                <Tile1280 key={s.name} s={s} />
              ))}
            </div>

            {/* Доодл — двойной шеврон вправо (doodles 2827:44904, две
                обводки Vector 234257326/327) — секция (611, 296.074),
                158×125. Позиция инлайном: JIT не всегда успевает собрать
                новые arbitrary-классы left/top при HMR. */}
            <Reveal
              variant="doodle"
              className="z-10"
              style={{ position: "absolute", left: 611, top: 296.074, width: 158, height: 125 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={`${A}/chevron-1280.svg`} />
            </Reveal>

            {/* Рукописный овал вокруг Auto Red (Vector 234257393, 2835:53396) —
                секция (23.836, 471.902), 157.07×69.55. */}
            <Reveal
              variant="line"
              start="top 85%"
              className="z-10"
              style={{ position: "absolute", left: 23.836, top: 471.902, width: 157.07, height: 69.55 }}
            >
              <div className="absolute" style={{ inset: "-4.313% -1.91%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-full max-w-none" src={`${A}/color-circle-1280.svg`} />
              </div>
            </Reveal>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-05 · 834» (node 2828:45621,
          834×982). Поток flex-col gap-64 px-28 py-72. Шеврона в 834 нет. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={982} mode="grow" className="w-full">
          <div className="relative flex h-[982px] w-[834px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[28px] py-[72px]">
            {/* Дисплейный заголовок «05 / ЦВЕТ» (Frame 2834:52978), 100px inline. */}
            <div className="flex shrink-0 items-center gap-[24px] whitespace-nowrap font-heading text-[100px] font-bold uppercase leading-none tracking-[3px]">
              <span className="text-[#008cff]">05</span>
              <span className="text-[#121212]">цвет</span>
            </div>

            {/* 2 абзаца (Frame 2834:52982). */}
            <div className="flex w-[776px] shrink-0 flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              <p className="w-[760px]">
                Цветовая палитра определялась брифом: в иллюстрации нужно было использовать фирменные
                цвета Авто.ру и Т-Банка — красный и жёлтый. Они стали основой цветового решения всей
                композиции.
              </p>
              <p className="w-[776px] whitespace-pre-wrap">
                Главным цветом DeLorean стал фирменный красный Авто.ру — #E60000. Он выделил
                автомобиль{" "}
                <br />
                как центральный объект и помог сохранить его выразительность даже в небольшом
                формате.
              </p>
            </div>

            {/* Палитра (Frame 2835:53164, 778×536). */}
            <div className="relative w-[778px] shrink-0" style={{ height: 536 }}>
              {SWATCHES_834.map((s) => (
                <Tile834 key={s.name} s={s} />
              ))}
            </div>

            {/* Рукописный овал вокруг Auto Red (Vector 234257393, 2835:53399) —
                секция (15.836, 362.957), 157.069×69.55. */}
            <Reveal
              variant="line"
              start="top 85%"
              className="z-10"
              style={{ position: "absolute", left: 15.836, top: 362.957, width: 157.069, height: 69.55 }}
            >
              <div className="absolute" style={{ inset: "-4.313% -1.91%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-full max-w-none" src={`${A}/color-circle-834.svg`} />
              </div>
            </Reveal>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-05 · 375» (node 2828:49233,
          375×1187). Поток flex-col gap-32 px-19 py-64. 2 большие плитки в
          стопку на всю ширину + 4 ряда малых 2×2. Круга/шеврона нет. */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={1187} mode="grow" className="w-full">
          <div className="relative flex h-[1187px] w-[375px] flex-col items-center gap-[32px] overflow-clip bg-[#fafafa] px-[19px] py-[64px]">
            {/* Заголовок «05 / ЦВЕТ» inline + 2 абзаца w-335 (Frame 2828:49234, gap 12). */}
            <div className="flex w-[335px] shrink-0 flex-col items-start gap-[12px] [word-break:break-word]">
              <div className="flex items-start gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase">
                <span className="leading-none text-[#008cff]">05</span>
                <span className="leading-[1.1] tracking-[0.78px] text-[#121212]">цвет</span>
              </div>
              <div className="flex w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <p>
                  Цветовая палитра определялась брифом: в иллюстрации нужно было использовать
                  фирменные цвета Авто.ру и Т-Банка — красный и жёлтый. Они стали основой цветового
                  решения всей композиции.
                </p>
                <p className="whitespace-pre-wrap">
                  Главным цветом DeLorean стал фирменный красный Авто.ру — #E60000. Он выделил
                  автомобиль как центральный объект{" "}
                  <br />и помог сохранить его выразительность даже в небольшом формате.
                </p>
              </div>
            </div>

            {/* Палитра (Frame 2836:53962, 336×810). */}
            <div className="flex w-[336px] shrink-0 flex-col gap-[12px]">
              <Tile375 s={SWATCHES_375[0]} big />
              <Tile375 s={SWATCHES_375[1]} big />
              {[
                [2, 3],
                [4, 5],
                [6, 7],
                [8, 9],
              ].map(([a, b]) => (
                <div key={a} className="flex gap-[12px]">
                  <Tile375 s={SWATCHES_375[a]} />
                  <Tile375 s={SWATCHES_375[b]} />
                </div>
              ))}
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
