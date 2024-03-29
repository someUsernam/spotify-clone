import { getPlaylist } from "@shared/services/spotify";
import { onError } from "@shared/utils/onError";
import PlaylistHeader from "@ui/Playlist/PlaylistHeader";
import PlaylistItem from "@ui/Playlist/PlaylistItem";
import PlaylistLayout from "@ui/Playlist/PlaylistLayout";
import PlaylistPlayer from "@ui/Playlist/PlaylistPlayer";

type PlaylistParams = {
	params: {
		id: string;
	};
};

async function Page({ params: { id } }: PlaylistParams) {
	const playlist = await getPlaylist(id);

	onError(playlist);

	return (
		<>
			<PlaylistHeader playlist={playlist} />
			<PlaylistPlayer />
			<PlaylistLayout>
				{playlist.tracks.items.map(
					(item, i) =>
						item.track.type === "track" && (
							<PlaylistItem key={item.track.id}>
								<PlaylistItem.Index>{i + 1}</PlaylistItem.Index>
								<PlaylistItem.Title
									artistsItems={item.track.artists}
									imageAlt={item.track.name}
									href={item.track.id}
									imageSrc={item.track.album.images[0].url}
								>
									{item.track.name}
								</PlaylistItem.Title>
								<PlaylistItem.Album href={item.track.album.id}>
									{item.track.album.name}
								</PlaylistItem.Album>
								<PlaylistItem.DateAdded>{item.added_at}</PlaylistItem.DateAdded>
								<PlaylistItem.Duration>
									{item.track.duration_ms}
								</PlaylistItem.Duration>
							</PlaylistItem>
						),
				)}
			</PlaylistLayout>
		</>
	);
}

export default Page;
