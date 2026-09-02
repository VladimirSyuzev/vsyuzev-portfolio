// Footer — 1:1 из актуальной Figma (node 2259:58648), фон растянут на всю
// ширину страницы, внутренний контент — на центрированном canvas 1440px.
// После переверстки: «2026 // Vova Syuzev» слева снизу (x46 / y155),
// «TEXT ME:» (x386 / y44), колонка контактов Telegram / Instagram / E-mail
// (x556 / y44, шаг 22), телефон отдельно (x726 / y44), «Perm, Russia» с
// иконкой (x726 / y145), «НАВЕРХ» с кареткой (x1066 / y40).
export default function Footer() {
  return (
    <div id="contacts" className="w-full scroll-mt-16 bg-[#121212]">
      <div className="relative mx-auto h-[213px] w-[1440px] overflow-clip">
        <p className="absolute left-[46px] top-[155px] whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          2026 // Vova Syuzev
        </p>

        <p className="absolute left-[386px] top-[44px] whitespace-nowrap text-[14px] uppercase leading-[1.2] tracking-[0.28px] text-white opacity-70">
          TEXT ME:
        </p>

        <div className="absolute left-[556px] top-[44px] flex flex-col items-start gap-[5px] whitespace-nowrap text-[14px] leading-[1.2] text-white">
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

        <a
          href="tel:+79523336006"
          className="absolute left-[726px] top-[44px] whitespace-nowrap text-[14px] leading-[1.2] text-white opacity-70 hover:opacity-100"
        >
          +79523336006
        </a>

        <div className="absolute left-[726px] top-[145px] flex items-center gap-[6px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="size-[24px]" src="/footer/location.svg" />
          <span className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
            Perm, Russia
          </span>
        </div>

        <a
          href="#top"
          className="absolute left-[1066px] top-[40px] flex items-center gap-[6px] text-white opacity-70 hover:opacity-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="size-[24px]" src="/footer/caret-up.svg" />
          <span className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px]">НАВЕРХ</span>
        </a>
      </div>
    </div>
  );
}
