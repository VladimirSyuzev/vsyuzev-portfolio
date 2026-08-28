"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import StatsIcons from "./StatsIcons";

// С1-02 Stats — занимает весь экран (min-h-screen), цифры статистики по
// центру блока. При появлении блока — стаггер-ревил колонок (цифра +
// подпись), снизу вверх, шаг ~55ms (Emil: короткий стаггер, ease-out).
const STATS = [
  { value: "1.5", label: "недели на аудит\nбиблиотеки" },
  { value: "226", label: "иконок\nпроверено" },
  { value: "65", label: "готовых\nиконок" },
  { value: "161", label: "иконоку нужно\nбыло создать" },
  { value: "194", label: "варианта\nразмера иконок" },
  { value: "150+", label: "иконок\nсоздано и обновлено" },
];

export default function Stats() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const cols = gsap.utils.toArray<HTMLElement>(".stat-col", scope.current);
      const tw = gsap.from(cols, {
        opacity: 0,
        y: 24,
        duration: 0.55,
        ease: "siteEase",
        stagger: 0.055,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: scope.current, start: "top 70%", once: true },
      });
      return () => {
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    },
    { dependencies: [reduced] },
  );

  return (
    <div ref={scope} data-snap-stop className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#fc3f1d]">
      <StatsIcons />

      <div className="relative z-10 mx-auto w-[1440px] shrink-0 pl-[216px]">
        <div className="flex w-[1008px] text-white">
          {STATS.map((stat) => (
            <div key={stat.value} className="stat-col flex w-[170px] flex-col items-start gap-[8px]">
              <p className="whitespace-nowrap font-heading text-[52px] font-bold">{stat.value}</p>
              <p className="whitespace-pre-line text-[14px] leading-[1.2] tracking-[0.28px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
