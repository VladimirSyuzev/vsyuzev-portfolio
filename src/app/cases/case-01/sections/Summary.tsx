import Reveal from "@/components/Reveal";

// 08 Итог — 1:1 из Figma (node 1961:32637). Обновлено: заголовок и текст
// теперь по ЦЕНТРУ полосы (было слева), композиция iPhone-мокапов
// (summary.svg, 715×554 — настоящий SVG-экспорт пользователя) опущена
// ниже (left 363 / top 600) и частично уходит за нижнюю кромку блока.
// Высота блока выросла до 1149. Два декоративных доодла переставлены
// (node 2284:40040 → 193.29/927.11, node 2287:4248 → 1025.94/499.02).
export default function Summary() {
  return (
    <div className="relative h-[1149px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-1/2 top-[271px] flex -translate-x-1/2 items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">08</p>
        <p className="text-[#121212]">ИТОГ</p>
      </div>

      <div className="absolute left-1/2 top-[318px] w-[498px] -translate-x-1/2 text-center text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        <p>
          После завершения аудита клиент получил структурированную библиотеку без дублей, понимание
          недостающих элементов и прозрачный процесс дальнейшего производства.
        </p>
        <p className="mx-auto mt-[6px] w-[477.197px]">
          По итогам проекта было создано и обновлено более 100 иконок для разных продуктовых
          направлений, включая финансы, медицину, социальные сервисы и голосового AI-ассистента.
        </p>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-01/sections/summary.svg"
        alt="Итоговая система иконок в интерфейсе голосового ассистента Алиса"
        width={715}
        height={554}
        className="absolute left-[363px] top-[600px] w-[715px]"
      />

      {/* Доодлы — статичные, x/y 1:1 из Figma. */}
      <Reveal variant="doodle" className="absolute left-[193.29px] top-[927.11px] h-[162.57px] w-[185.58px]">
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/summary-doodle-1.svg" />
      </Reveal>
      <Reveal variant="doodle" delay={0.1} className="absolute left-[1025.94px] top-[499.02px] h-[125.02px] w-[158.02px]">
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/summary-doodle-2.svg" />
      </Reveal>
    </div>
  );
}
