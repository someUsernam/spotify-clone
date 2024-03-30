import { getCurrentUserProfile } from "@/shared/services/spotify";
import TopBarLoginButtons from "./TopBarLoginButtons";

import { hasError } from "@/shared/utils/hasError";
import NotificationAndAvatarButtons from "./NotificationAndAvatarButtons";

async function TopBarUserProfile() {
	const userProfile = await getCurrentUserProfile();

	if (hasError(userProfile)) {
		return <TopBarLoginButtons />;
	}

	return (
		<NotificationAndAvatarButtons
			image={userProfile.images[0].url}
			name={userProfile.display_name}
		/>
	);
}
export { TopBarUserProfile };
