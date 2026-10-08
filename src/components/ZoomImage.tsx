"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ZoomImage — картинка, которая по нажатию открывается на весь экран.
// Нужна для широких схем (графы Weavy), которые на планшете/мобильном в потоке
// получаются мелкими: в оверлее картинка показывается крупно (ширина — натив
// макета `fullWidth`, но не меньше экрана), а лишнее прокручивается пальцем/
// колесом по обеим осям; щипком работает и системный pinch-zoom. Закрытие —
// тап по фону, кнопка ×, Esc. Пока открыт оверлей, страница под ним не скроллится.
export default function ZoomImage({
  src,
  alt,
  className,
  imgClassName,
  style,
  fullWidth,
  aspect,
}: {
  src: string;
  alt: string;
  /** классы кнопки-обёртки */
  className?: string;
  /** классы превью-картинки */
  imgClassName?: string;
  style?: React.CSSProperties;
  /** ширина картинки в оверлее, px (по умолчанию — натив макета) */
  fullWidth: number;
  /** соотношение сторон картинки w / h */
  aspect: number;
}) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // для fade
  const scrollerRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setShown(false);
    window.setTimeout(() => setOpen(false), 200);
  };

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // центрируем содержимое по горизонтали
    const el = scrollerRef.current;
    if (el) el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Увеличить: ${alt}`}
        className={`block cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${className ?? ""}`}
        style={style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={alt} src={src} draggable={false} className={imgClassName} />
      </button>
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={close}
            className="fixed inset-0 z-[200] bg-[#0b0b0b]/97 transition-opacity duration-200"
            style={{ opacity: shown ? 1 : 0 }}
          >
            <div
              ref={scrollerRef}
              className="flex size-full overflow-auto overscroll-contain"
              style={{ touchAction: "pan-x pan-y pinch-zoom" }}
            >
              {/* m-auto центрирует, пока картинка меньше экрана; иначе — скролл */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={alt}
                src={src}
                draggable={false}
                onClick={(e) => e.stopPropagation()}
                className="m-auto block max-w-none shrink-0 select-none"
                style={{ width: `max(100vw, ${fullWidth}px)`, aspectRatio: String(aspect), height: "auto" }}
              />
            </div>
            <button
              type="button"
              aria-label="Закрыть"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="fixed right-[12px] top-[max(12px,env(safe-area-inset-top))] grid size-[44px] place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2 14 14M14 2 2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
