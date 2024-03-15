"use client";

import { useEffect, useRef, useState } from "react";

function useCarousel() {
	const targetParent = useRef<HTMLDivElement | null>(null);
	const targetChild = useRef<HTMLDivElement | null>(null);
	const observer = useRef<ResizeObserver>();
	const [showButtons, setShowButtons] = useState(false);
	const [transformX, setTransformX] = useState(0);

	useEffect(() => {
		observer.current = new ResizeObserver((entries) => {
			if (!targetChild.current) return;

			const entry = entries[0];
			const targetWidth = targetChild.current.clientWidth;
			const parentWidth = entry.contentRect.width;
			const shouldShowChips = targetWidth > parentWidth;

			if (shouldShowChips !== showButtons) {
				setShowButtons(shouldShowChips);
			}
			if (shouldShowChips) {
				// if (targetWidth - parentWidth > (targetWidth * 2) / 3) {
				// 	setTransformX((targetWidth - parentWidth) / 2);
				// } else {
				// }
				setTransformX(targetWidth - parentWidth);
			}
			if (!shouldShowChips && targetChild.current) {
				targetChild.current.style.transform = "translate(0px)";
			}
		});

		if (targetParent.current) {
			observer.current.observe(targetParent.current);
		}

		return () => {
			if (targetParent.current) {
				observer.current?.unobserve(targetParent.current);
			}
			observer.current?.disconnect();
		};
	}, [showButtons]);

	function handleMoveLeft() {
		if (targetChild.current) {
			targetChild.current.style.transform = `translate(${0}px)`;
		}
	}

	function handleMoveRight() {
		if (targetChild.current) {
			targetChild.current.style.transform = `translate(-${transformX}px)`;
		}
	}

	return {
		targetParent,
		targetChild,
		showButtons,
		handleMoveLeft,
		handleMoveRight,
	};
}

export { useCarousel };
