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
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [navDir, setNavDir] = useState(1);

  const [vw, setVw] = useState(1440);
  useEffect(() => {
    const upd = () => setVw(window.innerWidth);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  // случайный набор, затем чередуем горизонтальные / вертикальные обложки
  const items = useMemo(() => {
    const picked = shuffle(POOL, rng(seed)).slice(0, Math.min(COUNT[bp], POOL.length));
    const wide = picked.filter((x) => x.aspect >= 1);
    const tall = picked.filter((x) => x.aspect < 1);
    const out: Img[] = [];
    let wi = 0;
    let ti = 0;
    for (let k = 0; k < picked.length; k++) {
      const wantWide =
        wi / Math.max(1, wide.length) <= ti / Math.max(1, tall.length);
      if (wantWide && wi < wide.length) out.push(wide[wi++]);
      else if (ti < tall.length) out.push(tall[ti++]);
      else out.push(wide[wi++]);
    }
    return out;
  }, [seed, bp]);
  const N = items.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // обложки выравнены по «массе»: ширина + высота ≈ одинаковы у всех
  // (горизонтальные — короче и шире, вертикальные — выше и уже)
  const span = useMemo(() => {
    const u = Math.min(vw, 1100);
    return Math.round(Math.max(230, Math.min(u * 0.31, 400)));
  }, [vw]);
  const dims = (i: number) => {
    const a = Math.min(1.5, Math.max(0.7, items[i]?.aspect ?? 0.78));
    const h = span / (1 + a);
    return { w: Math.round(span - h), h: Math.round(h) };
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
      // ПЛОТНАЯ упаковка: каждая карточка занимает дугу = своя ширина + зазор,
      // радиус круга ВЫВОДИТСЯ из суммы (карточки почти касаются, без больших
      // промежутков независимо от их размеров)
      const gap = span * 0.05;
      const arcW = items.map((_, i) => dims(i).w + gap);
      const totalArc = arcW.reduce((s2, w) => s2 + w, 0);
      const R = totalArc / (2 * Math.PI);
      const cum: number[] = [];
      arcW.reduce((acc, w, i) => {
        cum[i] = acc;
        return acc + w;
      }, 0);
      // положение центра карточки вдоль ленты (0 = «шов» круга сверху)
      const s = (i: number) => cum[i] + arcW[i] / 2 - totalArc / 2;

      const rowY = (i: number) => Math.sin(i * 1.7 + 1) * (span * 0.04);
      const rowRot = (i: number) => ((i * 53) % 13) - 6;

      // «скатывание» ленты в круг параметром t (0 ряд → 1 круг): лента гнётся
      // с уменьшающимся радиусом кривизны, карточки не пересекаются.
      const roll = (i: number, t: number) => {
        const tt = t * t * (3 - 2 * t); // smoothstep
        const rho = R * (1 + 26 * Math.pow(1 - tt, 3)); // радиус кривизны: ∞→R
        const a = s(i) / rho; // угол дуги от шва
        const x = rho * Math.sin(a);
        const y = rho * (1 - Math.cos(a)) - R * (R / rho); // центр круга → (0,0)
        const rot = (a * 180) / Math.PI;
        return {
          x,
          y,
          rotation: rowRot(i) + (rot - rowRot(i)) * tt,
        };
      };

      els.forEach((el, i) => {
        gsap.set(el, {
          x: vw * 0.66 + i * span * 0.4,
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
          end: "+=" + Math.round(vh * 4),
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (hintEl) tl.to(hintEl, { opacity: 0, duration: 0.03 }, 0.01);

      // 1 — обложки въезжают справа в ряд по центру и выталкивают имя влево
      els.forEach((el, i) => {
        const r0 = roll(i, 0);
        tl.to(
          el,
          {
            x: r0.x,
            y: r0.y + rowY(i),
            rotation: r0.rotation,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 0.3,
          },
          0.04 + i * (0.09 / N),
        );
      });
      tl.to(nameEl, { x: () => -window.innerWidth * 1.05, ease: "none", duration: 0.26 }, 0.1);
      tl.to(nameEl, { opacity: 0, duration: 0.05 }, 0.32);

      // 2 — лента СКАТЫВАЕТСЯ в круг (общий параметр t), карточки не пересекаются
      const bend = { t: 0 };
      tl.to(
        bend,
        {
          t: 1,
          ease: "power1.inOut",
          duration: 0.28,
          onUpdate: () => {
            els.forEach((el, i) => {
              const p = roll(i, bend.t);
              gsap.set(el, {
                x: p.x,
                y: p.y + rowY(i) * (1 - bend.t),
                rotation: p.rotation,
              });
            });
          },
        },
        0.42,
      );

      // 3 — «большой круг»: увеличиваем в 2 раза, опускаем так, чтобы ВЕРХНЯЯ
      //     точка круга села ровно на середину экрана (y = scale·R). Дальше НЕ
      //     опускается.
      tl.to(
        reel,
        { scale: 2, y: 2 * R, ease: "power1.inOut", duration: 0.16 },
        0.68,
      );
      tl.to(spin, { rotation: 26, ease: "power1.inOut", duration: 0.16 }, 0.68);

      // 4 — дальше скролл только ВРАЩАЕТ круг на месте (страница ещё запинена)
      tl.to(spin, { rotation: 26 + 200, ease: "none", duration: 0.16 }, 0.84);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [reduced, hydrated, bp, seed, vw, N], scope: rootRef },
  );

  const navLightbox = useCallback(
    (dir: number) => {
      setNavDir(dir);
      setOpenIdx((i) => (i === null ? i : (i + dir + N) % N));
    },
    [N],
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      else if (e.key === "ArrowRight") navLightbox(1);
      else if (e.key === "ArrowLeft") navLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIdx, navLightbox]);

  // статичная раскладка (reduced / до гидратации)
  const staticTransform = (i: number) => {
    if (!reduced) return "translate(0px, 0px)";
    const R = Math.min(vw, 900) * 0.5;
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
                  onClick={() => {
                    setNavDir(1);
                    setOpenIdx(i);
                  }}
                  aria-label="Открыть изображение на весь экран"
                  className="group absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-[20px] shadow-[0_28px_70px_-20px_rgba(0,0,0,0.7)] outline-none transition-[scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05] focus-visible:ring-2 focus-visible:ring-white/70"
                  style={{
                    width: dims(i).w,
                    height: dims(i).h,
                    marginLeft: -dims(i).w / 2,
                    marginTop: -dims(i).h / 2,
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
        {openIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-black/92"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenIdx(null)}
          >
            <button
              type="button"
              aria-label="Закрыть"
              onClick={() => setOpenIdx(null)}
              className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {/* картинка — сменяется со сдвигом в сторону навигации */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-12">
              <AnimatePresence custom={navDir} initial={false}>
                <motion.img
                  key={openIdx}
                  src={items[openIdx]?.full}
                  alt=""
                  custom={navDir}
                  draggable={false}
                  variants={{
                    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute max-h-full max-w-full object-contain shadow-2xl"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onClick={(e) => e.stopPropagation()}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) navLightbox(1);
                    else if (info.offset.x > 70) navLightbox(-1);
                  }}
                />
              </AnimatePresence>
            </div>

            {/* нижний бар состояния — как у карусели «варианты» */}
            <div
              className="flex items-center justify-center gap-[18px] pb-[max(24px,env(safe-area-inset-bottom))] pt-2 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Предыдущее изображение"
                onClick={() => navLightbox(-1)}
                className="grid size-[28px] place-items-center opacity-60 transition-opacity hover:opacity-100"
              >
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
                  <path d="M8 1 1.5 8 8 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex items-center gap-[4px]">
                {items.map((it, i) => (
                  <button
                    key={it.full}
                    type="button"
                    aria-label={`Изображение ${i + 1}`}
                    aria-current={i === openIdx || undefined}
                    onClick={() => {
                      setNavDir(i > openIdx ? 1 : -1);
                      setOpenIdx(i);
                    }}
                    className={`h-[2px] rounded-full bg-white transition-all duration-300 ${
                      i === openIdx ? "w-[22px] opacity-100" : "w-[10px] opacity-30"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Следующее изображение"
                onClick={() => navLightbox(1)}
                className="grid size-[28px] place-items-center opacity-60 transition-opacity hover:opacity-100"
              >
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
                  <path d="M1 1 7.5 8 1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
