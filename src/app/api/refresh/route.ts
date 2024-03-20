import { getRefreshToken } from "@/shared/services/spotify";
import {
	ACCESS_TOKEN_KEY,
	CREATION_TIME_KEY,
	DEV_URL,
	EXPIRES_IN_KEY,
	REFRESH_TOKEN_KEY,
} from "@utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	console.log("inside refresh token route");
	const cookieStore = cookies();
	const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

	const result: Token = await getRefreshToken(refreshToken);

	cookieStore.set(ACCESS_TOKEN_KEY, result.access_token);
	cookieStore.set(CREATION_TIME_KEY, String(Date.now()));
	cookieStore.set(EXPIRES_IN_KEY, String(result.expires_in));

	return NextResponse.redirect(`${DEV_URL}`);
}
