import TopBarLayout from "@/composables/TopBar/TopBarLayout";
import TopBarNavigationButtons from "@/composables/TopBar/TopBarNavigationButtons";
import TopBarShowSearch from "@/composables/TopBar/TopBarShowSearch";
import TopBarUserProfile from "@/composables/TopBar/TopBarUserProfile";
import { Suspense } from "react";

function TopBar() {
	// async function saveUserIdAction() {
	// 	"use server";

	// 	if (!userProfile) return;
	// 	if (cookies().get("userId")?.value === userProfile.id) return;

	// 	console.log("Saving user id");
	// 	cookies().set("userId", "123");
	// }

	// if (userProfile && !cookies().get("userId")) {
	// 	saveUserIdAction();
	// }

	// console.log(cookies().get("userId")?.value);

	return (
		<TopBarLayout>
			<TopBarNavigationButtons />

			<TopBarShowSearch />
			<Suspense fallback={<div>Loading...</div>}>
				<TopBarUserProfile />
			</Suspense>
		</TopBarLayout>
	);
}
export default TopBar;
