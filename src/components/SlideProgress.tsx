// SlideProgress — индикатор «1 из 2» для закреплённых блоков со сменой
// слайдов: Проблема/Экран (кейс 1), Принципы дизайна 1/2 (кейс 3),
// Key visual 1/2 (кейс 4). 1:1 из Figma (состояние 1 — node 1964:36251,
// состояние 2 — node 2485:4408): активный сегмент 44px / opacity 100,
// неактивный 22px / opacity 30, gap 12.
//
// При смене слайда ширина и прозрачность «перетекают» из одного сегмента
// в другой — CSS-transition по width+opacity, сильная ease-in-out
// (движение на экране, по Эмилю Ковальски). `active` — индекс с нуля.
export default function SlideProgress({
  active,
  total = 2,
  tone = "light",
  className,
}: {
  active: number;
  total?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  const bg = tone === "dark" ? "bg-[#121212]" : "bg-white";
  return (
    <div className={`flex items-center gap-[12px] ${className ?? ""}`} aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-[2px] rounded-full transition-[width,opacity] duration-[450ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${bg}`}
          style={{ width: i === active ? 44 : 22, opacity: i === active ? 1 : 0.3 }}
        />
      ))}
    </div>
  );
}
