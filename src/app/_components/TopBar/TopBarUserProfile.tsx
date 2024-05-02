import { getCurrentUserProfile } from "@/shared/services/spotify";
import TopBarLoginButtons from "./TopBarLoginButtons";

import { hasError } from "@/shared/utils/hasError";
import NotificationAndAvatarButtons from "./NotificationAndAvatarButtons";

async function TopBarUserProfile() {
	const userProfile = await getCurrentUserProfile();

	if (hasError(userProfile)) {
		return <TopBarLoginButtons />;
	}

	return <NotificationAndAvatarButtons user={userProfile} />;
}
export { TopBarUserProfile };
