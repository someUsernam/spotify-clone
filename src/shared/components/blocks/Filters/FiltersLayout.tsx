"use client";

import { useCarousel } from "@/shared/hooks/useCarousel";
import { cn } from "@/shared/utils/cn";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function FiltersLayout({ children }: ChildrenProps) {
	const {
		targetParent,
		targetChild,
		showLeftButton,
		showRightButton,
		handleMoveLeft,
		handleMoveRight,
	} = useCarousel();

	if (!targetParent || !targetChild) return null;

	return (
		<div
			ref={targetParent}
			className="sticky top-16 h-12 py-2 flex items-center mb-8 text-sm z-10 dark:bg-secondary overflow-hidden whitespace-nowrap select-none "
		>
			{showLeftButton && (
				<button
					type="button"
					className="inline-flex items-center justify-center dark:bg-elevated-secondary dark:text-primary size-8 border-full rounded-full absolute left-0 z-10"
					aria-label="Go Forward"
					onClick={handleMoveLeft}
				>
					<GoChevronLeft size={25} />
				</button>
			)}
			<div
				ref={targetChild}
				className={cn("flex gap-2 transition-transform ease-out duration-300", {
					"mx-9": showLeftButton && showRightButton,
				})}
			>
				{children}
			</div>
			{showRightButton && (
				<button
					type="button"
					className="inline-flex items-center justify-center dark:bg-elevated-secondary dark:text-primary size-8 border-full rounded-full absolute right-0 z-10"
					aria-label="Go Forward"
					onClick={handleMoveRight}
				>
					<GoChevronRight size={25} />
				</button>
			)}
		</div>
	);
}
export { FiltersLayout };
