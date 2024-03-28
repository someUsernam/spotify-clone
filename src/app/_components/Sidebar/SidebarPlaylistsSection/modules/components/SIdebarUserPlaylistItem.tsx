import Image from "next/image";
import Link from "next/link";

type SidebarUserPlaylistsProps = {
	playlist: UserPlaylist;
};

function SIdebarUserPlaylistItem({ playlist }: SidebarUserPlaylistsProps) {
	return (
		<Link
			className="flex items-center gap-2 p-2 rounded-sm dark:hover:bg-card-highlight cursor-pointer"
			key={playlist.id}
			href={`/playlist/${playlist.id}`}
		>
			<Image
				src={playlist.images[0].url}
				alt={`${playlist.name} ${playlist.type}`}
				className="rounded-sm w-12 aspect-square object-cover"
				width={48}
				height={48}
			/>
			<p className="text-sm font-semibold hidden @[10rem]:block truncate">
				{playlist.name}
			</p>
		</Link>
	);
}
export { SIdebarUserPlaylistItem };
