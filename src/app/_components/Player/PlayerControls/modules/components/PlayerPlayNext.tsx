"use client";

import { Button } from "@/shared/components/ui/Button";
import { skipToNext } from "@/shared/services/player";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { BiSkipNext } from "react-icons/bi";
import { ICON_SIZE } from "../utils/consts";

function PlayerPlayNext() {
	const router = useRouter();

	const handlePlayNext = async () => {
		await skipToNext();
		// setTimeout(() => {
		// 	router.refresh();
		// }, 1000);
	};

	return (
		<Button variant="none" onClick={handlePlayNext}>
			<BiSkipNext size={ICON_SIZE} />
		</Button>
	);
}
export { PlayerPlayNext };
