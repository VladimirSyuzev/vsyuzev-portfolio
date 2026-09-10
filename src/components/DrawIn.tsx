"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// DrawIn — единый «почерк» появления декоративной ВЕКТОРНОЙ графики сайта:
// линии-подчёркивания, рукописные обводки, доодлы (кружки, стрелки, глаза,
// каракули) прочерчиваются обводкой (stroke pathLength 0→1), как леттеринг
// в Hero (см. HeroDraw). Заменяет связку <Reveal variant="line|doodle">
// <img …/></Reveal>.
//
// Компонент забирает SVG по `src` из /public, разбирает viewBox и все
// векторные примитивы (path / circle / ellipse / line / polyline / rect) с
// их stroke/fill-атрибутами и рендерит инлайн-<svg>:
//  - элементы с обводкой  → motion-примитив с прочерчиванием pathLength;
//  - элементы только с заливкой (иконки, «плашки») → мягкий fade-in в общей
//    очереди, заливка сохраняется;
//  - если в файле НЕТ ни одной обводки (сплошная иллюстрация — вокзал,
//    поезд и т.п.) → откат на <img> + fade/scale контейнера.
//
// Триггер:
//  - play="scroll" (по умолчанию) — рисуется, когда блок входит во вьюпорт
//    (один раз), как у Reveal;
//  - play="mount" — рисуется сразу при монтировании (для первого экрана).
// prefers-reduced-motion — графика сразу в финальном виде.

const STROKABLE = ["path", "circle", "ellipse", "line", "polyline", "rect"] as const;
type Tag = (typeof STROKABLE)[number];

type El = {
  tag: Tag;
  attrs: Record<string, string | number>;
  strokable: boolean;
};

type Parsed = {
  viewBox: string;
  els: El[];
  /** ни одной обводки — только заливка */
  fillOnly: boolean;
};

const ATTR_MAP: Record<string, string> = {
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
};

const cache = new Map<string, Promise<Parsed>>();

function parseSvg(src: string): Promise<Parsed> {
  const hit = cache.get(src);
  if (hit) return hit;
  const p = fetch(src)
    .then((r) => r.text())
    .then((text) => {
      const doc = new DOMParser().parseFromString(text, "image/svg+xml");
      const svg = doc.querySelector("svg");
      const vb =
        svg?.getAttribute("viewBox") ??
        `0 0 ${svg?.getAttribute("width") ?? 0} ${svg?.getAttribute("height") ?? 0}`;

      const els: El[] = [];
      for (const node of doc.querySelectorAll(STROKABLE.join(","))) {
        const tag = node.tagName.toLowerCase() as Tag;
        // <rect> внутри <clipPath> — служебный, пропускаем
        if (node.closest("clipPath")) continue;
        const attrs: Record<string, string | number> = {};
        for (const a of Array.from(node.attributes)) {
          if (a.name === "id" || a.name === "class") continue;
          attrs[ATTR_MAP[a.name] ?? a.name] = a.value;
        }
        const stroke = String(attrs.stroke ?? "");
        const strokable = stroke !== "" && stroke !== "none";
        els.push({ tag, attrs, strokable });
      }
      const fillOnly = els.length === 0 || els.every((e) => !e.strokable);
      return { viewBox: vb, els, fillOnly };
    });
  cache.set(src, p);
  return p;
}

export default function DrawIn({
  src,
  className,
  style,
  duration = 0.9,
  stagger = 0.16,
  delay = 0,
  play = "scroll",
  fit = "stretch",
  stroke,
  strokeWidth,
  nonScalingStroke = false,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** длительность прочерчивания одной линии, с */
  duration?: number;
  /** задержка между элементами, с */
  stagger?: number;
  /** задержка перед стартом, с */
  delay?: number;
  play?: "scroll" | "mount";
  /** stretch — заполнить бокс (линии-подчёркивания в inset-обёртке);
   *  contain — вписать по аспекту (доодлы) */
  fit?: "stretch" | "contain";
  /** переопределить цвет обводки из файла */
  stroke?: string;
  /** переопределить толщину обводки из файла */
  strokeWidth?: number | string;
  /** держать толщину обводки в экранных px (сильный несимметричный масштаб) */
  nonScalingStroke?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [parsed, setParsed] = useState<Parsed | null>(null);

  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const shouldPlay = play === "mount" || inView;

  useEffect(() => {
    let alive = true;
    parseSvg(src).then((r) => {
      if (alive) setParsed(r);
    });
    return () => {
      alive = false;
    };
  }, [src]);

  // Иллюстрация без обводок — рисовать нечего, откат на <img> + fade/scale.
  if (parsed?.fillOnly) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={style}
        initial={reduced ? false : { opacity: 0, scale: 0.92, rotate: -4 }}
        animate={
          shouldPlay
            ? { opacity: 1, scale: 1, rotate: 0 }
            : reduced
              ? undefined
              : { opacity: 0, scale: 0.92, rotate: -4 }
        }
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={src} />
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={className} style={style}>
      {parsed && (
        <svg
          viewBox={parsed.viewBox}
          preserveAspectRatio={fit === "contain" ? "xMidYMid meet" : "none"}
          fill="none"
          className="block size-full max-w-none"
          style={{ overflow: "visible" }}
        >
          {parsed.els.map((el, i) => {
            const MotionEl = motion[el.tag] as typeof motion.path;
            const at = { ...el.attrs };
            if (el.strokable) {
              if (stroke) at.stroke = stroke;
              if (strokeWidth != null) at.strokeWidth = strokeWidth;
              if (nonScalingStroke) at.vectorEffect = "non-scaling-stroke";
              at.fill = "none";
              return (
                <MotionEl
                  key={i}
                  {...at}
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  animate={
                    shouldPlay
                      ? { pathLength: 1, opacity: 1 }
                      : reduced
                        ? undefined
                        : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    pathLength: {
                      duration,
                      delay: delay + i * stagger,
                      ease: [0.4, 0, 0.2, 1],
                    },
                    opacity: { duration: 0.01, delay: delay + i * stagger },
                  }}
                />
              );
            }
            // элемент только с заливкой внутри «рисованного» файла — мягкий fade
            return (
              <MotionEl
                key={i}
                {...at}
                initial={reduced ? false : { opacity: 0 }}
                animate={
                  shouldPlay ? { opacity: 1 } : reduced ? undefined : { opacity: 0 }
                }
                transition={{
                  duration: 0.35,
                  delay: delay + i * stagger + duration * 0.5,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}
