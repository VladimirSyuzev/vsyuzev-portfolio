import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";
import { useLang } from "@/lib/lang";
import { C3 } from "../i18n";

// 02 Исследование — тёмный текст на #fafafa. Мудборд 3D-референсов с
// подписями MATERIAL / FORM / COMPOSITION / RESULT + доодл-«глаз».
//
// ≥1440 — живой заголовок/текст/подписи поверх запечённого в ассет
// коллажа (плотная композиция, FIGMA-BRIEF §5).
// <1440 — 1:1 из Figma reflow-фрейма 2695:18202 (1280×817): коллаж собран
// из отдельных карточек-кропов (frame 2707:41603), а не запечён в скриншот.
const A = "/cases/case-03/sections";
const R = `${A}/research`;

// 4 подписи-категории под коллажем (Figma 2707:41601 → y 452 отн. фрейма
// (40,280) → canvas y 732). Aeonik Pro Regular 11px, tracking 0.66,
// opacity 70. Ширины: MATERIAL/FORM 291, Composition 140, result — flex-1.
const LABELS_1440: [string, number][] = [
  ["Material", 46],
  ["Form", 387],
  ["Composition", 726],
  ["Result", 896],
];

// ── Мудборд 1280 (Figma frame 2707:41603, 1200×599.11) ──────────────────
// Каждая карточка — окно-кроп (overflow-clip, фон #121212) с одним или
// несколькими слоями-картинками. Координаты 1:1 из get_design_context.
type Layer = { src: string; x: number; y: number; w: number; h: number };
type Card = {
  x: number;
  y: number;
  w: number;
  h: number;
  bg?: string;
  layers: Layer[];
  // вложенное окно-кроп (карточка 6 — две склейки из одних ассетов)
  nested?: { x: number; y: number; w: number; h: number; layers: Layer[] };
};

const CARDS: Card[] = [
  // 1 — 2707:41604
  { x: 0, y: 243.92, w: 140.65, h: 111.28, layers: [{ src: `${R}/r-01.jpg`, x: 0, y: -63.21, w: 140.95, h: 211.42 }] },
  // 2 — 2707:41606
  { x: 151.34, y: 243.92, w: 140.65, h: 111.28, layers: [{ src: `${R}/r-02.jpg`, x: 0, y: -10.68, w: 140.65, h: 140.65 }] },
  // 3 — 2707:41608
  { x: 302.67, y: 365.88, w: 140.65, h: 233.23, layers: [{ src: `${R}/r-76.jpg`, x: -20.47, y: 0, w: 181.6, h: 242.14 }] },
  // 4 — 2707:41610
  { x: 0, y: 365.88, w: 291.99, h: 111.28, layers: [{ src: `${R}/r-57.jpg`, x: 0, y: -38.28, w: 292.52, h: 193.71 }] },
  // 5 — 2707:41612
  { x: 151.34, y: 486.05, w: 140.65, h: 111.28, layers: [{ src: `${R}/r-154.jpg`, x: -16.02, y: -2.67, w: 157.04, h: 152.77 }] },
  // 6 — 2707:41614 (две склейки r-96 / r-1246)
  {
    x: 605.34,
    y: 365.88,
    w: 140.65,
    h: 233.23,
    layers: [
      { src: `${R}/r-96.jpg`, x: 0, y: -14.24, w: 140.65, h: 140.65 },
      { src: `${R}/r-1246.jpg`, x: -8.9, y: 0, w: 320.48, h: 320.48 },
    ],
    nested: {
      x: 0,
      y: 126.41,
      w: 140.65,
      h: 111.28,
      layers: [
        { src: `${R}/r-96.jpg`, x: 0, y: -14.24, w: 140.65, h: 140.65 },
        { src: `${R}/r-1246.jpg`, x: -23.14, y: -148.67, w: 357.86, h: 357.86 },
      ],
    },
  },
  // 7 — 2707:41620
  { x: 454.01, y: 121.96, w: 140.65, h: 111.28, layers: [{ src: `${R}/r-96.jpg`, x: 0, y: -14.24, w: 140.65, h: 140.65 }] },
  // 8 — 2707:41622
  { x: 303, y: 244, w: 291, h: 111, layers: [{ src: `${R}/r-98.jpg`, x: 0, y: -40.95, w: 291.6, h: 194.32 }] },
  // 11 — 2707:41629
  { x: 454, y: 366, w: 140, h: 111, layers: [{ src: `${R}/r-52.jpg`, x: -20.47, y: -60.53, w: 181.4, h: 320.83 }] },
];

