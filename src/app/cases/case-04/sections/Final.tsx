import Reveal from "@/components/Reveal";

// 06 Финальный результат — 1:1 из Figma (node 2034:15810, высота 1265).
// Заголовок «06 ФИНАЛЬНЫЙ РЕЗУЛЬТАТ» (32px), два абзаца, доодл-стрелка,
// финальный билборд (растр) и крупная мысль с доодлом-«шевроном».
const A = "/cases/case-04/sections";

export default function Final() {
  return (
    <div className="relative h-[1265px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[16px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">06</p>
        <p className="text-[#121212]">Финальный результат</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        В результате появилась единая outdoor-система, которая объединяет разные жизненные сценарии
        в узнаваемую коммуникацию Stablegate.
      </p>
      <p className="absolute left-[46px] top-[224px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Система уже охватывает недвижимость, автомобиль и яхту и может масштабироваться на новые
        сюжеты вместе с развитием продукта. Каждый новый KV сохраняет общий визуальный характер, но
        получает собственный контекст и историю.
      </p>

      {/* Доодл-стрелка (Figma node 2284:40011 → x906 / y169, 167×137). */}
      <Reveal variant="doodle" className="absolute left-[906px] top-[169px] z-10 h-[137px] w-[167px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/final-arrow.svg`} />
      </Reveal>

      {/* Финальный билборд (Figma frame 2206:44755 → x48 / y319, 1346×535). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Финальный билборд Stablegate на фасаде здания"
        className="absolute left-[48px] top-[319px] h-[535px] w-[1346px] object-cover"
        src={`${A}/final-billboard.jpg`}
      />

      {/* Доодл-«шеврон» (Figma node 2402:35708 → x46 / y993, 158×125). */}
      <Reveal variant="doodle" className="absolute left-[46px] top-[993px] z-10 h-[125px] w-[158px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/chevron.png`} />
      </Reveal>
      {/* Мысль (Figma node 2401:35703 → x726 / y1003, w633). */}
      <p className="absolute left-[726px] top-[1003px] w-[633px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Кампания может расти вместе с продуктом, сохраняя единый визуальный язык
      </p>
      {/* Декоративная линия-подчёркивание под мыслью (Figma node 2439:54105
          → x853.85 / y1088, экспорт 524×33). */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute"
        style={{ left: 853.85, top: 1088, width: 524, height: 33 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full" src={`${A}/final-underline.svg`} />
      </Reveal>
    </div>
  );
}
