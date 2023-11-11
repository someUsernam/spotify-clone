import { DEV_URL, SPOTIFY_API_ORIGIN, basic } from "@/utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import querystring from "querystring";

interface FetcherGetParams {
	readonly endpoint: string;
	readonly params?: Record<string, string>;
	readonly options?: Record<string, string | undefined | null>;
}

interface FetcherPostParams {
	readonly endpoint: string;
	readonly options: Record<string, string | undefined | null>;
}

const fetcher = (function () {
	async function get<T>({
		endpoint,
		params = {},
		options = {},
	}: FetcherGetParams): Promise<T> {
		const cookieStore = cookies();
		const token = cookieStore.get("access_token")?.value;

		const url = new URL(`${SPOTIFY_API_ORIGIN}/${endpoint}`);

		for (const [key, value] of Object.entries(params)) {
			if (value !== undefined) {
				url.searchParams.set(key, value);
			}
		}

		try {
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				...options,
			});

			if (!response.ok) {
				NextResponse.redirect(`${DEV_URL}/api/login?$`);
			}

			const data: T = await response.json();

			return data;
		} catch (error) {
			// NextResponse.json({ error: (error as Error).message });
			NextResponse.redirect(`${DEV_URL}/api/refresh`);
			throw new Error((error as Error).message);
		}
	}

	async function post<T>({ endpoint, options }: FetcherPostParams): Promise<T> {
		const cookieStore = cookies();
		const token = cookieStore.get("access_token")?.value;
		const expiresIn = Number(cookieStore.get("expires_in")?.value);
		const creationTime = Number(cookieStore.get("creation_time")?.value);

		try {
			if (Date.now() < creationTime + expiresIn * 1000) {
				return token as T;
			}

			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Basic ${basic}`,
				},
				body: querystring.stringify(options),
			});

			if (!response.ok) {
				NextResponse.json({ error: response.statusText });
			}

			const data: T = await response.json();

			return data;
		} catch (error) {
			NextResponse.json({ error: (error as Error).message });
			throw new Error((error as Error).message);
		}
	}

	return {
		get,
		post,
	};
})();

export { fetcher };
