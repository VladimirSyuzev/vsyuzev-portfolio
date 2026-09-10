"use client";

import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";
import HeroDraw from "@/components/HeroDraw";

// Hero = два блока:
//  DRAW — леттеринг «VOVA / SYUZEV» на тёмном фоне #121212, линии
//         прочерчиваются по очереди при загрузке страницы (не по
//         скроллу). Секция во всю высоту вьюпорта — см. HeroDraw.
//  REGAL (node 2499:5398) — строка «LEAD DESIGNER & multidisciplinary
//         designer» с подчёркиванием, на светлом фоне, по сетке 1440.
// Только после REGAL начинается блок «О себе».

// REGAL — 1:1 из Figma по 4 брейкпоинтам:
// ≥1440 — абсолют по сетке 1440 (node 2499:5398): текст x46/y149 52px,
//   подчёркивание x590/y263.
// 1024–1439 — холст 1280×411 (node 2886:22115): текст x40/y149 52px,
//   подчёркивание x584/y263.
// 640–1023 — холст 834×411 (node 2886:29823): текст x25/y120 52px в 3
//   строки, подчёркивание x25/y291.
// <640 — холст 375×215 (node 2886:29937): текст x20/y64 26px в 3 строки,
//   подчёркивание x20/y155 (165×6, свой SVG underline-375).
// Подчёркивание — общий SVG (stroke-width 6) в inset-обёртке, чтобы
// preserveAspectRatio="none" не сплющивал линию тоньше 6px. Появляется
// прочерчиванием обводки (pathLength 0→1) при вскролле — см. DrawIn,
// единый «почерк» с HeroDraw.
function Regal() {
	return (
		<section className="w-full bg-[#fafafa]">
			{/* ≥1440 — абсолют по сетке 1440 */}
			<div className="hidden xl:block">
				<div className="relative mx-auto w-full max-w-[1440px] xl:h-[411px]">
					<div className="flex flex-col px-[var(--grid-margin)] py-[64px] sm:py-[88px] xl:contents">
						<p className="relative inline-block whitespace-normal font-heading text-[clamp(1.9rem,5.2vw,52px)] font-bold uppercase leading-[1.1] tracking-[1.56px] text-[#121212] xl:absolute xl:left-[46px] xl:top-[149px] xl:whitespace-pre xl:!text-[52px] xl:!leading-[0]">
							<span className="leading-[1.1]">LEAD DESIGNER </span>
							<span className="leading-[1.1] text-[#008cff]">&amp;</span>
							<span className="leading-[1.1]">
								{" "}
								<br />
								multidisciplinary designer
							</span>
							{/* подчёркивание на планшете/мобайле — привязано к строке */}
							<span className="pointer-events-none absolute bottom-[-0.35em] right-0 block h-[0.14em] w-[62%] bg-[#008cff] xl:hidden" />
						</p>
						<div className="hidden xl:absolute xl:left-[590px] xl:top-[263px] xl:block xl:h-[13.044px] xl:w-[342.526px]">
							<DrawIn
								src="/hero/underline.svg"
								delay={0.1}
								className="absolute inset-[-23%_-0.88%]"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* <640 — 1:1 из Figma reflow-фрейма «главная · 375» (node
					2886:29937), холст 375×215. Текст 26px в 3 строки, подчёркивание
					165×6 у левого края. */}
			<div className="sm:hidden">
				<FullBleedScale width={375} height={215} mode="grow" className="w-full">
					<div className="relative h-[215px] w-[375px] bg-[#fafafa]">
						<p className="absolute left-[20px] top-[64px] whitespace-pre font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] text-[#121212]">
							<span>LEAD DESIGNER </span>
							<span className="text-[#008cff]">&amp;</span>
							<span>
								{" "}
								<br />
								multidisciplinary <br />
								designer
							</span>
						</p>
						<div className="absolute left-[20px] top-[155px] h-[6px] w-[165px]">
							<DrawIn
								src="/hero/underline-375.svg"
								delay={0.1}
								className="absolute inset-[-50%_-1.82%]"
							/>
						</div>
					</div>
				</FullBleedScale>
			</div>

			{/* 640–1023 — 1:1 из Figma reflow-фрейма «главная · 834» (node
					2886:29823), холст 834×411. Текст в 3 строки, подчёркивание у
					левого края под «LEAD DESIGNER». */}
			<div className="hidden sm:block lg:hidden">
				<FullBleedScale width={834} height={411} mode="grow" className="w-full">
					<div className="relative h-[411px] w-[834px] bg-[#fafafa]">
						<p className="absolute left-[25px] top-[120px] whitespace-pre font-heading text-[52px] font-bold uppercase leading-[1.1] tracking-[1.56px] text-[#121212]">
							<span>LEAD DESIGNER </span>
							<span className="text-[#008cff]">&amp;</span>
							<span>
								{" "}
								<br />
								multidisciplinary <br />
								designer
							</span>
						</p>
						<div className="absolute left-[25px] top-[291px] h-[13.044px] w-[342.526px]">
							<DrawIn
								src="/hero/underline.svg"
								delay={0.1}
								className="absolute inset-[-23%_-0.88%]"
							/>
						</div>
					</div>
				</FullBleedScale>
			</div>

			{/* 1024–1439 — 1:1 из Figma reflow-фрейма «главная · 1280» (node
					2886:22115), холст 1280×411. */}
			<div className="hidden lg:block xl:hidden">
				<FullBleedScale width={1280} height={411} mode="grow" className="w-full">
					<div className="relative h-[411px] w-[1280px] bg-[#fafafa]">
						<p className="absolute left-[40px] top-[149px] whitespace-pre font-heading text-[52px] font-bold uppercase leading-[1.1] tracking-[1.56px] text-[#121212]">
							<span>LEAD DESIGNER </span>
							<span className="text-[#008cff]">&amp;</span>
							<span>
								{" "}
								<br />
								multidisciplinary designer
							</span>
						</p>
						<div className="absolute left-[584px] top-[263px] h-[13.044px] w-[342.526px]">
							<DrawIn
								src="/hero/underline.svg"
								delay={0.1}
								className="absolute inset-[-23%_-0.88%]"
							/>
						</div>
					</div>
				</FullBleedScale>
			</div>
		</section>
	);
}

export default function Hero() {
	return (
		<>
			<HeroDraw />
			<Regal />
		</>
	);
}
