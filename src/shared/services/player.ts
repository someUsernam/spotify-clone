"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { KEYS, TAGS, endpoint } from "../utils/constants";

const { origin, player } = endpoint.spotify;

async function skipToNext() {
	const cookieStore = cookies();
	const access_token = cookieStore.get(KEYS.access_token)?.value;

	try {
		await fetch(`${origin}${player.next}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		revalidateTag(TAGS.get_currently_playing_track);
	} catch (error: unknown) {
		console.error((error as Error).message);
	}
}

async function skipToPrevious() {
	const cookieStore = cookies();
	const access_token = cookieStore.get(KEYS.access_token)?.value;

	try {
		await fetch(`${origin}${player.previous}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		revalidateTag(TAGS.get_currently_playing_track);
	} catch (error: unknown) {
		console.error((error as Error).message);
	}
}

async function getCurrentlyPlayingTrack(): Promise<
	GetCurrentlyPlayingTrack | undefined
> {
	const cookieStore = cookies();
	const access_token = cookieStore.get(KEYS.access_token)?.value;

	try {
		const res = await fetch(`${origin}${player.currentlyPlaying}`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			next: {
				tags: [TAGS.get_currently_playing_track],
			},
		});

		const data: GetCurrentlyPlayingTrack = await res.json();

		// if (!("error" in data)) {
		// 	console.log("fetched currently playing track", {
		// 		name: data?.item?.name,
		// 		headers: res.headers,
		// 	});
		// }

		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message, error.cause);
		}
	}
}

export { getCurrentlyPlayingTrack, skipToNext, skipToPrevious };
