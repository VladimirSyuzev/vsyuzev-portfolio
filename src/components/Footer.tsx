// Footer — 1:1 из Figma (node 2259:58629), фрейм 1440×213.
export default function Footer() {
  return (
    <div id="contacts" className="relative h-[213px] w-[1440px] overflow-clip scroll-mt-16 bg-[#121212]">
      <a
        href="#top"
        className="absolute left-[216px] top-[44px] flex items-center gap-[6px] text-white opacity-70 hover:opacity-100"
      >
        <img alt="" className="size-[24px]" src="/footer/caret-up.svg" />
        <span className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px]">НА ВЕРХ</span>
      </a>

      <div className="absolute left-[726px] top-[44px] flex w-[180px] flex-col items-start gap-[6px] text-white">
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
        <a href="https://t.me/VovaSyuzev" target="_blank" rel="noreferrer" className="text-[14px] opacity-70 hover:opacity-100">
          +79523336006
        </a>
      </div>

      <div className="absolute left-[726px] top-[96px] flex items-center gap-[6px]">
        <img alt="" className="size-[24px]" src="/footer/location.svg" />
        <span className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Perm, Russia
        </span>
      </div>

      <p className="absolute left-[1236px] top-[155px] whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        2026 // Vova Syuzev
      </p>
    </div>
  );
}
