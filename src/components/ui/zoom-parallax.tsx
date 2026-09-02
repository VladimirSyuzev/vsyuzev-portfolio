"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ZoomParallax — скролл-зум коллажа (в основе — компонент из промпта,
// 21st.dev). Доработано под задачу:
//  - произвольное число картинок;
//  - РОВНАЯ СЕТКА: одинаковые ячейки, одинаковые отступы со всех сторон,
//    без нахлёстов (CSS grid + gap, картинки object-contain — не режутся);
//  - порядок картинок и «ключевая» ячейка (из неё растёт зум) — случайные
//    на каждую загрузку;
//  - зум — единый масштаб всей сетки от центра ключевой ячейки: она
//    остаётся на месте и разворачивается в экран, остальные разъезжаются.
//
// Случайность рендерится только после гидратации (useSyncExternalStore) —
// на сервере и в первом клиентском рендере сетки нет, поэтому никакого
// hydration mismatch от Math.random(); секция всё равно ниже первого
// экрана, пользователь ещё не доскроллил.

interface ParallaxImage {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	images: ParallaxImage[];
	/** Колонок в сетке (по умолчанию 4). */
	columns?: number;
}

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

function buildLayout(count: number, columns: number, seed: number) {
	const rand = rng(seed || 1);
	const order = shuffle([...Array(count).keys()], rand);
	const rows = Math.max(1, Math.ceil(count / columns));

	// «Ключевая» ячейка — точка, из которой идёт зум. Тянемся к центру
	// (при зуме из угла сетка улетает вбок), но с разбросом — каждую
	// загрузку другая.
	const cx = (columns - 1) / 2;
	const cy = (rows - 1) / 2;
	const weighted = [...Array(count).keys()]
		.map((i) => {
			const col = i % columns;
			const row = Math.floor(i / columns);
			const d = Math.hypot(col - cx, row - cy);
			return { i, w: 1 / (0.6 + d) };
		})
		.sort((p, q) => q.w - p.w)
		.slice(0, Math.min(count, 6)); // из 6 самых центральных
	const keyCell = weighted[Math.floor(rand() * weighted.length)].i;

	const kc = keyCell % columns;
	const kr = Math.floor(keyCell / columns);
	// центр ячейки в процентах ширины/высоты сетки (для transform-origin)
	const originX = ((kc + 0.5) / columns) * 100;
	const originY = ((kr + 0.5) / rows) * 100;

	return {
		order,
		originX: Math.round(originX * 100) / 100,
		originY: Math.round(originY * 100) / 100,
	};
}

export function ZoomParallax({ images, columns = 4 }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});
	const scale = useTransform(scrollYProgress, [0, 1], [1, 6.5]);

	const hydrated = useHydrated();
	const [seed] = useState(() => 1 + Math.floor(Math.random() * 1_000_000_000));
	const { order, originX, originY } = useMemo(
		() => buildLayout(images.length, columns, seed),
		[images.length, columns, seed],
	);

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#121212]">
				{hydrated && (
					<motion.div
						className="grid w-[min(92vw,124vh)] gap-[1.7vmin]"
						style={{
							gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
							scale,
							transformOrigin: `${originX}% ${originY}%`,
						}}
					>
						{order.map((imgIdx) => (
							<div
								key={imgIdx}
								className="flex aspect-square items-center justify-center"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={images[imgIdx].src}
									alt={images[imgIdx].alt ?? ""}
									className="max-h-full max-w-full object-contain"
									draggable={false}
								/>
							</div>
						))}
					</motion.div>
				)}
			</div>
		</div>
	);
}
