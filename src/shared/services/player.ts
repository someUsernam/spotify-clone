"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { KEYS, TAGS, endpoint } from "../utils/constants";

const { origin, player } = endpoint.spotify;

async function skipToNext() {
	const cookieStore = cookies();
	const access_token = cookieStore.get(KEYS.access_token)?.value;

	try {
		console.log("post skip to next");
		await fetch(`${origin}${player.next}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		// console.log("revalidateTag(TAGS.get_currently_playing_track)");

		revalidateTag(TAGS.get_currently_playing_track);
		revalidatePath("/");
		console.log("revalidated (TAGS.get_currently_playing_track)");
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message, error.cause);
			console.log("Error in skipToNext");
		}
	}
}

async function getCurrentlyPlayingTrack(): Promise<
	GetCurrentlyPlayingTrack | undefined
> {
	const cookieStore = cookies();
	const access_token = cookieStore.get(KEYS.access_token)?.value;

	try {
		console.log("fetch currently playing track");
		const res = await fetch(`${origin}${player.currentlyPlaying}`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: "no-store",
			next: {
				tags: [TAGS.get_currently_playing_track],
			},
		});

		const data: GetCurrentlyPlayingTrack = await res.json();

		if (!("error" in data)) {
			console.log("fetched currently playing track", {
				name: data?.item?.name,
				headers: res.headers,
			});
		}

		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message, error.cause);
			console.log("Error in getCurrentlyPlayingTrack");
		}
	}
}
// async function getCurrentlyPlayingTrack() {
// 	return spotifyGet<CurrentlyPlayingTrack>({
// 		endpoint: `${origin}${player.currentlyPlaying}`,
// 		tag: [TAGS.currently_playing_track],
// 	});
// }

export { getCurrentlyPlayingTrack, skipToNext };
