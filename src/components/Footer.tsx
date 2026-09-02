// Footer — фон на всю ширину, контент на центрированном холсте 1440px.
// На ≥1200 абсолют 1:1 из Figma (node 2259:58648). Ниже 1200 внутренняя
// обёртка становится `contents` и колонки раскладываются потоком.
export default function Footer() {
  return (
    <div id="contacts" className="w-full scroll-mt-16 bg-[#121212]">
      <div className="relative mx-auto w-full max-w-[1440px] overflow-clip xl:h-[213px]">
        <div className="flex flex-col gap-[28px] px-[var(--grid-margin)] py-[44px] xl:contents">
          <div className="flex flex-col gap-[24px] sm:flex-row sm:gap-[40px] xl:contents">
            <p className="whitespace-nowrap text-[14px] uppercase leading-[1.2] tracking-[0.28px] text-white opacity-70 xl:absolute xl:left-[386px] xl:top-[44px]">
              TEXT ME:
            </p>

            <div className="flex flex-col items-start gap-[5px] whitespace-nowrap text-[14px] leading-[1.2] text-white xl:absolute xl:left-[556px] xl:top-[44px]">
              <a
                href="https://t.me/VovaSyuzev"
                target="_blank"
                rel="noreferrer"
                className="opacity-70 hover:opacity-100"
              >
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
              className="whitespace-nowrap text-[14px] leading-[1.2] text-white opacity-70 hover:opacity-100 xl:absolute xl:left-[726px] xl:top-[44px]"
            >
              +79523336006
            </a>
          </div>

          <div className="flex flex-col gap-[24px] sm:flex-row sm:items-center sm:justify-between xl:contents">
            <div className="flex items-center gap-[6px] xl:absolute xl:left-[726px] xl:top-[145px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="size-[24px]" src="/footer/location.svg" />
              <span className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
                Perm, Russia
              </span>
            </div>

            <a
              href="#top"
              className="flex items-center gap-[6px] text-white opacity-70 hover:opacity-100 xl:absolute xl:left-[1066px] xl:top-[40px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="size-[24px]" src="/footer/caret-up.svg" />
              <span className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px]">НАВЕРХ</span>
            </a>
          </div>

          <p className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 xl:absolute xl:left-[46px] xl:top-[155px]">
            2026 // Vova Syuzev
          </p>
        </div>
      </div>
    </div>
  );
}
