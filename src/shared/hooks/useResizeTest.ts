import { useCallback, useEffect, useRef } from "react";

function useResizeTest() {
	const sidebarWidth = useRef();

	const resizeRef = useCallback((node: HTMLElement) => {
		if (!node) {
			return;
		}

		window.addEventListener("mousedown", (e) => {});
	}, []);
}
export { useResizeTest };
