import { SIdebarUserPlaylistItem } from "./SIdebarUserPlaylistItem";

type SideabrUserPlaylistsProps = {
	userPlaylists: PagingObject<SimplifiedPlaylist>;
};

function SidebarUserPlaylists({ userPlaylists }: SideabrUserPlaylistsProps) {
	return (
		<div className="h-full overflow-hidden relative overflow-y-auto p-2 transparent-scrollbar">
			{userPlaylists.items.map((playlist) => (
				<SIdebarUserPlaylistItem key={playlist.id} playlist={playlist} />
			))}
		</div>
	);
}
export { SidebarUserPlaylists };
