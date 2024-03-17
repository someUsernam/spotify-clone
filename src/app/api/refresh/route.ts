import { getRefreshToken } from "@/shared/services/spotify";
import { DEV_URL } from "@utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	console.log("inside refresh token route");
	const cookieStore = cookies();
	const refreshToken = cookieStore.get("refresh_token")?.value;

	const result: Token = await getRefreshToken(refreshToken);

	cookieStore.set("access_token", result.access_token);
	cookieStore.set("creation_time", String(Date.now()));
	cookieStore.set("expires_in", String(result.expires_in));

	return NextResponse.redirect(`${DEV_URL}`);
}
