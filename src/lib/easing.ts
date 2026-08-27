// JS-эквивалент CSS cubic-bezier(x1,y1,x2,y2) — используется там, где переход
// анимируется вручную по кадрам (requestAnimationFrame), а не через CSS
// transition, но должен визуально совпадать по темпу с CSS-переходами сайта
// (Header/main-shell используют ту же кривую).
export function makeCubicBezierEase(x1: number, y1: number, x2: number, y2: number) {
  function bezier(t: number, a: number, b: number) {
    const mt = 1 - t;
    return 3 * mt * mt * t * a + 3 * mt * t * t * b + t * t * t;
  }
  function bezierSlope(t: number, a: number, b: number) {
    const mt = 1 - t;
    return 3 * mt * mt * a + 6 * mt * t * (b - a) + 3 * t * t * (1 - b);
  }
  return function ease(x: number): number {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = bezier(t, x1, x2) - x;
      const slope = bezierSlope(t, x1, x2);
      if (Math.abs(slope) < 1e-6) break;
      t = Math.min(1, Math.max(0, t - dx / slope));
    }
    return bezier(t, y1, y2);
  };
}

// Именованная кривая-мотив сайта: та же cubic-bezier(0.16, 1, 0.3, 1), что и
// в CSS-переходах Header/main-shell (globals.css) — единый темп движения
// везде, где есть анимация.
export const SITE_EASE = makeCubicBezierEase(0.16, 1, 0.3, 1);
