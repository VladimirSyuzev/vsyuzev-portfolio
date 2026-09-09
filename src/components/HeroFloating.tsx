"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Floating, { FloatingElement } from "@/components/ui/floating";
import { DotPattern } from "@/components/ui/dot-pattern";
import { PixelText } from "@/components/ui/pixel-text";
import { useBreakpoint, type Breakpoint } from "@/lib/breakpoint";
import { useReducedMotion } from "@/lib/gsap";

const NAME_LINES = ["VOVA", "SYUZEV"];

// HeroFloating — первый экран главной. В центре имя «Vova Syuzev», вокруг
// «плавают» работы (параллакс по движению мыши + лёгкий idle-дрейф). Набор
// картинок, их места, размеры и наклоны — случайные на каждую загрузку.
// Количество зависит от размера экрана. Клик по картинке — полноэкранный
// просмотр (оригинал). Секция всегда во всю высоту вьюпорта (100svh).

// tile — лёгкий webp-превью для коллажа, full — оригинал для полноэкрана.
const NAMES = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
];
const EXT: Record<string, string> = {
  "1": "png", "14": "png", "16": "png", "19": "png", "20": "png",
};
const POOL = NAMES.map((n) => ({
  tile: `/hero-parallax/thumb/${n}.webp`,
  full: `/hero-parallax/${n}.${EXT[n] ?? "jpg"}`,
}));

// Сколько картинок показывать по брейкпоинтам (см. RESPONSIVE.md):
const COUNT_RANGE: Record<Breakpoint, [number, number]> = {
  desktop: [14, 18], // ≥1440
  tabletL: [12, 16], // 1024–1439
  tabletP: [10, 14], // 640–1023
  mobile: [6, 8], // <640
};

// mulberry32 — сид-ГСЧ: раскладка детерминирована сидом (useMemo чистый).
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: readonly T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Tile = {
  src: string;
  full: string;
  x: number; // % центра по горизонтали
  y: number; // % центра по вертикали
  size: string; // CSS-ширина
  depth: number;
  rotate: number;
  driftDur: number;
  driftDelay: number;
  driftY: number;
  enterDelay: number; // задержка появления после текста, сек
};

// Множитель размера плиток по брейкпоинту — на больших экранах картинки
// крупнее (иначе теряются в пространстве).
const BP_SIZE: Record<Breakpoint, number> = {
  desktop: 1.5, // ≥1440
  tabletL: 1.3, // 1024–1439
  tabletP: 1.15, // 640–1023
  mobile: 1.0, // <640
};

// Раскладка: раскидываем count плиток в кольце вокруг центра (внутренний
// радиус держит их в стороне от имени), с проверкой на минимальную
// дистанцию — получается «живой» коллаж без явных пересечений.
function buildTiles(seed: number, count: number, bp: Breakpoint): Tile[] {
  const rand = rng(seed);
  const imgs = shuffle(POOL, rand).slice(0, count);
  // размер = база × поправка на кол-во (много плиток → чуть мельче) × брейкпоинт
  const kCount = count >= 15 ? 0.9 : count >= 11 ? 0.97 : 1.05;
  const k = kCount * BP_SIZE[bp];

  const placed: { x: number; y: number }[] = [];
  const tiles: Tile[] = [];

  // Запретная зона по центру — примерный габарит имени «Vova Syuzev».
  // Меньше плиток → крупнее шрифт занимает больше → зона шире.
  const bx = count <= 9 ? 36 : 29;
  const by = count <= 9 ? 21 : 18;
  const goodD = count >= 13 ? 13 : 18;

  for (let i = 0; i < count; i++) {
    let best: { x: number; y: number; d: number } | null = null;
    for (let t = 0; t < 60; t++) {
      const ang = rand() * Math.PI * 2;
      const r = 0.37 + rand() * 0.34;
      const x = 50 + Math.cos(ang) * r * 66;
      const y = 50 + Math.sin(ang) * r * 70;
      if (x < 3 || x > 97 || y < 4 || y > 96) continue;
      if (Math.abs(x - 50) < bx && Math.abs(y - 50) < by) continue; // на имени
      const d = placed.length
        ? Math.min(...placed.map((p) => Math.hypot(p.x - x, p.y - y)))
        : 999;
      if (!best || d > best.d) best = { x, y, d };
      if (d > goodD) break;
    }
    const pos = best ?? { x: 50, y: 8 };
    placed.push({ x: pos.x, y: pos.y });

    const vmin = (9 + rand() * 6) * k;
    const cap = Math.round((170 + rand() * 95) * k);
    const min = Math.round(62 * k);
    tiles.push({
      src: imgs[i].tile,
      full: imgs[i].full,
      x: pos.x,
      y: pos.y,
      size: `clamp(${min}px, ${vmin.toFixed(1)}vmin, ${cap}px)`,
      depth: 0.8 + rand() * 2.6,
      rotate: (rand() * 2 - 1) * 9,
      driftDur: 6 + rand() * 5,
      driftDelay: rand() * -8,
      driftY: 4 + rand() * 7,
      enterDelay: 0,
    });
  }
  // случайный порядок появления картинок — разложим задержки по перемешанным
  // индексам (0 → count·0.11 с), чтобы вылезали вразнобой, а не по кругу
  shuffle(
    tiles.map((_, i) => i),
    rng(seed * 2654435761),
  ).forEach((tileIdx, order) => {
    tiles[tileIdx].enterDelay = order * 0.11 + rand() * 0.06;
  });
  return tiles;
}

