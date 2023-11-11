import CreateSidebarPromptSection from "@/components/Sidebar/CreatePlaylistPromptSection";
import { getUserPlaylists, getUserProfile } from "@/services/spotify";
import Image from "next/image";
import Link from "next/link";
import BusinessInformationandLanguagePreferences from "./BusinessInformationandLanguagePreferences";

async function SidebarPlaylistsSection() {
	const userProfile: UserProfile = await getUserProfile();
	const userPlaylists: UserPlaylists = (await getUserPlaylists(
		userProfile.id,
	)) as UserPlaylists;

	if (!userPlaylists) {
		throw new Error("User playlists not found");
	}

	return (
		<>
			{userPlaylists.error || userPlaylists.items.length === 0 ? (
				<>
					<div className="flex flex-col gap-2 px-2 pb-2 grow overflow-hidden overflow-y-auto">
						<CreateSidebarPromptSection
							title="Create your first playlist"
							subtitle="It's easy — we'll help you"
							buttonText="Create playlist"
						/>

						<CreateSidebarPromptSection
							title="Let's find some podcasts to follow"
							subtitle="We'll keep you updated on new episodes"
							buttonText="Browse podcasts"
						/>
					</div>
					<BusinessInformationandLanguagePreferences />
				</>
			) : (
				<div className="h-full overflow-hidden relative overflow-y-auto p-2 transparent-scrollbar">
					{userPlaylists.items.map((playlist) => (
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
					))}
				</div>
			)}
		</>
	);
}
export default SidebarPlaylistsSection;
