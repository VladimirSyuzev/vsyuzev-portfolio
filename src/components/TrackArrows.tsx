// TrackArrows — плавающие стрелки ‹ › для горизонтальных треков «процесс»
// (кейсы 1/2/3), тот же чеврон, что у стрелок карусели «Варианты»
// (VariantsCarousel), в полупрозрачном тёмном круге поверх ленты — под
// отдельный ряд контролов в фикс-координатном макете места нет, трек
// full-bleed. Кладётся СНАРУЖИ скролл-контейнера (см. useScrollTrack) —
// иначе стрелки уезжали бы вместе с лентой.
export default function TrackArrows({
  onPrev,
  onNext,
  canPrev,
  canNext,
  className,
  style,
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden={!canPrev && !canNext}
      className={`pointer-events-none z-20 flex items-center justify-between px-[8px] sm:px-[12px] ${className ?? ""}`}
      style={style}
    >
      <button
        type="button"
        aria-label="Назад"
        onClick={onPrev}
        disabled={!canPrev}
        className="pointer-events-auto grid size-[36px] shrink-0 place-items-center rounded-full bg-[#121212]/55 text-white opacity-70 backdrop-blur-sm transition-opacity duration-200 hover:opacity-100 disabled:pointer-events-none disabled:opacity-0 sm:size-[44px]"
      >
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
          <path d="M8 1 1.5 8 8 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Вперёд"
        onClick={onNext}
        disabled={!canNext}
        className="pointer-events-auto grid size-[36px] shrink-0 place-items-center rounded-full bg-[#121212]/55 text-white opacity-70 backdrop-blur-sm transition-opacity duration-200 hover:opacity-100 disabled:pointer-events-none disabled:opacity-0 sm:size-[44px]"
      >
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
          <path d="M1 1 7.5 8 1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
