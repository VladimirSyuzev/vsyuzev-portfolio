import Reveal from "@/components/Reveal";
import Dot from "@/components/Dot";

// 01 Исследование — 1:1 из Figma (node 2210:74416, высота 1264).
// Заголовок «01 ИССЛЕДОВАНИЕ» (32px), два вводных абзаца, список из пяти
// ключевых признаков DeLorean, фото-референсы (растр), доодл-«лупа» и
// крупная мысль с двойным подчёркиванием.
const A = "/cases/case-05/sections";

const BULLETS = [
  "характерную форму передней части;",
  "прямоугольные фары",
  "двери типа Gullwing",
  "геометрию бокового остекления",
  "общий силуэт кузова",
];

export default function Research() {
  return (
    <div className="relative h-[1264px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-[#121212]">Исследование</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Мне достался DeLorean — автомобиль, ставший частью массовой культуры благодаря фильму
        «Назад в будущее».
      </p>
      <p className="absolute left-[46px] top-[227px] w-[476px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Я начал с изучения фотографий, чтобы понять, какие элементы делают автомобиль узнаваемым
        даже при сильной авторской интерпретации.
      </p>

      {/* Список признаков (Figma frame 2210:79855 → x46 / y455). */}
      <div className="absolute left-[46px] top-[455px] flex w-[328px] flex-col gap-[12px]">
        <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          В результате выделил несколько ключевых особенностей:
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
        alt="Фотографии DeLorean DMC-12 с открытыми дверями Gullwing"
        className="absolute left-[556px] top-[181px] h-[262px] w-[838px] object-cover"
        src={`${A}/research-top.jpg`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Референсный рисунок DeLorean DMC-12 в три четверти"
        className="absolute left-[556px] top-[455px] h-[399px] w-[838px] object-cover"
        src={`${A}/research-bottom.jpg`}
      />

      {/* Доодл-«лупа» (Figma node 2412:4334 → x897 / y866, 158×125). */}
      <Reveal variant="doodle" className="absolute left-[897px] top-[866px] z-10 h-[125px] w-[158px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/magnifier.png`} />
      </Reveal>

      {/* Крупная мысль (Figma node 2411:4290 → x46 / y1003, w888). */}
      <p className="absolute left-[46px] top-[1003px] w-[888px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Узнаваемость автомобиля строится на нескольких ключевых признаках, а не на точном
        копировании каждой детали
      </p>
      {/* Двойное подчёркивание (Figma nodes 2284:40129 / 2284:40174). */}
      <Reveal variant="line" start="top 92%" className="absolute left-[296px] top-[1120px] h-[35px] w-[663px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/research-underline1.svg`} />
      </Reveal>
      <Reveal variant="line" delay={0.1} start="top 92%" className="absolute left-[425px] top-[1134px] h-[49px] w-[578px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/research-underline2.svg`} />
      </Reveal>
    </div>
  );
}
