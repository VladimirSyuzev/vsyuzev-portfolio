import type { CSSProperties, ReactNode } from "react";
import { GLASS_BUBBLE } from "@/lib/glass";

// Стеклянный бабл карточки-шага треков «Построение процесса» / «Процесс»
// (кейсы 1/2/3). Единый вид во всех трёх кейсах.
//
// Акцентная полоса слева — ОТДЕЛЬНЫЙ дочерний <span>, а НЕ `border`:
// `border` на элементе с backdrop-filter + overflow-clip + border-radius
// в Chrome даёт цветной ореол-свечение вокруг всей карточки (в макете
// свечения нет). Полоса лежит под контентом (z-0), обрезается скруглением
// родителя (overflow-clip).
export default function GlassBubble({
  accent = "#008cff",
  className,
  style,
  children,
}: {
  accent?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  // Дочерний акцент-<span> позиционируется absolute — карточке нужен
  // containing block. Если потребитель уже задал position (absolute в
  // кейсе 3), добавлять `relative` не надо (иначе он бы перебил absolute).
  const pos = /(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(className ?? "")
    ? ""
    : "relative";
  return (
    <div className={`${pos} ${GLASS_BUBBLE} ${className ?? ""}`} style={style}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px]"
        style={{ background: accent }}
      />
      {children}
    </div>
  );
}
