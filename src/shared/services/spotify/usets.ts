"use server";

import { MAX_ITEMS_IN_ROW, endpoint } from "@/shared/utils/constants";
import { fetchAndHandleErrors } from "@/shared/utils/fetchAndHandleErrors";
import { withAuthHeaders } from "@/shared/utils/withAuthHeaders";

const { origin, users } = endpoint.spotify;

async function getCurrentUserProfile() {
	return fetchAndHandleErrors<GetCurrentUserPorfile>(
		`${origin}${users.currentProfile}`,
		{
			headers: withAuthHeaders({}),
		},
	);
}

async function getUserTopItemsTracks() {
	return fetchAndHandleErrors<GetUserTopItems>(
		`${origin}${users.topItems("tracks")}`,
		{
			headers: withAuthHeaders({}),
			params: {
				time_range: "short_term",
				limit: MAX_ITEMS_IN_ROW,
			},
		},
	);
}

async function getUserTopItemsArtists() {
	return fetchAndHandleErrors<GetUserTopItems>(
		`${origin}${users.topItems("artists")}`,
		{
			headers: withAuthHeaders({}),
			params: {
				time_range: "short_term",
				limit: MAX_ITEMS_IN_ROW,
			},
		},
	);
}

export { getCurrentUserProfile, getUserTopItemsArtists, getUserTopItemsTracks };
