import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY, endpoint } from "./constants";
import { fetcher } from "./fetcher";

const { origin } = endpoint.spotify;

type CreateGetFetcherParams = {
	readonly endpoint: string;
	readonly method: "get" | "post" | "put" | "del";
	readonly options?: Record<
		PropertyKey,
		| string
		| string[]
		| number
		| boolean
		| undefined
		| null
		| Record<string, [string] | undefined>
	>;
	readonly headers?: Record<string, string>;
	readonly params?: Record<string, string | number | boolean>;
};

type CreateFetcherParams = {
	readonly endpoint: string;
	readonly method: "get" | "post" | "put" | "del";
	readonly body?: Record<
		PropertyKey,
		| string
		| number
		| boolean
		| readonly string[]
		| readonly number[]
		| readonly boolean[]
		| null
	>;
	readonly headers?: Record<string, string>;
	readonly params?: Record<string, string | number | boolean>;
};

type SpotifyFetcher = {
	readonly endpoint: string;
	readonly body?: Record<
		PropertyKey,
		| string
		| number
		| boolean
		| readonly string[]
		| readonly number[]
		| readonly boolean[]
		| null
	>;
	readonly headers?: Record<string, string>;
	readonly params?: Record<string, string | number | boolean>;
};

type SpotifyGet = {
	readonly endpoint: string;
	readonly params?: Record<string, string | number | boolean>;
	readonly tag?: [string];
};

function createGetFetcher<T>({
	endpoint,
	method,
	params,
	options,
	headers,
}: CreateGetFetcherParams) {
	const cookieStore = cookies();
	const token = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

	if (!token) {
		NextResponse.redirect(`${origin}/api/login`);
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

function createFetcher<T>({
	endpoint,
	method,
	params,
	body,
	headers,
}: CreateFetcherParams) {
	const cookieStore = cookies();
	const token = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

	if (!token) {
		NextResponse.redirect(`${origin}/api/login`);
	}

	return fetcher[method]<T>({
		endpoint,
		params,
		body,
		headers: {
			Authorization: `Bearer ${token}`,
			...headers,
		},
	});
}

function spotifyGet<T>({ endpoint, params, tag }: SpotifyGet) {
	return createGetFetcher<T>({
		endpoint,
		method: "get",
		params,
		options: { next: { tags: tag } },
	});
}

function spotifyPut<T>({ endpoint, params, body, headers }: SpotifyFetcher) {
	return createFetcher<T>({
		endpoint,
		method: "put",
		params,
		body,
		headers,
	});
}

function spotifyPost<T>({ endpoint, params, body, headers }: SpotifyFetcher) {
	return createFetcher<T>({
		endpoint,
		method: "post",
		params,
		body,
		headers,
	});
}

function spotifyDelete<T>({ endpoint, params, body, headers }: SpotifyFetcher) {
	return createFetcher<T>({
		endpoint,
		method: "del",
		params,
		body,
		headers,
	});
}

export { spotifyDelete, spotifyGet, spotifyPost, spotifyPut };
