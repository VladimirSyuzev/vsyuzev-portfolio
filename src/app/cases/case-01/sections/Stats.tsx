"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import { useCanvasWide, useMinWidth } from "@/lib/breakpoint";
import { useLang } from "@/lib/lang";
import { C1 } from "../i18n";
import StatsIcons from "./StatsIcons";

// С1-02 Stats — фон #fc3f1d + текстура иконок. Цифры по центру блока.
// Появление — стаггер-ревил колонок снизу вверх.
//
// Фон — построчная панорама (StatsIcons) на ВСЕХ брейкпоинтах, своя
// текстура под каждый размер, без инсета — иконки всегда до края блока.
// Разрыв под цифры внутри текстуры центрируется по offY (см. StatsIcons.tsx),
// сами цифры — отдельным слоем поверх, всегда строго по центру блока.
//
// Цифры — 4 ячейки (Figma nodes 3101:14803 / 16140 / 15002 / 16168 — 1440 /
// 1280 / 834 / 375). Ряд ВСЕГДА просто центрирован по горизонтали (offset в
// метаданных Figma точно равен (ширина_фрейма-824)/2 на 1440/1280/834 и
// (375-272)/2 на 375 — без асимметричных сдвигов, в отличие от старой
// 6-ячеечной раскладки). 1440/1280 — идентичны: ряд, gap 64, ячейка 158×120,
// число 52px. 834 — ряд, gap 32, та же ячейка/число (контейнер шире ряда —
// нужен justify-center). 375 — сетка 2×2, gap 32/32, ячейка 120×72, число 26px.
// Подписи — жёсткие переносы (в Figma это не автоперенос).
const VALUES = ["1.5", "300+", "150+", "200+"];

export default function Stats() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const wide = useCanvasWide();
  const lg = useMinWidth(1024);
  const sm = useMinWidth(640);
  const texVariant = wide ? "desktop" : lg ? "1280" : sm ? "834" : "375";
  const lang = useLang();
  const STATS = VALUES.map((value, i) => ({ value, label: C1[lang].stats[i] }));

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

      {/* цифры — ряд/сетка всегда просто центрированы по горизонтали
          (см. коммент выше). 375 — сетка 2×2; sm..lg (834, 640-1023) — ряд,
          gap плавно сужается с 32px (1023) до 12px (640) вместе с экраном,
          дальше блок перестраивается в сетку 375; lg+ — фиксированный gap
          64 (1280, 1440). */}
      <div className="relative z-10 flex w-full justify-center">
        <div className="grid grid-cols-2 gap-x-[32px] gap-y-[32px] text-white sm:flex sm:flex-nowrap sm:gap-[clamp(12px,5.222vw_-_21.42px,32px)] lg:gap-[64px]">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="stat-col flex w-[120px] shrink-0 flex-col gap-[6px] overflow-hidden sm:w-[158px]"
            >
              <p className="whitespace-nowrap font-heading text-[26px] font-bold leading-none sm:text-[52px]">
                {stat.value}
              </p>
              <div className="text-[14px] leading-[1.2] tracking-[0.28px]">
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
