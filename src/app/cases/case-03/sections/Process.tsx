"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import { useBreakpoint } from "@/lib/breakpoint";
import Reveal from "@/components/Reveal";
import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";
import GlassBubble from "@/components/GlassBubble";
import EdgeFade from "@/components/EdgeFade";
import TrackArrows from "@/components/TrackArrows";
import { useScrollTrack } from "@/lib/useScrollTrack";
import { useLang } from "@/lib/lang";
import { C3 } from "../i18n";

// 05 Процесс — 1:1 из актуальной Figma (node 2022:14827, высота 2980).
// В новой версии Figma «Процесс», «Дизайн-система» и сет 3D-иконок слиты
// в один тёмный full-bleed раздел:
//  · заголовок 175px + вводный текст + доодл «»»»;
//  · трек «процесс» (node 2029:15514) — механика 1:1 как в кейсах 1 и 2
//    (наведённое колесо мыши гонит ленту ГОРИЗОНТАЛЬНО, нативный
//    scrollLeft), стекло-бабл — общий GLASS_BUBBLE (src/lib/glass.ts);
//  · «06 Дизайн-система» — текст + белая карточка из 4 3D-объектов;
//  · «Разные функции продукта. Один визуальный язык» в обводке-эллипсе;
//  · сет из 12 финальных 3D-иконок с подписями.
const A = "/cases/case-03/sections";

const STEP_NUMBERS = ["01", "02", "03", "04", "05", "06", "07"];

const PITCH = 340;

// Дизайн-система (Figma node 2387:22353) — белая карточка из 4 ОТДЕЛЬНЫХ
// 3D-объектов (не один запечённый ассет) + подписи. Ассеты 2x,
// прозрачный PNG, 262×262 в макете.
const DSYSTEM: [string, string][] = [
  ["dsystem-bank.png", "Bank"],
  ["dsystem-docs.png", "Supporting documents"],
  ["dsystem-onboarding.png", "Onboarding"],
  ["dsystem-manager.png", "Personal manager"],
];

// Сет из 12 финальных 3D-иконок (Figma node 2022:15013, сетка 1000×738):
// [файл, подпись, left, top] — иконка 218×218, подпись по центру колонки
// (109 / 369 / 629.5 / 890.5) на 2px ниже иконки. Ассеты 2x, прозрачный PNG.
const ICONSET: [string, string, number, number][] = [
  ["wallet.png", "Wallet", 0, 0],
  ["supporting-documents.png", "Supporting documents", 260, 0],
  ["exchainge.png", "Exchainge", 520.5, 0],
  ["payment-complete.png", "Payment Complete", 781.5, 0],
  ["bank.png", "Bank", 0, 260],
  ["gate.png", "Gate", 260, 260],
  ["onboarding.png", "Onboarding", 520.5, 260],
  ["fees.png", "Fees", 781.5, 260],
  ["coin.png", "Coin", 0, 520],
  ["transactions.png", "Transactions", 260, 520],
  ["personal-manager.png", "Personal manager", 520.5, 520],
  ["security.png", "Security", 781.5, 520],
];

// 375: сетка 3 колонки × 4 строки (Figma node 2712:14256, 375×489.7),
// иконка 105.077, подпись 11px по центру колонки на ~1px ниже иконки.
// Порядок row-major, тот же набор ассетов iconset/*.png.
const ICONSET_375: [string, string, number, number][] = [
  ["wallet.png", "Wallet", 12, 0],
  ["supporting-documents.png", "Supporting documents", 137, 0],
  ["exchainge.png", "Exchainge", 263, 0],
  ["bank.png", "Bank", 12.05, 125.32],
  ["gate.png", "Gate", 137.37, 125.32],
  ["onboarding.png", "Onboarding", 262.93, 125.32],
  ["coin.png", "Coin", 12.05, 250.64],
  ["transactions.png", "Transactions", 137.37, 250.64],
  ["personal-manager.png", "Personal manager", 262.93, 250.64],
  ["payment-complete.png", "Payment Complete", 12.05, 375.96],
  ["fees.png", "Fees", 137.37, 375.96],
  ["security.png", "Security", 263.17, 375.96],
];

