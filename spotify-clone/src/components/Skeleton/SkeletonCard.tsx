import Skeleton from "./Skeleton";

function SkeletonCard() {
	return (
		<div className="flex flex-col bg-neutral-900 p-4 gap-4 rounded-md">
			<Skeleton variant="square-lg" />
			<div className="flex flex-col gap-2">
				<Skeleton variant="text-lg" />
				<Skeleton variant="text" />
			</div>
		</div>
	);
}
export default SkeletonCard;
