// Footer — общий компонент, переверстывается под каждый брейкпоинт.
//  <640  — Figma «Footer 375»  (2672:40144), 375×281.
//  640…1023 — Figma «Footer 834» (2672:40141), 834×218, pad 22/28/44/28.
//  1024…1439 — Figma «Footer 1280» (2672:40140), 1280×213.
//  ≥1440 — фикс-раскладка холста 1440 (2259:58624).
// Всё Aeonik Regular 14 / 120% / ls 0.28 / opacity 70. Обновление макета:
// строка «Perm, Russia» убрана на всех размерах, вместо неё под номером
// телефона — «CV» (скачивание резюме, см. ниже). На ≥1440 «CALL ME:» +
// телефон + CV теперь тоже видны (раньше были xl:hidden) — из-за этого
// «TEXT ME:»/соцсети на xl сдвинуты левее, чтобы всё поместилось.
const SOCIALS = (
  <>
    <a href="https://t.me/VovaSyuzev" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100">
      Telegram,
    </a>
    <a
      href="https://www.linkedin.com/in/syuzev-vladimir"
      target="_blank"
      rel="noreferrer"
      className="opacity-70 hover:opacity-100"
    >
      LinkedIn,
    </a>
    <a href="mailto:syuzev.ontour@gmail.com" className="opacity-70 hover:opacity-100">
      E-mail
    </a>
  </>
);

// Скачивание резюме — статический PDF из public/, download-атрибут вместо
// перехода в браузере (работает и на статическом экспорте, без бэкенда).
const CV_HREF = "/cv/Syuzev_Vladimir_CV.pdf";
const CV_FILENAME = "Syuzev_Vladimir_CV.pdf";

export default function Footer() {
  return (
    <div id="contacts" className="w-full scroll-mt-16 bg-[#121212]">
      {/* <640 — Figma «Footer 375» (2672:40144) */}
      <div className="relative h-[281px] w-full whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-white sm:hidden">
        <div className="absolute left-[20px] top-[26px] flex flex-col gap-[5px]">{SOCIALS}</div>

        <a href="tel:+79523336006" className="absolute left-[20px] top-[111px] opacity-70 hover:opacity-100">
          +79523336006
        </a>

        <a href={CV_HREF} download={CV_FILENAME} className="absolute left-[20px] top-[152px] opacity-70 hover:opacity-100">
          CV
        </a>

        <p className="absolute left-[20px] top-[228px] opacity-70">2026 // Vova Syuzev</p>

        <a href="#top" className="absolute right-[20px] top-[22px] flex items-center gap-[6px] opacity-70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="size-[24px]" src="/footer/caret-up.svg" />
          <span>НАВЕРХ</span>
        </a>
      </div>

      {/* ≥640 — 834 / 1280 / 1440. Абсолют, свои left/top на каждый брейкпоинт. */}
      <div className="relative mx-auto hidden h-[218px] w-full max-w-[1440px] overflow-clip whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-white sm:block lg:h-[213px]">
        {/* TEXT ME: */}
        <p className="absolute top-[26px] uppercase opacity-70 sm:left-[28px] lg:left-[270px] lg:top-[44px] xl:left-[313px]">
          TEXT ME:
        </p>
        {/* соцсети */}
        <div className="absolute top-[26px] flex flex-col items-start gap-[5px] sm:left-[101px] lg:left-[343px] lg:top-[44px] xl:left-[386px]">
          {SOCIALS}
        </div>
        {/* CALL ME: — теперь видно и на ≥1440 */}
        <p className="absolute top-[26px] uppercase opacity-70 sm:left-[239px] lg:left-[573px] lg:top-[44px] xl:left-[653px]">
          CALL ME:
        </p>
        {/* +79523336006 */}
        <a
          href="tel:+79523336006"
          className="absolute top-[26px] opacity-70 hover:opacity-100 sm:left-[312px] lg:left-[646px] lg:top-[44px] xl:left-[726px]"
        >
          +79523336006
        </a>
        {/* CV — под номером телефона, тот же левый край, во всей колонке
            «CALL ME:». 834: top26+43 (высота строки+gap26). 1280/1440: top44+43. */}
        <a
          href={CV_HREF}
          download={CV_FILENAME}
          className="absolute opacity-70 hover:opacity-100 sm:left-[312px] sm:top-[69px] lg:left-[646px] lg:top-[87px] xl:left-[726px]"
        >
          CV
        </a>

        {/* ⌃ НАВЕРХ — 834: справа; 1280/1440: слева по координате */}
        <a
          href="#top"
          className="absolute top-[22px] flex items-center gap-[6px] opacity-70 hover:opacity-100 sm:right-[28px] lg:left-[949px] lg:right-auto lg:top-[40px] xl:left-[1066px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="size-[24px]" src="/footer/caret-up.svg" />
          <span>НАВЕРХ</span>
        </a>

        {/* 2026 // Vova Syuzev — нижний ряд слева */}
        <p className="absolute opacity-70 sm:left-[28px] sm:top-[157px] lg:left-[40px] lg:top-[155px] xl:left-[46px]">
          2026 // Vova Syuzev
        </p>
      </div>
    </div>
  );
}
