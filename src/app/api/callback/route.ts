import { getAccessToken } from "@/services/spotify";
import { DEV_URL } from "@/utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const code = searchParams.get("code");
	const state = searchParams.get("state");

	const cookieStore = cookies();
	const storedState = cookieStore.get("state")?.value;

	if (state === undefined || state !== storedState) {
		NextResponse.redirect(
			`${DEV_URL}?${querystring.stringify({
				error: "state_mismatch",
			})}`,
		);
	}

	cookieStore.delete("state");

	const result = await getAccessToken(code);

	cookieStore.set("access_token", result.access_token);
	cookieStore.set("refresh_token", result.refresh_token);
	cookieStore.set("creation_time", String(Date.now()));
	cookieStore.set("expires_in", String(result.expires_in));

	return NextResponse.redirect(`${DEV_URL}`);
}
