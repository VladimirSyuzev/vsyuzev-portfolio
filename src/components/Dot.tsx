// Dot — маркер-буллит списков. В Figma это компонент «dots» (node
// 2279:32695) с ЧЕТЫРЬМЯ вариантами: dot-1…dot-4 — короткие рукописные
// мазки #008CFF, каждый чуть отличается формой. По просьбе пользователя
// вариант выбирается «в случайном порядке» — детерминированный псевдо-
// рандом по seed (чтобы SSR и гидрация совпадали), так что в каждом
// списке точки идут вперемешку, а не по кругу.
//
// ВАЖНО: точку нельзя класть внутрь элемента с opacity < 1 (например
// li.opacity-70) — CSS-opacity перемножается и точка тускнеет. Текст
// буллита приглушается отдельным span, точка всегда на полной непрозрачности.
const DOTS = ["/dots/dot-1.svg", "/dots/dot-2.svg", "/dots/dot-3.svg", "/dots/dot-4.svg"];

// Финализатор murmur3 — хорошее лавинообразное перемешивание, поэтому
// даже соседние seed дают «случайные», а не последовательные варианты.
function pickDot(seed: number) {
  let h = (seed | 0) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  h = h ^ (h >>> 16);
  return DOTS[(h >>> 0) % DOTS.length];
}

export default function Dot({ className, seed = 0 }: { className?: string; seed?: number }) {
  return (
    <span className={`flex shrink-0 items-center justify-center ${className ?? "size-[12px]"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={pickDot(seed)} className="block size-[10px] max-w-none" />
    </span>
  );
}
