"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function Carousel({
	children,
	target,
}: { children: React.ReactNode; target: React.RefObject<HTMLElement> }) {
	const observer = useRef<ResizeObserver>();
	const targetRef = useRef<ElementRef<"div"> | null>(null);
	const [showChips, setShowChips] = useState(false);
	const [showChips, setShowChips] = useState(false);

	useEffect(() => {
		const handleResize = (entries: ResizeObserverEntry[]) => {
			const entry = entries[0];
			const target = entry.target as HTMLElement;
			const parent = target.parentElement as HTMLElement;

			if (parent.clientWidth < target.clientWidth) {
				setShowChips(true);
			} else {
				setShowChips(false);
			}
		};

		observer.current = new ResizeObserver(handleResize);
		observer.current.observe(targetRef.current as HTMLElement);

		return () => {
			observer.current?.disconnect();
		};
	}, []);

	return (
		<div className="flex items-center" ref={targetRef}>
			{showChips && (
				<button
					type="button"
					className="inline-flex items-center justify-center dark:bg-main opacity-60 dark:text-primary size-8 border-full rounded-full absolute left-0"
					aria-label="Go Back"
				>
					<GoChevronLeft size={25} />
				</button>
			)}
			{children}
			{showChips && (
				<button
					type="button"
					className="inline-flex items-center justify-center dark:bg-main opacity-60 dark:text-primary size-8 border-full rounded-full absolute right-0"
					aria-label="Go Forward"
				>
					<GoChevronRight size={25} />
				</button>
			)}
		</div>
	);
}

export default Carousel;
