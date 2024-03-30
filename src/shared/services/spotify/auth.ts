"use server";

import { fetchAndHandleErrors } from "@/shared/utils/fetchAndHandleErrors";
import { stringify } from "querystring";
import { REDIRECT_URI, basic, endpoint } from "../../utils/constants";

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

	return await fetchAndHandleErrors<Token>(tokenEndpoint, {
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
}

async function getRefreshToken(
	refreshToken: string | undefined,
): Promise<Token | ErrorType> {
	if (refreshToken === undefined) {
		return {
			error: {
				message: "Refresh token is undefined",
				status: 400,
			},
		};
	}

	return await fetchAndHandleErrors(tokenEndpoint, {
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
}

export { getAccessToken, getRefreshToken };
