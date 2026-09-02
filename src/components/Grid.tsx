import type { CSSProperties, ReactNode } from "react";

// Колоночная сетка (см. RESPONSIVE.md). <Grid> — центрированный контейнер
// с полями и колонками из CSS-переменных (--grid-cols/-gutter/-margin),
// <Col> — элемент с адаптивным спаном/старт-колонкой.
//
// Число колонок: мобайл 1 / планшет-верт 2 (sm) / планшет-гор 4 (lg) /
// десктоп 8 (xl). span/start задаются на каждый брейкпоинт числом или
// "full" (на всю ширину сетки).

type Span = number | "full";
type Responsive = { base?: Span; sm?: Span; lg?: Span; xl?: Span };

// Классы перечислены литералами — иначе Tailwind v4 JIT их не увидит.
const SPAN: Record<"base" | "sm" | "lg" | "xl", Partial<Record<string, string>>> = {
  base: { "1": "col-span-1", full: "col-span-full" },
  sm: { "1": "sm:col-span-1", "2": "sm:col-span-2", full: "sm:col-span-full" },
  lg: {
    "1": "lg:col-span-1",
    "2": "lg:col-span-2",
    "3": "lg:col-span-3",
    "4": "lg:col-span-4",
    full: "lg:col-span-full",
  },
  xl: {
    "1": "xl:col-span-1",
    "2": "xl:col-span-2",
    "3": "xl:col-span-3",
    "4": "xl:col-span-4",
    "5": "xl:col-span-5",
    "6": "xl:col-span-6",
    "7": "xl:col-span-7",
    "8": "xl:col-span-8",
    full: "xl:col-span-full",
  },
};

const START: Record<"base" | "sm" | "lg" | "xl", Partial<Record<string, string>>> = {
  base: { "1": "col-start-1" },
  sm: { "1": "sm:col-start-1", "2": "sm:col-start-2" },
  lg: {
    "1": "lg:col-start-1",
    "2": "lg:col-start-2",
    "3": "lg:col-start-3",
    "4": "lg:col-start-4",
  },
  xl: {
    "1": "xl:col-start-1",
    "2": "xl:col-start-2",
    "3": "xl:col-start-3",
    "4": "xl:col-start-4",
    "5": "xl:col-start-5",
    "6": "xl:col-start-6",
    "7": "xl:col-start-7",
    "8": "xl:col-start-8",
  },
};

function classesFor(map: typeof SPAN, r?: Responsive): string {
  if (!r) return "";
  const out: string[] = [];
  (["base", "sm", "lg", "xl"] as const).forEach((bp) => {
    const v = r[bp];
    if (v == null) return;
    const cls = map[bp][String(v)];
    if (cls) out.push(cls);
  });
  return out.join(" ");
}

export function Grid({
  children,
  className,
  style,
  as: Tag = "div",
  rowGap,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section";
  /** вертикальный gap между рядами; по умолчанию = гаттеру */
  rowGap?: number | string;
}) {
  return (
    <Tag
      className={`mx-auto grid w-full ${className ?? ""}`}
      style={{
        maxWidth: "var(--grid-max)",
        paddingInline: "var(--grid-margin)",
        gridTemplateColumns: "repeat(var(--grid-cols), minmax(0, 1fr))",
        columnGap: "var(--grid-gutter)",
        rowGap: rowGap ?? "var(--grid-gutter)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export function Col({
  children,
  span,
  start,
  className,
  style,
}: {
  children: ReactNode;
  span?: Responsive;
  start?: Responsive;
  className?: string;
  style?: CSSProperties;
}) {
  const cls = [classesFor(SPAN, span), classesFor(START, start), className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls || undefined} style={style}>
      {children}
    </div>
  );
}
