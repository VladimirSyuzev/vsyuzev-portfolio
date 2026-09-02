import Header from "@/components/Header";
import HeroZoom from "@/components/HeroZoom";
import About from "@/components/About";
import CasesList from "@/components/CasesList";
import Footer from "@/components/Footer";

// Header — нативно флюидный (см. Header.tsx, шрифт фиксирован). Hero —
// анимированный скролл-зум на всю ширину (HeroZoom, framer-motion; старый
// статичный Hero.tsx оставлен в репозитории). About/Кейсы пока на
// фиксированном canvas 1440px. Footer — фон на всю ширину страницы, сам
// контент внутри — по центру на 1440px. См. FIGMA-BRIEF.md.
export default function Home() {
  return (
    <div className="flex flex-col items-center" id="top">
      <Header />
      {/* Header теперь fixed (auto-hide) — не занимает место в потоке,
          спейсер ниже возвращает те же 62px, что и раньше. */}
      <div className="h-[62px] w-full shrink-0" />
      <HeroZoom />
      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <About />
        <CasesList />
      </div>
      <Footer />
    </div>
  );
}
