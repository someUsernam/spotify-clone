import { Button } from "@ui/Button";
import { BiPause } from "react-icons/bi";
import { ICON_SIZE } from "../utils/consts";

function PlayerPlayPause() {
	return (
		<Button variant="none" className="bg-primary text-secondary">
			<BiPause size={ICON_SIZE} />
		</Button>
	);
}
export { PlayerPlayPause };
