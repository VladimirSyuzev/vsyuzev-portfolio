"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import GlassBubble from "@/components/GlassBubble";
import EdgeFade from "@/components/EdgeFade";
import { useDrag } from "@/lib/useDrag";
import { useLang } from "@/lib/lang";
import { C1 } from "../i18n";

// 04 Построение процесса — 1:1 из Figma (node 1961:32083, трек "Процесс"
// node 1971:64076). Тёмный фон блока растянут на весь экран (как Footer);
// окно прокрутки трека — тоже во всю ширину (w-full), но с отзывчивыми
// padding-left/right (см. ниже), а не голым left:0..w-full — первая
// карточка выровнена строго под заголовком на ЛЮБОЙ ширине экрана, а
// последняя останавливается по центру экрана, а не у самого края.
// Заголовок/фон/стрелки остаются в центрированной 1440-сетке (их
// координаты в Figma заданы именно относительно неё), а трек — прямой
// ребёнок full-width секции.
//
// Интеракция: наведение курсора на трек + колесо мыши — трек едет
// ГОРИЗОНТАЛЬНО (нативный scrollLeft, без пина всей секции). Как только
// курсор уходит с трека — колесо снова листает страницу вертикально как
// обычно, и появляется следующий блок «Руководство для команды». На
// границах трека (в начале/конце) колесо тоже отдаётся странице, чтобы не
// превращать трек в ловушку для скролла.
const CATEGORY_STYLE = {
  design: { border: "#008cff", text: "#008cff" },
  artDirector: { border: "#1dbb71", text: "#1dbb71" },
  client: { border: "#805bff", text: "#805bff" },
} as const;

type Step = { number: string; category: keyof typeof CATEGORY_STYLE; offset?: number };

const STEPS: Step[] = [
  { number: "01", category: "design" },
  { number: "02", category: "design" },
  { number: "03", category: "artDirector", offset: 137 },
  { number: "04", category: "client", offset: 274 },
  { number: "05", category: "design" },
  { number: "06", category: "artDirector", offset: 137 },
  { number: "07", category: "client", offset: 274 },
  { number: "08", category: "design" },
  { number: "09", category: "artDirector", offset: 137 },
  { number: "10", category: "client", offset: 274 },
  { number: "11", category: "design" },
  { number: "12", category: "client", offset: 274 },
];

const PITCH = 340; // шаг между карточками (совпадает с x в Figma: 0,340,680…3740)

