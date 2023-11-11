"use server";

import { getSearch } from "./services/spotify";

type SearchAction = {
	query: string;
	type: string;
	offset: string;
	limit?: string;
};

const MAX_TIEMS_IN_PAGE = "30";

async function getSearchAction({
	query,
	type,
	offset,
	limit = MAX_TIEMS_IN_PAGE,
}: SearchAction) {
	return await getSearch({ query, type, offset, limit });
}

export { getSearchAction };
