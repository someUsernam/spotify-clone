"use server";

import { fetcher } from "@/shared/utils/fetcher";
import { REDIRECT_URI, TOKEN_ENDPOINT } from "@utils/constants";

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
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
}

async function getRefreshToken(refreshToken: string | undefined) {
	return await fetcher.post<Token>({
		endpoint: TOKEN_ENDPOINT,
		options: {
			grant_type: "refresh_token",
			refresh_token: refreshToken,
			"Content-Type": "application/x-www-form-urlencoded",
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

async function getPlaybackState() {
	return await fetcher.get({
		endpoint: "/v1/me/player",
	});
}

async function getAvailableDevices() {
	return await fetcher.get({
		endpoint: "/v1/me/player/devices",
	});
}

async function getCurrentlyPlayingTrack() {
	return await fetcher.get({
		endpoint: "/v1/me/player/currently-playing",
	});
}

async function getRecentlyPlayedTracks() {
	return await fetcher.get({
		endpoint: "/v1/me/player/recently-played",
		params: {
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function transferPlayback(divaceId: string) {
	return await fetcher.post({
		endpoint: "/v1/me/player",
		options: {
			device_ids: [divaceId],
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function startOrResumePlayback(deviceId: string) {
	return await fetcher.post({
		endpoint: "/v1/me/player/play",
		options: {
			device_id: deviceId,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function pausePlayback(deviceId: string) {
	return await fetcher.post({
		endpoint: "/v1/me/player/pause",
		options: {
			device_id: deviceId,
		},
	});
}

async function skipToNext(deviceId: string) {
	return await fetcher.post({
		endpoint: "/v1/me/player/next",
		options: {
			device_id: deviceId,
		},
	});
}

async function skipToPrevious(deviceId: string) {
	return await fetcher.post({
		endpoint: "/v1/me/player/previous",
		options: {
			device_id: deviceId,
		},
	});
}

async function seekToPosition(deviceId: string, position: number) {
	return await fetcher.post({
		endpoint: "/v1/me/player/seek",
		options: {
			position_ms: position,
			device_id: deviceId,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function setRepeatMode(deviceId: string, state: string) {
	return await fetcher.post({
		endpoint: "/v1/me/player/repeat",
		options: {
			state,
			device_id: deviceId,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function setVolume(deviceId: string, volume: number) {
	return await fetcher.post({
		endpoint: "/v1/me/player/volume",
		options: {
			volume_percent: volume,
			device_id: deviceId,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function toggleShuffle(deviceId: string, state: boolean) {
	return await fetcher.post({
		endpoint: "/v1/me/player/shuffle",
		options: {
			state,
			device_id: deviceId,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function getUserQueue() {
	return await fetcher.get({
		endpoint: "/v1/me/player/queue",
	});
}

async function addToQueue(uri: string, deviceId: string) {
	return await fetcher.post({
		endpoint: "/v1/me/player/queue",
		options: {
			uri,
			device_id: deviceId,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export {
	addToQueue,
	getAccessToken,
	getArtist,
	getAvailableDevices,
	getCategoryPlaylist,
	getCurrentlyPlayingTrack,
	getPlaybackState,
	getPlaylist,
	getRecentlyPlayedTracks,
	getRefreshToken,
	getSearch,
	getSeveralCategories,
	getSingleCategory,
	getTopArtists,
	getTopTracks,
	getUserPlaylists,
	getUserProfile,
	getUserQueue,
	getUserSavedTracks,
	pausePlayback,
	seekToPosition,
	setRepeatMode,
	setVolume,
	skipToNext,
	skipToPrevious,
	startOrResumePlayback,
	toggleShuffle,
	transferPlayback,
};
