"use client";

import { usePlayer } from "@shared/providers/player-provider";
import { Button } from "@ui/Button";
import { BiPause } from "react-icons/bi";
import { ICON_SIZE } from "../../../../utils/consts";

function PauseButton() {
	const { pause } = usePlayer();

	function handlePause() {
		pause();
	}

	return (
		<Button
			variant="none"
			className="bg-primary text-secondary"
			onClick={handlePause}
		>
			<BiPause size={ICON_SIZE} />
		</Button>
	);
}
export { PauseButton };
