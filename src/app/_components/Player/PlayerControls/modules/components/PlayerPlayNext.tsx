"use client";

import { Button } from "@/shared/components/ui/Button";
import { skipToNext } from "@/shared/services/player";
import { useRouter } from "next/navigation";
import { BiSkipNext } from "react-icons/bi";
import { ICON_SIZE } from "../utils/consts";

function PlayerPlayNext() {
	const router = useRouter();

	const handlePlayNext = async () => {
		// console.log("handlePlayNext");
		await skipToNext();

		// console.log("router.refresh");
		router.refresh();
		// console.log("router.refreshed");
	};

	return (
		<Button variant="none" onClick={handlePlayNext}>
			<BiSkipNext size={ICON_SIZE} />
		</Button>
	);
}
export { PlayerPlayNext };
