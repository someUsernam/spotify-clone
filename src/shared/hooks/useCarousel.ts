"use client";

import { ElementRef, useCallback, useEffect, useRef, useState } from "react";

const GAP_BEETWEEN_BUTTONS = 36;
const TOTAL_GAP_BETWEEN_BUTTONS = GAP_BEETWEEN_BUTTONS * 2;

function calculateTransformations(
	containerWidth: number,
	currentWidth: number,
) {
	return Math.ceil(containerWidth / currentWidth);
}

function calculateStep(containerWidth: number, currentWidth: number) {
	return (
		(containerWidth - currentWidth) /
		calculateTransformations(containerWidth, currentWidth)
	);
}

function calculateShift(
	transformX: number,
	step: number,
	direction: "left" | "right",
) {
	if (direction === "left") {
		return transformX - step;
	}

	return transformX + step;
}

export function useCarousel() {
	const targetParent = useRef<ElementRef<"div"> | null>(null);
	const targetChild = useRef<ElementRef<"div"> | null>(null);
	const observer = useRef<ResizeObserver>();
	const transformX = useRef(0);
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(false);

	const handleResize = useCallback(
		(entries: ResizeObserverEntry[]) => {
			if (!targetChild.current) return;

			const entry = entries[0];
			const containerWidth = targetChild.current.clientWidth;
			const currentWidth = entry.contentRect.width - TOTAL_GAP_BETWEEN_BUTTONS;
			const shouldShowChips = containerWidth > currentWidth;

			if (
				shouldShowChips !== showLeftButton ||
				shouldShowChips !== showRightButton
			) {
				setShowLeftButton(shouldShowChips);
				setShowRightButton(shouldShowChips);
			}

			if (!shouldShowChips && targetChild.current) {
				targetChild.current.style.transform = "translate(0px)";
			}
		},
		[showLeftButton, showRightButton],
	);

	useEffect(() => {
		if (!targetChild.current || !targetParent.current) return;

		observer.current = new ResizeObserver(handleResize);
		if (targetParent.current) {
			observer.current.observe(targetParent.current);
		}

		return () => {
			if (targetParent.current) {
				observer.current?.unobserve(targetParent.current);
			}
			observer.current?.disconnect();
		};
	}, [handleResize]);

	const handleMoveLeft = useCallback(() => {
		if (!targetChild.current || !targetParent.current) return;

		const containerWidth = targetChild.current.clientWidth;
		const currentWidth =
			targetParent.current.clientWidth - TOTAL_GAP_BETWEEN_BUTTONS;

		const step = calculateStep(containerWidth, currentWidth);
		const shift = calculateShift(transformX.current, step, "left");

		// TODO: fix this case
		if (shift > -(containerWidth - currentWidth)) {
			transformX.current = 0;
			targetChild.current.style.transform = `translate(-${transformX.current}px)`;
		}

		transformX.current = Math.max(shift, -(containerWidth - currentWidth));
		targetChild.current.style.transform = `translate(-${transformX.current}px)`;
	}, []);

	const handleMoveRight = useCallback(() => {
		if (!targetChild.current || !targetParent.current) return;

		const containerWidth = targetChild.current.clientWidth;
		const currentWidth =
			targetParent.current.clientWidth - TOTAL_GAP_BETWEEN_BUTTONS;

		const step = calculateStep(containerWidth, currentWidth);
		const shift = calculateShift(transformX.current, step, "right");

		if (shift > containerWidth - currentWidth) {
			transformX.current = containerWidth - currentWidth;
			targetChild.current.style.transform = `translate(-${transformX.current}px)`;
		}

		transformX.current = Math.min(shift, containerWidth - currentWidth);
		targetChild.current.style.transform = `translate(-${transformX.current}px)`;
	}, []);

	return {
		targetParent,
		targetChild,
		showLeftButton,
		showRightButton,
		handleMoveLeft,
		handleMoveRight,
	};
}
