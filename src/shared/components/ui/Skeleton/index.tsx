import { ComponentProps } from "react";

const base = "animate-pulse ";

const variants = {
	"text-xs": "",
	"text-sm": "",
	text: `${base} bg-neutral-700 w-[10ch] h-5 rounded-full`,
	"text-lg": `${base} bg-neutral-700 w-[15ch] h-6 rounded-full`,
	"text-xl": `${base} bg-neutral-600 w-[85%] h-6 rounded-full`,
	"square-sm": `${base} w-12 h-12 rounded-sm dark:bg-neutral-700 aspect-square`,
	square: `${base} bg-neutral-600 w-20 rounded-sm aspect-square`,
	"square-lg": `${base} bg-neutral-700 w-full rounded-sm aspect-square`,
	circle: `${base} bg-neutral-600 rounded-full`,
	"header-sm": `${base} bg-neutral-700 w-1/5 h-5 rounded-full `,
	header: `${base} w-2/5 rounded-full h-14 dark:bg-neutral-700`,
	badge: "",
	"badge-lg": "",
};

interface SkeletonProps extends ComponentProps<"div"> {
	variant?: keyof typeof variants;
}

function Skeleton({ variant = "text", className }: SkeletonProps) {
	return (
		<div
			data-variant={variant}
			className={`${variants[variant]} ${className}`}
		/>
	);
}
export { Skeleton };
