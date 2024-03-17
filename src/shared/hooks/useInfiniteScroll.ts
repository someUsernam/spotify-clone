"use client";

import { useCallback, useEffect, useRef } from "react";

type loadMoreType = () => void;

const observerOptions = {
	threshold: 1.0,
};

function useInfiniteScroll(loadMore: loadMoreType) {
	const bottomOfListRef = useRef<IntersectionObserver>();

	// const setTopOfListRef = useCallback((node: HTMLDivElement | null) => {
	// 	if (!node) {
	// 		return;
	// 	}

	// 	topOfListRef.current?.disconnect();

	// 	topOfListRef.current = observerCallback(isVisibleLog);
	// 	topOfListRef.current.observe(node);
	// }, []);

	const setBottomOfListRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (!node) {
				return;
			}

			bottomOfListRef.current?.unobserve(node);
			bottomOfListRef.current?.disconnect();

			bottomOfListRef.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					loadMore();
				}
			}, observerOptions);

			bottomOfListRef.current.observe(node);
		},
		[loadMore],
	);

	useEffect(() => {
		return () => {
			bottomOfListRef.current?.disconnect();
		};
	}, []);

	return { setBottomOfListRef };
}

export { useInfiniteScroll };
