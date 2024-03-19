import { PlayerPlayNext } from "./modules/components/PlayerPlayNext";
import { PlayerPlayPause } from "./modules/components/PlayerPlayPause";
import { PlayerPlayPrevious } from "./modules/components/PlayerPlayPrevious";
import { PlayerRepeat } from "./modules/components/PlayerRepeat";
import { PlayerShuffle } from "./modules/components/PlayerShuffle";

function PlayerControls() {
	return (
		<div className="flex gap-6">
			<PlayerShuffle />
			<PlayerPlayPrevious />
			<PlayerPlayPause />
			<PlayerPlayNext />
			<PlayerRepeat />
		</div>
	);
}

export { PlayerControls };
