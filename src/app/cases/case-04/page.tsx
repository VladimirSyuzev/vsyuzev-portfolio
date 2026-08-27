import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Кейс 004 — обложка + «О проекте» собраны кодом 1:1 из Figma
// (get_design_context, node 2034:15661). Разделы ниже — единый скриншот
// тела страницы (body.png) до перевода в код, см. FIGMA-BRIEF.md.
export default function Case04Page() {
  return (
    <div className="mx-auto flex w-[1440px] flex-col items-start">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa]">
        <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#121212]">
          <div className="absolute left-[-347px] top-[-191px] h-[899px] w-[1950px] overflow-hidden">
            <img alt="" className="absolute left-0 top-0 size-full max-w-none" src="/cases/case-04/billboard.png" />
          </div>
          <div className="absolute left-[-888px] top-[-398px] flex h-[1756.157px] w-[2298.596px] items-center justify-center mix-blend-multiply">
            <div className="rotate-[-61.82deg]">
              <div className="relative h-[2160.327px] w-[835px]">
                <div className="absolute inset-[-9.26%_-23.95%]">
                  <img alt="" className="block size-full max-w-none" src="/cases/case-04/ellipse.svg" />
                </div>
              </div>
            </div>
          </div>
          <p className="absolute left-[46px] top-[318px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
            KEY VISUALS <br />
            ДЛЯ OUTDOOR-КАМПАНИИ
          </p>
          <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
            004
          </p>
        </div>

        <p className="absolute left-[46px] top-[682px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
          О ПРОЕКТЕ
        </p>
        <p className="absolute left-[46px] top-[729px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
          Для Stablegate я разработал рекламную концепцию и серию key visuals для
          outdoor-коммуникации. Задачей было сделать сложный crypto-продукт понятным через
          простые жизненные сценарии и показать применение цифровых активов в реальных покупках.
          В проект вошли концепция, арт-дирекшн, генерация изображений, композиция, типографика и
          адаптация под разные outdoor-форматы.
        </p>

        <div className="absolute left-[1066px] top-[729px] flex w-[102px] flex-col items-start gap-[4px]">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Дизайнер</p>
        </div>
        <div className="absolute left-[1179px] top-[729px] flex w-[98px] flex-col items-start gap-[4px]">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Stablegate</p>
        </div>

        <div className="absolute left-[1045.33px] top-[788.94px] h-[10.125px] w-[245.344px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-04/underline.svg" />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-04/body.png"
        alt="Разделы кейса «Key Visuals для outdoor-кампании»"
        width={1440}
        height={9135}
        className="block w-[1440px]"
      />

      <Footer />
    </div>
  );
}
