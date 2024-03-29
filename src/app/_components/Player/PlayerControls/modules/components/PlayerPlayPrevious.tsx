"use client";

import { Button } from "@/shared/components/ui/Button";
import { skipToPrevious } from "@/shared/services/player";
import { useRouter } from "next/navigation";
import { BiSkipPrevious } from "react-icons/bi";
import { ICON_SIZE } from "../utils/consts";

function PlayerPlayPrevious() {
	const router = useRouter();

	const handlePlayPrevious = async () => {
		await skipToPrevious();
	};

	return (
		<Button variant="none" onClick={handlePlayPrevious}>
			<BiSkipPrevious size={ICON_SIZE} />
		</Button>
	);
}
export { PlayerPlayPrevious };
