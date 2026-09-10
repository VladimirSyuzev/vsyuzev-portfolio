"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import { useBreakpoint, type Breakpoint } from "@/lib/breakpoint";
import HERO_IMAGES from "@/data/hero-images.json";

// HeroFloating — скролл-сценарий первого экрана:
//  1. появляется имя + «scroll to explore»;
//  2. при скролле справа въезжают обложки и ВЫТАЛКИВАЮТ имя за левый край;
//  3. обложки закручиваются и собираются в круг;
//  4. круг увеличивается и уходит вверх — дуга остаётся НИЖЕ центра экрана;
//  5. дальше скролл ВРАЩАЕТ круг (страница ещё запинена), потом открепляется.
// Обложки показываются целиком (карточка по соотношению сторон картинки).
// Набор и порядок обложек случайны на каждую загрузку.
// prefers-reduced-motion / до гидратации — статичный круг + имя, без пина.

type Img = { name: string; full: string; tile: string; aspect: number };
const POOL = HERO_IMAGES as Img[];

const COUNT: Record<Breakpoint, number> = {
  desktop: 18,
  tabletL: 15,
  tabletP: 12,
  mobile: 9,
};

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
  const bp = useBreakpoint();
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const [seed] = useState(() => 1 + Math.floor(Math.random() * 1_000_000_000));
  const [open, setOpen] = useState<string | null>(null);

  const [vw, setVw] = useState(1440);
  useEffect(() => {
    const upd = () => setVw(window.innerWidth);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  const items = useMemo(
    () => shuffle(POOL, rng(seed)).slice(0, Math.min(COUNT[bp], POOL.length)),
    [seed, bp],
  );
  const N = items.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const cardW = useMemo(() => {
    const u = Math.min(vw, 1000);
    return Math.round(Math.max(78, Math.min(u * 0.135, 156)));
  }, [vw]);
  const cardH = (i: number) => {
    const a = Math.min(2, Math.max(0.55, items[i]?.aspect ?? 0.78));
    return Math.round(cardW / a);
  };

  useGSAP(
    () => {
      if (reduced || !hydrated) return;
      const stage = stageRef.current;
      const reel = reelRef.current;
      const spin = spinRef.current;
      const nameEl = nameRef.current;
      const hintEl = hintRef.current;
      const els = itemRefs.current.slice(0, N);
      if (!stage || !reel || !spin || !nameEl || els.some((e) => !e)) return;

      const vh = window.innerHeight;
      const unit = Math.min(vw, vh);
      const S = cardW;
      const rowGap = S * 1.16;
      const R = unit * 0.46;

      const rowX = (i: number) => (i - (N - 1) / 2) * rowGap;
      const rowY = (i: number) => Math.sin(i * 1.7 + 1) * (S * 0.14);
      const rowRot = (i: number) => ((i * 53) % 15) - 7;
      const cA = (i: number) => ((-90 + (360 * i) / N) * Math.PI) / 180;
      const cX = (i: number) => Math.cos(cA(i)) * R;
      const cY = (i: number) => Math.sin(cA(i)) * R;
      const cRot = (i: number) => (360 * i) / N;

      els.forEach((el, i) => {
        gsap.set(el, {
          x: vw * 0.66 + i * S * 0.5,
          y: rowY(i) + (i % 2 ? 28 : -20),
          rotation: rowRot(i) + 12,
          scale: 0.9,
          opacity: 0,
        });
      });
      gsap.set(reel, { x: 0, y: 0, scale: 1 });
      gsap.set(spin, { rotation: 0 });

      gsap.from(nameEl, { opacity: 0, yPercent: 24, duration: 0.8, ease: "siteEase", delay: 0.05 });
      if (hintEl) gsap.fromTo(hintEl, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=" + Math.round(vh * 4.6),
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (hintEl) tl.to(hintEl, { opacity: 0, duration: 0.03 }, 0.01);

      // 1 — обложки въезжают справа в ряд по центру и выталкивают имя влево
      els.forEach((el, i) => {
        tl.to(
          el,
          {
            x: rowX(i),
            y: rowY(i),
            rotation: rowRot(i),
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 0.36,
          },
          0.04 + i * (0.14 / N),
        );
      });
      tl.to(nameEl, { x: () => -window.innerWidth * 1.05, ease: "none", duration: 0.3 }, 0.1);
      tl.to(nameEl, { opacity: 0, duration: 0.05 }, 0.34);

      // 2 — обложки по очереди отрываются от ряда и уходят на окружность
      //     (крупный stagger → в полёте всегда 1–2 карточки, без свалки)
      els.forEach((el, i) => {
        tl.to(
          el,
          {
            x: cX(i),
            y: cY(i),
            rotation: cRot(i),
            ease: "power2.inOut",
            duration: 0.22,
          },
          0.4 + i * (0.24 / N),
        );
      });

      // 3 — круг увеличивается и уходит вверх → дуга оказывается ниже центра
      tl.to(
        reel,
        { scale: 1.75, y: -R * 0.72, ease: "power1.inOut", duration: 0.12 },
        0.72,
      );
      tl.to(spin, { rotation: 34, ease: "power1.inOut", duration: 0.12 }, 0.72);

      // 4 — дальше скролл вращает круг (страница ещё запинена)
      tl.to(spin, { rotation: 34 + 150, ease: "none", duration: 0.16 }, 0.84);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [reduced, hydrated, bp, seed, vw, N], scope: rootRef },
  );

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

  // статичная раскладка (reduced / до гидратации)
  const staticTransform = (i: number) => {
    if (!reduced) return "translate(0px, 0px)";
    const R = Math.min(vw, 900) * 0.42;
    const a = ((-90 + (360 * i) / N) * Math.PI) / 180;
    return `translate(${(Math.cos(a) * R).toFixed(1)}px, ${(Math.sin(a) * R).toFixed(1)}px) rotate(${((360 * i) / N).toFixed(1)}deg)`;
  };

  return (
    <section ref={rootRef} className="relative w-full bg-[#121212]">
      <div ref={stageRef} className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden">
        <div ref={reelRef} className="absolute inset-0 z-10">
          <div ref={spinRef} className="absolute inset-0">
            {hydrated &&
              items.map((it, i) => (
                <button
                  key={it.full}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setOpen(it.full)}
                  aria-label="Открыть изображение на весь экран"
                  className="group absolute left-1/2 top-1/2 overflow-hidden rounded-[20px] shadow-[0_28px_70px_-20px_rgba(0,0,0,0.7)] outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  style={{
                    width: cardW,
                    height: cardH(i),
                    marginLeft: -cardW / 2,
                    marginTop: -cardH(i) / 2,
                    transform: staticTransform(i),
                    opacity: reduced ? 1 : 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.tile}
                    alt=""
                    draggable={false}
                    className="h-full w-full select-none object-cover transition-[filter] duration-300 group-hover:brightness-110"
                  />
                </button>
              ))}
          </div>
        </div>

        <h1
          ref={nameRef}
          className="pointer-events-none absolute inset-0 z-20 flex select-none items-center justify-center whitespace-nowrap px-6 text-center font-heading text-[clamp(2rem,9vw,132px)] font-bold uppercase leading-none tracking-[0.02em] text-white"
        >
          Vova Syuzev
        </h1>

        <p
          ref={hintRef}
          className="pointer-events-none absolute left-1/2 top-[calc(50%+clamp(3rem,7vw,6rem))] z-20 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.3em] text-white/40"
        >
          Scroll to explore
        </p>
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
