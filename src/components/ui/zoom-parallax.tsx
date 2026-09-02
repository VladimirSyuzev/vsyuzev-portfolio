"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ZoomParallax — скролл-зум коллажа (в основе — компонент из промпта,
// 21st.dev). Доработано под задачу:
//  - НЕТ сетки: ключевая картинка по центру, вокруг неё — картинки со всех
//    сторон (сверху, снизу, слева, справа); колонки-мозаика, элементы в
//    них на произвольной высоте;
//  - бокс каждой картинки строится под её реальное соотношение сторон
//    (замеряется по onLoad) — object-contain показывает картинку целиком,
//    без обрезки;
//  - отступы между всеми картинками одинаковые; нахлёстов нет;
//  - ключевая (любой ориентации, в т.ч. вертикальная) и порядок остальных
//    — случайные на каждую загрузку;
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
const SIDE_W = 12.5; // ширина боковой колонки
const CENTER_W = 44; // ширина центральной зоны (там ключевая + над/под ней)
const CENTER_SMALL = 30; // ширина картинок над/под ключевой
const KEY_TARGET_H = 36; // желаемая высота ключевой
const KEY_W_MIN = 27;
const KEY_W_MAX = CENTER_W;

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
	const ar = (i: number) => (aspects?.[i] ?? 1) || 1;

	const order = shuffle([...Array(count).keys()], rand);

	// ключевая — любая (в т.ч. вертикальная), случайная
	const keyImg = order[Math.floor(rand() * order.length)];
	const rest = order.filter((i) => i !== keyImg);

	// ключевая: держим высоту около KEY_TARGET_H, ширину — от соотношения,
	// но в разумных пределах
	const keyW = Math.min(KEY_W_MAX, Math.max(KEY_W_MIN, KEY_TARGET_H * ar(keyImg)));
	const keyH = keyW / ar(keyImg);

	// над и под ключевой — по одной картинке (самые «широкие», чтобы не
	// раздувать центральную колонку по высоте)
	const wideFirst = [...rest].sort((p, q) => ar(q) - ar(p));
	const above = wideFirst[0];
	const below = wideFirst[1];
	const centerExtra = new Set([above, below]);
	const sideImgs = rest.filter((i) => !centerExtra.has(i));

	// x-левые края: [col0][G][col1][G][ CENTER_W ][G][col3][G][col4]
	const c0 = 0;
	const c1 = SIDE_W + GAP;
	const centerX = 2 * (SIDE_W + GAP);
	const c3 = centerX + CENTER_W + GAP;
	const c4 = c3 + SIDE_W + GAP;
	const sideX = [c0, c1, c3, c4];
	const totalW = c4 + SIDE_W; // ← ширина коллажа (нормируем к ней)

	// боковые: 4 колонки, всегда в самую короткую (мозаика)
	const cols: { img: number; h: number }[][] = [[], [], [], []];
	const colH = [0, 0, 0, 0];
	for (const img of sideImgs) {
		let c = 0;
		for (let k = 1; k < 4; k++) if (colH[k] < colH[c]) c = k;
		const h = SIDE_W / ar(img);
		cols[c].push({ img, h });
		colH[c] += h + GAP;
	}

	// центральная колонка: [above] [KEY] [below]
	const aboveH = CENTER_SMALL / ar(above);
	const belowH = CENTER_SMALL / ar(below);
	const centerH = aboveH + GAP + keyH + GAP + belowH;

	const contentH = Math.max(centerH, ...colH.map((v) => v - GAP));

	const boxes: Box[] = [];
	cols.forEach((items, c) => {
		const stackH = items.reduce((s, it) => s + it.h, 0) + Math.max(0, items.length - 1) * GAP;
		let y = (contentH - stackH) / 2;
		for (const it of items) {
			boxes.push({ img: it.img, x: sideX[c], y, w: SIDE_W, h: it.h });
			y += it.h + GAP;
		}
	});

	// центральная зона — по центру contentH, всё выравниваем по её оси
	const centerAxis = centerX + CENTER_W / 2;
	let cy = (contentH - centerH) / 2;
	boxes.push({
		img: above,
		x: centerAxis - CENTER_SMALL / 2,
		y: cy,
		w: CENTER_SMALL,
		h: aboveH,
	});
	cy += aboveH + GAP;
	const keyY = cy;
	boxes.push({ img: keyImg, x: centerAxis - keyW / 2, y: cy, w: keyW, h: keyH });
	cy += keyH + GAP;
	boxes.push({
		img: below,
		x: centerAxis - CENTER_SMALL / 2,
		y: cy,
		w: CENTER_SMALL,
		h: belowH,
	});

	return {
		boxes,
		width: totalW,
		height: contentH,
		originX: centerAxis,
		originY: keyY + keyH / 2,
	};
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});
	const scale = useTransform(scrollYProgress, [0, 1], [1, 5.5]);

	const hydrated = useHydrated();
	const [seed] = useState(() => 1 + Math.floor(Math.random() * 1_000_000_000));

	const [aspects, setAspects] = useState<Record<number, number>>({});
	const allLoaded = Object.keys(aspects).length >= images.length;

	const { boxes, width, height, originX, originY } = useMemo(
		() => buildLayout(images.length, seed, allLoaded ? aspects : null),
		[images.length, seed, allLoaded, aspects],
	);

	const maxWByHeight = (92 * width) / height;
	const cssWidth = `min(92vw, ${maxWByHeight.toFixed(2)}vh)`;

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
