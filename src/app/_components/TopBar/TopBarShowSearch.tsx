"use client";

import { LINKS } from "@/shared/utils/constants";
import { Search } from "@ui/Search";
import { useParams, usePathname } from "next/navigation";

const { search } = LINKS;

function TopBarShowSearch() {
	const pathname = usePathname();
	const { query } = useParams();

	if (pathname === search.home || pathname === search.query(query)) {
		return <Search />;
	}

	return null;
}
export { TopBarShowSearch };
