// Dot — маркер-буллит списков. В Figma это компонент «dots» — короткий
// рукописный мазок #008CFF (обводка 8px в боксе 12×12), который визуально
// читается как сплошная точка ~8px. Рендерим сплошным кругом #008CFF,
// opacity 100 — единообразно во всех списках.
//
// ВАЖНО: точку нельзя класть внутрь элемента с opacity < 1 (например
// li.opacity-70) — CSS-opacity перемножается и точка тускнеет. Текст
// буллита приглушается отдельным span, точка всегда на полной непрозрачности.
export default function Dot({ className }: { className?: string; index?: number }) {
  return (
    <span className={`flex shrink-0 items-center justify-center ${className ?? "size-[12px]"}`}>
      <span className="block size-[8px] rounded-full bg-[#008cff]" />
    </span>
  );
}
