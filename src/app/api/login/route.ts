import { generateRandomString } from "@/shared/utils/generateRandomString";
import {
	CLIENT_ID,
	KEYS,
	REDIRECT_URI,
	SCOPES,
	endpoint,
} from "@utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import querystring from "querystring";

const { authEndpoint } = endpoint.spotify;

export async function GET() {
	const state = generateRandomString(16);

	const cookieStore = cookies();
	cookieStore.set(KEYS.state, state);

	const queryParams = querystring.stringify({
		client_id: CLIENT_ID,
		response_type: KEYS.code,
		redirect_uri: REDIRECT_URI,
		scope: SCOPES,
		state,
	});

	return NextResponse.redirect(`${authEndpoint}?${queryParams}`);
}
