"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion, waveStagger } from "@/lib/gsap";
import BalanceBoard1 from "./BalanceBoard1";
import BalanceBoard2 from "./BalanceBoard2";
import Reveal from "@/components/Reveal";

// 06 Контроль консистентности — 1:1 из Figma (node 1961:32477), полностью
// пересверено повторным запросом после переподключения Figma MCP —
// расхождений оказалось много:
// - обе Balance Board стояли не на своих местах и не того размера (386/896
//   вместо 46/386, 498px вместо 328px — см. поправку масштаба в самих
//   компонентах BalanceBoard1/2.tsx) и были перепутаны местами (bAAALANCE_1
//   с медицинскими иконками — слева, bAAALANCE_2 с категориями сервиса —
//   справа от неё, было наоборот);
// - вторая фраза "Именно этот инструмент..." была маленьким серым текстом
//   рядом с первым абзацем — на деле это отдельная крупная жирная цитата
//   (Body/Bold, 32px, справа у BalanceBoard2), а первый абзац сам по себе
//   стоит наверху (top-181), а не внизу (top-638);
// - двух декоративных элементов не было вообще (доодл-«глаз» справа сверху
//   и рукописное подчёркивание под цитатой); старый consistency-doodle.svg
//   слева снизу не соответствовал ничему в текущем дереве Figma — убран.
//
// Фон растянут на весь экран (w-full, как Pipeline/Footer/Итог) — стоящее
// правило для всех тёмных/картиночных блоков сайта.
export default function Consistency() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // «Волна» по каждой иконке обеих Balance Board — диагональный reveal
  // (waveStagger, 5 колонок на доску; вторая доска идёт следом, продолжая
  // диагональ). Иконки появляются по отдельности.
  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const tw = gsap.from(".bb-icon", {
        opacity: 0,
        scale: 0.55,
        duration: 0.4,
        ease: "siteEase",
        stagger: waveStagger(5, 0.028),
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: scope.current, start: "top 68%", once: true },
      });
      return () => {
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <div ref={scope} className="relative h-[900px] w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-full w-[1440px]">
        {/* Заголовок — стопкой: «06 / КОНТРОЛЬ / КОНСИСТЕНТНОСТИ» (Figma
            node 2359:3916, 32px, top 64). */}
        <div className="absolute left-[46px] top-[64px] flex flex-col font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
          <span className="whitespace-nowrap text-[#008cff]">06</span>
          <span className="whitespace-nowrap text-white">КОНТРОЛЬ</span>
          <span className="whitespace-nowrap text-white">КОНСИСТЕНТНОСТИ</span>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Чтобы новые иконки оставались частью единой системы, мы использовали несколько
          инструментов проверки. Главным из них стал Balance Board: общая сетка, в которой
          существующие и новые иконки можно было сравнить между собой в одном контексте.
          <br />
          Это позволяло быстро оценить их визуальный вес, пропорции, толщину линий, характер
          скруглений и общий баланс библиотеки.
        </p>

        {/* Balance Board: после переверстки обе доски уехали вправо
            (Figma node 2359:3981 «bAAALANCE_1», медицинские иконки — слева
            на x726; node 2359:3921 «bAAALANCE_2», категории сервиса —
            справа на x1066). */}
        <div className="absolute left-[726px] top-[389px] size-[328px] overflow-hidden">
          <BalanceBoard1 />
        </div>
        <div className="absolute left-[1066px] top-[389px] size-[328px] overflow-hidden">
          <BalanceBoard2 />
        </div>

        {/* Крупная фраза — Wix Madefor Display Regular, 32px (Figma node
            2359:4039, left 46, top 581.98, три строки). */}
        <p className="absolute left-[46px] top-[581.98px] w-[578.354px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Balance Board помогал находить несоответствия
          <br />
          и принимать решения ещё
          <br />
          до передачи работы клиенту
        </p>

        {/* Доодл-«глаз» — x/y 1:1 из Figma (node 2285:45879 → 1136.2/229). */}
        <Reveal variant="doodle" className="absolute left-[1136.2px] top-[229px] flex h-[155.398px] w-[180.731px] items-center justify-center">
          <img alt="" className="block h-[93.828px] w-[150.421px] max-w-none" src="/cases/case-01/sections/consistency-eye-doodle.svg" />
        </Reveal>

        {/* Рукописное подчёркивание под цитатой (Figma node 2359:4041) —
            плоская линия с лёгким наклоном вверх-вправо, узел рендерится
            как 524×28 (reported «rotate 2.73° / 71px» — артефакт bbox
            волнистого path). */}
        <Reveal
          variant="line"
          className="absolute"
          style={{ left: 152, top: 723, width: 518, height: 31 }}
        >
          <img alt="" className="block size-full" src="/cases/case-01/sections/consistency-underline.svg" />
        </Reveal>
      </div>
    </div>
  );
}
