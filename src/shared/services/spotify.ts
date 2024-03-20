"use server";

import { fetcher } from "@/shared/utils/fetcher";
import { REDIRECT_URI, endpoint } from "@utils/constants";

const MAX_ITEMS_IN_ROW = "8";
const MAX_ITEMS_IN_COLUMN = "10";
const MAX_ITEMS_IN_PAGE = "30";
const INITIAL_OFFSET = "0";

const {
	origin,
	token,
	album,
	artists,
	player,
	playlists,
	tracks,
	categories,
	search,
	users,
} = endpoint.spotify;

async function getAccessToken(code: string | null) {
	return await fetcher.post<Token>({
		endpoint: token,
		options: {
			grant_type: "authorization_code",
			redirect_uri: REDIRECT_URI,
			code: code,
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
}

async function getRefreshToken(refreshToken: string | undefined) {
	return await fetcher.post<Token>({
		endpoint: token,
		options: {
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
}

async function getUserProfile() {
	return await fetcher.get<UserProfile>({
		endpoint: users.currentProfile,
	});
}

async function getTopTracks() {
	return await fetcher.get<TopTracks>({
		endpoint: users.topItems("tracks"),
		params: {
			time_range: "short_term",
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getTopArtists() {
	return await fetcher.get<TopArtists>({
		endpoint: users.topItems("artists"),
		params: {
			time_range: "short_term",
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getUserSavedTracks() {
	return await fetcher.get<UserSavedTracks>({
		endpoint: tracks.saved,
		params: {
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getUserPlaylists(userId: string) {
	return await fetcher.get<UserPlaylists>({
		endpoint: playlists.userPlaylists(userId),
	});
}

async function getPlaylist(playlistId: string) {
	return await fetcher.get<Playlists>({
		endpoint: playlists.single(playlistId),
	});
}

async function getSearch({
	query,
	type = "track,playlist,album,artist,show,episode",
	limit = MAX_ITEMS_IN_COLUMN,
	offset = INITIAL_OFFSET,
}: { query: string; type?: string; limit?: string; offset?: string }) {
	return await fetcher.get<SearchType>({
		endpoint: search.search,
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
		endpoint: categories.several,
		params: {
			limit: MAX_ITEMS_IN_PAGE,
		},
	});
}

async function getSingleCategory(categoryId: string) {
	return await fetcher.get<SingleCategory>({
		endpoint: categories.single(categoryId),
	});
}

async function getCategoryPlaylist(categoryId: string) {
	return await fetcher.get<CategoriesPlaylists>({
		endpoint: playlists.categories(categoryId),
	});
}

async function getArtist(artistId: string) {
	return await fetcher.get<Artist>({
		endpoint: artists.single(artistId),
	});
}

async function getPlaybackState() {
	return await fetcher.get<PlaybackState>({
		endpoint: player.state,
	});
}

async function transferPlayback(deviceIds: string[], play = false) {
	return await fetcher.put({
		endpoint: `${origin}${player.transferPlayback}`,
		options: {
			device_ids: deviceIds,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function getAvailableDevices() {
	return await fetcher.get({
		endpoint: player.devices,
	});
}

async function getCurrentlyPlayingTrack() {
	return await fetcher.get<CurrentlyPlayingTrack>({
		endpoint: player.currentlyPlaying,
	});
}

async function startOrResumePlayback() {
	return await fetcher.put({
		endpoint: `${origin}${player.play}`,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function pausePlayback() {
	return await fetcher.put({
		endpoint: `${origin}${player.pause}`,
	});
}

async function skipToNext() {
	return await fetcher.post({
		endpoint: `${origin}${player.next}`,
	});
}

async function skipToPrevious() {
	return await fetcher.post({
		endpoint: `${origin}${player.previous}`,
	});
}

async function seekToPosition(positionMs: number) {
	return await fetcher.put({
		endpoint: `${origin}${player.seek}`,
		params: {
			position_ms: positionMs,
		},
	});
}

async function setRepeatMode(state: "off" | "track" | "context") {
	return await fetcher.put({
		endpoint: `${origin}${player.repeat}`,
		params: {
			state,
		},
	});
}

async function setVolume(volume: number) {
	return await fetcher.put({
		endpoint: `${origin}${player.volume}`,
		params: {
			volume_percent: volume,
		},
	});
}

async function toggleShuffle(state: boolean) {
	return await fetcher.put({
		endpoint: `${origin}${player.shuffle}`,
		params: {
			state,
		},
	});
}

async function getRecentlyPlayedTracks() {
	return await fetcher.get({
		endpoint: player.recentlyPlayed,
		params: {
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getUserQueue() {
	return await fetcher.get({
		endpoint: player.queue,
	});
}

async function addToQueue(uri: string) {
	return await fetcher.post({
		endpoint: `${origin}${player.addToQueue}`,
		params: {
			uri,
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
