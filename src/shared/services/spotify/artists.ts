"use server";

import { endpoint } from "@/shared/utils/constants";
import { fetchAndHandleErrors } from "@/shared/utils/fetchAndHandleErrors";
import { withAuthHeaders } from "@/shared/utils/withAuthHeaders";

const { origin, artists } = endpoint.spotify;

async function getArtist(artistId: string) {
	return fetchAndHandleErrors<GetArtist>(
		`${origin}${artists.single(artistId)}`,
		{
			headers: withAuthHeaders({}),
		},
	);
}

export { getArtist };
