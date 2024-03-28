import { getCurrentlyPlayingTrack } from "@/shared/services/player";
import Image from "next/image";

async function PlayerPreview() {
	const currentTrack = await getCurrentlyPlayingTrack();

	// console.log({ currentTrack });

	if (!currentTrack || "error" in currentTrack || !currentTrack.item) {
		return null;
	}

	let smallestImage: Image | null = null;
	let creatorName = "";

	if ("album" in currentTrack.item) {
		smallestImage = currentTrack?.item?.album?.images?.reduce(
			(smallest, image) => {
				if (image.height < smallest.height) {
					return image;
				}
				return smallest;
			},
			currentTrack?.item?.album?.images[0],
		);

		creatorName = currentTrack?.item?.album?.artists[0].name;
	}

	if ("show" in currentTrack.item) {
		smallestImage = currentTrack?.item?.show?.images?.reduce(
			(smallest, image) => {
				if (image.height < smallest.height) {
					return image;
				}
				return smallest;
			},
			currentTrack?.item?.show?.images[0],
		);

		creatorName = currentTrack?.item?.show?.publisher;
	}

	if (!currentTrack.is_playing) return null;

	return (
		<div className="pl-2 min-w-[180px] flex items-center gap-3">
			<Image
				src={smallestImage?.url || ""}
				width={64}
				height={64}
				alt={`${currentTrack.item.name} cover art`}
				className="rounded-md"
			/>
			<div>
				<p className="text-sm font-bold">{currentTrack.item.name}</p>
				<p className="text-sm text-gray-500">{creatorName}</p>
			</div>
		</div>
	);
}

export { PlayerPreview };
