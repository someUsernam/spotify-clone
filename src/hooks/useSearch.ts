import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

function useSearch(query: string, delay = 1000) {
	const timeout = useRef<ReturnType<typeof setTimeout>>();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		clearTimeout(timeout.current);

		timeout.current = setTimeout(() => {
			if (pathname.includes("search")) {
				router.push(query);
			}
		}, delay);

		return () => {
			clearTimeout(timeout.current);
		};
	}, [delay, query, router, pathname]);

	return {
		search: query,
	};
}

export { useSearch };
