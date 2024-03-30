"use server";

import { endpoint } from "@/shared/utils/constants";
import { fetchAndHandleErrors } from "@/shared/utils/fetchAndHandleErrors";
import { withAuthHeaders } from "@/shared/utils/withAuthHeaders";

const { origin, playlists } = endpoint.spotify;

async function getUserPlaylists(userId: string) {
	return fetchAndHandleErrors<GetUserPlaylists>(
		`${origin}${playlists.userPlaylists(userId)}`,
		{
			headers: withAuthHeaders({}),
		},
	);
}

async function getPlaylist(playlistId: string) {
	return fetchAndHandleErrors<GetPlaylist>(
		`${origin}${playlists.single(playlistId)}`,
		{
			headers: withAuthHeaders({}),
		},
	);
}

async function getCategoryPlaylist(categoryId: string) {
	return fetchAndHandleErrors<GetCategoryPlaylists>(
		`${origin}${playlists.categories(categoryId)}`,
		{
			headers: withAuthHeaders({}),
		},
	);
}

export { getPlaylist, getUserPlaylists, getCategoryPlaylist };
