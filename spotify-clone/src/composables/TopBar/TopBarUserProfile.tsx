import Avatar from "@/components/Avatar/Avatar";
import { getUserProfile } from "@/services/spotify";
import { SlBell } from "react-icons/sl";
import TopBarLoginButtons from "./TopBarLoginButtons";
import { onError } from "@/utils/onError";

async function TopBarUserProfile() {
	const userProfile: UserProfiles = await getUserProfile();

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
export default TopBarUserProfile;
