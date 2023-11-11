"use client";

import { useCallback, useEffect, useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function Carousel({
	children,
	target,
}: { children: React.ReactNode; target: React.RefObject<HTMLElement> }) {
	const observer = useRef<ResizeObserver>();
	const targetRef = useRef<HTMLDivElement | null>(null);

	const checkOverflow = useCallback((entries: ResizeObserverEntry[]) => {
		const entry = entries[0];
		const target = entry.target as HTMLElement;
		const parent = target.parentElement as HTMLElement;

		console.log(parent.clientWidth);
		console.log(target.clientWidth);

		if (parent.clientWidth < target.clientWidth) {
		}
	}, []);

	// const setRef = useCallback(
	// 	(node: HTMLElement | null) => {
	// 		if (!node) {
	// 			return;
	// 		}

	// 		// observer.current = new IntersectionObserver((entries) => {
	// 		// 	if (entries[0].isIntersecting) {
	// 		// 		const entry = entries[0].target;

	// 		// 		if ((entry.parentNode as HTMLElement).clientWidth < entry.clientWidth) {
	// 		// 			console.log("is visible");
	// 		// 		}
	// 		// 	}
	// 		// });

	// 		observer.current = new ResizeObserver(checkOverflow);
	// 		observer.current.observe(node);
	// 	},
	// 	[checkOverflow],
	// );

	useEffect(() => {
		observer.current = new ResizeObserver((entries) => {
			const entry = entries[0];
			const target = entry.target as HTMLElement;
			const parent = target.parentElement as HTMLElement;

			console.log(parent.clientWidth);
			console.log(target.clientWidth);

			if (parent.clientWidth < target.clientWidth) {
			}
		});

		if (targetRef.current) {
			observer.current.observe(targetRef.current);
		}

		return () => {
			if (targetRef.current) {
				observer.current?.unobserve(targetRef.current);
			}
			observer.current?.disconnect();
		};
	}, []);

	return (
		<div ref={targetRef} className="flex items-center">
			<button
				type="button"
				className="inline-flex items-center justify-center dark:bg-main opacity-60 dark:text-primary h-8 w-8 border-full rounded-full"
				aria-label="Go Back"
			>
				<GoChevronLeft size={25} />
			</button>

			{children}

			<button
				type="button"
				className="inline-flex items-center justify-center dark:bg-main opacity-60 dark:text-primary h-8 w-8 border-full rounded-full"
				aria-label="Go Forward"
			>
				<GoChevronRight size={25} />
			</button>
		</div>
	);
}

export default Carousel;