const noop = () => () => {};

export default function HeroFloating() {
  const reduced = useReducedMotion();
  const bp = useBreakpoint();
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const [open, setOpen] = useState<string | null>(null);

  const [seed] = useState(() => 1 + Math.floor(Math.random() * 1_000_000_000));

  // Интро: сначала имя собирается из пикселей (PixelText), потом вразнобой
  // появляются картинки. reduced-motion / до гидратации — всё сразу.
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [introDone, setIntroDone] = useState(false);
  // до гидратации имя скрыто (иначе на долю секунды мелькнёт чёткий текст
  // перед пиксельной сборкой); reduced-motion — показываем сразу
  const nameVisible = reduced || introDone;
  const imagesIn = reduced || introDone;
  const finishIntro = useCallback(() => setIntroDone(true), []);

  // подстраховка: если PixelText не отрапортует (шрифт/канвас) — показываем всё
  useEffect(() => {
    if (reduced || !hydrated) return;
    const id = window.setTimeout(() => setIntroDone(true), 5000);
    return () => window.clearTimeout(id);
  }, [reduced, hydrated]);

  const tiles = useMemo(() => {
    const [lo, hi] = COUNT_RANGE[bp];
    // count — тоже от сида, но со сдвигом, чтобы не коррелировал с раскладкой
    const count = lo + Math.floor(rng(seed ^ 0x9e3779b9)() * (hi - lo + 1));
    return buildTiles(seed, Math.min(count, POOL.length), bp);
  }, [seed, bp]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const nodes = tiles.map((t) => (
    <FloatingElement
      key={t.full}
      depth={reduced ? 0 : t.depth}
      style={{ top: `${t.y}%`, left: `${t.x}%` }}
    >
      {/* центрирование слота на точке привязки (transform здесь; rAF-цикл
          Floating пишет transform родителю — не конфликтует) */}
      <div style={{ transform: "translate(-50%, -50%)" }}>
        {/* появление после текста — вразнобой (enterDelay) */}
        <motion.div
          initial={false}
          animate={
            imagesIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{
            delay: imagesIn && !reduced ? t.enterDelay : 0,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
        {/* idle-дрейф — лёгкое «дыхание», работает и без мыши (мобайл) */}
        <motion.div
          animate={
            reduced
              ? undefined
              : { y: [0, -t.driftY, 0], rotate: [0, t.rotate * 0.14, 0] }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: t.driftDur,
                  delay: t.driftDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <button
            type="button"
            onClick={() => setOpen(t.full)}
            aria-label="Открыть изображение на весь экран"
            className="group block cursor-pointer overflow-hidden rounded-[4px] shadow-[0_24px_60px_-16px_rgba(0,0,0,0.65)] outline-none transition-[scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.07] focus-visible:ring-2 focus-visible:ring-white/70"
            style={{ width: t.size, rotate: `${t.rotate}deg` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.src}
              alt=""
              draggable={false}
              loading="lazy"
              className="block h-auto w-full select-none transition-[filter] duration-300 group-hover:brightness-110"
            />
          </button>
        </motion.div>
        </motion.div>
      </div>
    </FloatingElement>
  ));

  return (
    <section className="relative flex h-[100svh] min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#121212]">
      {/* сетка точек на фоне — под парящими картинками, мягко гаснет к краям */}
      <DotPattern
        width={26}
        height={26}
        cr={1}
        className="fill-white/[0.09] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_92%)]"
      />

      {hydrated &&
        (reduced ? (
          <div className="absolute inset-0">{nodes}</div>
        ) : (
          <Floating sensitivity={1} easingFactor={0.06}>
            {nodes}
          </Floating>
        ))}

      <div className="pointer-events-none relative z-10">
        <h1
          ref={nameRef}
          className="select-none text-center font-heading text-[clamp(2.75rem,12vw,175px)] font-bold uppercase leading-none tracking-[0.03em] text-[#008CFF] transition-opacity duration-500"
          style={{ opacity: nameVisible ? 1 : 0 }}
        >
          Vova
          <br />
          Syuzev
        </h1>
        {hydrated && !reduced && !introDone && (
          <PixelText
            targetRef={nameRef}
            lines={NAME_LINES}
            seed={seed}
            onComplete={finishIntro}
          />
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              src={open}
              alt=""
              className="max-h-full max-w-full object-contain shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              aria-label="Закрыть"
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
