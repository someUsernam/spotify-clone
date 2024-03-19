import { PlayerProvider } from "@/shared/providers/player-provider";
import { Suspense } from "react";
import { PlayerControls } from "./PlayerControls";
import { PlayerLayout } from "./PlayerLayout";
import { PlayerOptions } from "./PlayerOptions";
import { PlayerPreview } from "./PlayerPreview";

function Player() {
	return (
		<PlayerLayout>
			<Suspense fallback={<p>loading...</p>}>
				<PlayerProvider>
					<PlayerPreview />
					<PlayerControls />
					<PlayerOptions />
				</PlayerProvider>
			</Suspense>
		</PlayerLayout>
	);
}
export { Player };
