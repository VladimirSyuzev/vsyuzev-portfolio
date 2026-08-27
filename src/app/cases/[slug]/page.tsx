import { notFound } from "next/navigation";
import Link from "next/link";
import { CASES } from "@/lib/cases-data";

// Обложка кейс-страницы — минимальная версия, чтобы ссылки из блока
// «Кейсы» на главной были рабочими (см. FIGMA-BRIEF.md §7). Полное тело
// каждого кейса (разделы 01/02/03…, детальные ассеты) — следующий проход.
export function generateStaticParams() {
  return CASES.map((item) => ({ slug: item.slug }));
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = CASES.find((c) => c.slug === slug);
  if (!item) notFound();

  return (
    <article>
      <header
        className="flex min-h-[60vh] flex-col justify-end px-[var(--grid-margin)] py-16"
        style={{ background: item.accent, color: item.accentDark ? "#fafafa" : "#121212" }}
      >
        <span className="text-label opacity-70">{item.index}</span>
        <h1 className="text-hero mt-2 max-w-3xl uppercase">{item.title}</h1>
      </header>

      <div className="grid-12 mx-auto px-[var(--grid-margin)] py-16 sm:py-24">
        <div className="sm:col-span-2 sm:col-start-1">
          <span className="text-label text-graphite">Клиент</span>
          <p className="text-heading mt-1 text-foreground">{item.client}</p>
        </div>
        <p className="text-body-copy mt-8 max-w-2xl text-graphite sm:col-span-6 sm:col-start-3 sm:mt-0">
          {item.description}
        </p>
      </div>

      <div className="border-t border-line px-[var(--grid-margin)] py-10">
        <Link href="/#cases" className="text-label text-graphite hover:text-foreground">
          ← Все кейсы
        </Link>
      </div>
    </article>
  );
}
