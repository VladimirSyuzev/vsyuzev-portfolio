"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

// PixelText — «сборка» текста из пикселей поверх целевого элемента.
// Растеризует ТОТ ЖЕ текст (шрифт/размер/цвет читаются из target через
// getComputedStyle), раскидывает по сетке и зажигает клетки в порядке
// «крупные блоки → дробление на мелкие → отдельные пиксели», случайно.
// Когда всё зажглось — вызывает onComplete (там показывают настоящий <h1>).

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rand: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// delay (мс) для каждой клетки cols×rows: часть больших блоков гаснет
// целиком и рано, остальные дробятся на средние, часть средних — на пиксели.
function computeDelays(cols: number, rows: number, seed: number): number[] {
  const rand = rng(seed);
  const BIG = 6;
  const MID = 2;
  const delays = new Array(cols * rows).fill(2400);
  const at = (c: number, r: number) => r * cols + c;

  const cellsOf = (c0: number, r0: number, w: number, h: number) => {
    const out: number[] = [];
    for (let r = r0; r < Math.min(rows, r0 + h); r++)
      for (let c = c0; c < Math.min(cols, c0 + w); c++) out.push(at(c, r));
    return out;
  };

  const big: [number, number][] = [];
  for (let r = 0; r < rows; r += BIG)
    for (let c = 0; c < cols; c += BIG) big.push([c, r]);
  shuffle(big, rand);

  const p1 = Math.round(big.length * 0.5);
  let mk = 0;

  big.forEach(([bc, br], bi) => {
    if (bi < p1) {
      const t = 60 + bi * (620 / Math.max(1, p1));
      for (const i of cellsOf(bc, br, BIG, BIG)) delays[i] = t;
      return;
    }
    const mids: [number, number][] = [];
    for (let r = br; r < Math.min(rows, br + BIG); r += MID)
      for (let c = bc; c < Math.min(cols, bc + BIG); c += MID) mids.push([c, r]);
    shuffle(mids, rand);

    mids.forEach(([mc, mr], mi) => {
      const cells = cellsOf(mc, mr, MID, MID);
      if (rand() < 0.55) {
        const t = 520 + (mk + mi) * 20;
        for (const i of cells) delays[i] = t;
      } else {
        shuffle(cells, rand);
        cells.forEach((i, ci) => {
          delays[i] = 1150 + (mk + mi) * 14 + ci * 45;
        });
      }
    });
    mk += mids.length;
  });

  return delays;
}

type Grid = {
  cols: number;
  rows: number;
  cell: number;
  color: string;
  live: { c: number; r: number; delay: number }[];
  maxDelay: number;
};

export function PixelText({
  targetRef,
  lines,
  seed,
  onComplete,
}: {
  targetRef: RefObject<HTMLElement | null>;
  lines: string[];
  seed: number;
  onComplete?: () => void;
}) {
  const [grid, setGrid] = useState<Grid | null>(null);
  const [lit, setLit] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    let cancelled = false;

    const build = async () => {
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
      if (fonts?.ready) {
        try {
          await fonts.ready;
        } catch {
          /* нет доступа — рисуем как есть */
        }
      }
      if (cancelled) return;

      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const cs = getComputedStyle(el);

      const cols = rect.width > 900 ? 62 : rect.width > 520 ? 48 : 34;
      const cell = rect.width / cols;
      const rows = Math.max(1, Math.round(rect.height / cell));

      const canvas = document.createElement("canvas");
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const fontPx = parseFloat(cs.fontSize) / cell;
      const lhRaw = cs.lineHeight === "normal" ? parseFloat(cs.fontSize) * 1.1 : parseFloat(cs.lineHeight);
      const lh = lhRaw / cell;
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${fontPx}px ${cs.fontFamily}`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      try {
        const ls = parseFloat(cs.letterSpacing);
        if (!Number.isNaN(ls)) (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${ls / cell}px`;
      } catch {
        /* letterSpacing не поддержан — не критично */
      }

      const blockH = lines.length * lh;
      const top = (rows - blockH) / 2;
      lines.forEach((ln, i) => {
        ctx.fillText(ln, cols / 2, top + lh * (i + 0.5));
      });

      const data = ctx.getImageData(0, 0, cols, rows).data;
      const delays = computeDelays(cols, rows, seed);
      const live: Grid["live"] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (data[(r * cols + c) * 4 + 3] > 64) {
            live.push({ c, r, delay: delays[r * cols + c] });
          }
        }
      }
      if (cancelled || !live.length) return;

      const maxDelay = live.reduce((m, x) => Math.max(m, x.delay), 0);
      setGrid({ cols, rows, cell, color: cs.color, live, maxDelay });

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!cancelled) setLit(true);
        }),
      );
      window.setTimeout(() => {
        if (!cancelled && !doneRef.current) {
          doneRef.current = true;
          onComplete?.();
        }
      }, maxDelay + 420);
    };

    build();
    return () => {
      cancelled = true;
    };
  }, [targetRef, lines, seed, onComplete]);

  if (!grid) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {grid.live.map(({ c, r, delay }) => (
        <span
          key={`${c}-${r}`}
          style={{
            position: "absolute",
            left: c * grid.cell,
            top: r * grid.cell,
            width: grid.cell + 0.6,
            height: grid.cell + 0.6,
            background: grid.color,
            opacity: lit ? 1 : 0,
            transform: lit ? "scale(1)" : "scale(0.35)",
            transitionProperty: "opacity, transform",
            transitionDuration: "300ms",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: `${delay}ms`,
          }}
        />
      ))}
    </div>
  );
}
