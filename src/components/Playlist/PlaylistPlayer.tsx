import { AiFillPlayCircle, AiOutlineEllipsis } from "react-icons/ai";

function PlaylistPlayer() {
	return (
		<div className="flex items-center @lg:py-6 @md:py-5 @sm:py-4 @lg:gap-6 @md:gap-5 @sm:gap-4">
			<button type="button">
				<AiFillPlayCircle size={64} className="text-green-500" />
			</button>
			<button type="button">
				<AiOutlineEllipsis size={38} className="text-subdued" />
			</button>
		</div>
	);
}
export default PlaylistPlayer;
