"use client";

import { useEffect, useRef, type RefObject } from "react";

// useMousePositionRef — позиция курсора в ref (без ре-рендеров, читается
// из rAF-цикла Floating). Если передан containerRef — значение это
// смещение курсора ОТ ЦЕНТРА контейнера (для параллакса), иначе — сырые
// clientX/clientY. На старте {0,0} — до первого движения мыши картинки
// стоят ровно по своим слотам.
export function useMousePositionRef(
  containerRef?: RefObject<HTMLElement | null>,
) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = (x: number, y: number) => {
      const el = containerRef?.current;
      if (el) {
        const r = el.getBoundingClientRect();
        positionRef.current = {
          x: x - r.left - r.width / 2,
          y: y - r.top - r.height / 2,
        };
      } else {
        positionRef.current = { x, y };
      }
    };

    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, [containerRef]);

  return positionRef;
}
