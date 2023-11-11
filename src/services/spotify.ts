import { REDIRECT_URI, TOKEN_ENDPOINT } from "@/utils/constants";
import { fetcher } from "@/utils/fetcher";

const MAX_ITEMS_IN_ROW = "8";
const MAX_ITEMS_IN_COLUMN = "10";
const MAX_ITEMS_IN_PAGE = "30";
const INITIAL_OFFSET = "0";

function getAccessToken(code: string | null) {
	return fetcher.post<Token>({
		endpoint: TOKEN_ENDPOINT,
		options: {
			grant_type: "authorization_code",
			redirect_uri: REDIRECT_URI,
			code: code,
		},
	});
}

function getRefreshToken(refreshToken: string | undefined) {
	return fetcher.post<Token>({
		endpoint: TOKEN_ENDPOINT,
		options: {
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		},
	});
}

function getUserProfile() {
	return fetcher.get<UserProfile>({
		endpoint: "v1/me",
	});
}

function getTopTracks() {
	return fetcher.get<TopTracks>({
		endpoint: "v1/me/top/tracks",
		params: {
			time_range: "short_term",
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

function getTopArtists() {
	return fetcher.get<TopArtists>({
		endpoint: "v1/me/top/artists",
		params: {
			time_range: "short_term",
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

function getUserSavedTracks() {
	return fetcher.get<UserSavedTracks>({
		endpoint: "v1/me/tracks",
		params: {
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

function getUserPlaylists(userId: string) {
	return fetcher.get<UserPlaylists>({
		endpoint: `v1/users/${userId}/playlists`,
	});
}

function getPlaylist(playlistId: string) {
	return fetcher.get<Playlists>({
		endpoint: `v1/playlists/${playlistId}`,
	});
}

function getSearch({
	query,
	type = "track,playlist,album,artist,show,episode",
	limit = MAX_ITEMS_IN_COLUMN,
	offset = INITIAL_OFFSET,
}: { query: string; type?: string; limit?: string; offset?: string }) {
	return fetcher.get<SearchType>({
		endpoint: "v1/search",
		params: {
			q: query,
			type,
			limit,
			offset,
		},
	});
}

function getSeveralCategories() {
	return fetcher.get<SeveralCategories>({
		endpoint: "v1/browse/categories",
		params: {
			limit: MAX_ITEMS_IN_PAGE,
		},
	});
}

function getSingleCategory(categoryId: string) {
	return fetcher.get<SingleCategory>({
		endpoint: `v1/browse/categories/${categoryId}`,
	});
}

function getCategoryPlaylist(categoryId: string) {
	return fetcher.get<CategoriesPlaylists>({
		endpoint: `v1/browse/categories/${categoryId}/playlists`,
	});
}

function getArtist(artistId: string) {
	return fetcher.get<Artist>({
		endpoint: `v1/artists/${artistId}`,
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
