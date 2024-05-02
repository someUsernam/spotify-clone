"use client";

import { Search } from "@ui/Search";
import { useParams, usePathname } from "next/navigation";
import { isSearchPage } from "./utils/isSearchPage";

function TopBarShowSearch() {
	const pathname = usePathname();
	const { query } = useParams();

	if (isSearchPage(pathname, query)) {
		return <Search />;
	}

	return null;
}
export { TopBarShowSearch };
