import { Avatar } from "@/shared/components/ui/Avatar";
import { getImageUrlBySize } from "@/shared/utils/imageSize";
import { SlBell } from "react-icons/sl";

type NotificationAndAvatarButtonsProps = {
	user: UserDetailedProfile;
};

function NotificationAndAvatarButtons({
	user,
}: NotificationAndAvatarButtonsProps) {
	return (
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
				<Avatar
					image={getImageUrlBySize(user.images, "small")}
					name={user.display_name ?? "username"}
					size={24}
				/>
			</button>
		</div>
	);
}
export default NotificationAndAvatarButtons;
