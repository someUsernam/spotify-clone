import { Button } from "@ui/Button";
import { DEV_URL } from "@utils/constants";

function TopBarLoginButtons() {
	return (
		<div className="flex gap-x-2">
			<Button
				href={`${DEV_URL}/api/login`}
				variant="dark-lg"
				className="h-12 text-subdued hover:text-primary dark:bg-transparent"
			>
				Sign Up
			</Button>

			<Button href={`${DEV_URL}/api/login`} variant="light-lg" className="h-12">
				Log In
			</Button>
		</div>
	);
}
export default TopBarLoginButtons;
