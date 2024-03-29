import { getRefreshToken } from "@/shared/services/spotify";
import { KEYS, LINKS } from "@utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { stringify } from "querystring";

const { origin } = LINKS;

export async function GET() {
	console.log("inside refresh token route");
	const cookieStore = cookies();
	const refreshToken = cookieStore.get(KEYS.refresh_token)?.value;

	const result = await getRefreshToken(refreshToken);

	if (!result || "error" in result) {
		return NextResponse.redirect(
			`${origin}?${stringify({
				error: "refresh_token_error",
			})}`,
		);
	}

	cookieStore.set(KEYS.access_token, result.access_token);
	cookieStore.set(KEYS.creation_time, String(Date.now()));
	cookieStore.set(KEYS.expires_in, String(result.expires_in));

	return NextResponse.redirect(`${origin}`);
}
