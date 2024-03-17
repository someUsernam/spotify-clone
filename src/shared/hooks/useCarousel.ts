"use client";

import { ElementRef, useEffect, useRef, useState } from "react";

const GAP_BEETWEEN_BUTTONS = 36;
const TOTLAL_GAP_BETWEEN_BUTTONS = GAP_BEETWEEN_BUTTONS * 2;

export function useCarousel() {
	const targetParent = useRef<ElementRef<"div"> | null>(null);
	const targetChild = useRef<ElementRef<"div"> | null>(null);
	const observer = useRef<ResizeObserver>();
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(false);
	const [transformRight, setTransformRight] = useState(0);
	const [transformLeft, setTransformLeft] = useState(0);

	useEffect(() => {
		if (!targetChild.current || !targetParent.current) return;

		const handleResize = (entries: ResizeObserverEntry[]) => {
			if (!targetChild.current) return;

			const entry = entries[0];
			const containerWidth = targetChild.current.clientWidth;
			const currentWidth = entry.contentRect.width - TOTLAL_GAP_BETWEEN_BUTTONS;
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
		};

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
	}, [showLeftButton, showRightButton]);

	function handleMoveLeft() {
		if (!targetChild.current || !targetParent.current) return;

		const containerWidth = targetChild.current.clientWidth;
		const currentWidth =
			targetParent.current.clientWidth - TOTLAL_GAP_BETWEEN_BUTTONS;

		const transformations = Math.ceil(containerWidth / currentWidth);
		const step = (containerWidth - currentWidth) / transformations;

		setTransformLeft((prev) => {
			if (Math.abs(prev) + step > containerWidth - currentWidth) {
				return -(containerWidth - currentWidth);
			}

			return Math.max(
				-(containerWidth - currentWidth - (Math.abs(prev) + step)),
				-(containerWidth - currentWidth),
			);
		});

		targetChild.current.style.transform = `translate(${transformLeft}px)`;
	}

	function handleMoveRight() {
		if (!targetChild.current || !targetParent.current) return;

		const containerWidth = targetChild.current.clientWidth;
		const currentWidth =
			targetParent.current.clientWidth - TOTLAL_GAP_BETWEEN_BUTTONS;

		const transformations = Math.ceil(containerWidth / currentWidth);
		const step = (containerWidth - currentWidth) / transformations;

		setTransformRight((prev) => {
			if (prev + step > containerWidth - currentWidth) {
				return 0;
			}
			return Math.min(prev + step, containerWidth - currentWidth);
		});

		targetChild.current.style.transform = `translate(-${transformRight}px)`;
	}

	return {
		targetParent,
		targetChild,
		showLeftButton,
		showRightButton,
		handleMoveLeft,
		handleMoveRight,
	};
}
