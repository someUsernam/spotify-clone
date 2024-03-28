"use server";

import { stringify } from "querystring";
import { REDIRECT_URI, basic, endpoint } from "../utils/constants";

const { tokenEndpoint } = endpoint.spotify;

async function getAccessToken(code: string | null): Promise<Token | ErrorType> {
	if (code === null) {
		return {
			error: {
				message: "Code is null",
				status: 400,
			},
		};
	}

	try {
		const response = await fetch(tokenEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${basic}`,
			},
			body: stringify({
				grant_type: "authorization_code",
				redirect_uri: REDIRECT_URI,
				code: code,
			}),
		});

		if (!response.ok) {
			return response as unknown as ErrorType;
		}

		const data: Token = await response.json();

		return data;
	} catch (error: unknown) {
		return {
			error: {
				message: (error as Error).message,
				status: 500,
			},
		};
	}
}

async function getRefreshToken(
	refreshToken: string | undefined,
): Promise<Token | ErrorType | undefined> {
	if (refreshToken === undefined) {
		return {
			error: {
				message: "Refresh token is undefined",
				status: 400,
			},
		};
	}

	try {
		const response = await fetch(tokenEndpoint, {
			method: "POST",
			headers: {
				Authorization: `Basic ${basic}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: stringify({
				grant_type: "refresh_token",
				refresh_token: refreshToken,
			}),
		});

		if (!response.ok) {
			return response as unknown as ErrorType;
		}

		const data: Token = await response.json();

		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {
				error: {
					message: error.message,
					status: 500,
				},
			};
		}
	}
}

export { getAccessToken, getRefreshToken };
