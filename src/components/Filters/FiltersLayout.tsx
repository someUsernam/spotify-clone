"use client";

import { useCarousel } from "@/hooks/useCarousel";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function FiltersLayout({ children }: ChildrenProps) {
	const {
		targetParent,
		targetChild,
		showButtons,
		handleMoveLeft,
		handleMoveRight,
	} = useCarousel();

	return (
		<div
			ref={targetParent}
			className="sticky top-16 h-12 py-2 flex items-center mb-8 text-sm z-10 dark:bg-secondary overflow-hidden whitespace-nowrap select-none "
		>
			{showButtons && (
				<button
					type="button"
					className="inline-flex items-center justify-center dark:bg-primary/[0.08] dark:text-primary h-8 aspect-square border-full rounded-full absolute left-0 z-10 "
					aria-label="Go Forward"
					onClick={handleMoveLeft}
				>
					<GoChevronLeft size={25} />
				</button>
			)}
			<div
				ref={targetChild}
				className="flex gap-2 transition-transform ease-out duration-300"
			>
				{children}
			</div>
			{showButtons && (
				<button
					type="button"
					className="inline-flex items-center justify-center dark:bg-primary/[0.08] dark:text-primary h-8 aspect-square border-full rounded-full absolute right-0 z-10"
					aria-label="Go Forward"
					onClick={handleMoveRight}
				>
					<GoChevronRight size={25} />
				</button>
			)}
		</div>
	);
}
export default FiltersLayout;
