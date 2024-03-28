"use client";

import { usePlayer } from "@/shared/providers/player-provider";
import { PauseButton } from "./modules/components/PauseButton";
import { PlayButton } from "./modules/components/PlayButton";

function PlayerPlayPause() {
	const { isPlaying } = usePlayer();

	if (isPlaying) {
		return <PauseButton />;
	}

	return <PlayButton />;
}

export { PlayerPlayPause };
