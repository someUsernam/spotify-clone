import PlaylistHeader from "@/components/Playlist/PlaylistHeader";
import PlaylistItem from "@/components/Playlist/PlaylistItem";
import PlaylistLayout from "@/components/Playlist/PlaylistLayout";
import PlaylistPlayer from "@/components/Playlist/PlaylistPlayer";
import { getPlaylist } from "@/services/spotify";
import { onError } from "@/utils/onError";

type PlaylistParams = {
	params: {
		id: string;
	};
};

async function Page({ params: { id } }: PlaylistParams) {
	const playlist: Playlists = (await getPlaylist(id)) as Playlists;

	onError(playlist);

	return (
		<>
			<PlaylistHeader playlist={playlist} />
			<PlaylistPlayer />
			<PlaylistLayout>
				{playlist.tracks.items.map((item, i) => (
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
				))}
			</PlaylistLayout>
		</>
	);
}

export default Page;
