import { ComponentProps } from "react";

const variants = {
	"text-xs": "",
	"text-sm": "",
	text: "bg-neutral-700 w-[10ch] h-5 rounded-full animate-pulse",
	"text-lg": "bg-neutral-700 w-[15ch] h-6 rounded-full animate-pulse",
	"text-xl": "bg-neutral-600 w-[85%] h-6 rounded-full animate-pulse",
	"square-sm": "w-12 h-12 rounded-sm dark:bg-neutral-700 aspect-square",
	square: "bg-neutral-600 w-20 animate-pulse rounded-sm aspect-square",
	"square-lg": "bg-neutral-700 w-full animate-pulse rounded-sm aspect-square",
	"header-sm": "bg-neutral-700 w-1/5 h-5 rounded-full animate-pulse",
	header: "w-2/5 rounded-full h-14 animate-pulse dark:bg-neutral-700",
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
export default Skeleton;
