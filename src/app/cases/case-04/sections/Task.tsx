// 01 Задача — 1:1 из актуальной Figma (node 2034:15705, высота 900).
// Заголовок «01 Задача» (32px). Два абзаца сверху. Ниже — цельная
// растровая композиция (фото дома/машины + телефон-мокап) с наложенной
// крупной мыслью «Сложный crypto-продукт…» (Wix Madefor Display Regular).
const A = "/cases/case-04/sections";

export default function Task() {
  return (
    <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-[#121212]">Задача</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Ценность crypto проявляется не только внутри цифровой среды, но и в возможности использовать
        активы в реальной жизни. Кампания должна была показать, как Stablegate превращает crypto в
        средство для повседневных и крупных покупок.
      </p>
      <p className="absolute left-[556px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        При этом коммуникация должна была передавать надёжность, безопасность, скорость и
        премиальный характер бренда, оставаясь понятной с первого взгляда.
      </p>

      {/* Композиция (Figma frame 2034:15720 → x0 / y318, 1394×602). Мысль
          «Сложный crypto-продукт…» (node 2399:35339) запечена в композиции
          поверх приглушённого фото — как слоганы в мокапах кейсов 2/3. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Приложение Stablegate: обмен 125 000 USDT на 109 320,57 EUR на фоне дома и автомобиля, с мыслью «Сложный crypto-продукт нужно было объяснить за несколько секунд»"
        className="absolute left-0 top-[318px] w-[1394px]"
        src={`${A}/task-composite.jpg`}
      />
      <p className="sr-only">Сложный crypto-продукт нужно было объяснить за несколько секунд</p>
    </div>
  );
}
