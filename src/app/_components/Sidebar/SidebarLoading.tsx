import { Skeleton } from "@ui/Skeleton";

function skeletonArray(component: React.ReactNode) {
	// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
	return Array.from({ length: 10 }, (_, i) => <div key={i}>{component}</div>);
}

function SidebarLoading() {
	return (
		<div className="p-4 space-y-4">
			{skeletonArray(
				<span className="flex items-center gap-2 ">
					<Skeleton variant="square-sm" />
					<Skeleton variant="text" />
				</span>,
			)}
		</div>
	);
}
export { SidebarLoading };
