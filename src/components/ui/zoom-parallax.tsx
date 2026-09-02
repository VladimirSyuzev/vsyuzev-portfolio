"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ZoomParallax — скролл-зум коллажа (в основе — компонент из промпта,
// 21st.dev). Доработано под задачу:
//  - НЕТ сетки: ключевая картинка по центру, вокруг неё — колонки-мозаика
//    (по 2 слева и справа), картинки в колонках на произвольной высоте;
//  - каждая картинка целиком, НЕ обрезается — бокс строится под её
//    реальное соотношение сторон (замеряется по onLoad);
//  - отступы между всеми картинками одинаковые;
//  - порядок картинок и ключевая — случайные на каждую загрузку;
//  - зум — единый масштаб всего коллажа от центра ключевой: она
//    разворачивается на весь экран, остальные разъезжаются.
//
// Раскладка рендерится только после гидратации (useSyncExternalStore) —
// на сервере и в первом клиентском рендере её нет, поэтому никакого
// hydration mismatch от Math.random(); секция всё равно ниже первого
// экрана, пользователь ещё не доскроллил.

interface ParallaxImage {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	images: ParallaxImage[];
}

// Все размеры — в условных единицах, ширина коллажа = 100.
const GAP = 2; // отступ между картинками (одинаковый везде)
const KEY_W = 30; // ширина ключевой
const SIDE_COLS = 2; // колонок с каждой стороны

const COL_W = (100 - KEY_W - (SIDE_COLS * 2 + 1) * GAP) / (SIDE_COLS * 2);

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

type Box = { img: number; x: number; y: number; w: number; h: number };

function buildLayout(
	count: number,
	seed: number,
	aspects: Record<number, number> | null,
): { boxes: Box[]; width: number; height: number; originX: number; originY: number } {
	const rand = rng(seed || 1);
	const a = (i: number) => (aspects?.[i] ?? 1) || 1;

	const order = shuffle([...Array(count).keys()], rand);

	// ключевая — случайная среди не-вертикальных (квадрат/горизонталь):
	// такая нормально разворачивается на весь экран. Если подходящих нет —
	// просто самая «широкая».
	let keyImg = order[0];
	if (aspects) {
		let cand = order.filter((i) => a(i) >= 0.9);
		if (cand.length === 0) {
			cand = [...order].sort((p, q) => a(q) - a(p)).slice(0, 3);
		}
		keyImg = cand[Math.floor(rand() * cand.length)];
	}
	const rest = order.filter((i) => i !== keyImg);

	// x-левые края колонок: [L..][G][L..][G] KEY [G][R..][G][R..]
	const nCols = SIDE_COLS * 2;
	const colX: number[] = [];
	for (let c = 0; c < SIDE_COLS; c++) colX.push(c * (COL_W + GAP));
	const keyX = SIDE_COLS * (COL_W + GAP);
	for (let c = 0; c < SIDE_COLS; c++) colX.push(keyX + KEY_W + GAP + c * (COL_W + GAP));

	// раскидываем rest по колонкам — всегда в самую короткую (мозаика)
	const cols: { img: number; h: number }[][] = Array.from({ length: nCols }, () => []);
	const colH = new Array(nCols).fill(0);
	for (const img of rest) {
		let c = 0;
		for (let k = 1; k < nCols; k++) if (colH[k] < colH[c]) c = k;
		const h = COL_W / a(img);
		cols[c].push({ img, h });
		colH[c] += h + GAP;
	}

	const keyH = KEY_W / a(keyImg);
	const contentH = Math.max(keyH, ...colH.map((v) => v - GAP));

	const boxes: Box[] = [];
	cols.forEach((items, c) => {
		const stackH = items.reduce((s, it) => s + it.h, 0) + Math.max(0, items.length - 1) * GAP;
		let y = (contentH - stackH) / 2;
		for (const it of items) {
			boxes.push({ img: it.img, x: colX[c], y, w: COL_W, h: it.h });
			y += it.h + GAP;
		}
	});
	boxes.push({ img: keyImg, x: keyX, y: (contentH - keyH) / 2, w: KEY_W, h: keyH });

	return {
		boxes,
		width: 100,
		height: contentH,
		originX: keyX + KEY_W / 2,
		originY: contentH / 2,
	};
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});
	const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

	const hydrated = useHydrated();
	const [seed] = useState(() => 1 + Math.floor(Math.random() * 1_000_000_000));

	const [aspects, setAspects] = useState<Record<number, number>>({});
	const allLoaded = Object.keys(aspects).length >= images.length;

	const { boxes, width, height, originX, originY } = useMemo(
		() => buildLayout(images.length, seed, allLoaded ? aspects : null),
		[images.length, seed, allLoaded, aspects],
	);

	// коллаж вписываем в экран: ширина не больше 90vw и не больше той,
	// при которой высота (ширина * height/width) влезает в ~92vh
	const maxWByHeight = (92 * width) / height;
	const cssWidth = `min(90vw, ${maxWByHeight.toFixed(2)}vh)`;

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#121212]">
				{hydrated && (
					<motion.div
						className="relative"
						style={{
							width: cssWidth,
							aspectRatio: `${width} / ${height}`,
							scale,
							transformOrigin: `${(originX / width) * 100}% ${(originY / height) * 100}%`,
						}}
					>
						{boxes.map((b) => (
							<div
								key={b.img}
								className="absolute"
								style={{
									left: `${(b.x / width) * 100}%`,
									top: `${(b.y / height) * 100}%`,
									width: `${(b.w / width) * 100}%`,
									height: `${(b.h / height) * 100}%`,
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={images[b.img].src}
									alt={images[b.img].alt ?? ""}
									className="block h-full w-full object-contain"
									draggable={false}
									onLoad={(e) => {
										const el = e.currentTarget;
										if (!el.naturalWidth || !el.naturalHeight) return;
										const ratio = el.naturalWidth / el.naturalHeight;
										setAspects((prev) => (prev[b.img] ? prev : { ...prev, [b.img]: ratio }));
									}}
								/>
							</div>
						))}
					</motion.div>
				)}
			</div>
		</div>
	);
}
