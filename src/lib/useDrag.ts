"use client";

import { useCallback, useRef, useState } from "react";

// useDrag — общий «перетаскиваю вбок» для горизонтальных лент и карусе-
// лей. По просьбе пользователя вся горизонтальная прокрутка колесом на
// сайте (фреймы «процесс» и «варианты») заменена на drag: курсор
// превращается в руку (grab → grabbing), пользователь зажимает и тянет.
//
// - Ось лочится по первому движению: горизонтальный жест — берём себе
//   (pointer capture), вертикальный — отдаём странице (touch-action:pan-y
//   на самом элементе делает это и для тач-скролла).
// - onEnd отдаёт суммарный сдвиг dx и мгновенную скорость vx (px/ms) —
//   потребитель сам решает: инерция (лента) или шаг индекса (карусель).
export function useDrag(opts: {
  onStart?: () => void;
  onMove?: (dx: number, dy: number) => void;
  onEnd?: (dx: number, vx: number) => void;
}) {
  const { onStart, onMove, onEnd } = opts;
  const [dragging, setDragging] = useState(false);
  const startPt = useRef({ x: 0, y: 0 });
  const lastPt = useRef({ x: 0, t: 0 });
  const axis = useRef<"" | "h" | "v">("");
  const pid = useRef<number | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pid.current = e.pointerId;
    axis.current = "";
    startPt.current = { x: e.clientX, y: e.clientY };
    lastPt.current = { x: e.clientX, t: e.timeStamp };
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (pid.current !== e.pointerId) return;
      const dx = e.clientX - startPt.current.x;
      const dy = e.clientY - startPt.current.y;
      if (!axis.current) {
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
        axis.current = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
        if (axis.current === "h") {
          setDragging(true);
          onStart?.();
          try {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          } catch {
            /* no-op */
          }
        }
      }
      if (axis.current !== "h") return;
      lastPt.current = { x: e.clientX, t: e.timeStamp };
      onMove?.(dx, dy);
    },
    [onMove, onStart],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (pid.current !== e.pointerId) return;
      pid.current = null;
      if (axis.current === "h") {
        const dx = e.clientX - startPt.current.x;
        const dt = Math.max(1, e.timeStamp - lastPt.current.t);
        const vx = (e.clientX - lastPt.current.x) / dt;
        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {
          /* no-op */
        }
        onEnd?.(dx, vx);
      }
      axis.current = "";
      setDragging(false);
    },
    [onEnd],
  );

  return {
    dragging,
    /** разложить на элемент-трек; добавьте туда же класс cursor-grab и touch-action:pan-y */
    bind: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
  };
}
