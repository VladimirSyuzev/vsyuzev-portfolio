import Reveal from "@/components/Reveal";

// 04 Серия сценариев — 1:1 из Figma (node 2034:15790, высота 1262).
// Заголовок «04 СЕРИЯ СЦЕНАРИЕВ» (32px), два абзаца, два KV-постера
// (автомобиль и яхта, растр), доодл-«шеврон» и крупная мысль в обводке.
const A = "/cases/case-04/sections";

export default function Series() {
  return (
    <div className="relative h-[1262px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">04</p>
        <p className="text-[#121212]">Серия сценариев</p>
      </div>

      <div className="absolute left-[46px] top-[181px] flex w-[668px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        <p>
          После первого KV визуальная система была расширена на другие сценарии: автомобиль и яхту.
          Они показывают разные возможности продукта, сохраняя единый принцип построения.
        </p>
        <p>
          Во всех визуалах повторяется одна формула: человек, телефон и объект покупки объединены
          общей композицией и типографической системой. Меняется сценарий, но визуальный язык
          остаётся узнаваемым.
        </p>
      </div>

      {/* Два KV-постера (Figma frames 2115:30599 / 2115:30938 → y318, 668×446). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="KEY VISUAL Stablegate: сценарий с автомобилем"
        className="absolute left-[46px] top-[318px] h-[446px] w-[668px] object-cover"
        src={`${A}/series-1.jpg`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="KEY VISUAL Stablegate: сценарий с яхтой"
        className="absolute left-[726px] top-[318px] h-[446px] w-[668px] object-cover"
        src={`${A}/series-2.jpg`}
      />

      {/* Доодл-«шеврон» (Figma node 2284:40000 → x641 / y764, 158×125). */}
      <Reveal variant="doodle" className="absolute left-[641px] top-[764px] z-10 h-[125px] w-[158px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/chevron.png`} />
      </Reveal>

      {/* Обводка-эллипс вокруг мысли (Figma node 2401:35698 → x245 / y975, 949×164). */}
      <Reveal variant="line" start="top 90%" className="absolute left-[245px] top-[975px] h-[164px] w-[949px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/series-ellipse.svg`} />
      </Reveal>
      {/* Мысль (Figma node 2401:35697 → x216 / y1003, w1008, по центру). */}
      <p className="absolute left-1/2 top-[1003px] w-[900px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Один принцип позволил рассказывать разные истории в рамках одной кампании
      </p>
    </div>
  );
}
