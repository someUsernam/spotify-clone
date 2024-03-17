import {
	getTopArtists,
	getTopTracks,
	getUserSavedTracks,
} from "@/shared/services/spotify";
import { getGreeting } from "@/shared/utils/getGreeting";
import { onError } from "@/shared/utils/onError";
import { Section } from "@blocks/Section";
import { Card } from "@ui/Card";
import { Metadata } from "next";

function metadata(): Metadata {
	return {
		title: "Spotify - Web Player: Music for everyone",
		description:
			"Spotify is a digital music service that gives you access to millions of songs.",
	};
}

const greeting = getGreeting();

export default async function Home() {
	const [topTracks, topArtists, userSavedTracks] = await Promise.all([
		getTopTracks(),
		getTopArtists(),
		getUserSavedTracks(),
	]);

	// console.log(topTracks);
	// console.log(topArtists);
	// console.log(userSavedTracks);

	onError(topTracks);

	return (
		<>
			<h1>{`Good ${greeting}`}</h1>
			{!topTracks.error && (
				<Section title="Spotify playlists" href="/collection/playlists">
					{topTracks.items.map((track) => (
						<Card href={`/album/${track.album.id}`} key={track.album.id}>
							<Card.Img
								src={track.album.images[1].url}
								alt={`${track.album.name} ${track.album.type}`}
							/>
							<Card.Div>
								<Card.Title>{track.name}</Card.Title>
								<Card.Description>Album</Card.Description>
							</Card.Div>
						</Card>
					))}
				</Section>
			)}
			{!topArtists.error && (
				<Section title="Spotify playlists" href="/collection/playlists">
					{topArtists.items.map((artist) => (
						<Card href={`/album/${artist.id}`} key={artist.id}>
							<Card.Img src={artist.images[1].url} alt={`${artist.name}`} />
							<Card.Div>
								<Card.Title>{artist.name}</Card.Title>
								<Card.Description>Artist</Card.Description>
							</Card.Div>
						</Card>
					))}
				</Section>
			)}
			{!userSavedTracks.error && (
				<Section title="Spotify playlists" href="/collection/playlists">
					{userSavedTracks.items.map((userTrack) => (
						<Card
							href={`/album/${userTrack.track.album.id}`}
							key={userTrack.track.album.id}
						>
							<Card.Img
								src={userTrack.track.album.images[1].url}
								alt={`${userTrack.track.album.name} ${userTrack.track.album.type}`}
							/>
							<Card.Div>
								<Card.Title>{userTrack.track.name}</Card.Title>
								<Card.Description>User Track</Card.Description>
							</Card.Div>
						</Card>
					))}
				</Section>
			)}
		</>
	);
}
