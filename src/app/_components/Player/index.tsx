import { PlayerLayout } from "./PlayerLayout";
import { PlayerOptions } from "./PlayerOptions";
import { PlayerPlayback } from "./PlayerPlayback";
import { PlayerPreview } from "./PlayerPreview";

function Player() {
	return (
		<PlayerLayout>
			<PlayerPreview />
			<PlayerPlayback />
			<PlayerOptions />
		</PlayerLayout>
	);
}
export { Player };
