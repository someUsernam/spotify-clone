"use server";

import { REDIRECT_URI, TOKEN_ENDPOINT } from "@/utils/constants";
import { fetcher } from "@/utils/fetcher";

const MAX_ITEMS_IN_ROW = "8";
const MAX_ITEMS_IN_COLUMN = "10";
const MAX_ITEMS_IN_PAGE = "30";
const INITIAL_OFFSET = "0";

async function getAccessToken(code: string | null) {
	return await fetcher.post<Token>({
		endpoint: TOKEN_ENDPOINT,
		options: {
			grant_type: "authorization_code",
			redirect_uri: REDIRECT_URI,
			code: code,
		},
	});
}

async function getRefreshToken(refreshToken: string | undefined) {
	return await fetcher.post<Token>({
		endpoint: TOKEN_ENDPOINT,
		options: {
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		},
	});
}

async function getUserProfile() {
	return await fetcher.get<UserProfile>({
		endpoint: "/v1/me",
	});
}

async function getTopTracks() {
	return await fetcher.get<TopTracks>({
		endpoint: "/v1/me/top/tracks",
		params: {
			time_range: "short_term",
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getTopArtists() {
	return await fetcher.get<TopArtists>({
		endpoint: "/v1/me/top/artists",
		params: {
			time_range: "short_term",
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getUserSavedTracks() {
	return await fetcher.get<UserSavedTracks>({
		endpoint: "/v1/me/tracks",
		params: {
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getUserPlaylists(userId: string) {
	return await fetcher.get<UserPlaylists>({
		endpoint: `/v1/users/${userId}/playlists`,
	});
}

async function getPlaylist(playlistId: string) {
	return await fetcher.get<Playlists>({
		endpoint: `/v1/playlists/${playlistId}`,
	});
}

async function getSearch({
	query,
	type = "track,playlist,album,artist,show,episode",
	limit = MAX_ITEMS_IN_COLUMN,
	offset = INITIAL_OFFSET,
}: { query: string; type?: string; limit?: string; offset?: string }) {
	return await fetcher.get<SearchType>({
		endpoint: "/v1/search",
		params: {
			q: query,
			type,
			limit,
			offset,
		},
	});
}

async function getSeveralCategories() {
	return await fetcher.get<SeveralCategories>({
		endpoint: "/v1/browse/categories",
		params: {
			limit: MAX_ITEMS_IN_PAGE,
		},
	});
}

async function getSingleCategory(categoryId: string) {
	return await fetcher.get<SingleCategory>({
		endpoint: `/v1/browse/categories/${categoryId}`,
	});
}

async function getCategoryPlaylist(categoryId: string) {
	return await fetcher.get<CategoriesPlaylists>({
		endpoint: `/v1/browse/categories/${categoryId}/playlists`,
	});
}

async function getArtist(artistId: string) {
	return await fetcher.get<Artist>({
		endpoint: `/v1/artists/${artistId}`,
	});
}

export {
	getAccessToken,
	getArtist,
	getCategoryPlaylist,
	getPlaylist,
	getRefreshToken,
	getSearch,
	getSeveralCategories,
	getSingleCategory,
	getTopArtists,
	getTopTracks,
	getUserPlaylists,
	getUserProfile,
	getUserSavedTracks,
};
