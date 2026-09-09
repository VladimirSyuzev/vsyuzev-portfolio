"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import { useBreakpoint, type Breakpoint } from "@/lib/breakpoint";

// HeroFloating — скролл-сценарий первого экрана:
//  1. появляется имя;
//  2. при скролле справа в один ряд въезжают обложки работ;
//  3. ряд вместе с именем уезжает влево — имя пропадает, ряд встаёт по центру;
//  4. каждая обложка закручивается и уходит на окружность — образуется круг;
//  5. круг наезжает (scale) и смещается — в кадре остаётся дуга из обложек.
// Секция запинена на всё время сценария (GSAP ScrollTrigger, scrub).
// prefers-reduced-motion / до гидратации — статичный круг + имя, без пина.

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

const COUNT: Record<Breakpoint, number> = {
  desktop: 20,
  tabletL: 16,
  tabletP: 13,
  mobile: 10,
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
    () => shuffle(POOL, rng(seed)).slice(0, COUNT[bp]),
    [seed, bp],
  );
  const N = items.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // габариты карточки от ширины экрана (высоту не трогаем — на мобиле
  // адресная строка дёргает vh и перестраивала бы весь ScrollTrigger)
  const card = useMemo(() => {
    const unit = Math.min(vw, 900);
    const w = Math.max(58, Math.min(unit * 0.13, 132));
    return { w, h: w * 1.34 };
  }, [vw]);

  useGSAP(
    () => {
      if (reduced || !hydrated) return;
      const stage = stageRef.current;
      const reel = reelRef.current;
      const nameEl = nameRef.current;
      const hintEl = hintRef.current;
      const els = itemRefs.current.slice(0, N);
      if (!stage || !reel || !nameEl || els.some((e) => !e)) return;

      const vh = window.innerHeight;
      const unit = Math.min(vw, vh);
      const S = card.w;
      const rowGap = S * 1.08;
      const R = unit * (N > 16 ? 0.46 : 0.42);

      const rowX = (i: number) => (i - (N - 1) / 2) * rowGap;
      const rowY = (i: number) => Math.sin(i * 1.6) * (S * 0.14);
      const rowRot = (i: number) => ((i * 47) % 13) - 6;
      const ang = (i: number) => ((-90 + (360 * i) / N) * Math.PI) / 180;
      const circX = (i: number) => Math.cos(ang(i)) * R;
      const circY = (i: number) => Math.sin(ang(i)) * R;
      const circRot = (i: number) => (360 * i) / N;

      els.forEach((el, i) => {
        gsap.set(el, {
          x: vw * 0.62 + i * S * 0.42,
          y: rowY(i) + (i % 2 ? 22 : -16),
          rotation: rowRot(i) + 10,
          scale: 0.92,
          opacity: 0,
        });
      });
      gsap.set(reel, { scale: 1, x: 0, y: 0 });

      // появление имени (не привязано к скроллу)
      gsap.from(nameEl, { opacity: 0, yPercent: 26, duration: 0.8, ease: "siteEase", delay: 0.05 });
      if (hintEl) gsap.from(hintEl, { opacity: 0, duration: 0.6, delay: 0.55 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=" + Math.round(vh * 3.4),
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (hintEl) tl.to(hintEl, { opacity: 0, duration: 0.04 }, 0.015);

      // 1 — обложки въезжают справа в ряд (ряд смещён правее центра)
      els.forEach((el, i) => {
        tl.to(
          el,
          {
            x: rowX(i) + vw * 0.2,
            y: rowY(i),
            rotation: rowRot(i),
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            duration: 0.3,
          },
          0.03 + i * (0.14 / N),
        );
      });

      // 2 — ряд + имя едут влево; имя гаснет; ряд встаёт по центру
      els.forEach((el, i) => {
        tl.to(el, { x: rowX(i), ease: "power1.inOut", duration: 0.16 }, 0.34);
      });
      tl.to(nameEl, { xPercent: -160, opacity: 0, ease: "power2.in", duration: 0.16 }, 0.34);

      // 3 — закручивание в круг
      els.forEach((el, i) => {
        tl.to(
          el,
          {
            x: circX(i),
            y: circY(i),
            rotation: circRot(i),
            ease: "power2.inOut",
            duration: 0.3,
          },
          0.52 + i * (0.1 / N),
        );
      });

      // 4 — наезд: круг увеличивается и уходит вниз → остаётся верхняя дуга
      tl.to(reel, { scale: 2.6, y: R * 1.7, ease: "power1.in", duration: 0.16 }, 0.86);

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

  // статичная раскладка (reduced / до гидратации): круг или скрытый центр
  const staticTransform = (i: number) => {
    if (!reduced) return "translate(0px, 0px)"; // до гидратации — спрятаны в центре (opacity 0)
    const R = Math.min(vw, 900) * 0.42;
    const a = ((-90 + (360 * i) / N) * Math.PI) / 180;
    return `translate(${(Math.cos(a) * R).toFixed(1)}px, ${(Math.sin(a) * R).toFixed(1)}px) rotate(${((360 * i) / N).toFixed(1)}deg)`;
  };

  return (
    <section ref={rootRef} className="relative w-full bg-[#121212]">
      <div
        ref={stageRef}
        className="relative flex h-[100svh] min-h-[100svh] w-full items-center justify-center overflow-hidden"
      >
        <div ref={reelRef} className="absolute inset-0 z-10">
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
                width: card.w,
                height: card.h,
                marginLeft: -card.w / 2,
                marginTop: -card.h / 2,
                transform: staticTransform(i),
                opacity: reduced ? 1 : 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.tile}
                alt=""
                draggable={false}
                loading="lazy"
                className="h-full w-full select-none object-cover transition-[filter] duration-300 group-hover:brightness-110"
                />
              </button>
            ))}
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
