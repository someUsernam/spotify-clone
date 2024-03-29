"use server";

import { TAGS, endpoint } from "@utils/constants";
import { revalidateTag } from "next/cache";
import {
	spotifyGet,
	spotifyPost,
	spotifyPut,
} from "../../utils/spotifyFetcher";

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

// async function getAccessToken(code: string | null) {
// 	return await fetcher.post<Token>({
// 		endpoint: tokenEndpoint,
// 		body: {
// 			grant_type: "authorization_code",
// 			redirect_uri: REDIRECT_URI,
// 			code: code,
// 		},
// 		headers: {
// 			Authorization: `Basic ${basic}`,
// 			"Content-Type": "application/x-www-form-urlencoded",
// 		},
// 	});
// }

// async function getRefreshToken(refreshToken: string | undefined) {
// 	return await fetcher.post<Token>({
// 		endpoint: tokenEndpoint,
// 		body: {
// 			grant_type: "refresh_token",
// 			refresh_token: refreshToken,
// 		},
// 		headers: {
// 			Authorization: `Basic ${basic}`,
// 			"Content-Type": "application/x-www-form-urlencoded",
// 		},
// 	});
// }

async function getUserProfile() {
	return spotifyGet<GetUserProfile>({
		endpoint: `${origin}${users.currentProfile}`,
	});
}

async function getTopTracks() {
	return spotifyGet<GetUserTopItems>({
		endpoint: `${origin}${users.topItems("tracks")}`,
		params: {
			time_range: "short_term",
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getTopArtists() {
	return spotifyGet<GetUserTopItems>({
		endpoint: `${origin}${users.topItems("artists")}`,
		params: {
			time_range: "short_term",
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getUserSavedTracks() {
	return spotifyGet<GetUserSavedTracks>({
		endpoint: `${origin}${tracks.saved}`,
		params: {
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getUserPlaylists(userId: string) {
	return spotifyGet<GetUserPlaylists>({
		endpoint: `${origin}${playlists.userPlaylists(userId)}`,
	});
}

async function getPlaylist(playlistId: string) {
	return spotifyGet<GetPlaylist>({
		endpoint: `${origin}${playlists.single(playlistId)}`,
	});
}

async function getSearch({
	query,
	type = "track,playlist,album,artist,show,episode",
	limit = MAX_ITEMS_IN_COLUMN,
	offset = INITIAL_OFFSET,
}: { query: string; type?: string; limit?: string; offset?: string }) {
	return spotifyGet<SearchForItem>({
		endpoint: `${origin}${search.search}`,
		params: {
			q: query,
			type,
			limit,
			offset,
		},
	});
}

async function getSeveralCategories() {
	return spotifyGet<GetSeveralBrowseCategories>({
		endpoint: `${origin}${categories.several}`,
		params: {
			limit: MAX_ITEMS_IN_PAGE,
		},
	});
}

async function getSingleCategory(categoryId: string) {
	return spotifyGet<GetSingleBrowseCategory>({
		endpoint: `${origin}${categories.single(categoryId)}`,
	});
}

async function getCategoryPlaylist(categoryId: string) {
	return spotifyGet<GetCategoryPlaylists>({
		endpoint: `${origin}${playlists.categories(categoryId)}`,
	});
}

async function getArtist(artistId: string) {
	return spotifyGet<GetArtist>({
		endpoint: `${origin}${artists.single(artistId)}`,
	});
}

async function getPlaybackState() {
	return spotifyGet<GetPlaybackState>({ endpoint: `${origin}${player.state}` });
}

async function transferPlayback(deviceIds: string[], play = false) {
	return spotifyPut({
		endpoint: `${origin}${player.transferPlayback}`,
		body: {
			device_ids: deviceIds,
			play,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function getAvailableDevices() {
	return spotifyGet({ endpoint: `${origin}${player.devices}` });
}

async function getCurrentlyPlayingTrack() {
	return spotifyGet<GetCurrentlyPlayingTrack>({
		endpoint: `${origin}${player.currentlyPlaying}`,
		tag: [TAGS.get_currently_playing_track],
	});
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
	try {
		const res = spotifyPost({
			endpoint: `${origin}${player.next}`,
			headers: {
				"Content-length": "0",
			},
		});

		revalidateTag(TAGS.get_currently_playing_track);
		return res;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
			console.log("Error in skipToNext");
		}
	}
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
	return spotifyGet<GetRecentlyPlayedTracks>({
		endpoint: `${origin}${player.recentlyPlayed}`,
		params: {
			limit: MAX_ITEMS_IN_ROW,
		},
	});
}

async function getUserQueue() {
	return spotifyGet<GetUserQueue>({ endpoint: `${origin}${player.queue}` });
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
	// getAccessToken,
	getArtist,
	getAvailableDevices,
	getCategoryPlaylist,
	getCurrentlyPlayingTrack,
	getPlaybackState,
	getPlaylist,
	getRecentlyPlayedTracks,
	// getRefreshToken,
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
