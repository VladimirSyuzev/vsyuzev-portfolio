"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ZoomParallax — скролл-зум коллажа (в основе — компонент из промпта,
// 21st.dev). Доработано под задачу:
//  - МОЗАИКА вокруг центра: ключевая картинка — по центру композиции,
//    вокруг ячейки разных пропорций, отступы (gap) одинаковые у всех,
//    нахлёстов нет (CSS grid-template-areas + gap);
//  - ключевая картинка и раскладка — случайные на каждую загрузку;
//  - картинки раскладываются по ячейкам с учётом их соотношения сторон
//    (портрет → вертикальная ячейка и т.п.), чтобы object-cover почти не
//    резал; соотношения замеряются по мере загрузки картинок;
//  - зум — единый масштаб всей сетки от центра ключевой ячейки: она
//    разворачивается на весь экран, остальные разъезжаются.
//
// Мозаика рендерится только после гидратации (useSyncExternalStore) — на
// сервере и в первом клиентском рендере её нет, поэтому никакого hydration
// mismatch от Math.random(); секция всё равно ниже первого экрана.

interface ParallaxImage {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	images: ParallaxImage[];
}

// Пропорции всей сетки. Чуть шире квадрата — заполняет экран, но не
// заваливает вертикальные картинки в горизонт (у большинства работ
// портретная ориентация). Домножается на пропорции ячеек при подборе.
const GRID_ASPECT = 1.22;

// Шаблон мозаики 6×6. K — ключевая, строго по центру (колонки 3–4,
// строки 3–4). Каждая буква — отдельный прямоугольник; aspect —
// колонок/строк ячейки (без учёта GRID_ASPECT).
const AREAS = [
	"a a b b c d",
	"a a b b c d",
	"e e K K f f",
	"g g K K f f",
	"g g h h i j",
	"k k h h i j",
]
	.map((row) => `"${row}"`)
	.join(" ");

const SLOTS: { name: string; aspect: number }[] = [
	{ name: "a", aspect: 1 },
	{ name: "b", aspect: 1 },
	{ name: "c", aspect: 1 / 2 },
	{ name: "d", aspect: 1 / 2 },
	{ name: "e", aspect: 2 },
	{ name: "K", aspect: 1 },
	{ name: "f", aspect: 1 },
	{ name: "g", aspect: 1 },
	{ name: "h", aspect: 1 },
	{ name: "i", aspect: 1 / 2 },
	{ name: "j", aspect: 1 / 2 },
	{ name: "k", aspect: 2 },
];

const noopSubscribe = () => () => {};
function useHydrated() {
	return useSyncExternalStore(
		noopSubscribe,
		() => true,
		() => false,
	);
}

// mulberry32 — крошечный сид-ГСЧ.
function rng(seed: number) {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// Раскладка картинок по ячейкам. Пока соотношения не замерены (aspects
// null) — просто перемешиваем. После — ключевая берётся случайно из
// «самых квадратных», остальные жадно раскидываются по близости
// соотношения к ячейке (экстремальные ячейки — первыми).
function buildAssignment(
	count: number,
	seed: number,
	aspects: Record<number, number> | null,
): Record<string, number> {
	const rand = rng(seed || 1);
	const idx = [...Array(count).keys()];

	if (!aspects) {
		const sh = shuffle(idx, rand);
		const res: Record<string, number> = {};
		SLOTS.forEach((s, i) => {
			res[s.name] = sh[i % sh.length];
		});
		return res;
	}

	const withA = idx.map((i) => ({ i, a: aspects[i] ?? 1 }));
	const dist = (a: number, b: number) => Math.abs(Math.log(a / b));

	const keySlot = SLOTS.find((s) => s.name === "K")!;
	const keyTarget = keySlot.aspect * GRID_ASPECT;
	const keyCands = [...withA]
		.sort((x, y) => dist(x.a, keyTarget) - dist(y.a, keyTarget))
		.slice(0, Math.min(5, withA.length));
	const keyImg = keyCands[Math.floor(rand() * keyCands.length)].i;

	const used = new Set<number>([keyImg]);
	const res: Record<string, number> = { K: keyImg };
	const rest = SLOTS.filter((s) => s.name !== "K").sort(
		(x, y) => dist(y.aspect, 1) - dist(x.aspect, 1),
	);
	for (const slot of rest) {
		let best = -1;
		let bd = Infinity;
		for (const { i, a } of withA) {
			if (used.has(i)) continue;
			const d = dist(a, slot.aspect * GRID_ASPECT) + rand() * 0.2;
			if (d < bd) {
				bd = d;
				best = i;
			}
		}
		used.add(best);
		res[slot.name] = best;
	}
	return res;
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});
	const scale = useTransform(scrollYProgress, [0, 1], [1, 5.2]);

	const hydrated = useHydrated();
	const [seed] = useState(() => 1 + Math.floor(Math.random() * 1_000_000_000));

	// соотношения сторон картинок — заполняются по onLoad
	const [aspects, setAspects] = useState<Record<number, number>>({});
	const allLoaded = Object.keys(aspects).length >= images.length;

	const assignment = useMemo(
		() => buildAssignment(images.length, seed, allLoaded ? aspects : null),
		[images.length, seed, allLoaded, aspects],
	);

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#121212]">
				{hydrated && (
					<motion.div
						className="grid aspect-[61/50] w-[min(90vw,110vh)] gap-[1.2vmin]"
						style={{
							gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
							gridTemplateRows: "repeat(6, minmax(0, 1fr))",
							gridTemplateAreas: AREAS,
							scale,
							transformOrigin: "50% 50%",
						}}
					>
						{SLOTS.map((slot) => {
							const imgIdx = assignment[slot.name] ?? 0;
							const img = images[imgIdx];
							return (
								<div
									key={slot.name}
									style={{ gridArea: slot.name }}
									className="overflow-hidden"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={img.src}
										alt={img.alt ?? ""}
										className="h-full w-full object-cover"
										draggable={false}
										onLoad={(e) => {
											const el = e.currentTarget;
											if (!el.naturalWidth || !el.naturalHeight) return;
											const ratio = el.naturalWidth / el.naturalHeight;
											setAspects((prev) =>
												prev[imgIdx] ? prev : { ...prev, [imgIdx]: ratio },
											);
										}}
									/>
								</div>
							);
						})}
					</motion.div>
				)}
			</div>
		</div>
	);
}
