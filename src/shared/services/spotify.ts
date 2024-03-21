"use server";

import { fetcher } from "@/shared/utils/fetcher";
import { REDIRECT_URI, basic, endpoint } from "@utils/constants";
import { spotifyGet, spotifyPost, spotifyPut } from "../utils/spotifyFetcher";

const MAX_ITEMS_IN_ROW = "8";
const MAX_ITEMS_IN_COLUMN = "10";
const MAX_ITEMS_IN_PAGE = "30";
const INITIAL_OFFSET = "0";

const {
	origin,
	tokenEndpoint,
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
		endpoint: tokenEndpoint,
		options: {
			grant_type: "authorization_code",
			redirect_uri: REDIRECT_URI,
			code: code,
		},
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
}

async function getRefreshToken(refreshToken: string | undefined) {
	return await fetcher.post<Token>({
		endpoint: tokenEndpoint,
		options: {
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		},
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
}

async function getUserProfile() {
	return spotifyGet<UserProfile>(`${origin}${users.currentProfile}`);
}

async function getTopTracks() {
	return spotifyGet<TopTracks>(`${origin}${users.topItems("tracks")}`, {
		time_range: "short_term",
		limit: MAX_ITEMS_IN_ROW,
	});
}

async function getTopArtists() {
	return spotifyGet<TopArtists>(`${origin}${users.topItems("artists")}`, {
		time_range: "short_term",
		limit: MAX_ITEMS_IN_ROW,
	});
}

async function getUserSavedTracks() {
	return spotifyGet<UserSavedTracks>(`${origin}${tracks.saved}`, {
		limit: MAX_ITEMS_IN_ROW,
	});
}

async function getUserPlaylists(userId: string) {
	return spotifyGet<UserPlaylists>(
		`${origin}${playlists.userPlaylists(userId)}`,
	);
}

async function getPlaylist(playlistId: string) {
	return spotifyGet<Playlists>(`${origin}${playlists.single(playlistId)}`);
}

async function getSearch({
	query,
	type = "track,playlist,album,artist,show,episode",
	limit = MAX_ITEMS_IN_COLUMN,
	offset = INITIAL_OFFSET,
}: { query: string; type?: string; limit?: string; offset?: string }) {
	return spotifyGet<SearchType>(`${origin}${search.search}`, {
		q: query,
		type,
		limit,
		offset,
	});
}

async function getSeveralCategories() {
	return spotifyGet<SeveralCategories>(`${origin}${categories.several}`, {
		limit: MAX_ITEMS_IN_PAGE,
	});
}

async function getSingleCategory(categoryId: string) {
	return spotifyGet<SingleCategory>(
		`${origin}${categories.single(categoryId)}`,
	);
}

async function getCategoryPlaylist(categoryId: string) {
	return spotifyGet<CategoriesPlaylists>(
		`${origin}${playlists.categories(categoryId)}`,
	);
}

async function getArtist(artistId: string) {
	return spotifyGet<Artist>(`${origin}${artists.single(artistId)}`);
}

async function getPlaybackState() {
	return spotifyGet<PlaybackState>(`${origin}${player.state}`);
}

async function transferPlayback(deviceIds: string[], play = false) {
	return spotifyPut({
		endpoint: `${origin}${player.transferPlayback}`,
		options: {
			device_ids: deviceIds,
			play,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function getAvailableDevices() {
	return spotifyGet(`${origin}${player.devices}`);
}

async function getCurrentlyPlayingTrack() {
	return spotifyGet<CurrentlyPlayingTrack>(
		`${origin}${player.currentlyPlaying}`,
	);
}

async function startOrResumePlayback() {
	return spotifyPut({
		endpoint: `${origin}${player.play}`,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function pausePlayback() {
	return spotifyPut({
		endpoint: `${origin}${player.pause}`,
	});
}

async function skipToNext() {
	return spotifyPost({
		endpoint: `${origin}${player.next}`,
	});
}

async function skipToPrevious() {
	return spotifyPost({
		endpoint: `${origin}${player.previous}`,
	});
}

async function seekToPosition(positionMs: number) {
	return spotifyPut({
		endpoint: `${origin}${player.seek}`,
		params: {
			position_ms: positionMs,
		},
	});
}

async function setRepeatMode(state: "off" | "track" | "context") {
	return spotifyPut({
		endpoint: `${origin}${player.repeat}`,
		params: {
			state,
		},
	});
}

async function setVolume(volume: number) {
	return spotifyPut({
		endpoint: `${origin}${player.volume}`,
		params: {
			volume_percent: volume,
		},
	});
}

async function toggleShuffle(state: boolean) {
	return spotifyPut({
		endpoint: `${origin}${player.shuffle}`,
		params: {
			state,
		},
	});
}

async function getRecentlyPlayedTracks() {
	return spotifyGet(`${origin}${player.recentlyPlayed}`, {
		limit: MAX_ITEMS_IN_ROW,
	});
}

async function getUserQueue() {
	return spotifyGet(`${origin}${player.queue}`);
}

async function addToQueue(uri: string) {
	return spotifyPost({
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
