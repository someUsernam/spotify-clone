import { Header } from "@blocks/Header";
import Link from "next/link";

type PlaylistHeaderProps = {
	playlist: Playlists;
};

function PlaylistHeader({ playlist }: PlaylistHeaderProps) {
	return (
		<Header variant="withImg" playlists={playlist}>
			<Header.Img />
			<div>
				<Header.Tagline>Playlist</Header.Tagline>
				<Header.Title>{playlist.name}</Header.Title>
				<Header.Subtitle>
					<Link
						href="#"
						className="font-bold whitespace-nowrap hover:underline hover:underline-offset-1"
					>
						{playlist.owner.display_name}
					</Link>
				</Header.Subtitle>
			</div>
		</Header>
	);
}
export default PlaylistHeader;
