"use client";

import { useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

// Hero = два блока из Figma:
//  ART   (node 2238:94139) — имя «VOVA SYUZEV» на весь экран (#121212),
//         затем скролл-зум коллажа работ (ZoomParallax).
//  REGAL (node 2499:5398) — строка «ART-DIRECTOR & multidisciplinary
//         designer» с подчёркиванием, на светлом фоне, по сетке 1440.
// Только после REGAL начинается блок «О себе».
//
// Картинки коллажа лежат в /public/hero-parallax. Порядок и «ключевая»
// (из неё растёт зум) выбираются случайно на каждой загрузке — см.
// ZoomParallax. Замена: положить/переименовать файлы и поправить список.
const IMAGES = [
	"1.png",
	"2.jpg",
	"3.jpg",
	"4.jpg",
	"5.jpg",
	"6.jpg",
	"7.jpg",
	"8.jpg",
	"9.jpg",
	"10.jpg",
	"11.jpg",
	"12.jpg",
].map((name) => ({ src: `/hero-parallax/${name}` }));

function ArtTitle() {
	return (
		<h1 className="text-center font-heading text-[clamp(2.75rem,12vw,175px)] font-bold uppercase leading-none tracking-[0.03em] text-white">
			Vova
			<br />
			Syuzev
		</h1>
	);
}

// REGAL — 1:1 из Figma (node 2499:5398, фрейм 1440×411): текст x46/y149,
// подчёркивание x590/y263, 342.5×13.
function Regal() {
	return (
		<section className="w-full bg-[#fafafa]">
			<div className="relative mx-auto h-[411px] w-[1440px]">
				<p className="absolute left-[46px] top-[149px] whitespace-pre font-heading text-[52px] font-bold uppercase leading-[0] tracking-[1.56px] text-[#121212]">
					<span className="leading-[1.1]">ART-DIRECTOR </span>
					<span className="leading-[1.1] text-[#008cff]">&amp;</span>
					<span className="leading-[1.1]">
						{" "}
						<br />
						multidisciplinary designer
					</span>
				</p>
				<Reveal
					variant="line"
					delay={0.1}
					className="absolute left-[590px] top-[263px] h-[13.044px] w-[342.526px]"
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img alt="" className="block size-full max-w-none" src="/hero/underline.svg" />
				</Reveal>
			</div>
		</section>
	);
}

export default function Hero() {
	const reduced = useReducedMotion();

	return (
		<>
			{/* ART */}
			{reduced ? (
				<section className="flex min-h-screen w-full items-center justify-center bg-[#121212] px-6">
					<ArtTitle />
				</section>
			) : (
				<div className="w-full bg-[#121212]">
					<section className="flex h-screen w-full items-center justify-center px-6">
						<ArtTitle />
					</section>
					<ZoomParallax images={IMAGES} />
				</div>
			)}

			{/* REGAL */}
			<Regal />
		</>
	);
}
