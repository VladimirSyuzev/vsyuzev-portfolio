"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import { useBreakpoint } from "@/lib/breakpoint";
import DrawIn from "@/components/DrawIn";
import SlideProgress from "@/components/SlideProgress";
import FullBleedScale from "@/components/FullBleedScale";
import { useLang } from "@/lib/lang";
import { C3 } from "../i18n";

// `alt` ниже — ключ для словаря C3[lang].tileXAlt (altKeyToText), не сам
// текст: сама иллюстрация не переводится, только описание для скринридера.
type TileKey = "wallet" | "exchange" | "coin" | "fees";

// Рендеры слайда 1, <1440 — резиновая CSS-сетка (aspect-square окна),
// а не фикс-px внутри FullBleedScale. Обнаружили, что положение/размер
// вложенного рендера в 834- и 1280-раскладках — ОДНА И ТА ЖЕ обрезка,
// просто относительно разных по размеру окон (совпадают в % от окна с
// точностью до долей процента) — поэтому одна общая таблица в % годится
// для обоих тиров сразу (окно 640–1439 — grid-cols-2, gap 12). 375 —
// отдельная обрезка (другие исходники, 1 колонка) — своя таблица.
const TILES_GRID_PCT: { src: string; alt: TileKey; left: number; top: number; size: number }[] = [
  { src: "pr1-1280-wallet.webp", alt: "wallet", left: -109.75, top: -50.79, size: 219.5 },
  { src: "pr1-1280-coin.webp", alt: "coin", left: -29.92, top: -31.46, size: 157.31 },
  { src: "pr1-1280-exchainge.webp", alt: "exchange", left: -75.13, top: -72.13, size: 191.09 },
  { src: "pr1-1280-fees.webp", alt: "fees", left: -22.02, top: -149.61, size: 321.68 },
];

// 375-раскладка (Figma node 2695:19856): 1 колонка, своя обрезка/исходники
// (те же, что у ≥1440 нативного холста). % — от окна (aspect-square).
const TILES_375_PCT: { src: string; alt: TileKey; left: number; top: number; size: number }[] = [
  { src: "principles1-wallet.png", alt: "wallet", left: -154.03, top: -63.58, size: 275.84 },
  { src: "principles1-exchainge.png", alt: "exchange", left: -103.58, top: -78.81, size: 220.3 },
  { src: "principles1-coin.png", alt: "coin", left: -41.19, top: -32.54, size: 194.63 },
  { src: "principles1-fees.png", alt: "fees", left: -20.3, top: -138.51, size: 305.67 },
];

// 04 Принципы дизайна — в Figma ОДИН раздел из двух слайдов (node
// 2492:4430 «1 из 2» и 2022:14758 «2 из 2»). Механика как у «Проблема /
// Экран» в кейсе 1: тёмный фон растянут на весь экран (full-bleed), блок
// закреплён (pin), контент кроссфейдится на одном месте по скроллу,
// прогресс-индикатор переключается. ScrollTrigger.snap([0,1]) —
// переключение слайдов происходит за одно движение колеса.
//
// Слайд 1 (node 2492:4430) — вводный текст на всю ширину (w668) + четыре
// 3D-рендера, закадрированные окном 328×399 (Wallet / Exchange / Coin /
// Fees). Слайд 2 — сплит на ДВЕ половины 50/50 (как фон, так и содержимое):
// 3D-стек монет по центру левой (тёмной) половины, карта+замок по центру
// правой (светлой), текст и подчёркивание — относительно левого края правой
// половины; прогресс-индикатор жмётся к левому краю экрана. Объекты — в
// родном размере (524px), не масштабируются.
const A = "/cases/case-03/sections";

// Четыре объекта-иллюстрации (Figma nodes 2492:4481 / 2493:4490 / 2493:4487
// / 2493:4484). Каждый — большой 3D-рендер, обрезанный окном 328×399 на
// одной высоте (top 324). Слева направо: Wallet, Exchange, Coin, Fees.
// `img` — позиция и размер вложенного рендера внутри окна, 1:1 из Figma.
const TILES: {
  src: string;
  alt: TileKey;
  left: number;
  img: { left: number; top: number; size: number };
}[] = [
  {
    src: "principles1-wallet.png",
    alt: "wallet",
    left: 46,
    img: { left: -519.4, top: -184.29, size: 924.094 },
  },
  {
    src: "principles1-exchainge.png",
    alt: "exchange",
    left: 386,
    img: { left: -347, top: -273.25, size: 738 },
  },
  {
    src: "principles1-coin.png",
    alt: "coin",
    left: 726,
    img: { left: -138, top: -109, size: 652 },
  },
  {
    src: "principles1-fees.png",
    alt: "fees",
    left: 1066,
    img: { left: -53, top: -408.25, size: 1024 },
  },
];

