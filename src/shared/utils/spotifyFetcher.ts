import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY } from "./constants";
import { fetcher } from "./fetcher";

type CreateFetcherParams = {
	readonly endpoint: string;
	readonly method: "get" | "post" | "put" | "del";
	readonly options?: Record<
		string,
		string | string[] | number | boolean | undefined | null
	>;
	readonly headers?: Record<string, string>;
	readonly params?: Record<string, string | number | boolean>;
};

type SpotifyFetcher = {
	readonly endpoint: string;
	readonly options?: Record<
		string,
		string | string[] | number | boolean | undefined | null
	>;
	readonly headers?: Record<string, string>;
	readonly params?: Record<string, string | number | boolean>;
};

function createFetcher<T>({
	endpoint,
	method,
	params,
	options,
	headers,
}: CreateFetcherParams) {
	const cookieStore = cookies();
	const token = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

	if (!token) {
		NextResponse.redirect("/api/login");
	}

	return fetcher[method]<T>({
		endpoint,
		params,
		options,
		headers: {
			Authorization: `Bearer ${token}`,
			...headers,
		},
	});
}

function spotifyGet<T>(endpoint: string, params = {}) {
	return createFetcher<T>({ endpoint, method: "get", params });
}

function spotifyPut<T>({ endpoint, params, options, headers }: SpotifyFetcher) {
	return createFetcher<T>({
		endpoint,
		method: "put",
		params,
		options,
		headers,
	});
}

function spotifyPost<T>({
	endpoint,
	params,
	options,
	headers,
}: SpotifyFetcher) {
	return createFetcher<T>({
		endpoint,
		method: "post",
		params,
		options,
		headers,
	});
}

function spotifyDelete<T>({
	endpoint,
	params,
	options,
	headers,
}: SpotifyFetcher) {
	return createFetcher<T>({
		endpoint,
		method: "del",
		params,
		options,
		headers,
	});
}

export { spotifyDelete, spotifyGet, spotifyPost, spotifyPut };
