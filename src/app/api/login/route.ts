import { generateRandomString } from "@/shared/utils/generateRandomString";
import {
	CLIENT_ID,
	CODE_KEY,
	REDIRECT_URI,
	SCOPES,
	STATE_KEY,
	endpoint,
} from "@utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import querystring from "querystring";

const { authEndpoint } = endpoint.spotify;

export async function GET() {
	const state = generateRandomString(16);

	const cookieStore = cookies();
	cookieStore.set(STATE_KEY, state);

	const queryParams = querystring.stringify({
		client_id: CLIENT_ID,
		response_type: CODE_KEY,
		redirect_uri: REDIRECT_URI,
		scope: SCOPES,
		state,
	});

	return NextResponse.redirect(`${authEndpoint}?${queryParams}`);
}