function tileAlt(key: TileKey, t: (typeof C3)["ru"]): string {
  return { wallet: t.tileWalletAlt, exchange: t.tileExchangeAlt, coin: t.tileCoinAlt, fees: t.tileFeesAlt }[key];
}

function Slide1() {
  const lang = useLang();
  const t = C3[lang];
  return (
    <div className="relative w-full xl:h-[900px]">
      {/* ≥1440 — заголовок, текст и рендеры в центрированной 1440-сетке. */}
      <div className="relative mx-auto hidden h-[900px] w-[1440px] xl:block">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">{t.principlesHeading}</p>
        </div>

        <div className="absolute left-[46px] top-[181px] flex w-[668px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
          <p className="opacity-70">{t.principlesPara1}</p>
          <p className="opacity-70">{t.principlesPara2}</p>
        </div>

        {/* Четыре закадрированных 3D-рендера (node 2492:4430). */}
        {TILES.map((tile) => (
          <div
            key={tile.src}
            className="absolute top-[324px] h-[399px] w-[328px] overflow-hidden"
            style={{ left: tile.left }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={tileAlt(tile.alt, t)}
              className="absolute max-w-none"
              style={{ left: tile.img.left, top: tile.img.top, width: tile.img.size, height: tile.img.size }}
              src={`${A}/${tile.src}`}
            />
          </div>
        ))}
      </div>

      {/* <1440 — единый резиновый flow: раньше 3 холста (375/834/1280)
          держали два 14px-абзаца внутри масштабируемого канваса — текст
          «плыл» вместе с холстом на промежуточных ширинах. Рендер-сетка —
          обычная CSS-сетка (aspect-square, обрезка вложенной картинки в %
          от окна — те же числа, что 834/1280 холсты, окно просто другого
          размера), эллипс послесловия — как и раньше, в % от блока текста
          (не от холста). */}
      <div className="flex w-full flex-col gap-[32px] overflow-clip bg-[#121212] sm:gap-[64px] xl:hidden">
        <div className="flex flex-col gap-[12px] px-[20px] pt-[64px] sm:px-[28px] sm:pt-[72px] lg:px-[40px]">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px]">
            <span className="text-[#008cff]">04</span>
            <span className="text-white">{t.principlesHeading}</span>
          </div>
          <div className="flex w-[335px] max-w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 [word-break:break-word] sm:w-[383px] sm:[word-break:normal] lg:w-[595px]">
            <p className="whitespace-pre-wrap sm:whitespace-normal">
              {lang === "ru" ? (
                <>
                  В основе визуального языка лежат простые округлые формы, реалистичные материалы{" "}
                  <br className="sm:hidden" />и ограниченная фирменная палитра. Во всех сценах
                  использовались пластик, стекло и металл, а также единая схема освещения.
                </>
              ) : (
                t.principlesPara1
              )}
            </p>
            <p>{t.principlesPara2}</p>
          </div>
        </div>

        {/* Сетка 375 — 1 колонка, свои исходники/обрезка. */}
        <div className="flex flex-col gap-[12px] px-[20px] sm:hidden">
          {TILES_375_PCT.map((tile) => (
            <div key={tile.src} className="relative aspect-square w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={tileAlt(tile.alt, t)}
                className="absolute max-w-none"
                style={{ left: `${tile.left}%`, top: `${tile.top}%`, width: `${tile.size}%`, height: `${tile.size}%` }}
                src={`${A}/${tile.src}`}
              />
            </div>
          ))}
        </div>

        {/* Сетка 640–1439 — 2×2, общая для 834/1280 (см. комментарий у
            TILES_GRID_PCT). */}
        <div className="hidden grid-cols-2 gap-[12px] px-[28px] sm:grid lg:px-[40px]">
          {TILES_GRID_PCT.map((tile) => (
            <div key={tile.src} className="relative aspect-square overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={tileAlt(tile.alt, t)}
                className="absolute max-w-none"
                style={{ left: `${tile.left}%`, top: `${tile.top}%`, width: `${tile.size}%`, height: `${tile.size}%` }}
                src={`${A}/${tile.src}`}
              />
            </div>
          ))}
        </div>

        {/* Послесловие. 375 — по левому краю, без прозрачности, подчёркивание
            строкой. 834/1280 — по центру, opacity-70, обводка-эллипс (в % от
            блока текста). */}
        <div className="flex flex-col px-[20px] pb-[64px] sm:items-center sm:px-[28px] sm:pb-[72px] lg:px-[40px]">
          <div className="relative w-[336px] max-w-full sm:w-[516px] lg:w-[598px]">
            <p className="font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.66px] text-white [word-break:break-word] sm:text-center sm:text-[28px] sm:leading-[1.1] sm:tracking-[0.84px] sm:opacity-70 sm:[word-break:normal] lg:text-[32px] lg:tracking-[0.96px]">
              {t.principlesQuote}
            </p>
            <div className="absolute left-[46px] top-[calc(100%-5px)] h-[16.591px] w-[283.762px] sm:hidden">
              <DrawIn src={`${A}/pr1-underline-375.svg`} className="absolute inset-[-18.08%_-1.06%]" />
            </div>
            <DrawIn
              src={`${A}/pr1-ellipse-834.svg`}
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[198%] w-[110.6%] -translate-x-1/2 -translate-y-1/2 rotate-[-1.37deg] sm:block lg:hidden"
            />
            <DrawIn
              src={`${A}/pr1-1280-ellipse.svg`}
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[202.4%] w-[111.5%] -translate-x-1/2 -translate-y-1/2 rotate-[-1.37deg] lg:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide2Content() {
  const t = C3[useLang()];
  return (
    <>
      {/* ≥1440 — контент в ЦЕНТРИРОВАННОЙ 1440-сетке, координаты 1:1 из Figma
          (node 2022:14758). Сплит-фон растянут за сеткой на всю ширину экрана
          (см. bgLayer), а объекты / текст / подчёркивание / бар остаются на
          своих местах как в макете — не «разъезжаются» по центрам половин. */}
      <div className="relative mx-auto hidden h-[900px] w-[1440px] xl:block">
        {/* Монеты — левая (тёмная) половина, (98, 185), 524×524. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.slide2CoinAlt}
          className="absolute left-[98px] top-[185px] size-[524px] max-w-none"
          src={`${A}/pr2-coin.png`}
        />
        {/* Замок+карта — правая (светлая) половина, (818, 185), 524×524. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.slide2LockAlt}
          className="absolute left-[818px] top-[185px] size-[524px] max-w-none"
          src={`${A}/pr2-lock.png`}
        />
        {/* Цитата (764, 728), 599×105 + подчёркивание — общая обёртка, линия
            привязана к НИЗУ текста (top-[calc(100%+5px)], не фикс-px 838.9) —
            при другом числе строк (перевод) не оторвётся от текста.
            Подчёркивание Vector 234257382 (node 2880:14353) — 356.45×14.943;
            наклон уже в пути (без CSS-rotate). */}
        <div className="absolute left-[764px] top-[728px] w-[599px]">
          <p className="font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
            {t.principlesQuote}
          </p>
          <div className="pointer-events-none absolute left-[144px] top-[calc(100%+5px)] h-[14.943px] w-[356.45px]">
            <DrawIn src={`${A}/pr2-underline.svg`} className="absolute inset-[-20.08%_-0.84%]" />
          </div>
        </div>
      </div>

      {/* <640 — 1:1 из Figma «case-03 · 375» (node 2712:14252, 375×749.583):
          сплит ВЕРТИКАЛЬНЫЙ — тёмная половина 375×375 сверху (рендер
          COINs_approve на весь квадрат), светлая 375×374.583 снизу (рендер
          lock_2). БЕЗ текста (в Figma скрыт). Половины экспортированы
          плоскими (рендер + декоративное свечение). */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={749.583} mode="grow" className="w-full">
          <div className="relative w-[375px] overflow-clip" style={{ height: 749.583 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden
              className="absolute left-0 top-0 block size-[375px] max-w-none object-cover"
              src={`${A}/pr2-dark-375.png`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden
              className="absolute left-0 top-[375px] block h-[374.583px] w-[375px] max-w-none object-cover"
              src={`${A}/pr2-light-375.png`}
            />
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma «case-03 · 834» (node 2695:19082, 834×1801):
          сплит ВЕРТИКАЛЬНЫЙ — тёмная половина (900) сверху, светлая (899)
          снизу; объект 524px в каждой на (155, 185). БЕЗ текста (в Figma
          скрыт). Снизу бар-индикатор «1/2». */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1801} mode="grow" className="w-full">
          <div className="relative h-[1801px] w-[834px] overflow-clip">
            {/* Тёмная половина (0..900) — bg #01030a. */}
            <div className="absolute left-0 top-0 h-[900px] w-full overflow-clip bg-[#01030a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                aria-hidden
                className="absolute left-[155px] top-[185px] size-[524px] max-w-none"
                src={`${A}/pr2-coin.png`}
              />
            </div>
            {/* Светлая половина (900..1799) — bg #f4f6fa. */}
            <div className="absolute left-0 top-[900px] h-[899px] w-full overflow-clip bg-[#f4f6fa]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                aria-hidden
                className="absolute left-[155px] top-[185px] size-[524px] max-w-none"
                src={`${A}/pr2-lock.png`}
              />
            </div>
            {/* Прогресс-индикатор «1/2» (0, 1799): плашки h-2, x 0 (w 22, opacity 30) + x 34 (w 44, активна). */}
            <div className="absolute left-0 top-[1799px] flex gap-[12px]">
              <div className="h-[2px] w-[22px] rounded-[2px] bg-white opacity-30" />
              <div className="h-[2px] w-[44px] rounded-[1px] bg-white" />
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 1024–1439 — 1:1 из Figma 2695:18286 (1280×800): сплит-фон 50/50 +
          объекты 465.78px по центру половин, БЕЗ текста (в Figma скрыт). */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={800} mode="grow" className="w-full">
          <div className="relative h-[800px] w-[1280px] overflow-clip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden className="absolute inset-y-0 left-0 h-full w-1/2 object-cover object-top" src={`${A}/pr2-bg-left.jpg`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden className="absolute inset-y-0 right-0 h-full w-1/2 object-cover object-top" src={`${A}/pr2-bg-right.jpg`} />
            <div className="absolute inset-y-0 left-0 w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" aria-hidden className="absolute left-1/2 top-1/2 size-[465.78px] max-w-none -translate-x-1/2 -translate-y-1/2" src={`${A}/pr2-coin.png`} />
            </div>
            <div className="absolute inset-y-0 right-0 w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" aria-hidden className="absolute left-1/2 top-1/2 size-[465.78px] max-w-none -translate-x-1/2 -translate-y-1/2" src={`${A}/pr2-lock.png`} />
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}

export default function PrinciplesSlides() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(1);
  const reduced = useReducedMotion();
  // Пин + кроссфейд — только на десктопе ≥1440. <1440 (и reduced-motion) —
  // два обычных статичных блока в потоке (RESPONSIVE.md: пины/скрабы на
  // планшете-верт и мобайле отключаются).
  const wide = useBreakpoint() === "desktop";
  const flow = reduced || !wide;

  useGSAP(
    () => {
      if (flow || !pinRef.current || !wrapRef.current) return;

      const state = { slide: 1 };
      function showSlide(next: number) {
        if (state.slide === next) return;
        state.slide = next;
        setSlide(next);
        gsap.to(slide1Ref.current, { opacity: next === 1 ? 1 : 0, duration: 0.45, ease: "siteEase", overwrite: "auto" });
        gsap.to(slide2Ref.current, { opacity: next === 2 ? 1 : 0, duration: 0.45, ease: "siteEase", overwrite: "auto" });
      }

      // Механика как «Проблема / Экран» в кейсе 1 (ProblemScreen.tsx), но
      // пин КОРОЧЕ — 0.55 экрана вместо целого. Так после кроссфейда на
      // пороге 0.5 слайд 2 почти сразу отпускает пин и снизу наезжает
      // «Процесс»: нет длинной «мёртвой» зоны, где висит статичный светлый
      // слайд 2 (переключение блоков ощущается как один скролл).
      //
      // БАГ (воспроизведён и измерён): у кроссфейда на 0.45с реального
      // времени остаётся всего ~0.275 экрана скролла после порога 0.5 —
      // при обычной скорости колеса/трекпада пин успевает отпуститься
      // РАНЬШЕ, чем doведётся анимация: слайд застревает на середине
      // перехода (видно оба слоя внахлёст — тёмный/светлый фон вперемешку,
      // тот самый «белый участок») и укатывается вверх вместе со страницей
      // недоигранным. onLeave/onLeaveBack мгновенно (gsap.set, не .to)
      // фиксируют корректное конечное состояние ровно в момент выхода за
      // границы триггера — независимо от того, успел ли доиграть таймер.
      const snapTo = (next: number) => {
        state.slide = next;
        setSlide(next);
        // killTweensOf — иначе ещё тикающий gsap.to() из предыдущего
        // showSlide() на следующем кадре перезапишет наш gsap.set()
        // своим интерполированным значением (воспроизведено: после
        // мгновенного снапа в 0/1 opacity через кадр снова уезжала).
        gsap.killTweensOf([slide1Ref.current, slide2Ref.current]);
        gsap.set(slide1Ref.current, { opacity: next === 1 ? 1 : 0 });
        gsap.set(slide2Ref.current, { opacity: next === 2 ? 1 : 0 });
      };

      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: () => "+=" + Math.round(window.innerHeight * 0.55),
        pin: pinRef.current,
        pinSpacing: true,
        onUpdate: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
        onRefresh: (self) => showSlide(self.progress < 0.5 ? 1 : 2),
        onLeave: () => snapTo(2),
        onLeaveBack: () => snapTo(1),
      });

      return () => st.kill();
    },
    { scope: wrapRef, dependencies: [flow] }
  );

  // Фон слайда 2 — сплит тёмная/светлая половины, тянется на весь экран
  // (содержимое поверх остаётся в 1440-сетке). Каждая половина — экспорт
  // соответствующего фрейма-фона из Figma (node 2022:14801 — тёмная,
  // node 2022:14760 — светлая): неоднородный градиент + размытые
  // блики + зерно, а не плоская CSS-заливка. Растягиваем на всю высоту
  // блока (object-cover), опорная точка — верх.
  const bgLayer = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden
        className="absolute inset-y-0 left-0 h-full w-1/2 object-cover object-top"
        src={`${A}/pr2-bg-left.jpg`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden
        className="absolute inset-y-0 right-0 h-full w-1/2 object-cover object-top"
        src={`${A}/pr2-bg-right.jpg`}
      />
    </>
  );

  if (flow) {
    // <1440 (и reduced-motion): два блока в потоке. Slide1 / Slide2Content
    // сами отдают FullBleedScale-канвас 1280 (при reduced на десктопе —
    // свою xl-ветку). Сплит-фон слайда 2 — внутри его канваса.
    return (
      <>
        <section className="relative w-full overflow-clip bg-[#121212]">
          <Slide1 />
          {/* reduced-motion на десктопе: статичный индикатор в 1440-сетке. */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden items-start justify-center xl:flex">
            <div className="relative h-[900px] w-[1440px]">
              <SlideProgress active={0} className="absolute left-[46px] top-[852px]" />
            </div>
          </div>
        </section>
        <section className="relative w-full overflow-clip bg-[#121212] xl:bg-transparent">
          <div className="relative w-full xl:h-[900px]">
            <div className="hidden xl:block">{bgLayer}</div>
            <div className="xl:absolute xl:inset-0 xl:flex xl:items-center xl:justify-center">
              <Slide2Content />
            </div>
            <div className="pointer-events-none absolute inset-0 z-20 hidden items-start justify-center xl:flex">
              <div className="relative h-[900px] w-[1440px]">
                <SlideProgress active={1} className="absolute left-[46px] top-[852px]" />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: "155vh" }}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-[#121212]">
        {/* Слайд 1 — тёмный, центрированная 1440-сетка. */}
        <div ref={slide1Ref} className="absolute inset-0 flex items-center justify-center">
          <Slide1 />
        </div>

        {/* Слайд 2 — фон тянется на весь экран, контент в 1440-сетке. */}
        <div ref={slide2Ref} className="absolute inset-0" style={{ opacity: 0 }}>
          {bgLayer}
          <div className="absolute inset-0 flex items-center justify-center">
            <Slide2Content />
          </div>
        </div>

        {/* Общий индикатор «1 из 2» — не в слоях-слайдах, поэтому при
            переключении ширина/прозрачность сегментов «перетекают».
            В ЦЕНТРИРОВАННОЙ 1440-сетке — бар на (46, 852) как в макете, не
            прижимается к краю экрана на мониторах шире 1440. */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="relative h-[900px] w-[1440px]">
            <SlideProgress active={slide - 1} className="absolute left-[46px] top-[852px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
