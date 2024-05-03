import { Skeleton } from "@/shared/components/ui/Skeleton";
import { Suspense } from "react";
import { TopBarLayout } from "./TopBarLayout";
import { TopBarNavigationButtons } from "./TopBarNavigationButtons";
import { TopBarShowSearch } from "./TopBarShowSearch";
import { TopBarUserProfile } from "./TopBarUserProfile";

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
			<Suspense fallback={<Skeleton variant="circle" className="size-7" />}>
				<TopBarUserProfile />
			</Suspense>
		</TopBarLayout>
	);
}
export { TopBar };
