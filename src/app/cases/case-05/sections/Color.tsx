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
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

const A = "/cases/case-05/sections";

type Swatch = {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  left: number;
  top: number;
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

      // Начальное состояние — прячем явным set (не через from), а вскрываем
      // to-твинами. from со скрытым start-state при обрыве таймлайна (HMR,
      // resize, refresh ScrollTrigger) оставлял visibility:hidden на
      // .clr-tile-body — и текст «пропадал» у первых плиток навсегда.
      const targets = [...tiles, ...bodies, ...(circle ? [circle] : [])];
      gsap.set(tiles, { autoAlpha: 0, scale: 0.92, transformOrigin: "50% 50%" });
      gsap.set(bodies, { autoAlpha: 0, y: 8 });
      if (circle) gsap.set(circle, { autoAlpha: 0, scale: 0.5, rotate: -8, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: "top 60%", once: true },
      });

      const STEP = 0.12;
      tiles.forEach((tile, i) => {
        tl.to(tile, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, i * STEP);
        tl.to(bodies[i], { autoAlpha: 1, y: 0, duration: 0.3, ease: "siteEase" }, i * STEP + 0.22);
      });

      if (circle) {
        tl.to(
          circle,
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.55, ease: "back.out(2)" },
          ">-0.05",
        );
      }

      // Страховка: при финише таймлайна снимаем инлайновые стили, а при
      // любом тир-дауне гарантированно возвращаем всё в видимое состояние.
      tl.eventCallback("onComplete", () => gsap.set(targets, { clearProps: "all" }));

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(targets, { clearProps: "all" });
      };
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <div ref={scope} className="relative h-[1265px] w-[1440px] overflow-clip bg-[#fafafa]">
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
  );
}
