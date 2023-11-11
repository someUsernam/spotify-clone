"use client";

import { getSearchAction } from "@/actions";
import { useCallback, useEffect, useRef, useState } from "react";
import CardAlbum from "../Card/CardAlbum";

const MAX_ITEMS_PER_PAGE = 20;

type InfiniteScrollProps<T> = {
	children?: React.ReactNode;
	initialData: Album[];
	query: string;
	type: string;
};

const observerOptions = {
	threshold: 0.5,
};

const observerCallback = (fn: () => Promise<void> | void) => {
	return new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			fn();
		}
	}, observerOptions);
};

function InfiniteScroll<T>({
	children,
	initialData,
	query,
	type,
}: InfiniteScrollProps<T>) {
	const [data, setData] = useState(() => initialData);
	const observerListRef = useRef(null);
	const observerRef = useRef<IntersectionObserver>();
	const observerRef2 = useRef<IntersectionObserver>();
	const observerSentinelRef = useRef(null);
	// const [responseBuffer, setResponseBuffer] = useState<Album[][]>([]);
	const responseBuffer = useRef<Album[][]>([]);
	const fetching = useRef(false);
	const indexStore = useRef<string[]>([]);

	const loadMore = useCallback(async () => {
		if (!observerRef.current) return;
		if (!fetching.current) {
			try {
				fetching.current = true;
				const offset = data.length + MAX_ITEMS_PER_PAGE;

				const response = await getSearchAction({
					query,
					type,
					offset: String(offset),
				});

				// setResponseBuffer((responseBuffer) => [
				// 	...responseBuffer,
				// 	response.albums.items,
				// ]);
				responseBuffer.current.push(response.albums.items);
				console.log(data, "data");
				console.log(responseBuffer.current[0], "responseBuffer");
				console.log(responseBuffer.current, "responseBuffer Current");
			} finally {
				fetching.current = false;
			}
		}
	}, [query, type, data]);

	const mergeData = useCallback(() => {
		if (
			// Array.isArray(responseBuffer) &&
			// Array.isArray(responseBuffer[0])
			Array.isArray(responseBuffer.current) &&
			Array.isArray(responseBuffer.current[0])
		) {
			// setData((data) => [...data, ...responseBuffer[0]]);
			// setResponseBuffer((responseBuffer) => responseBuffer.slice(1));
			setData((data) => [...data, ...responseBuffer.current[0]]);
			responseBuffer.current.shift();
		}
	}, []);

	useEffect(() => {
		observerRef.current = observerCallback(mergeData);
		observerRef2.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				if (!(entries[0].target instanceof HTMLDivElement)) return;
				const currIndex = entries[0].target.dataset.index as string;
				if (indexStore.current.includes(currIndex)) return;
				loadMore();
				indexStore.current.push(currIndex);
			}
		}, observerOptions);

		if (observerSentinelRef.current) {
			observerRef2.current.observe(observerSentinelRef.current);
		}

		if (observerListRef.current) {
			observerRef.current.observe(observerListRef.current);
		}

		return () => {
			observerRef.current?.disconnect();
			observerRef2.current?.disconnect();
			if (observerSentinelRef.current) {
				observerRef2.current?.unobserve(observerSentinelRef.current);
			}
			if (observerListRef.current) {
				observerRef.current?.unobserve(observerListRef.current);
			}
		};
	}, [loadMore, mergeData]);

	// 20

	return (
		<>
			{data.map((album, index) => (
				<>
					{index === data.length - MAX_ITEMS_PER_PAGE ? (
						<div
							className="absolute bg-red-600 w-4 aspect-square z-10 "
							style={{ bottom: "120vh" }}
							data-index={index}
							ref={observerSentinelRef}
						>
							{index}
						</div>
					) : null}
					<CardAlbum album={album} />
				</>
			))}
			<div ref={observerListRef} />
		</>
	);
}

export default InfiniteScroll;

// export function Items({initialData, query , type }){
// 	const [data, setData] = useState(() => initialData);
// 	const fetching = useRef(false);

// 	const loadMore = useCallback(async () => {
// 		// if (!observerRef.current) return;
// 		if (!fetching.current) {
// 			try {
// 				fetching.current = true;
// 				const offset = data.length + MAX_ITEMS_PER_PAGE;

// 				const response = await getSearchAction({
// 					query,
// 					type,
// 					offset: String(offset),
// 				});

// 				responseBuffer.current?.push(response.albums.items);
// 				console.log(data, "data");
// 				console.log(responseBuffer.current[0], "responseBuffer");
// 				console.log(responseBuffer.current, "responseBuffer Current");
// 				// (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] 'data'
// 				// (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] 'responseBuffer'
// 				// [Array(20)]'responseBuffer Current'
// 			} finally {
// 				fetching.current = false;
// 			}
// 		}
// 	}, [query, type, data]);
// }

// infinite scroll API
// InfiniteScroll
// props: hasMore pageStart loadMore loader element children
