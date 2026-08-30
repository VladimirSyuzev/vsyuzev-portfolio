"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// «о себе» — 1:1 из Figma (node 2279:32548), фрейм 1440×900.
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
    { scope }
  );

  return (
    <div id="about" ref={scope} className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa] scroll-mt-16">
      <p className="about-reveal absolute left-[46px] top-[134px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
        о себе
      </p>

      <div className="about-reveal absolute left-[896px] top-[318px] h-[399px] w-[498px] overflow-clip">
        {/* photo.png — уже готовый рендер ровно этого контейнера (снят через
            get_screenshot по самому контейнеру, а не исходный
            неоткадрированный слой) — доп. кроп/трансформация поверх не нужна. */}
        <img alt="Вова Сюзёв" src="/about/photo.png" className="size-full object-cover" />
      </div>

      <Reveal variant="doodle" className="absolute left-[562px] top-[674px] h-[125px] w-[158px]">
        <img alt="" className="block size-full max-w-none" src="/about/doodle-scribble.svg" />
      </Reveal>

      <Reveal variant="doodle" delay={0.1} className="absolute left-[1125.68px] top-[44px] h-[212.282px] w-[268.324px]">
        <img alt="" className="block size-full max-w-none" src="/about/doodles.svg" />
      </Reveal>

      {/* Био — два отдельных абзаца (Figma node 2279:32562 / 2397:22399,
          top 181 / 238, ширина 668). */}
      <p className="about-reveal absolute left-[46px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#333] opacity-70">
        Арт-директор, который сочетает управление командой с практической работой в дизайне.
        Выстраиваю процессы, систематизирую большие объёмы задач и помогаю командам сохранять
        качество и темп работы.
      </p>
      <p className="about-reveal absolute left-[46px] top-[238px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#333] opacity-70">
        Сам создаю Key Visual, иллюстрации, 3D, иконографику и AI-визуалы: от идеи и поиска
        визуального направления до финального результата. Быстро разбираюсь в сложных задачах,
        беру ответственность за результат и развиваю визуальные направления вместе с командой.
      </p>

      <div className="about-reveal absolute left-[46px] top-[592px] flex w-[722px] flex-col items-start gap-[6px]">
        {CLIENT_ROWS.map((row, i) => (
          <div key={i} className="flex items-center gap-[6px]">
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
    </div>
  );
}
