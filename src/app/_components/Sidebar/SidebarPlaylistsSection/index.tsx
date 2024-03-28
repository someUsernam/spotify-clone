import { getUserPlaylists, getUserProfile } from "@/shared/services/spotify";

import { LINKS } from "@/shared/utils/constants";
import { redirect } from "next/navigation";
import { SidebarPromptsAndPreferences } from "./modules/components/SidebarPromptsAndPreferences";
import { SidebarUserPlaylists } from "./modules/components/SidebarUserPlaylists";

async function SidebarPlaylistsSection() {
	const userProfile = await getUserProfile();

	if (!userProfile) {
		return redirect(LINKS.login);
	}

	const userPlaylists = await getUserPlaylists(userProfile.id);

	if (!userPlaylists.items || "error" in userPlaylists) {
		return <SidebarPromptsAndPreferences />;
	}

	return <SidebarUserPlaylists userPlaylists={userPlaylists} />;
}

export { SidebarPlaylistsSection };
