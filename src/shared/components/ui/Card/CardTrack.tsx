import PlaylistItem from "@ui/Playlist/PlaylistItem";

function CardTrack({ item, index }: { item: Track; index: number }) {
	return (
		<PlaylistItem>
			<PlaylistItem.Index>{index + 1}</PlaylistItem.Index>
			<PlaylistItem.Title
				imageSrc={item.album.images[0].url}
				imageAlt={item.name}
				href={item.id}
				artistsItems={item.artists}
			>
				{item.name}
			</PlaylistItem.Title>
			<PlaylistItem.Album href={item.album.id}>
				{item.album.name}
			</PlaylistItem.Album>
			<PlaylistItem.Duration>{item.duration_ms}</PlaylistItem.Duration>
		</PlaylistItem>
	);
}
export { CardTrack };
