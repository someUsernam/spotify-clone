"use client";

import { Button } from "@/shared/components/ui/Button";
import { getPlaybackState, skipToNext } from "@/shared/services/spotify";
import { BiSkipNext } from "react-icons/bi";
import { ICON_SIZE } from "../utils/consts";

function PlayerPlayNext() {
	const handlePlayNext = async () => {
		const playbackState = await getPlaybackState();
		if (!playbackState) return;
		const a = await skipToNext(playbackState.device.id);
		// await skipToNext(playbackState.device.id);
	};

	return (
		<Button variant="none" onClick={handlePlayNext}>
			<BiSkipNext size={ICON_SIZE} />
		</Button>
	);
}
export { PlayerPlayNext };
