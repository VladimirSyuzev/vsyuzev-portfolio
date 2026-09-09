"use client";

import {
  createContext,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
} from "react";
import { useAnimationFrame } from "framer-motion";

import { useReducedMotion } from "@/lib/gsap";
import { useMousePositionRef } from "@/lib/useMousePositionRef";

// Floating / FloatingElement — параллакс группы элементов по движению мыши
// (в основе — компонент 21st.dev). Каждый FloatingElement плавно едет за
// курсором с силой, пропорциональной его depth, создавая ощущение слоёв.
// Адаптировано под проект: framer-motion вместо motion/react, свой
// useMousePositionRef, уважение prefers-reduced-motion (тогда rAF-цикл не
// запускается, элементы стоят по слотам).

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
  unregisterElement: (id: string) => void;
}

const FloatingContext = createContext<FloatingContextType | null>(null);

interface FloatingProps {
  children: ReactNode;
  className?: string;
  sensitivity?: number;
  easingFactor?: number;
}

export default function Floating({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
}: FloatingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement;
        depth: number;
        currentPosition: { x: number; y: number };
      }
    >(),
  );
  const mousePositionRef = useMousePositionRef(containerRef);
  const reduced = useReducedMotion();

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      elementsMap.current.set(id, {
        element,
        depth,
        currentPosition: { x: 0, y: 0 },
      });
    },
    [],
  );

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id);
  }, []);

  useAnimationFrame(() => {
    if (reduced || !containerRef.current) return;

    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20;

      const targetX = mousePositionRef.current.x * strength;
      const targetY = mousePositionRef.current.y * strength;

      const dx = targetX - data.currentPosition.x;
      const dy = targetY - data.currentPosition.y;

      data.currentPosition.x += dx * easingFactor;
      data.currentPosition.y += dy * easingFactor;

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`;
    });
  });

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        className={`absolute left-0 top-0 h-full w-full ${className ?? ""}`}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  depth?: number;
}

export function FloatingElement({
  children,
  className,
  style,
  depth = 1,
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const context = useContext(FloatingContext);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !context) return;
    context.registerElement(id, el, depth ?? 0.01);
    return () => context.unregisterElement(id);
  }, [context, depth, id]);

  // style задаёт позицию слота (top/left) — rAF-цикл Floating пишет только
  // transform, поэтому не конфликтует.
  return (
    <div
      ref={elementRef}
      className={`absolute will-change-transform ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
