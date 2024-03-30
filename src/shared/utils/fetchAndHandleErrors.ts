import { setSearchParams } from "./setSearchParams";

type ExtendedRequestInit = RequestInit & {
	params?: Record<string, string | number | boolean>;
};

class ResponseError extends Error {
	response: Response;

	constructor(res: Response, message = "Request failed") {
		super(message);
		this.response = res;
	}
}

export async function fetchAndHandleErrors<T>(
	...options: [
		input: string | URL | Request,
		init?: ExtendedRequestInit | undefined,
	]
): Promise<T | ErrorType> {
	try {
		let [url, init] = options;

		if (init) {
			if (init.params) {
				url = new URL(url as string);
				setSearchParams(url, init.params);
				options[0] = url;
			}

			// if (init?.headers && "Content-type" in init.headers) {
			// 	if (init.headers["Content-type"] === "application/json") {
			// 		init.body = JSON.stringify(init.body);
			// 		options[1] = init;
			// 	}
			// if (headers["Content-type"] === "application/x-www-form-urlencoded") {
			// 	init.body = stringify(init.body);
			// }
			// }
		}

		const res = await fetch(...options);

		if (!res.ok) {
			throw new ResponseError(res);
		}

		const contentType = res.headers.get("Content-Type");
		if (
			contentType?.includes(
				"application/json" || "application/x-www-form-urlencoded",
			)
		) {
			return res.json() as Promise<T>;
		}
		if (contentType?.includes("text/html")) {
			return res.text() as Promise<T>;
		}

		return res as unknown as T;
	} catch (error: unknown) {
		if (error instanceof ResponseError) {
			const status = error.response.status;
			if (status !== 200) {
				return {
					error: {
						message: error.response.statusText,
						status,
					},
				};
			}
		}
		if (error instanceof Error) {
			return {
				error: {
					message: error.message,
					status: 500,
				},
			};
		}
		return {
			error: {
				message: `Unknown error ${error}`,
				status: 500,
			},
		};
	}
}
