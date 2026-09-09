"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import { useCanvasWide, useMinWidth } from "@/lib/breakpoint";
import StatsIcons from "./StatsIcons";

// С1-02 Stats — фон #fc3f1d + текстура иконок. Цифры по центру блока.
// Появление — стаггер-ревил колонок снизу вверх.
//
// Фон — построчная панорама (StatsIcons) на ВСЕХ брейкпоинтах:
//  ≥1440 — stats-icons.svg (3001×1270).
//  <1440 (375/834/1280) — иконки_1280.svg (2227×877), variant="reflow".
//
// Цифры (Figma 2559:11013 / 2539:8992):
//  375: «2×3», контейнер 252, кол-во 120, gap 12/12, число Wix Bold 26, подпись 14, w159.
//  834: «3×2», контейнер 528, колонка 160, row-gap 32 / col-gap 24, число Wix Bold 52,
//       подпись Aeonik Reg 14 / lh 120% / ls 0.28, w160, gap 8. Секция 834×900, pad 180/28.
//  Подписи — жёсткие переносы (в Figma это не автоперенос).
const STATS: { value: string; label: [string, string] }[] = [
  { value: "1.5", label: ["недели на аудит", "библиотеки"] },
  { value: "226", label: ["иконок", "проверено"] },
  { value: "65", label: ["готовых", "иконок"] },
  { value: "161", label: ["иконок нужно", "было создать"] },
  { value: "194", label: ["варианта", "размера иконок"] },
  { value: "150+", label: ["иконок создано", "и обновлено"] },
];

export default function Stats() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const wide = useCanvasWide();
  const lg = useMinWidth(1024);
  const sm = useMinWidth(640);
  const texVariant = wide ? "desktop" : lg ? "1280" : sm ? "834" : "375";

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const tweens: gsap.core.Tween[] = [];

      const cols = gsap.utils.toArray<HTMLElement>(".stat-col", scope.current);
      const reveal = gsap.from(cols, {
        opacity: 0,
        y: 24,
        duration: 0.55,
        ease: "siteEase",
        stagger: 0.055,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: scope.current, start: "top 70%", once: true },
      });
      tweens.push(reveal);

      return () => {
        reveal.scrollTrigger?.kill();
        tweens.forEach((t) => t.kill());
      };
    },
    { dependencies: [reduced] },
  );

  return (
    <div
      ref={scope}
      data-snap-stop
      className="relative flex min-h-[636px] w-full items-center justify-center overflow-hidden bg-[#fc3f1d] px-[20px] py-[80px] sm:min-h-[900px] sm:px-[28px] sm:py-[180px] lg:min-h-[842px] lg:px-[40px] xl:min-h-screen xl:px-0 xl:py-0"
    >
      {/* фон-текстура — построчная панорама на всех брейкпоинтах, своё
          изображение под каждый размер (иконки_375/834/1280.svg). */}
      <StatsIcons variant={texVariant} />

      {/* цифры — по центру блока (Figma «цифры 3×2», align CENTER).
          375 «2×3» (252) · 834 «3×2» (528) · 1280 ряд из 6 (1080) · ≥1440 ряд из 6 */}
      <div className="relative z-10 flex justify-center xl:block xl:w-full xl:max-w-[1440px] xl:pl-[216px]">
        <div className="flex w-[252px] flex-wrap content-start items-start gap-[12px] text-white sm:w-[528px] sm:gap-x-[24px] sm:gap-y-[32px] lg:w-[1080px] lg:max-w-full lg:flex-nowrap lg:gap-y-0 xl:w-[1008px] xl:gap-0">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="stat-col flex w-[120px] shrink-0 flex-col gap-[6px] overflow-hidden sm:w-[160px] sm:gap-[8px] xl:w-[170px]"
            >
              <p className="whitespace-nowrap font-heading text-[26px] font-bold leading-none sm:text-[52px]">
                {stat.value}
              </p>
              <div className="w-[159px] text-[14px] leading-[1.2] tracking-[0.28px] sm:w-[160px] xl:w-[170px]">
                <p>{stat.label[0]}</p>
                <p>{stat.label[1]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
