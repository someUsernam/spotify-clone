"use client";

import { useResize } from "@/shared/hooks/useResize";

function SidebarLayout({ children }: ChildrenProps) {
	const { sidebarRef, handleMousedown } = useResize();

	return (
		<aside
			className="flex w-80 overflow-hidden row-start-1 row-end-3 col-start-1 col-end-2"
			ref={sidebarRef}
		>
			<div className="@container flex flex-1 flex-col gap-y-2">{children}</div>
			<div
				className="w-1 justify-end resize-x cursor-col-resize dark:hover:bg-gray-700"
				onMouseDown={handleMousedown}
				// onTouchMove={} TODO touch support
			/>
		</aside>
	);
}
export { SidebarLayout };
