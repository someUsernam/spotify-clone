"use client";

import { useResize } from "@/hooks/useResize";

function SidebarLayout({ children }: ChildrenProps) {
	const { sidebarRef, handleMousedown } = useResize();

	return (
		<aside className="flex w-1/4 overflow-hidden" ref={sidebarRef}>
			<div className="@container flex flex-1 flex-col gap-y-2">{children}</div>
			<div
				className="w-1 justify-end resize-x cursor-col-resize dark:hover:bg-gray-700"
				onMouseDown={handleMousedown}
				// onTouchMove={} TODO touch support
			/>
		</aside>
	);
}
export default SidebarLayout;
