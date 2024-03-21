import querystring from "querystring";
import { setSearchParams } from "./setSearchParams";

type FetcherParams = {
	readonly endpoint: string;
	readonly options?: Record<
		string,
		string | string[] | number | boolean | undefined | null
	>;
	readonly headers?: Record<string, string>;
	readonly params?: Record<string, string | number | boolean>;
};

const fetcher = (() => {
	async function get<T>({
		endpoint,
		headers = {},
		params = {},
		options = {},
	}: FetcherParams): Promise<T> {
		const url = new URL(endpoint);

		setSearchParams(url, params);

		const response = await fetch(url, {
			headers,
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
		options = {},
		headers = {},
		params = {},
	}: FetcherParams): Promise<T> {
		const url = new URL(endpoint);

		setSearchParams(url, params);

		const response = await fetch(url, {
			method: "POST",
			headers,
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
		options = {},
		headers = {},
		params = {},
	}: FetcherParams): Promise<T> {
		const url = new URL(endpoint);

		setSearchParams(url, params);

		const response = await fetch(url, {
			method: "PUT",
			headers,
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
		options = {},
		headers = {},
	}: FetcherParams): Promise<T> {
		const response = await fetch(endpoint, {
			method: "DELETE",
			headers,
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
