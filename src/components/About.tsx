"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// «о себе» — на ≥1200 абсолют 1:1 из Figma (node 2279:32548, фрейм
// 1440×900). Ниже 1200 внутренняя обёртка становится `contents` и её
// дети раскладываются потоком (стопка с полями сетки) — см. RESPONSIVE.md.
const CLIENT_ROWS: string[][] = [
  ["Яндекс Фабрика", "Яндекс Такси", "Яндекс 360", "Яндекс Cloud", "Яндекс Алиса"],
  ["Яндекс Самокаты", "Яндекс Еда", "Яндекс Лавка", "Stablegate", "МТС", "Т-Банк"],
  ["Звук", "Haier", "УралКалий", "Divan.ru", "Fort Telecom", "Sabotage brewery"],
];

export default function About() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".about-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "siteEase",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 75%",
        },
      });
    },
    { scope },
  );

  return (
    <section
      id="about"
      ref={scope}
      className="relative w-full scroll-mt-16 bg-[#fafafa] xl:mx-auto xl:h-[900px] xl:w-[1440px] xl:overflow-clip"
    >
      <div className="flex flex-col gap-[24px] px-[var(--grid-margin)] py-[56px] sm:py-[72px] xl:contents">
        <p className="about-reveal font-heading text-[28px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212] sm:text-[32px] xl:absolute xl:left-[46px] xl:top-[134px] xl:whitespace-nowrap xl:text-[32px]">
          о себе
        </p>

        {/* Био — два абзаца. На десктопе абсолют (top 181 / 238, w668). */}
        <p className="about-reveal text-[14px] leading-[1.2] tracking-[0.28px] text-[#333] opacity-70 xl:absolute xl:left-[46px] xl:top-[181px] xl:w-[668px]">
          Арт-директор, который сочетает управление командой с практической работой в дизайне.
          Выстраиваю процессы, систематизирую большие объёмы задач и помогаю командам сохранять
          качество и темп работы.
        </p>
        <p className="about-reveal text-[14px] leading-[1.2] tracking-[0.28px] text-[#333] opacity-70 xl:absolute xl:left-[46px] xl:top-[238px] xl:w-[668px]">
          Сам создаю Key Visual, иллюстрации, 3D, иконографику и AI-визуалы: от идеи и поиска
          визуального направления до финального результата. Быстро разбираюсь в сложных задачах,
          беру ответственность за результат и развиваю визуальные направления вместе с командой.
        </p>

        <div className="about-reveal aspect-[498/399] w-full overflow-clip sm:mx-auto sm:w-[420px] xl:absolute xl:left-[896px] xl:top-[318px] xl:!mx-0 xl:aspect-auto xl:!h-[399px] xl:!w-[498px]">
          {/* photo.png — готовый рендер ровно этого контейнера. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Вова Сюзёв" src="/about/photo.png" className="size-full object-cover" />
        </div>

        <div className="about-reveal flex flex-col items-start gap-[6px] xl:absolute xl:left-[46px] xl:top-[592px] xl:w-[722px]">
          {CLIENT_ROWS.map((row, i) => (
            <div key={i} className="flex flex-wrap items-center gap-[6px] xl:flex-nowrap">
              {row.map((client) => (
                <div
                  key={client}
                  className="flex items-center justify-center rounded-[10px] border border-[rgba(50,50,60,0.8)] px-[12px] py-[10px]"
                >
                  <p className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#32323c]">
                    {client}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Доодлы — декоративные, привязаны к десктопным координатам. */}
        <Reveal
          variant="doodle"
          className="hidden xl:absolute xl:left-[562px] xl:top-[674px] xl:block xl:h-[125px] xl:w-[158px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src="/about/doodle-scribble.svg" />
        </Reveal>
        <Reveal
          variant="doodle"
          delay={0.1}
          className="hidden xl:absolute xl:left-[1125.68px] xl:top-[44px] xl:block xl:h-[212.282px] xl:w-[268.324px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src="/about/doodles.svg" />
        </Reveal>
      </div>
    </section>
  );
}
