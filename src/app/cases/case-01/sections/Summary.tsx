// 08 Итог — 1:1 из Figma (node 1961:32637). Композиция из iPhone-мокапов —
// теперь настоящий SVG-экспорт пользователя (summary.svg, 715×554 — тот же
// размер, что был у screenshot-версии), не растровый PNG.
export default function Summary() {
  return (
    <div className="relative h-[850px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">08</p>
        <p className="text-[#121212]">ИТОГ</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        После завершения аудита клиент получил структурированную библиотеку без дублей, понимание
        недостающих элементов, возможность быстро масштабировать систему и прозрачный
        производственный процесс, задокументированный в гайде.
      </p>
      <p className="absolute left-[46px] top-[261px] w-[477.197px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        По итогам проекта было создано и обновлено более 100 иконок для разных продуктовых
        направлений, включая финансы, медицину, социальные сервисы и голосового AI-ассистента.
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-01/sections/summary.svg"
        alt="Итоговая система иконок в интерфейсе голосового ассистента Алиса"
        width={715}
        height={554}
        className="absolute left-[556px] top-[296px] w-[715px]"
      />
    </div>
  );
}
