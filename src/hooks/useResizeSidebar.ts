import { useEffect, useRef, useState } from "react";

const REFRESH_WITH_20FPS = 1000 / 20;

function useResizeSidebar() {
	const sidebarRef = useRef<HTMLElement>(null);
	const [isResizing, setIsResizing] = useState(false);
	const [sidebarWidth, setSidebarWidth] = useState(() =>
		Number(window.localStorage.getItem("sidebarWidth")),
	);
	const lasTime = useRef(0);

	function handleResize(e: MouseEvent) {
		if (isResizing) {
			const now = Date.now();
			if (now - lasTime.current < REFRESH_WITH_20FPS) return;
			lasTime.current = now;
			setSidebarWidth(
				() =>
					Math.max(e.clientX, 70) && Math.min(e.clientX, window.innerWidth / 2),
			);
		}
	}

	function startResize() {
		setIsResizing(true);
	}

	function stopResize() {
		setIsResizing(false);
	}

	useEffect(() => {
		window.addEventListener("mousemove", handleResize);
		window.addEventListener("mouseup", stopResize);
		window.localStorage.setItem("sidebarWidth", JSON.stringify(sidebarWidth));

		return () => {
			window.removeEventListener("mousemove", handleResize);
			window.removeEventListener("mouseup", stopResize);
		};
	}, [handleResize, stopResize]);

	return { sidebarRef, sidebarWidth, startResize };
}

export { useResizeSidebar };
