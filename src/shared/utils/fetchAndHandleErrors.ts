import { stringify } from "querystring";

class ResponseError extends Error {
	response: Response;

	constructor(res: Response, message = "Request failed") {
		super(message);
		this.response = res;
	}
}

export async function fetchAndHandleErrors<T>(
	...options: Parameters<typeof fetch>
): Promise<T | ErrorType> {
	try {
		console.log(options, "options");

		const init = options[1];
		const headers = init?.headers;

		if (headers && "Content-type" in headers) {
			if (headers["Content-type"] === "application/json") {
				init.body = JSON.stringify(init.body);
			}
			if (headers["Content-type"] === "application/x-www-form-urlencoded") {
				init.body = stringify(init.body);
			}
		}

		const res = await fetch(...options);

		if (!res.ok) {
			throw new ResponseError(res);
		}

		console.log(res);

		const contentType = res.headers.get("Content-Type");
		if (contentType?.includes("application/json")) {
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
