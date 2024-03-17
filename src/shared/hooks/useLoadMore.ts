"use client";

import { getSearchAction } from "@utils/actions";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

const MAX_ITEMS_PER_PAGE = 30;

function useLoadMore<T>(initData: T[], type: string) {
	const [data, setData] = useState<T[]>(() => initData);
	const fetching = useRef(false);
	const { query } = useParams() as { query: string };

	async function loadMore() {
		if (!fetching.current) {
			try {
				fetching.current = true;
				const offset = data.length + MAX_ITEMS_PER_PAGE;

				const response = await getSearchAction({
					query,
					type,
					offset: String(offset),
				});

				setData((data) => [...data, ...(response[`${type}s`].items as T[])]);

				// if (type === "artist") {
				// 	setData((data) => [...data, ...(response["artists"].items as T[])]);
				// }
				// if (type === "album") {
				// 	setData((data) => [...data, ...(response.albums.items as T[])]);
				// }
				// if (type === "track") {
				// 	setData((data) => [...data, ...(response.tracks.items as T[])]);
				// }
				// if (type === "playlist") {
				// 	setData((data) => [...data, ...(response.playlists.items as T[])]);
				// }
				// if (type === "show") {
				// 	setData((data) => [...data, ...(response.shows.items as T[])]);
				// }
				// if (type === "episode") {
				// 	setData((data) => [...data, ...(response.episodes.items as T[])]);
				// }
			} catch (error) {
				console.error(error);
			} finally {
				fetching.current = false;
			}
		}
	}

	return { loadMore, data };
}

export { useLoadMore };
