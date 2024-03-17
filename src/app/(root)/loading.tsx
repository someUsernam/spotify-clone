import { Skeleton } from "@ui/Skeleton";
import { SkeletonCard } from "@ui/Skeleton/SkeletonCard";

function Loading() {
	return (
		<div className="flex flex-col gap-6 flex-auto pt-1">
			<div className="flex flex-col gap-4">
				<Skeleton variant="header" />

				<div className="grid-layout-sm gap-x-3 gap-y-4">
					{Array.from({ length: 6 }).map(() => (
						<div className="h-20 rounded-md overflow-hidden flex">
							<Skeleton variant="square" />
							<div className="flex justify-center items-center w-full bg-neutral-800">
								<Skeleton variant="text-xl" />
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-4">
				{Array.from({ length: 6 }).map(() => (
					<>
						<Skeleton variant="header-sm" />
						<div className="grid-layout grid-rows-1 auto-rows-[0px] overflow-y-hidden gap-x-7">
							{Array.from({ length: 5 }).map(() => (
								<SkeletonCard />
							))}
						</div>
					</>
				))}
			</div>
		</div>
	);
}
export default Loading;
