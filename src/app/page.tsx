import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CasesList from "@/components/CasesList";
import Footer from "@/components/Footer";
import ResponsiveScale from "@/components/ResponsiveScale";

// Header и Hero — адаптивные (ResponsiveScale, масштаб под фактическую
// ширину окна). About/Кейсы/Footer пока на фиксированном canvas 1440px —
// адаптация остальной страницы будет отдельным шагом. См. FIGMA-BRIEF.md.
export default function Home() {
  return (
    <div className="flex flex-col items-center" id="top">
      <ResponsiveScale width={1440} height={62}>
        <Header />
      </ResponsiveScale>
      <ResponsiveScale width={1440} height={900}>
        <Hero />
      </ResponsiveScale>
      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <About />
        <CasesList />
        <Footer />
      </div>
    </div>
  );
}
