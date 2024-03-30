"use server";

import { fetchAndHandleErrors } from "@/shared/utils/fetchAndHandleErrors";
import { withAuthHeaders } from "@/shared/utils/withAuthHeaders";
import { revalidateTag } from "next/cache";
import { MAX_ITEMS_IN_ROW, TAGS, endpoint } from "../../utils/constants";

const { origin, player } = endpoint.spotify;

async function skipToNext() {
	await fetchAndHandleErrors(`${origin}${player.next}`, {
		method: "POST",
		headers: withAuthHeaders({}),
	});

	revalidateTag(TAGS.get_currently_playing_track);
}

async function skipToPrevious() {
	await fetchAndHandleErrors(`${origin}${player.previous}`, {
		method: "POST",
		headers: withAuthHeaders({}),
	});

	revalidateTag(TAGS.get_currently_playing_track);
}

async function getCurrentlyPlayingTrack(): Promise<
	GetCurrentlyPlayingTrack | ErrorType
> {
	return await fetchAndHandleErrors<GetCurrentlyPlayingTrack>(
		`${origin}${player.currentlyPlaying}`,
		{
			headers: withAuthHeaders({}),
			next: {
				tags: [TAGS.get_currently_playing_track],
			},
		},
	);
}

async function getPlaybackState() {
	const res = fetchAndHandleErrors<GetPlaybackState>(
		`${origin}${player.state}`,
		{
			headers: withAuthHeaders({}),
		},
	);

	revalidateTag(TAGS.get_currently_playing_track);

	return res;
}

async function transferPlayback(deviceIds: string[], play = false) {
	return fetchAndHandleErrors(`${origin}${player.transferPlayback}`, {
		method: "PUT",
		body: JSON.stringify({
			device_ids: deviceIds,
			play,
		}),
		headers: withAuthHeaders({
			"Content-Type": "application/json",
		}),
	});
}

async function getAvailableDevices() {
	return fetchAndHandleErrors(`${origin}${player.devices}`, {
		headers: withAuthHeaders({}),
	});
}

async function startOrResumePlayback() {
	return fetchAndHandleErrors(`${origin}${player.play}`, {
		method: "PUT",
		headers: withAuthHeaders({
			"Content-Type": "application/json",
		}),
	});
}

async function pausePlayback() {
	return fetchAndHandleErrors(`${origin}${player.pause}`, {
		method: "PUT",
		headers: withAuthHeaders({}),
	});
}

async function seekToPosition(positionMs: number) {
	return fetchAndHandleErrors(`${origin}${player.seek}`, {
		method: "PUT",
		headers: withAuthHeaders({}),
		params: {
			position_ms: positionMs,
		},
	});
}

async function setRepeatMode(state: "off" | "track" | "context") {
	return fetchAndHandleErrors(`${origin}${player.repeat}`, {
		method: "PUT",
		headers: withAuthHeaders({}),
		params: {
			state,
		},
	});
}

async function setVolume(volume: number) {
	return fetchAndHandleErrors(`${origin}${player.volume}`, {
		method: "PUT",
		headers: withAuthHeaders({}),
		params: {
			volume_percent: volume,
		},
	});
}

async function toggleShuffle(state: boolean) {
	return fetchAndHandleErrors(`${origin}${player.shuffle}`, {
		method: "PUT",
		headers: withAuthHeaders({}),
		params: {
			state,
		},
	});
}

async function getRecentlyPlayedTracks() {
	return fetchAndHandleErrors<GetRecentlyPlayedTracks>(
		`${origin}${player.recentlyPlayed}`,
		{
			headers: withAuthHeaders({}),
			params: {
				limit: MAX_ITEMS_IN_ROW,
			},
		},
	);
}

async function getUserQueue() {
	return fetchAndHandleErrors<GetUserQueue>(`${origin}${player.queue}`, {
		headers: withAuthHeaders({}),
	});
}

async function addToQueue(uri: string) {
	return fetchAndHandleErrors(`${origin}${player.addToQueue}`, {
		method: "POST",
		headers: withAuthHeaders({}),
		params: {
			uri,
		},
	});
}

export {
	getAvailableDevices,
	getCurrentlyPlayingTrack,
	getPlaybackState,
	skipToNext,
	skipToPrevious,
	transferPlayback,
	startOrResumePlayback,
	pausePlayback,
	seekToPosition,
	setRepeatMode,
	setVolume,
	toggleShuffle,
	getRecentlyPlayedTracks,
	getUserQueue,
	addToQueue,
};
