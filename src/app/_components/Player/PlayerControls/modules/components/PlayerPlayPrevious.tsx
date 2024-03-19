import { Button } from "@/shared/components/ui/Button";
import { BiSkipPrevious } from "react-icons/bi";
import { ICON_SIZE } from "../utils/consts";

function PlayerPlayPrevious() {
	return (
		<Button variant="none">
			<BiSkipPrevious size={ICON_SIZE} />
		</Button>
	);
}
export { PlayerPlayPrevious };