export default function Pipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Отступы трека считаются в JS, а не через vw в CSS: 100vw включает
  // ширину системного скроллбара, а mx-auto-центрирование 1440-сетки —
  // нет, из-за чего vw-формула давала расхождение ~7-17px (на разных ОС/
  // браузерах по-разному) между первой карточкой и заголовком. Меряем
  // РЕАЛЬНУЮ ширину секции (clientWidth, без скроллбара) — то же число,
  // что использует mx-auto — и считаем отступы от него: точное совпадение
  // на любой системе.
  // Дефолт до первого замера ResizeObserver — как если бы секция была
  // ровно 1440px (канонический размер макета), чтобы не было заметного
  // скачка при монтировании на самой частой ширине экрана.
  const [padding, setPadding] = useState({ left: 46, top: 40, width: 1440 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (!w) return;
      const gutter = Math.max(0, (w - 1440) / 2);
      // Левый отступ первой карточки: 375 — x20; 640…1023 — x28; 1024…1439 —
      // x40 (макет 1280, трек на грид-марджине); ≥1440 — 46 + гаттер.
      // Верхний отступ трека: 640…1439 — карточки начинаются ниже
      // (полосатая подложка просвечивает сверху).
      const mid = w >= 640 && w < 1440;
      setPadding({
        left: w >= 1440 ? 46 + gutter : w >= 1024 ? 40 : w >= 640 ? 28 : 20,
        top: mid ? 130 : 40,
        width: w,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Перетаскивание вбок вместо колеса (см. useDrag) — БЕЗ нативного скролла
  // (не overflow-x-auto/scrollLeft), точно так же, как в VariantsCarousel:
  // индекс карточки + transform: translateX(), трек «catch»-ится в
  // overflow-hidden. Раньше был нативный scrollLeft, которым мы рулили
  // руками через JS — на реальных touch-устройствах это на практике
  // конфликтовало с системными жестами/инерцией браузера и обратная
  // прокрутка не проходила, хотя вся арифметика (проверено симуляцией)
  // была верна в обе стороны. Без native-scroll конфликтовать нечему.
  //
  // На отпускании — РОВНО один шаг ±1 карточка (или 0, если палец прошёл
  // мало): dx <= -70 || vx <= -0.4 → шаг, порог тот же, что в «Вариантах».
  const [index, setIndex] = useState(0);
  const idxRef = useRef(0);
  const [dragDX, setDragDX] = useState(0);
  useEffect(() => {
    idxRef.current = index;
  }, [index]);

  const { dragging, bind } = useDrag({
    onMove: (dx) => {
      const cur = idxRef.current;
      const atEdge = (dx > 0 && cur === 0) || (dx < 0 && cur === STEPS.length - 1);
      setDragDX(atEdge ? dx * 0.32 : dx);
    },
    onEnd: (dx, vx) => {
      setDragDX(0);
      let step = 0;
      if (dx <= -70 || vx <= -0.4) step = 1;
      else if (dx >= 70 || vx >= 0.4) step = -1;
      setIndex((cur) => Math.max(0, Math.min(STEPS.length - 1, cur + step)));
    },
  });

  const lang = useLang();
  const c = C1[lang];
  const catLabel = { design: c.catDesign, artDirector: c.catLead, client: c.catClient } as const;
  const offset = padding.left - index * PITCH + (dragging ? dragDX : 0);

  return (
    <div ref={sectionRef} className="relative w-full overflow-clip bg-[#121212] xl:h-[900px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[24px] px-[var(--grid-margin)] pt-[64px] pb-[32px] sm:pt-[72px] xl:absolute xl:left-1/2 xl:top-0 xl:block xl:h-full xl:w-[1440px] xl:max-w-none xl:-translate-x-1/2 xl:p-0">
        {/* Заголовок + интро. 375 (Figma 2559:11137/…40): стек «04» /
            «ПОСТРОЕНИЕ ПРОЦЕССА», Wix Bold 26 / ls 0.8 · Inter 14, gap 24.
            834 (Figma 2539:9109/…12): одна строка Wix Bold 32 / ls 0.96,
            интро Aeonik Reg 14 / 120% / ls 0.28 / w383, gap 12. */}
        <div className="flex flex-col gap-[24px] sm:gap-[12px]">
          <div className="flex flex-col font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.8px] sm:flex-row sm:items-baseline sm:gap-x-[12px] sm:whitespace-nowrap sm:text-[32px] sm:tracking-[0.96px] xl:absolute xl:left-[46px] xl:top-[181px]">
            <p className="whitespace-nowrap text-[#008cff]">04</p>
            <p className="w-[289px] text-white sm:w-auto">{c.pipelineHeading}</p>
          </div>

          {/* Интро — только <1440. 834: w383 · 1280: w593. */}
          <p className="font-inter text-[14px] font-normal leading-[1.3] tracking-[0.2px] text-white opacity-70 sm:w-[383px] sm:font-body sm:leading-[1.2] sm:tracking-[0.28px] lg:w-[593px] xl:hidden">
            {c.pipelineIntro}
          </p>
        </div>

        {/* Линейка-риска — SVG-<img> внутри самого трека (см. ниже),
            едет вместе с ним; карточки поверх, их frost её размывает. */}

        {/* Стрелки-доодлы указывают на карточку «05» в покое — контекстная
            аннотация под конкретную позицию скролла, ниже xl трек листается
            и якорь теряется, поэтому только на десктопе. */}
        <Reveal variant="doodle" className="hidden xl:absolute xl:left-[1313.47px] xl:top-[761.57px] xl:block xl:h-[63px] xl:w-[42px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-arrow-1.svg" />
        </Reveal>
        <Reveal variant="doodle" delay={0.08} className="hidden xl:absolute xl:left-[1259.3px] xl:top-[783.91px] xl:block xl:h-[12px] xl:w-[96px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-arrow-2.svg" />
        </Reveal>
      </div>

      {/* Видимое окно трека — на всю ширину экрана, нативный overflow-x-auto
          со скрытым скроллбаром; на десктопе абсолют на y278, ниже — поток.
          Обёртка relative — чтобы <1440 положить полосы-фон ровно за карточки. */}
      <div className="relative w-full xl:contents">
        <div
          {...bind}
          className={`relative w-full touch-pan-y select-none overflow-x-clip overflow-y-visible pb-[72px] sm:pb-[210px] xl:absolute xl:left-0 xl:top-[278px] xl:h-[479px] xl:pb-[40px] ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ paddingTop: padding.top }}
        >
          <div
            className="relative h-[399px] w-[4068px] will-change-transform"
            style={{
              transform: `translateX(${offset}px)`,
              transition: dragging ? "none" : "transform 550ms cubic-bezier(0.33,1,0.68,1)",
            }}
          >
          {/* Линейка-риска (Group 2136141446/47) — первый ребёнок трека, но
              в ОБРАТНОМ translateX (гасит скролл трека): визуально стоит на
              месте, карточки листаются поверх (в макете это отдельный слой
              внутри фрейма трека, шириной с экран). Тот же backdrop-контекст
              → frost карточек её размывает. Точные экспорты из Figma: path
              opacity 0.2, БЕЗ доп. CSS-прозрачности. 375 → 8 линий (h420),
              834 → 14 (h673), ≥1024 → 20 (h673). */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              transform: `translateX(${index * PITCH - (dragging ? dragDX : 0)}px)`,
              transition: dragging ? "none" : "transform 550ms cubic-bezier(0.33,1,0.68,1)",
            }}
          >
            {/* top из макета: линейка торчит над и под «змейкой» карточек.
                375 — Frame 2147232047: трек на y10.8 внутри 420-фрейма → -11.
                834/1280/деск — Group на y228, трек на y365 → -137. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden className="absolute left-0 top-[-11px] h-[420px] w-[375px] max-w-none sm:hidden" src="/cases/case-01/sections/pipeline-bg-375.svg" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden className="absolute left-0 top-[-137px] hidden h-[673px] w-[778px] max-w-none sm:block lg:hidden" src="/cases/case-01/sections/pipeline-bg-834.svg" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden className="absolute left-0 top-[-137px] hidden h-[673px] w-[1200px] max-w-none lg:block xl:w-[1348px]" src="/cases/case-01/sections/pipeline-bg.svg" />
          </div>
          {STEPS.map((step, i) => {
            const style = CATEGORY_STYLE[step.category];
            const st = c.steps[i];
            return (
              <div key={i} className="absolute h-[125px] w-[328px] shrink-0" style={{ left: i * PITCH, top: step.offset ?? 0 }}>
                {/* Единый <GlassBubble> для кейсов 1/2/3. БЕЗ тёмного
                    «занавеса» под карточкой (frost просвечивает фоновые
                    полосы) и БЕЗ border (даёт ложное свечение) — акцент
                    слева отдельным дочерним элементом. */}
                <GlassBubble accent={style.border} className="flex size-full flex-col gap-[8px]">
                  <p className="text-[14px] font-bold uppercase tracking-[0.84px]" style={{ color: style.text }}>
                    {step.number}
                  </p>
                  <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-white">{st.title}</p>
                  <p className="text-[11px] leading-[1.2] tracking-[0.66px] text-white">{st.text}</p>
                  <p className="text-[9px] font-medium tracking-[0.27px]" style={{ color: style.text }}>
                    {catLabel[step.category]}
                  </p>
                </GlassBubble>
              </div>
            );
          })}
          </div>
          {/* Затухание краёв до цвета секции на >1440 (замена mask —
              она ломала frost карточек). */}
          <EdgeFade width={padding.width} />
        </div>
      </div>
    </div>
  );
}
