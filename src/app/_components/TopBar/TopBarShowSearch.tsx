"use client";

import { Search } from "@ui/Search";
import { useParams, usePathname } from "next/navigation";

function TopBarShowSearch() {
	const pathname = usePathname();
	const { query } = useParams();

	return (
		<>
			{pathname === "/search" || pathname === `/search/${query}` ? (
				<Search />
			) : null}
		</>
	);
}
export { TopBarShowSearch };
