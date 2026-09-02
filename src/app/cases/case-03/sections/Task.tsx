import Reveal from "@/components/Reveal";
import VariantsCarousel from "@/components/VariantsCarousel";

// 01 Задача — 1:1 из актуальной Figma (node 2079:17694, высота 1672).
// Дисплейный заголовок 175px. Вводный абзац. Фрейм «варианты» (node
// 2079:17726) — общий VariantsCarousel: снап-карусель маркетинговых
// форматов во всю ширину, перетаскивание вбок, бар снизу.
// Ниже — «Система должна была:» + 4 требования с галочками, крупная
// итоговая мысль с подчёркиванием и 3D-стек монет слева.
const A = "/cases/case-03/sections";

const CARDS = [
  { src: `${A}/variant1.jpg`, w: 1419, h: 798, alt: "Слайд презентации: Transparent pricing 0,5–2%" },
  { src: `${A}/variant2.jpg`, w: 639, h: 798, alt: "Пост: Move digital assets with confidence" },
  { src: `${A}/variant3.jpg`, w: 798, h: 798, alt: "Пост: Payments without delays" },
  { src: `${A}/variant4.jpg`, w: 1197, h: 798, alt: "Пост: Real-time transactions" },
];

const REQS: [string, string][] = [
  ["Сохранять", "визуальную целостность"],
  ["Объяснять", "особенности продукта"],
  ["Масштабироваться", "в маркетинговых материалах"],
  ["Использоваться", "на любом фоне"],
];

function Req({ head, sub }: { head: string; sub: string }) {
  return (
    <div className="flex h-[34px] gap-[8px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="h-[34px] w-[28px] shrink-0" src={`${A}/task-check.svg`} />
      <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        {head}
        <br />
        {sub}
      </p>
    </div>
  );
}

export default function Task() {
  return (
    <section className="relative w-full overflow-clip bg-[#fafafa]">
      <div className="relative mx-auto h-[1672px] w-[1440px]">
        <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">01</p>
          <p className="text-[#121212]">Задача</p>
        </div>

        <p className="absolute left-[46px] top-[368px] w-[668px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
          Нужно было создать не набор отдельных иллюстраций, а визуальную систему, которая объясняет
          функциональность продукта без текста и работает в разных форматах и контекстах.
        </p>

        {/* Доодл-«молния» (Figma node 2384:21368 → 1216 / 394). */}
        <Reveal variant="doodle" className="absolute left-[1216px] top-[394px] z-10 h-[121px] w-[93px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/task-doodle-flash.svg`} />
        </Reveal>

        <p className="absolute left-[726px] top-[1140px] w-[564px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
          Система должна была:
        </p>

        <div className="absolute left-[726px] top-[1169px] flex gap-[12px]">
          <div className="flex w-[328px] flex-col gap-[12px]">
            <Req head={REQS[0][0]} sub={REQS[0][1]} />
            <Req head={REQS[1][0]} sub={REQS[1][1]} />
          </div>
          <div className="flex w-[328px] flex-col gap-[12px]">
            <Req head={REQS[2][0]} sub={REQS[2][1]} />
            <Req head={REQS[3][0]} sub={REQS[3][1]} />
          </div>
        </div>

        {/* 3D-стек монет (Figma node 2399:35306, x216 / y1293, 328×328). */}
        <Reveal variant="fade" className="absolute left-[216px] top-[1293px] size-[328px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Стек 3D-монет Stablegate" className="block size-full" src={`${A}/task-coin.jpg`} />
        </Reveal>

        <p className="absolute left-[726px] top-[1369px] w-[624px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
          Каждая иллюстрация должна была объяснять функцию продукта ещё до того, как пользователь
          прочитает текст
        </p>

        {/* Подчёркивание-доодл под итоговой мыслью (Figma node 2384:21369). */}
        <Reveal
          variant="line"
          start="top 92%"
          className="absolute left-[884px] top-[1556px] h-[35px] w-[394px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/task-doodle-arrow.svg`} />
        </Reveal>
      </div>

      {/* Лента «варианты» (Figma node 2079:17726 → y595). */}
      <VariantsCarousel cards={CARDS} top={595} tone="light" />
    </section>
  );
}
