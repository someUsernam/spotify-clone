import { useCallback, useRef } from "react";

const REFRESH_WITH_20FPS = 1000 / 20;

function useResize() {
	const isResizing = useRef(false);
	const sidebarRef = useRef<HTMLElement>(null);
	const lasTime = useRef(0);

	// const width = Number(localStorage.getItem("sidebarWidth"));

	// if (width && sidebarRef.current) {
	// 	sidebarRef.current.style.width = `${width}px`;
	// }

	// useEffect(() => {
	// 	if (!sidebarRef.current) {
	// 		console.log("sidebarRef.current is null");
	// 		return;
	// 	}
	// 	sidebarRef.current.style.width = `${sidebarWidth}px`;
	// }, [sidebarWidth]);

	// console.log(width);

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (!isResizing.current || !sidebarRef.current) {
			return;
		}

		const now = Date.now();
		if (now - lasTime.current < REFRESH_WITH_20FPS) {
			return;
		}
		lasTime.current = now;

		if (e.clientX > window.innerWidth / 2 || e.clientX < 70) {
			return;
		}

		const sidebarWidth =
			Math.max(e.clientX, 200) && Math.min(e.clientX, window.innerWidth / 2);
		sidebarRef.current.style.width = `${sidebarWidth}px`;
		// console.log(parseInt(sidebarRef.current.style.width) === width);
		// if (!localStorage || parseInt(sidebarRef.current.style.width) === width) {
		// 	console.log(sidebarWidth === width);
		// 	return;
		// }
		// localStorage.setItem("sidebarWidth", String(sidebarWidth));
	}, []);

	const handleMouseUp = () => {
		if (!isResizing.current) {
			return;
		}

		isResizing.current = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	const handleMousedown = useCallback(
		(e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();

			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			isResizing.current = true;
		},
		[handleMouseMove, handleMouseUp],
	);

	return { sidebarRef, handleMousedown };
}

export { useResize };