function CardWindow({ c }: { c: Card }) {
  return (
    <div
      className="absolute overflow-clip bg-[#121212]"
      style={{ left: c.x, top: c.y, width: c.w, height: c.h, background: c.bg }}
    >
      {c.layers.map((l, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          alt=""
          aria-hidden
          className="absolute max-w-none object-cover"
          style={{ left: l.x, top: l.y, width: l.w, height: l.h }}
          src={l.src}
        />
      ))}
      {c.nested && (
        <div
          className="absolute overflow-clip"
          style={{ left: c.nested.x, top: c.nested.y, width: c.nested.w, height: c.nested.h }}
        >
          {c.nested.layers.map((l, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              alt=""
              aria-hidden
              className="absolute max-w-none object-cover"
              style={{ left: l.x, top: l.y, width: l.w, height: l.h }}
              src={l.src}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Research() {
  const lang = useLang();
  const t = C3[lang];
  return (
    <div className="relative w-full overflow-clip bg-[#fafafa] xl:h-[1029px] xl:w-[1440px]">
      {/* ≥1440 — 1:1 из Figma-канваса 1440: живой текст поверх запечённого
          в ассет мудборда. */}
      <div className="hidden xl:contents">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.moodboardAlt}
          className="absolute inset-0 block size-full"
          src={`${A}/research.jpg`}
        />
        <div className="absolute left-0 top-0 h-[320px] w-[560px] bg-[#fafafa]" />
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">02</p>
          <p className="text-[#121212]">{t.researchHeading}</p>
        </div>
        <div className="absolute left-[46px] top-[181px] flex w-[499px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          <p>{t.researchIntro1}</p>
          <p>{t.researchIntro2}</p>
        </div>
        <div className="absolute left-[46px] top-[861px] h-[20px] w-[920px] bg-[#fafafa]" />
        {LABELS_1440.map(([text, x]) => (
          <p
            key={text}
            className="absolute top-[866px] text-[11px] uppercase leading-[1.2] tracking-[0.66px] text-[#121212] opacity-80"
            style={{ left: x }}
          >
            {text}
          </p>
        ))}
      </div>

      {/* <1440 — единый резиновый flow: раньше 3 холста (375/834/1280)
          держали заголовок+интро (14px) внутри масштабируемого канваса —
          текст «плыл» вместе с холстом на промежуточных ширинах. Мудборд —
          картинка (375/834) или живой коллаж-канвас (1280, без текста) —
          остаётся как есть, ей масштаб не вредит. */}
      <div className="flex w-full flex-col overflow-clip bg-[#fafafa] xl:hidden">
        <div className="flex flex-col gap-[12px] px-[20px] pt-[64px] sm:gap-[6px] sm:px-[28px] sm:pt-[56px] lg:px-[40px] lg:pt-[72px]">
          <div className="relative flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-none tracking-[0.78px] sm:text-[32px] sm:leading-[1.1] sm:tracking-[0.96px]">
            <span className="text-[#008cff]">02</span>
            <span className="text-[#121212]">{t.researchHeading}</span>
            {/* Доодл-«глаз» — только sm+ (в макете 375 его нет); привязан к
                ПРАВОМУ краю строки (right-N), а не left-Nпх от фикс-холста —
                иначе на узких lg-ширинах вылезал бы за контейнер. */}
            <DrawIn
              src={`${A}/research-eye-834.svg`}
              fit="contain"
              className="pointer-events-none absolute right-[53px] top-[10px] hidden h-[98px] w-[157px] sm:block lg:right-[75px] lg:top-[-52px] lg:h-[110px] lg:w-[157px]"
            />
          </div>
          <div className="flex w-[335px] max-w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] sm:w-[383px] lg:w-[594px]">
            <p className="opacity-70">{t.researchIntro1}</p>
            <p className="opacity-70 lg:w-[592px]">{t.researchIntro2}</p>
          </div>
        </div>
        <p className="sr-only">{t.moodboardCaptionsSr}</p>

        {/* Мудборд 375/834 — просто картинка на всю ширину, свой натуральный
            аспект (1005×5412 / 1560×866) — растёт вместе с колонкой, без
            отдельного холста. */}
        <div className="px-[20px] pt-[32px] sm:px-[28px] sm:pt-[24px] lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.moodboardAlt} className="block w-full sm:hidden" src={`${A}/research-375.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.moodboardAlt} className="hidden w-full sm:block" src={`${A}/research-834.jpg`} />
        </div>

        {/* 1024–1439 — живой коллаж-канвас (frame 2707:41603, 1200×600), без
            текста внутри — масштабируется свободно, драйва не вызывает. */}
        <div className="hidden w-full flex-col gap-[12px] lg:flex">
          <div className="w-full px-[40px] pt-[32px]">
            <FullBleedScale width={1200} height={600} mode="grow" className="w-full">
              <div className="relative h-[600px] w-[1200px]">
                {CARDS.map((c, i) => (
                  <CardWindow key={i} c={c} />
                ))}

                {/* Карточка 9 — 2707:41624 (605.34, 0), 291.99×233.23: монета
                    Stablegate на синем свечении. */}
                <div className="absolute overflow-clip bg-[#121212]" style={{ left: 605.34, top: 0, width: 291.99, height: 233.23 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    aria-hidden
                    className="absolute max-w-none"
                    style={{ left: -274, top: -150, width: 840, height: 536, transform: "scaleY(-1) rotate(35.84deg)" }}
                    src={`${R}/r-vector43.svg`}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    aria-hidden
                    className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
                    style={{ width: 269.73, height: 269.73 }}
                    src={`${R}/r-stablegate.png`}
                  />
                </div>

                {/* Карточка 10 — 2707:41627 (756.68, 243.92), 443.32×355.19:
                    3D-«Gate» на светлом градиенте. */}
                <div
                  className="absolute overflow-clip"
                  style={{
                    left: 756.68,
                    top: 243.92,
                    width: 443.32,
                    height: 355.19,
                    background: "linear-gradient(214.67deg, #CDD5FC 0%, #F4F6FA 100%)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    aria-hidden
                    className="absolute left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
                    style={{ top: "calc(50% + 6.68px)", width: 366.77, height: 366.77 }}
                    src={`${R}/r-gate.png`}
                  />
                </div>
              </div>
            </FullBleedScale>
          </div>

          {/* Подписи-категории (2707:41601) — резиновый flow, честные 11px. */}
          <div className="flex w-full items-end gap-[12px] px-[40px] pb-[32px] text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212]">
            <p className="w-[291px] shrink-0 opacity-70">MATERIAL</p>
            <p className="w-[291px] shrink-0 opacity-70">FORM</p>
            <p className="w-[140px] shrink-0 uppercase opacity-70">Composition</p>
            <p className="min-w-px flex-1 uppercase opacity-70">result</p>
          </div>
        </div>
      </div>
    </div>
  );
}
