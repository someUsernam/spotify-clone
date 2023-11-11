import {
	AUTH_ENDPOINT,
	CLIENT_ID,
	REDIRECT_URI,
	SCOPES,
} from "@/utils/constants";
import { generateRandomString } from "@/utils/generateRandomString";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function GET() {
	const state = generateRandomString(16);

	const cookieStore = cookies();
	cookieStore.set("state", state);

	const queryParams = querystring.stringify({
		client_id: CLIENT_ID,
		response_type: "code",
		redirect_uri: REDIRECT_URI,
		scope: SCOPES,
		state,
	});

	return NextResponse.redirect(`${AUTH_ENDPOINT}?${queryParams}`);
}
