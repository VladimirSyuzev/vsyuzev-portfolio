// Синтетическая подложка под NDA-обложки — НЕ производная от реального
// ассета кейса. Блюр поверх настоящего фото решили не использовать: сколько
// ни крути радиус, структура/цвет всё равно просвечивают (сетка иконок
// читается как сетка при любом блюре, который ещё выглядит как «фото», а не
// плоское пятно). Здесь пикселей оригинала просто нет — доставать нечего ни
// из devtools, ни из сети. Слоёные радиальные градиенты (тон кейса + тёплый/
// холодный акцент-«блик») + зерно (SVG feTurbulence) — для фактуры и глубины,
// чтобы подложка не выглядела плоским прямоугольником.
const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>" +
      "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>" +
      "<rect width='100%' height='100%' filter='url(#n)'/></svg>",
  );

export default function NdaBackdrop({
  base,
  glow,
  glowPos = "72% 38%",
  edge,
  edgePos = "10% 100%",
}: {
  base: string;
  glow: string;
  glowPos?: string;
  edge: string;
  edgePos?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0" style={{ background: base }}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(35% 40% at ${glowPos}, rgba(255,255,255,0.08) 0%, transparent 70%), radial-gradient(60% 65% at ${glowPos}, ${glow} 0%, transparent 62%), radial-gradient(90% 80% at ${edgePos}, ${edge} 0%, transparent 58%)`,
        }}
      />
      <div className="absolute inset-0" style={{ backgroundImage: `url("${NOISE_SVG}")`, opacity: 0.16 }} />
    </div>
  );
}
