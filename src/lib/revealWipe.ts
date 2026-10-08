// Единое появление картинок/визуалов по скроллу: «растягивание» сверху вниз —
// clip-path открывается от верхней кромки к нижней (inset(0 0 100% 0) →
// inset(0)), (0.5с, power2.out) — картинка будто вытягивается вниз.
// Используют <Reveal variant="fade">, <RevealImg> и <AutoReveal>.
// При prefers-reduced-motion — только мягкий fade (без движения).
export const WIPE_DURATION = 0.5;
export const WIPE_EASE = "power2.out";

export function wipeFrom(reduced: boolean): gsap.TweenVars {
  return reduced
    ? { opacity: 0, duration: 0.3, ease: "power1.out" }
    : { clipPath: "inset(0% 0% 100% 0%)", duration: WIPE_DURATION, ease: WIPE_EASE };
}
