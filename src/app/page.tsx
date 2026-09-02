import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CasesList from "@/components/CasesList";
import Footer from "@/components/Footer";

// Header — нативно флюидный. Hero = ART (скролл-зум коллажа) + REGAL.
// About/CasesList/Footer сами центрируют себя на 1440 при ≥1200, а ниже
// раскладываются в колоночную сетку (см. RESPONSIVE.md).
export default function Home() {
  return (
    <div className="flex w-full flex-col items-center" id="top">
      <Header />
      {/* Header fixed (auto-hide) — не занимает место в потоке, спейсер
          возвращает те же 62px. */}
      <div className="h-[62px] w-full shrink-0" />
      <Hero />
      <About />
      <CasesList />
      <Footer />
    </div>
  );
}
