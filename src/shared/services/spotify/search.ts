"use server";

import {
	INITIAL_OFFSET,
	MAX_ITEMS_IN_COLUMN,
	endpoint,
} from "@/shared/utils/constants";
import { fetchAndHandleErrors } from "@/shared/utils/fetchAndHandleErrors";
import { withAuthHeaders } from "@/shared/utils/withAuthHeaders";

const { origin, search } = endpoint.spotify;

const TYPES_TO_SEARCH = "track,playlist,album,artist,show,episode";

type GetSearchProps = {
	query: string;
	type?: string;
	limit?: string;
	offset?: string;
};

async function getSearch({
	query,
	type = TYPES_TO_SEARCH,
	limit = MAX_ITEMS_IN_COLUMN,
	offset = INITIAL_OFFSET,
}: GetSearchProps) {
	return fetchAndHandleErrors<SearchForItem>(`${origin}${search.search}`, {
		headers: withAuthHeaders({}),
		params: {
			q: query,
			type,
			limit,
			offset,
		},
	});
}

export { getSearch };
