import { useEffect, useRef } from "react";

const REFRESH_RATE = 1000 / 30;
const MIN_WIDTH = 200;
let MAX_WIDTH = 500;
if (typeof window !== "undefined") {
	MAX_WIDTH = window.innerWidth / 2;
}

function useResize() {
	const isResizing = useRef(false);
	const sidebarRef = useRef<HTMLElement>(null);
	const lasTime = useRef(0);

	useEffect(() => {
		const width = Number(localStorage.getItem("sidebarWidth"));
		if (width && sidebarRef.current) {
			sidebarRef.current.style.width = `${width}px`;
		}
	}, []);

	const handleMouseMove = (e: MouseEvent) => {
		if (!isResizing.current || !sidebarRef.current) {
			return;
		}

		const now = Date.now();
		if (now - lasTime.current < REFRESH_RATE) {
			return;
		}
		lasTime.current = now;

		if (e.clientX > MAX_WIDTH || e.clientX < MIN_WIDTH) {
			return;
		}

		const sidebarWidth = Math.max(Math.min(e.clientX, MAX_WIDTH), MIN_WIDTH);
		sidebarRef.current.style.width = `${sidebarWidth}px`;

		if (localStorage) {
			localStorage.setItem("sidebarWidth", String(sidebarWidth));
		}
	};

	const handleMouseUp = () => {
		if (!isResizing.current) {
			return;
		}

		isResizing.current = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	const handleMousedown = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		e.preventDefault();

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
		isResizing.current = true;
	};

	return { sidebarRef, handleMousedown };
}

export { useResize };
