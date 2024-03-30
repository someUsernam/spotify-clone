import {
	getCurrentUserProfile,
	getUserPlaylists,
} from "@/shared/services/spotify";

import { hasError } from "@/shared/utils/hasError";
import { onError } from "@/shared/utils/onError";
import { SidebarPromptsAndPreferences } from "./modules/components/SidebarPromptsAndPreferences";
import { SidebarUserPlaylists } from "./modules/components/SidebarUserPlaylists";

async function SidebarPlaylistsSection() {
	const userProfile = await getCurrentUserProfile();

	onError(userProfile, "User profile not found");

	const userPlaylists = await getUserPlaylists(userProfile.id);

	if (hasError(userPlaylists)) {
		return <SidebarPromptsAndPreferences />;
	}

	return <SidebarUserPlaylists userPlaylists={userPlaylists} />;
}

export { SidebarPlaylistsSection };
