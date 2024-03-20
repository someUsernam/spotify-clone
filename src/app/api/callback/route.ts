import { getAccessToken } from "@/shared/services/spotify";
import {
	ACCESS_TOKEN_KEY,
	CODE_KEY,
	CREATION_TIME_KEY,
	DEV_URL,
	EXPIRES_IN_KEY,
	REFRESH_TOKEN_KEY,
	STATE_KEY,
} from "@utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const code = searchParams.get(CODE_KEY);
	const state = searchParams.get(STATE_KEY);

	const cookieStore = cookies();
	const storedState = cookieStore.get(STATE_KEY)?.value;

	if (state === undefined || state !== storedState) {
		NextResponse.redirect(
			`${DEV_URL}?${querystring.stringify({
				error: "state_mismatch",
			})}`,
		);
	}

	cookieStore.delete(STATE_KEY);

	const result = await getAccessToken(code);

	cookieStore.set(ACCESS_TOKEN_KEY, result.access_token);
	cookieStore.set(REFRESH_TOKEN_KEY, result.refresh_token);
	cookieStore.set(CREATION_TIME_KEY, String(Date.now()));
	cookieStore.set(EXPIRES_IN_KEY, String(result.expires_in));

	return NextResponse.redirect(`${DEV_URL}`);
}
