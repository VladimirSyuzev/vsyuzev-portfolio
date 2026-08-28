import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Кейс 003 — обложка + «О проекте» собраны кодом 1:1 из Figma
// (get_design_context, node 2022:14246). Разделы ниже — единый скриншот
// тела страницы (body.png) до перевода в код, см. FIGMA-BRIEF.md.
export default function Case03Page() {
  return (
    <div className="flex w-full flex-col items-center">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      <div className="mx-auto flex w-[1440px] flex-col items-start">
      <div className="relative h-[898px] w-[1440px] overflow-clip bg-[#fafafa]">
        <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#121212]">
          <div className="absolute left-[461px] top-[-92px] h-[678px] w-[1020px]">
            <img alt="" className="absolute inset-0 size-full object-cover" src="/cases/case-03/mockup.png" />
          </div>
          <div
            className="absolute left-[-145px] top-[-92px] h-[687px] w-[652px] blur-[14.5px]"
            style={{ background: "linear-gradient(to bottom, #425afa 13.3%, #2738cc 55.6%, #1a2ba1 97.9%)" }}
          />
          <div className="absolute left-[-299px] top-[-345px] h-[1270px] w-[2039px] mix-blend-multiply">
            <div className="absolute inset-[-23.62%_-14.71%]">
              <img alt="" className="block size-full max-w-none" src="/cases/case-03/subtract.svg" />
            </div>
          </div>
          <p className="absolute left-[46px] top-[318px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
            3D-иллюстраций <br />
            для финтех-продукта
          </p>
          <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
            003
          </p>
        </div>

        <p className="absolute left-[46px] top-[682px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
          О ПРОЕКТЕ
        </p>
        <p className="absolute left-[46px] top-[728px] w-[670px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Для Stablegate я разработал систему 3D key visuals, которая помогает быстро и наглядно
          объяснять ключевые функции и преимущества финтех-продукта. Проект включал весь цикл
          работы — от поиска визуальных метафор и построения дизайн-системы до создания финальных
          иллюстраций, которые используются на сайте, в презентациях, email-рассылках, социальных
          сетях и других маркетинговых материалах.
        </p>

        <div className="absolute left-[1066px] top-[729px] flex w-[102px] flex-col items-start gap-[4px]">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">3D Artist</p>
        </div>
        <div className="absolute left-[1179px] top-[729px] flex w-[98px] flex-col items-start gap-[4px]">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Stablegate</p>
        </div>

        <div className="absolute left-[1062.92px] top-[786.57px] h-[11.294px] w-[198.612px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-03/underline.svg" />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-03/body.png"
        alt="Разделы кейса «3D-иллюстраций для финтех-продукта»"
        width={1440}
        height={9220}
        className="block w-[1440px]"
      />

      </div>

      <Footer />
    </div>
  );
}
