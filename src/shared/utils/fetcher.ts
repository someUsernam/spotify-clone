import { setSearchParams } from "./setSearchParams";

type FetcherGetParams = {
	readonly endpoint: string;
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

type FetcherParams = {
	readonly endpoint: string;
	readonly body?: Record<
		PropertyKey,
		| string
		| undefined
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

const fetcher = (() => {
	async function get<T>({
		endpoint,
		headers = {},
		params = {},
		options = {},
	}: FetcherGetParams): Promise<T> {
		const url = new URL(endpoint);

		setSearchParams(url, params);

		try {
			const response = await fetch(url, {
				headers,
				...options,
			});

			if (!response.ok) {
				return response as unknown as T;
			}

			const data: T = await response.json();

			return data;
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message, error.name);
				console.log("Error in get");
			}
		}
	}

	async function post<T>({
		endpoint,
		body = {},
		headers = {},
		params = {},
	}: FetcherParams): Promise<T> {
		const url = new URL(endpoint);

		setSearchParams(url, params);

		try {
			const response = await fetch(url, {
				method: "POST",
				headers,
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				return response as unknown as T;
			}

			const data: T = await response.json();

			return data;
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message, error.name);
				console.log("Error in post");
			}
		}
	}

	async function put<T>({
		endpoint,
		body = {},
		headers = {},
		params = {},
	}: FetcherParams): Promise<T> {
		const url = new URL(endpoint);

		setSearchParams(url, params);
		try {
			const response = await fetch(url, {
				method: "PUT",
				headers,
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				return response as unknown as T;
			}

			const data: T = await response.json();

			return data;
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message, error.name);
				console.log("Error in put");
			}
		}
	}

	async function del<T>({
		endpoint,
		body = {},
		headers = {},
	}: FetcherParams): Promise<T> {
		try {
			const response = await fetch(endpoint, {
				method: "DELETE",
				headers,
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				return response as unknown as T;
			}

			const data: T = await response.json();

			return data;
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message, error.name);
				console.log("Error in delete");
			}
		}
	}

	return {
		del,
		put,
		get,
		post,
	};
})();

export { fetcher };