// 834: та же сетка, но 3 колонки × 4 строки (Figma node 2695:19207,
// 778×1016). Иконка 218, колонки x 25 / 285 / 545.5, строки y 0 / 260 /
// 520 / 780. Порядок row-major отличается от 4-колоночного.
const ICONSET_834: [string, string, number, number][] = [
  ["wallet.png", "Wallet", 25, 0],
  ["supporting-documents.png", "Supporting documents", 285, 0],
  ["exchainge.png", "Exchainge", 545.5, 0],
  ["bank.png", "Bank", 25, 260],
  ["gate.png", "Gate", 285, 260],
  ["onboarding.png", "Onboarding", 545.5, 260],
  ["coin.png", "Coin", 25, 520],
  ["transactions.png", "Transactions", 285, 520],
  ["personal-manager.png", "Personal manager", 545.5, 520],
  ["payment-complete.png", "Payment Complete", 25, 780],
  ["fees.png", "Fees", 285, 780],
  ["security.png", "Security", 546, 780],
];

export default function Process() {
  const lang = useLang();
  const t = C3[lang];
  const STEPS = STEP_NUMBERS.map((n, i) => ({ n, ...t.steps[i] }));
  const sectionRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const dsysRef = useRef<HTMLDivElement>(null);
  const [padding, setPadding] = useState({ left: 46, right: 1440 / 2 - 164, width: 1440 });
  const reduced = useReducedMotion();
  // Десктоп — фикс-канвас 1440 (абсолютные Figma-координаты); <1440 —
  // отдельная reflow-раскладка (Figma node 2695:18346, «case-03 · 1280»).
  // Только ОДНА из двух веток реально монтируется (не CSS hidden), иначе
  // trackRef/dsysRef достанутся сразу двум DOM-узлам и драг/волна
  // привяжутся не к тому, что видно.
  const bp = useBreakpoint();
  const wide = bp === "desktop"; // ≥1440 — фикс-канвас 1440
  const mob = bp === "mobile"; // <640 — канвас 375
  const narrow = bp === "tabletP"; // 640–1023 — канвас 834

  // «Волна» по 4 объектам дизайн-системы: каждый по очереди чуть
  // подскакивает (scale + подъём) и возвращается; проход повторяется с
  // паузой, пока блок в экране (как пульс-волна сета иконок в кейсе 2).
  // Зависит от wide — при переключении ветки dsysRef указывает на новый
  // DOM-узел, таймлайн нужно пересобрать заново.
  useGSAP(
    () => {
      if (reduced || !dsysRef.current) return;
      const objs = gsap.utils.toArray<HTMLElement>(".dsystem-obj", dsysRef.current);
      if (!objs.length) return;
      gsap.set(objs, { transformOrigin: "50% 60%" });
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2.2,
        defaults: { ease: "sine.inOut" },
        scrollTrigger: {
          trigger: dsysRef.current,
          start: "top 78%",
          end: "bottom top",
          toggleActions: "play pause resume pause",
        },
      });
      objs.forEach((el, i) => {
        const at = i * 0.16;
        tl.to(el, { scale: 1.09, y: -8, duration: 0.28 }, at).to(
          el,
          { scale: 1, y: 0, duration: 0.34 },
          at + 0.28,
        );
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [reduced, bp], scope: dsysRef },
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (!w) return;
      if (w < 640) {
        // reflow 375: трек на всю ширину канваса 375, карточки с x=20.
        setPadding({ left: 20, right: 20, width: w });
        return;
      }
      if (w < 1024) {
        // reflow 834: трек на всю ширину канваса 834, карточки с x=28.
        setPadding({ left: 28, right: 28, width: w });
        return;
      }
      if (w < 1440) {
        // reflow 1280: трек на всю ширину канваса 1280, карточки с x=40
        // (как в Figma), лишние уходят за край экрана — не обрезаются на
        // 1240 с мёртвой полосой справа.
        setPadding({ left: 40, right: 40, width: w });
        return;
      }
      const gutter = Math.max(0, (w - 1440) / 2);
      setPadding({ left: 46 + gutter, right: w / 2 - 164, width: w });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Трек — нативный scrollLeft (см. useScrollTrack): драг/тач листает
  // свободно (не по одной карточке за раз), десктоп — ещё и колесо/трекпад
  // горизонтально, плюс стрелки ‹ › (TrackArrows).
  const { trackRef, bind, dragging, canPrev, canNext, scrollByStep } = useScrollTrack();

  const track = (
    <div
      ref={trackRef}
      {...bind}
      onScroll={(e) => {
        if (rulerRef.current)
          rulerRef.current.style.transform = `translateX(${e.currentTarget.scrollLeft}px)`;
      }}
      className={`no-scrollbar relative w-full touch-pan-y select-none overflow-x-auto xl:absolute xl:left-0 xl:top-[582px] xl:h-[286px] ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        paddingLeft: padding.left,
        paddingRight: padding.right,
        // 80 сверху/снизу: линейка-риска (h286, Figma Frame 2147232048) должна
        // торчать ~80px над и под карточками — в макете трек сидит на y79.8
        // внутри 286-фрейма линейки. При 40 её обрезало у нижнего края карточек.
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <div className="relative h-[125px] w-[2368px]">
        {/* Линейка-риска (Group 2136141446/47) — ПЕРВЫМ ребёнком трека, но
            в обёртке с обратным translateX по scrollLeft: визуально стоит на
            месте, карточки листаются поверх (в макете — отдельный слой секции
            шириной с экран). Тот же контекст, что и карточки → их frost её
            размывает. Точный экспорт из Figma: path opacity 0.2, БЕЗ доп.
            CSS-прозрачности. 20 линий: w-1200 (reflow) / w-1348 (десктоп). */}
        <div ref={rulerRef} className="pointer-events-none absolute inset-0 will-change-transform">
          {/* Линейка: 375 (8 линий, w-375) / 834 (w-778) / 1280 (w-1200) /
              десктоп (w-1348). Границы sm (640) / lg (1024) совпадают с
              переключением холста. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden className="absolute left-0 top-[-80px] h-[286px] w-[375px] max-w-none sm:hidden" src={`${A}/process-stripes-375.svg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden className="absolute left-0 top-[-80px] hidden h-[286px] w-[778px] max-w-none sm:block lg:hidden" src={`${A}/process-stripes-834.svg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden className="absolute left-0 top-[-80px] hidden h-[286px] w-[1200px] max-w-none lg:block xl:hidden" src={`${A}/process-stripes-1280.svg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden className="absolute left-0 top-[-80px] hidden h-[286px] w-[1348px] max-w-none xl:block" src={`${A}/process-stripes.svg`} />
        </div>
        {STEPS.map((s, i) => (
          <GlassBubble
            key={s.n}
            className="absolute flex h-[125px] w-[328px] flex-col justify-center gap-[8px]"
            style={{ left: i * PITCH, top: 0 }}
          >
            <p className="text-[14px] font-bold uppercase leading-[1.2] tracking-[0.84px] text-[#008cff]" style={{ fontFamily: "var(--font-body)" }}>
              {s.n}
            </p>
            <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-white">{s.title}</p>
            <p className="text-[11px] leading-[1.2] tracking-[0.66px] text-white">{s.desc}</p>
          </GlassBubble>
        ))}
      </div>
    </div>
  );

  // Белая карточка дизайн-системы (Figma 2387:22353): 1284×399, 4 объекта
  // 262×262 + подпись, gap 12, скругление 76, паддинг 100/44. Одинакова
  // на десктопе (абсолют в 1440-боксе) и в 1280-канвасе — там позицию
  // задаёт внешняя обёртка.
  const dsystemCard = (
    <div ref={dsysRef} className="relative h-full w-full xl:absolute xl:left-[78px] xl:top-[1277px] xl:h-[399px] xl:w-[1284px]">
      <Reveal
        variant="fade"
        className="flex h-full w-full flex-nowrap items-center justify-center gap-[12px] rounded-[76px] bg-white px-[58px] py-[44px] xl:px-[100px]"
      >
        {DSYSTEM.map(([src, label]) => (
          <div key={label} className="flex w-[262px] shrink-0 flex-col items-center gap-[12px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={label}
              className="dsystem-obj block aspect-square w-full max-w-none object-contain will-change-transform"
              src={`${A}/${src}`}
            />
            <p className="w-full text-center text-[15.62px] font-medium leading-[1.44] text-[#2541ff]">
              {label}
            </p>
          </div>
        ))}
      </Reveal>
    </div>
  );

  // Сет из 12 3D-иконок (Figma 2022:15013): иконка 218×218, абсолютная
  // сетка 4×3. Одинаковая разметка на десктопе и в 1280-канвасе — окно
  // 1000×738, координаты из ICONSET.
  const iconset = (
    <div className="relative h-[738px] w-[1000px]">
      {ICONSET.map(([src, label, left, top]) => (
        <div key={label} className="group absolute h-[218px] w-[218px]" style={{ left, top }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={label}
            className="block size-full max-w-none object-contain transition-transform duration-[350ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform group-hover:scale-[1.2] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            src={`${A}/iconset/${src}`}
          />
          <p className="pointer-events-none absolute left-1/2 top-[220px] -translate-x-1/2 whitespace-nowrap text-center text-[15px] leading-[1.2] text-white transition-all duration-[350ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-[10px] group-hover:opacity-0 motion-reduce:transition-none">
            {label}
          </p>
        </div>
      ))}
    </div>
  );

  // 834: белая карточка дизайн-системы (Figma 2695:19147, 778×399): 4
  // объекта 180×180 + подпись, gap 12, скругление 76.54, py 44, без px
  // (justify-center). Иконки те же 3D-объекты, что на 1280 (dsystem-*.png).
  const dsystemCard834 = (
    <div ref={dsysRef} className="relative h-full w-full">
      <Reveal
        variant="fade"
        className="flex h-full w-full items-center justify-center gap-[12px] rounded-[76.54px] bg-white py-[44px]"
      >
        {DSYSTEM.map(([src, label]) => (
          <div key={label} className="flex w-[180px] shrink-0 flex-col items-center gap-[12px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={label}
              className="dsystem-obj block size-[180px] max-w-none object-contain will-change-transform"
              src={`${A}/${src}`}
            />
            <p className="w-full text-center text-[15.62px] font-medium leading-[1.44] text-[#2541ff]">
              {label}
            </p>
          </div>
        ))}
      </Reveal>
    </div>
  );

  // 834: сет 12 иконок — сетка 3×4 (Figma 2695:19207, 778×1016).
  const iconset834 = (
    <div className="relative h-[1016px] w-[778px]">
      {ICONSET_834.map(([src, label, left, top]) => (
        <div key={label} className="group absolute h-[218px] w-[218px]" style={{ left, top }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={label}
            className="block size-full max-w-none object-contain transition-transform duration-[350ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform group-hover:scale-[1.2] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            src={`${A}/iconset/${src}`}
          />
          <p className="pointer-events-none absolute left-1/2 top-[220px] -translate-x-1/2 whitespace-nowrap text-center text-[15px] leading-[1.2] text-white transition-all duration-[350ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-[10px] group-hover:opacity-0 motion-reduce:transition-none">
            {label}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={sectionRef} className="relative w-full overflow-clip bg-[#121212]">
      {wide ? (
      <>
      <div className="relative mx-auto h-[2980px] w-[1440px]">
        {/* — Процесс — */}
        <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">05</p>
          <p className="text-white">{t.processHeading}</p>
        </div>

        <div className="absolute left-[46px] top-[368px] flex w-[670px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          <p>{t.processIntro1}</p>
          <p>{t.processIntro2}</p>
        </div>

        {/* Стрелка-доодл «→» у конца трека (Figma node 2446:62566 → 1243 / 872, 99×63). */}
        <DrawIn
          src={`${A}/process-arrow.svg`}
          fit="contain"
          delay={0.1}
          className="absolute left-[1243px] top-[872px] z-10 h-[63px] w-[99px]"
        />

        {/* — Дизайн-система — (пользователь выровнял заголовок и текст по левому краю) */}
        <div className="absolute left-[46px] top-[1092px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">06</p>
          <p className="text-white">{t.dsystemHeading}</p>
        </div>

        <p className="absolute left-[46px] top-[1139px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-80">
          {t.dsystemIntro}
        </p>

        {dsystemCard}

        {/* Обводка-эллипс вокруг фразы (Figma node 2387:22373) — общая
            центрированная обёртка с текстом, эллипс в % от блока текста
            (221.6%/95.2%) — масштабируется вместе с текстом при другом
            числе строк (перевод на английский). */}
        <div className="absolute left-1/2 top-[1847px] w-[669px] -translate-x-1/2 -translate-y-1/2">
          <p className="text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
            {t.processQuoteLine1}
            <br />
            {t.processQuoteLine2}
          </p>
          <DrawIn
            src={`${A}/process-ellipse.svg`}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[221.6%] w-[95.2%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <Reveal variant="fade" className="absolute left-[220px] top-[2099px]">
          {iconset}
        </Reveal>
      </div>
      {/* Трек «процесс» — прямой ребёнок sectionRef (w-full), поэтому
          xl:absolute xl:left-0 тянет его на всю ширину экрана, а не режет
          центрированным 1440-боксом. */}
      {track}
      {/* Затухание краёв трека до цвета секции на >1440. Трек — нативный
          скролл-контейнер, поэтому EdgeFade кладётся снаружи и позиционируется
          по координатам трека (xl:top-582 xl:h-286). Замена mask — она в
          Chrome ломала frost карточек. TrackArrows — та же логика: снаружи
          скролл-контейнера, иначе уезжали бы вместе с лентой. */}
      <EdgeFade width={padding.width} className="absolute left-0 right-0" style={{ top: 582, height: 286 }} />
      {/* Центр по РЯДУ карточек (h125): трек на y582 + свой paddingTop(80). */}
      <TrackArrows
        onPrev={() => scrollByStep(-1)}
        onNext={() => scrollByStep(1)}
        canPrev={canPrev}
        canNext={canNext}
        className="absolute left-0 right-0"
        style={{ top: 582 + 80, height: 125 }}
      />
      </>
      ) : (
      <>
      {/* <1440 — заголовки/интро «05 Процесс»/«06 Дизайн-система» и сам
          трек (степ-карточки 14/11px) — резиновый flow, ОДИН DOM для всех
          трёх тиров (sm:/lg: классы). У трека уже есть своя
          ResizeObserver-логика ширины (как у Pipeline.tsx в кейсе 1) —
          раньше она сидела ВНУТРИ ещё и масштабируемого FullBleedScale-
          холста, transform:scale поверх нормально посчитанной ширины
          удваивал «плавание» текста. Теперь трек — прямо в потоке, без
          холста, тексту скакать негде. */}
      <div className="flex w-full flex-col gap-[32px] sm:gap-[64px] xl:hidden">
        <div className="flex flex-col gap-[12px] px-[20px] pt-[64px] sm:px-[28px] sm:pt-[72px] lg:px-[40px]">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:gap-[24px] sm:text-[100px] lg:text-[175px] lg:tracking-[5.25px]">
            <span className="text-[#008cff]">05</span>
            <span className="text-white">{t.processHeading}</span>
          </div>
          <div className="flex w-[335px] max-w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:w-[670px] lg:w-[593px]">
            <p>{t.processIntro1}</p>
            <p>
              {lang === "ru" ? (
                <>
                  Такой подход позволял принимать ключевые решения на ранних этапах.{" "}
                  <br className="hidden lg:inline" />
                  Библиотека материалов и готовых объектов ускоряла создание новых сцен{" "}
                  <br className="hidden lg:inline" />и помогала сохранять единый стиль.
                </>
              ) : (
                t.processIntro2
              )}
            </p>
          </div>
        </div>

        {/* Трек — track сам задаёт себе padding/ширину через ResizeObserver
            (см. paddingLeft/Right выше), здесь только relative-обёртка для
            TrackArrows и доодла-стрелки. Высота трека фиксирована
            (paddingTop 80 + карточки 125 + paddingBottom 80 = 285) —
            доодл-стрелка позиционируется фикс-px внутри неё, без %. */}
        <div className="relative w-full">
          {track}
          <TrackArrows
            onPrev={() => scrollByStep(-1)}
            onNext={() => scrollByStep(1)}
            canPrev={canPrev}
            canNext={canNext}
            className="absolute left-0 right-0"
            style={{ top: 80, height: 125 }}
          />
          {/* Стрелка-доодл «→» — только sm+ (в 375 её нет в макете). */}
          <DrawIn
            src={`${A}/process-arrow-834.svg`}
            fit="contain"
            delay={0.1}
            className="pointer-events-none absolute right-[28px] top-[240px] z-10 hidden h-[58.33px] w-[93.24px] sm:block lg:hidden"
          />
          <DrawIn
            src={`${A}/process-arrow.svg`}
            fit="contain"
            delay={0.1}
            className="pointer-events-none absolute right-[49px] top-[274px] z-10 hidden h-[63px] w-[99px] lg:block"
          />
        </div>

        <div className="flex flex-col gap-[12px] px-[20px] sm:px-[28px] lg:px-[40px] lg:pt-[32px]">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px]">
            <span className="text-[#008cff]">06</span>
            <span className="text-white">{t.dsystemHeading}</span>
          </div>
          <p className="w-[335px] max-w-full text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-80 sm:w-[383px] lg:w-[590px]">
            {t.dsystemIntro}
          </p>
        </div>
      </div>

      {/* Карточка дизайн-системы + цитата-эллипс + сет иконок — без 14px
          текста-риска, остаются в уменьшенном холсте (только этот «хвост»
          секции, без заголовков/интро/трека выше — те уже в потоке).
          Высота холста = старая высота минус старый top заголовка «06»
          (шифт применён ко всем offset'ам ниже). dsysRef — держим JS-ветку
          по тирам (не CSS hidden/block), иначе три карточки одновременно
          в DOM боролись бы за один ref и «волна» попадала бы не в ту. */}
      {mob ? (
        <div className="w-full">
          <FullBleedScale width={375} height={2283.717} mode="grow" className="w-full">
            <div className="relative w-[375px] bg-[#121212]" style={{ height: 2283.717 }}>
              <div className="absolute left-[20px] top-[158px] w-[335px]">
                <div ref={dsysRef} className="relative w-full">
                  <Reveal
                    variant="fade"
                    className="flex w-full flex-col items-center gap-[12px] rounded-[76.54px] bg-white py-[44px]"
                  >
                    {DSYSTEM.map(([src, label]) => (
                      <div key={label} className="flex w-[262px] flex-col items-center gap-[12px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt={label}
                          className="dsystem-obj block size-[262px] max-w-none object-contain will-change-transform"
                          src={`${A}/${src}`}
                        />
                        <p className="w-full text-center text-[15.62px] font-medium leading-[1.44] text-[#2541ff]">
                          {label}
                        </p>
                      </div>
                    ))}
                  </Reveal>
                </div>
              </div>

              <div className="absolute left-1/2 top-[1598px] w-[335px] -translate-x-1/2 -translate-y-1/2">
                <p className="whitespace-pre-wrap text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-white opacity-70">
                  {t.processQuoteLine1}
                  <br />
                  {t.processQuoteLine2}
                </p>
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[201.1%] w-[104.2%] -translate-x-1/2 -translate-y-1/2">
                  <DrawIn src={`${A}/process-ellipse-375.svg`} className="absolute inset-[-2.05%_-0.86%]" />
                </div>
              </div>

              <Reveal variant="fade" className="absolute left-0 top-[1730px]">
                <div className="relative h-[489.717px] w-[375px]">
                  {ICONSET_375.map(([src, label, left, top]) => (
                    <div key={label} className="group absolute h-[105.077px] w-[105.077px]" style={{ left, top }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={label}
                        className="block size-full max-w-none object-contain transition-transform duration-[350ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform group-hover:scale-[1.2] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        src={`${A}/iconset/${src}`}
                      />
                      <p className="pointer-events-none absolute left-1/2 top-[106px] -translate-x-1/2 whitespace-nowrap text-center text-[11px] leading-[1.2] text-white transition-all duration-[350ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-[8px] group-hover:opacity-0 motion-reduce:transition-none">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </FullBleedScale>
        </div>
      ) : narrow ? (
        <div className="w-full">
          <FullBleedScale width={834} height={1984} mode="grow" className="w-full">
            <div className="relative h-[1984px] w-[834px] bg-[#121212]">
              <div className="absolute left-[28px] top-[179px] h-[399px] w-[778px]">{dsystemCard834}</div>

              <div className="absolute left-[417px] top-[737px] w-[778px] -translate-x-1/2 -translate-y-1/2">
                <p className="text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-white opacity-70">
                  {t.processQuoteLine1}
                  <br />
                  {t.processQuoteLine2}
                </p>
                <DrawIn
                  src={`${A}/process-ellipse-834.svg`}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[246.8%] w-[69.3%] -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              <Reveal variant="fade" className="absolute left-[28px] top-[896px]">
                {iconset834}
              </Reveal>
            </div>
          </FullBleedScale>
        </div>
      ) : (
        <div className="w-full">
          <FullBleedScale width={1280} height={1715} mode="grow" className="w-full">
            <div className="relative h-[1715px] w-[1280px] bg-[#121212]">
              <div className="absolute left-[40px] top-[162px] h-[399px] w-[1200px]">{dsystemCard}</div>

              <div className="absolute left-[640px] top-[724px] w-[1200px] -translate-x-1/2 -translate-y-1/2">
                <p className="text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
                  {t.processQuoteLine1}
                  <br />
                  {t.processQuoteLine2}
                </p>
                <DrawIn
                  src={`${A}/process-ellipse-1280.svg`}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[247.2%] w-[51.75%] -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              <Reveal variant="fade" className="absolute left-[140px] top-[887px]">
                {iconset}
              </Reveal>
            </div>
          </FullBleedScale>
        </div>
      )}
      </>
      )}
    </div>
  );
}
