// Footer — 1:1 из Figma (node 2259:58629) по контенту, фон растянут на всю
// ширину страницы (по просьбе), внутренний контент — на центрированном
// canvas 1440px. После переверстки макета: «2026 // Vova Syuzev» уехал в
// нижний левый угол (left-46), «НАВЕРХ» — в верхний правый (left-1236).
export default function Footer() {
  return (
    <div id="contacts" className="w-full scroll-mt-16 bg-[#121212]">
      <div className="relative mx-auto h-[213px] w-[1440px] overflow-clip">
        <p className="absolute left-[46px] top-[155px] whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          2026 // Vova Syuzev
        </p>

        <div className="absolute left-[726px] top-[44px] flex h-[40px] flex-col items-start gap-[6px] whitespace-nowrap text-white">
          <div className="flex items-center gap-[5px] text-[14px] leading-[1.2]">
            <a href="https://t.me/VovaSyuzev" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100">
              Telegram,
            </a>
            <a
              href="https://www.instagram.com/vovasyuzev.png?igsi=aTduZnp0Y3F2endz&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="opacity-70 hover:opacity-100"
            >
              Instagram,
            </a>
            <a href="mailto:syuzev.ontour@gmail.com" className="opacity-70 hover:opacity-100">
              E-mail
            </a>
          </div>
          <a href="https://t.me/VovaSyuzev" target="_blank" rel="noreferrer" className="text-[14px] leading-[1.2] opacity-70 hover:opacity-100">
            +79523336006
          </a>
        </div>

        <div className="absolute left-[726px] top-[96px] flex items-center gap-[6px]">
          <img alt="" className="size-[24px]" src="/footer/location.svg" />
          <span className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
            Perm, Russia
          </span>
        </div>

        <a
          href="#top"
          className="absolute left-[1236px] top-[44px] flex items-center gap-[6px] text-white opacity-70 hover:opacity-100"
        >
          <img alt="" className="size-[24px]" src="/footer/caret-up.svg" />
          <span className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px]">НАВЕРХ</span>
        </a>
      </div>
    </div>
  );
}
