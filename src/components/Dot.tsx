// Dot — маркер-буллит списков ("МЫ ОБНАРУЖИЛИ:", "В РЕЗУЛЬТАТЕ АУДИТА" и
// т.д.). В Figma это не сплошной кружок, а отдельный компонент "dots" —
// маленький "рукописный" мазок (12×12, толстый закруглённый обводка-штрих,
// слегка неровный), с тремя вариантами (dot-1/2/3), которые чередуются по
// списку. Раньше здесь стоял плоский bg-[#008cff] rounded-full — не
// совпадало с реальным компонентом.
const VARIANTS = ["/shared/dot-1.svg", "/shared/dot-2.svg", "/shared/dot-3.svg"];

export default function Dot({ index = 0, className }: { index?: number; className?: string }) {
  const src = VARIANTS[index % VARIANTS.length];
  return <img alt="" src={src} className={className ?? "size-[12px] shrink-0"} />;
}
