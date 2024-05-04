"use client";

import { Button } from "@/shared/components/ui/Button";
import { usePlayer } from "@/shared/providers/player-provider";
import { BiPlay } from "react-icons/bi";
import { ICON_SIZE } from "../../../../utils/consts";

function PlayButton() {
	const { play } = usePlayer();

	function handlePlay() {
		play();
	}

	return (
		<Button
			variant="none"
			className="bg-primary text-primary-foreground"
			onClick={handlePlay}
		>
			<BiPlay size={ICON_SIZE} />
		</Button>
	);
}
export { PlayButton };
