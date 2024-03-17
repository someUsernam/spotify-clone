"use client";

import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useLoadMore } from "@/shared/hooks/useLoadMore";
import { CardAlbum } from "@ui/Card/CardAlbum";
import { CardArtist } from "@ui/Card/CardArtist";
import { CardEpisode } from "@ui/Card/CardEpisode";
import { CardPlaylist } from "@ui/Card/CardPlaylist";
import { CardShow } from "@ui/Card/CardShow";
import { CardTrack } from "@ui/Card/CardTrack";
import { Suspense } from "react";

type InfiniteScrollProps<T> = {
	initData: T[];
	type: string;
};

function InfiniteScroll<
	T extends Album | Artist | Episode | Show | Playlist<PlaylistTrack> | Track,
>({ initData, type }: InfiniteScrollProps<T>) {
	const { data, loadMore } = useLoadMore(initData, type);
	const { setBottomOfListRef } = useInfiniteScroll(loadMore);

	return (
		<>
			<Suspense fallback={<p>loading...</p>}>
				{data.map((item, index) => {
					if (type === "album") {
						return <CardAlbum item={item as Album} key={item.id} />;
					}
					if (type === "artist") {
						return <CardArtist item={item as Artist} key={item.id} />;
					}
					if (type === "episode") {
						return <CardEpisode item={item as Episode} key={item.id} />;
					}
					if (type === "playlist") {
						return (
							<CardPlaylist
								item={item as Playlist<PlaylistTrack>}
								key={item.id}
							/>
						);
					}
					if (type === "show") {
						return <CardShow item={item as Show} key={item.id} />;
					}
					if (type === "track") {
						return (
							<CardTrack item={item as Track} index={index} key={item.id} />
						);
					}
				})}
				<div ref={setBottomOfListRef} className="w-full h-[50%] " />
			</Suspense>
		</>
	);
}
export default InfiniteScroll;
