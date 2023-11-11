import Card from "@/components/Card/Card";
import CardAlbum from "@/components/Card/CardAlbum";
import CardArtist from "@/components/Card/CardArtist";
import CardEpisode from "@/components/Card/CardEpisode";
import CardPlaylist from "@/components/Card/CardPlaylist";
import CardShow from "@/components/Card/CardShow";
import Section from "@/components/Main/Section";
import PlaylistItem from "@/components/Playlist/PlaylistItem";
import { getSearch } from "@/services/spotify";
import { onError } from "@/utils/onError";
import { Metadata } from "next";

export async function generateMetadata({
	params: { query },
}: QueryProps): Promise<Metadata> {
	return {
		title: `Search results for "${query}"`,
	};
}

async function Page({ params: { query } }: QueryProps) {
	const searchResults: SearchType = await getSearch({ query });

	onError(searchResults);

	const { tracks, artists, albums, playlists, shows, episodes } = searchResults;

	return (
		<>
			<section className="flex gap-x-6 items-center">
				{artists && (
					<div className="w-full">
						<h2 className="text-2xl font-bold dark:text-primary">Top result</h2>
						<Card href={`/artist/${artists.items[0].id}`} variant="rounded-xl">
							<Card.Img
								src={artists.items[0].images[0].url}
								alt={`${artists.items[0].name} ${artists.items[0].type}`}
							/>
							<Card.Div>
								<Card.Title>{artists.items[0].name}</Card.Title>
								<Card.Description>{artists.items[0].type}</Card.Description>
							</Card.Div>
						</Card>
					</div>
				)}
				{tracks && (
					<div>
						<h2 className="grow text-2xl font-bold dark:text-primary">Songs</h2>
						<div className="h-56 overflow-hidden grow">
							{tracks.items.map((track, i) => (
								<PlaylistItem key={track.id}>
									<PlaylistItem.Index>{i + 1}</PlaylistItem.Index>
									<PlaylistItem.Title
										imageSrc={track.album.images[0].url}
										imageAlt={track.name}
										href={track.id}
										artistsItems={track.artists}
									>
										{track.name}
									</PlaylistItem.Title>
									<PlaylistItem.Duration>
										{track.duration_ms}
									</PlaylistItem.Duration>
								</PlaylistItem>
							))}
						</div>
					</div>
				)}
			</section>
			{/* {tracks && (
				<Section title="Songs">
					{tracks.items.map((track) => (
						<Card
							description={track.type}
							href={`/track/${track.id}`}
							imageAlt={`${track.name} ${track.type}`}
							imageSrc={track.album.images[0].url}
							key={track.id}
							title={track.name}
						/>
					))}
				</Section>
			)} */}
			{artists && (
				<Section title="Artists">
					{artists.items.map((artist) => (
						<CardArtist item={artist} key={artist.id} />
					))}
				</Section>
			)}
			{albums && (
				<Section title="Albums">
					{albums.items.map((album) => (
						<CardAlbum item={album} key={album.id} />
					))}
				</Section>
			)}
			{playlists && (
				<Section title="Playlists">
					{playlists.items.map((playlist) => (
						<CardPlaylist item={playlist} key={playlist.id} />
					))}
				</Section>
			)}
			{shows && (
				<Section title="Podcasts">
					{shows.items.map((show) => (
						<CardShow item={show} key={show.id} />
					))}
				</Section>
			)}
			{episodes && (
				<Section title="Episodes">
					{episodes.items.map((episode) => (
						<CardEpisode item={episode} key={episode.id} />
					))}
				</Section>
			)}
		</>
	);
}

export default Page;
