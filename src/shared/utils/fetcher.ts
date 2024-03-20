import { SPOTIFY_API_ORIGIN, basic } from "@utils/constants";
import { cookies } from "next/headers";
import querystring from "querystring";

type FetcherGetParams = {
	readonly endpoint: string;
	readonly params?: Record<string, string>;
	readonly options?: Record<string, string | undefined | null>;
};

type FetcherPostParams = {
	readonly endpoint: string;
	readonly options?: Record<
		string,
		string | string[] | number | boolean | undefined | null
	>;
	readonly headers?: Record<string, string>;
};

function setSearchParams(url: URL, params: Record<string, string>) {
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined) {
			url.searchParams.set(key, value);
		}
	}
}

const fetcher = (() => {
	async function get<T>({
		endpoint,
		params = {},
		options = {},
	}: FetcherGetParams): Promise<T> {
		const cookieStore = cookies();
		const token = cookieStore.get("access_token")?.value;

		const url = new URL(`${SPOTIFY_API_ORIGIN}${endpoint}`);

		setSearchParams(url, params);

		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			...options,
		});

		if (!response.ok) {
			return response as unknown as T;
		}

		const data: T = await response.json();

		return data;
	}

	async function post<T>({
		endpoint,
		options,
		headers,
	}: FetcherPostParams): Promise<T> {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				Authorization: `Basic ${basic}`,
				...headers,
			},
			body: querystring.stringify(options),
		});

		if (!response.ok) {
			return response as unknown as T;
		}

		const data: T = await response.json();

		return data;
	}

	async function put<T>({
		endpoint,
		options,
		headers,
	}: FetcherPostParams): Promise<T> {
		const response = await fetch(endpoint, {
			method: "PUT",
			headers: {
				Authorization: `Basic ${basic}`,
				...headers,
			},
			body: querystring.stringify(options),
		});

		if (!response.ok) {
			return response as unknown as T;
		}

		const data: T = await response.json();

		return data;
	}

	async function del<T>({
		endpoint,
		options,
		headers,
	}: FetcherPostParams): Promise<T> {
		const response = await fetch(endpoint, {
			method: "DELETE",
			headers: {
				Authorization: `Basic ${basic}`,
				...headers,
			},
			body: querystring.stringify(options),
		});

		if (!response.ok) {
			return response as unknown as T;
		}

		const data: T = await response.json();

		return data;
	}

	return {
		del,
		put,
		get,
		post,
	};
})();

export { fetcher };
