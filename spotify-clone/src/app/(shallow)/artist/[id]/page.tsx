import Header from "@/components/Main/Header";
import Section from "@/components/Main/Section";
import PlaylistPlayer from "@/components/Playlist/PlaylistPlayer";
import { getArtist } from "@/services/spotify";
import { RiVerifiedBadgeFill } from "react-icons/ri";

type ArtistProps = {
	params: {
		id: string;
	};
};

async function Page({ params: { id } }: ArtistProps) {
	const artist = await getArtist(id);

	if (!artist) {
		throw new Error("Artist not found");
	}

	const isVerified = artist.followers.total > 250 ? true : false;

	return (
		<>
			<Header variant="withoutImg">
				<Header.Tagline>
					<RiVerifiedBadgeFill className="fill-blue-400" size={28} />
					{isVerified ? "verified artist" : "artist"}
				</Header.Tagline>
				<Header.Title>{artist.name}</Header.Title>
				<Header.Subtitle>
					{artist.followers.total.toLocaleString()} monthly listeners
				</Header.Subtitle>
			</Header>
			<PlaylistPlayer />
			<div className="flex">
				<Section title="Popular">f</Section>
				<Section title="Artist pick">fsdf</Section>
			</div>
		</>
	);
}
export default Page;
