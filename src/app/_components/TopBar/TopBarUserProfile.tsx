import { getUserProfile } from "@/shared/services/spotify";
import { onError } from "@/shared/utils/onError";
import { Avatar } from "@ui/Avatar";
import TopBarLoginButtons from "./TopBarLoginButtons";

import { SlBell } from "react-icons/sl";

async function TopBarUserProfile() {
	const userProfile = await getUserProfile();

	if (userProfile.images === undefined) {
		return null;
	}

	onError(userProfile);

	const { images, display_name } = userProfile;

	return (
		<>
			{!userProfile.error ? (
				<div className=" flex gap-x-2 whitespace-nowrap">
					<button
						type="button"
						className="flex justify-center items-center w-8 aspect-square bg-secondary rounded-full touch-manipulation"
					>
						<SlBell size={18} />
					</button>
					<button
						type="button"
						className="flex justify-center items-center w-8 aspect-square bg-secondary rounded-full touch-manipulation overflow-hidden object-cover"
					>
						<Avatar image={images[0].url} name={display_name} size={24} />
					</button>
				</div>
			) : (
				<TopBarLoginButtons />
			)}
		</>
	);
}
export { TopBarUserProfile };
