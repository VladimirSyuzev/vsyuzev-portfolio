"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Floating, { FloatingElement } from "@/components/ui/floating";
import { useReducedMotion } from "@/lib/gsap";

// HeroFloating — первый экран главной. В центре имя «Vova Syuzev», вокруг
// «плавают» 6–8 работ из пула (параллакс по движению мыши). Набор картинок
// и их слоты выбираются случайно на каждой загрузке. Клик по картинке —
// полноэкранный просмотр. Секция всегда во всю высоту вьюпорта (100svh).

const POOL = [
  "1.png", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg",
  "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "15.jpg", "17.jpg", "18.jpg",
  "20.png",
].map((name) => `/hero-parallax/${name}`);

// Слоты вокруг центра. top/left — точка ПРИВЯЗКИ (центр картинки), заданы в
// % от секции; держатся в стороне от центральной зоны, где имя. size —
// ширина картинки (clamp: тесно на узких экранах, крупно на широких).
// depth — сила параллакса. rotate — лёгкий наклон «фото».
type Slot = { top: string; left: string; size: string; depth: number; rotate: number };
const SLOTS: Slot[] = [
  { top: "16%", left: "12%", size: "clamp(84px, 12vw, 210px)", depth: 1.6, rotate: -6 },
  { top: "13%", left: "78%", size: "clamp(78px, 10vw, 180px)", depth: 2.3, rotate: 5 },
  { top: "44%", left: "7%",  size: "clamp(80px, 11vw, 195px)", depth: 1.0, rotate: 4 },
  { top: "40%", left: "90%", size: "clamp(74px, 9vw, 165px)",  depth: 2.8, rotate: -5 },
  { top: "78%", left: "16%", size: "clamp(80px, 10vw, 185px)", depth: 1.9, rotate: 7 },
  { top: "80%", left: "72%", size: "clamp(82px, 11vw, 200px)", depth: 1.3, rotate: -7 },
  { top: "8%",  left: "44%", size: "clamp(72px, 9vw, 160px)",  depth: 2.1, rotate: 3 },
  { top: "88%", left: "46%", size: "clamp(74px, 9vw, 165px)",  depth: 1.5, rotate: -4 },
  { top: "60%", left: "93%", size: "clamp(66px, 8vw, 140px)",  depth: 3.1, rotate: 6 },
  { top: "30%", left: "26%", size: "clamp(70px, 8vw, 150px)",  depth: 2.5, rotate: -9 },
];

// mulberry32 — крошечный сид-ГСЧ (как в бывшем ZoomParallax): раскладка
// детерминирована сидом, поэтому useMemo чистый. Сид на сервере и клиенте
// разный, но набор рендерится только после гидратации (useSyncExternalStore)
// — mismatch в DOM не попадает, а при перезагрузке сид новый.
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

const noop = () => () => {};

export default function HeroFloating() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);

  const [seed] = useState(() => 1 + Math.floor(Math.random() * 1_000_000_000));
  const hydrated = useSyncExternalStore(noop, () => true, () => false);

  // 6–8 картинок в 6–8 случайных слотах — детерминировано от seed.
  const picks = useMemo(() => {
    const rand = rng(seed);
    const count = 6 + Math.floor(rand() * 3); // 6..8
    const imgs = shuffle(POOL, rand).slice(0, count);
    const slots = shuffle(SLOTS, rand).slice(0, count);
    return slots.map((slot, i) => ({ slot, src: imgs[i] }));
  }, [seed]);

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

  const tiles = picks.map(({ slot, src }) => (
    <FloatingElement
      key={src}
      depth={reduced ? 0 : slot.depth}
      style={{ top: slot.top, left: slot.left }}
    >
      {/* центрирование слота на точке привязки — transform на этом div,
          rAF-цикл Floating пишет transform родителю, конфликта нет */}
      <div style={{ transform: "translate(-50%, -50%)" }}>
        <button
          type="button"
          onClick={() => setOpen(src)}
          aria-label="Открыть изображение на весь экран"
          className="group block cursor-pointer overflow-hidden rounded-[4px] shadow-[0_24px_60px_-16px_rgba(0,0,0,0.65)] outline-none transition-[scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06] focus-visible:ring-2 focus-visible:ring-white/70"
          style={{ width: slot.size, rotate: `${slot.rotate}deg` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            draggable={false}
            loading="lazy"
            className="block h-auto w-full select-none transition-[filter] duration-300 group-hover:brightness-110"
          />
        </button>
      </div>
    </FloatingElement>
  ));

  return (
    <section className="relative flex h-[100svh] min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#121212]">
      {hydrated &&
        (reduced ? (
          <div className="absolute inset-0">{tiles}</div>
        ) : (
          <Floating sensitivity={1} easingFactor={0.06}>
            {tiles}
          </Floating>
        ))}

      <h1 className="pointer-events-none relative z-10 select-none text-center font-heading text-[clamp(2.75rem,12vw,175px)] font-bold uppercase leading-none tracking-[0.03em] text-white">
        Vova
        <br />
        Syuzev
      </h1>

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
