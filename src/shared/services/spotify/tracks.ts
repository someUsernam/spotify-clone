"use server";

import { MAX_ITEMS_IN_ROW, endpoint } from "@/shared/utils/constants";
import { fetchAndHandleErrors } from "@/shared/utils/fetchAndHandleErrors";
import { withAuthHeaders } from "@/shared/utils/withAuthHeaders";

const { origin, tracks } = endpoint.spotify;

async function getUserSavedTracks() {
	return fetchAndHandleErrors<GetUserSavedTracks>(`${origin}${tracks.saved}`, {
		headers: withAuthHeaders({}),
		params: {
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

export { getUserSavedTracks };
