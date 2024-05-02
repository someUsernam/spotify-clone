import { LINKS } from "@/shared/utils/constants";

const { search } = LINKS;

export function isSearchPage(pathname: string, query: string | string[]) {
	return pathname === search.home || pathname.startsWith(search.query(query));
}
