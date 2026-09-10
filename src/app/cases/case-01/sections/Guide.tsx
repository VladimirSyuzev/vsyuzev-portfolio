"use client";

// «Гайд» — плотный аннотированный коллаж страниц внутреннего гайда
// (пиксельная сетка компонента, примеры ресайза, три состояния
// «Плохо / Хорошо / Круто»).
// ≥1440 (node 1961:32453) — единый SVG-экспорт карточки, тянется по ширине.
// <1440 (node 2559:11210) — секция 375×366, pad 64/20. Коллаж по умолчанию
// вписан по ширине (335), по нажатию РАСКРЫВАЕТСЯ до 1:1 (Гайд.svg, 800×571)
// в горизонтально-прокручиваемом окне — чтобы прочитать мелкие детали.
import { useState } from "react";
import { useCanvasWide, useMinWidth } from "@/lib/breakpoint";
import { useLang } from "@/lib/lang";
import { C1 } from "../i18n";

const R = "/cases/case-01/sections/reflow";

export default function Guide() {
  const wide = useCanvasWide();
  const sm = useMinWidth(640);
  const [open, setOpen] = useState(false);
  const t = C1[useLang()];
  const ALT = t.guidePagesCaption;

  // 834 — карточка целиком из макета (Гайд_1.svg 1008×719, аспект 1.402).
  // 834: pad 72/28, ширина 778. 1280: pad 72/40, ширина 1008 по центру
  // (Figma 2534:9044 → Frame 2147231468 1008×719). Без «раскрыть».
  if (!wide && sm) {
    return (
      <section className="flex w-full justify-center bg-[#fafafa] px-[28px] py-[72px] lg:px-[40px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${R}/guide-834.svg`} alt={ALT} className="block w-[778px] max-w-full lg:w-[1008px]" />
      </section>
    );
  }

  if (!wide) {
    return (
      <section className="w-full bg-[#fafafa] px-[20px] py-[64px]">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={t.tapToExpand}
          className={`group relative block w-full ${open ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        >
          <div className={`no-scrollbar w-full ${open ? "overflow-x-auto" : "overflow-hidden"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${R}/guide-375.svg`}
              alt={ALT}
              width={800}
              height={571}
              className={`block h-auto max-w-none transition-[width] duration-[500ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                open ? "w-[800px]" : "w-[335px]"
              }`}
            />
          </div>
          {!open && (
            <span className="pointer-events-none absolute bottom-[10px] right-[10px] rounded-full bg-[#121212]/80 px-[10px] py-[4px] text-[11px] font-medium uppercase tracking-[0.22px] text-white">
              {t.tapToExpand}
            </span>
          )}
        </button>
      </section>
    );
  }

  return (
    <div className="flex w-full items-center justify-center overflow-clip bg-[#fafafa] py-[72px] xl:h-[1126px] xl:py-0">
      <div className="w-full max-w-[1008px] px-[var(--grid-margin)] xl:px-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cases/case-01/sections/guide-real.svg" alt={ALT} className="block w-full" />
      </div>
    </div>
  );
}
