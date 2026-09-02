"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// ZoomParallax — скролл-зум коллажа (в основе — компонент из промпта,
// 21st.dev). Доработано под задачу:
//  - произвольное число картинок (не только 7);
//  - раскладка И «ключевая» картинка (центр, растёт в экран) — случайные
//    на каждую загрузку страницы;
//  - object-contain + авто-ширина: до зума ничего не обрезается;
//  - плитки мельче и плотнее, чтобы в кадр влезало больше.
//
// Случайность: сид ставится в useEffect ПОСЛЕ маунта — SSR и первый
// клиентский рендер идут по фиксированному сиду (0), поэтому нет
// hydration mismatch; сразу после маунта раскладка перестраивается на
// случайную (пользователь ещё не скроллил — незаметно).

interface ParallaxImage {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Картинки коллажа. Порядок в массиве не важен — раскладка случайная. */
	images: ParallaxImage[];
}

type Slot = {
	x: number; // сдвиг от центра, vw
	y: number; // сдвиг от центра, vh
	h: number; // высота плитки, vh (ширина — авто по пропорции картинки)
	scale: number; // до какого масштаба вырастает к концу скролла
	z: number;
};

// mulberry32 — крошечный сид-ГСЧ (детерминированная случайность по числу).
function rng(seed: number) {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// «Я уже гидратирован?» — false на сервере и в первом клиентском рендере,
// true после гидратации. Тот же приём, что useReducedMotion в lib/gsap.ts
// (useSyncExternalStore вместо setState-в-эффекте).
const noopSubscribe = () => () => {};
function useHydrated() {
	return useSyncExternalStore(
		noopSubscribe,
		() => true,
		() => false,
	);
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function buildLayout(count: number, seed: number): { order: number[]; slots: Slot[] } {
	const rand = rng(seed || 1);
	const between = (lo: number, hi: number) => lo + rand() * (hi - lo);

	// order[0] — ключевая картинка (случайная каждую загрузку).
	const order = shuffle([...Array(count).keys()], rand);

	const slots: Slot[] = [
		// ключевая — по центру, вырастает почти на весь экран
		{ x: between(-3, 3), y: between(-2, 2), h: between(26, 31), scale: between(3.2, 3.8), z: 30 },
	];

	// остальные — на двух эллиптических кольцах вокруг ключевой, углы с
	// джиттером. Кольца дают сбалансированный разброс при любом сиде;
	// при прогрессе 0 весь коллаж в кадре, плитки плотные, лёгкие нахлёсты.
	const rest = count - 1;
	const inner = Math.ceil(rest / 2);
	const rings = [
		{ n: inner, rx: 21, ry: 19, hLo: 16, hHi: 21 },
		{ n: rest - inner, rx: 37, ry: 32, hLo: 13, hHi: 18 },
	];
	let placed = 0;
	for (const ring of rings) {
		if (ring.n <= 0) continue;
		const a0 = rand() * Math.PI * 2;
		for (let k = 0; k < ring.n; k++) {
			const ang = a0 + (k / ring.n) * Math.PI * 2 + between(-0.28, 0.28);
			slots.push({
				x: Math.cos(ang) * ring.rx + between(-3, 3),
				y: Math.sin(ang) * ring.ry + between(-3, 3),
				h: between(ring.hLo, ring.hHi),
				scale: between(3, 5),
				z: 20 - placed,
			});
			placed++;
		}
	}

	// Округляем — иначе строки inline-style на сервере и клиенте могут
	// разойтись по точности и дать hydration mismatch.
	const r = (n: number) => Math.round(n * 1000) / 1000;
	return {
		order,
		slots: slots.map((s) => ({ x: r(s.x), y: r(s.y), h: r(s.h), scale: r(s.scale), z: s.z })),
	};
}

function ParallaxItem({
	image,
	slot,
	progress,
}: {
	image: ParallaxImage;
	slot: Slot;
	progress: MotionValue<number>;
}) {
	const scale = useTransform(progress, [0, 1], [1, slot.scale]);

	return (
		<motion.div
			style={{ scale, zIndex: slot.z }}
			className="absolute inset-0 flex items-center justify-center"
		>
			<div
				className="relative w-fit"
				style={{ height: `${slot.h}vh`, transform: `translate(${slot.x}vw, ${slot.y}vh)` }}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={image.src}
					alt={image.alt ?? ""}
					className="block h-full w-auto object-contain"
					draggable={false}
				/>
			</div>
		</motion.div>
	);
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});

	// Случайная раскладка на каждую загрузку. Сид фиксируется один раз на
	// маунт; коллаж рендерим только после гидратации (пустой sticky на
	// сервере и в первом клиентском рендере) — так исключён любой hydration
	// mismatch, а секция всё равно ниже первого экрана, пользователь ещё не
	// доскроллил.
	const hydrated = useHydrated();
	const [seed] = useState(() => 1 + Math.floor(Math.random() * 1_000_000_000));

	const { order, slots } = useMemo(
		() => buildLayout(images.length, seed),
		[images.length, seed],
	);

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden bg-[#121212]">
				{hydrated &&
					order.map((imgIdx, slotIdx) => (
						<ParallaxItem
							key={imgIdx}
							image={images[imgIdx]}
							slot={slots[slotIdx]}
							progress={scrollYProgress}
						/>
					))}
			</div>
		</div>
	);
}
