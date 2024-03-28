import { getAccessToken } from "@/shared/services/auth";
import { KEYS, LINKS } from "@utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { stringify } from "querystring";

const { origin } = LINKS;

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const code = searchParams.get(KEYS.code);
	const state = searchParams.get(KEYS.state);

	const cookieStore = cookies();
	const storedState = cookieStore.get(KEYS.state)?.value;

	if (state === undefined || state !== storedState) {
		NextResponse.redirect(
			`${origin}?${stringify({
				error: "state_mismatch",
			})}`,
		);
	}

	cookieStore.delete(KEYS.state);

	const result = await getAccessToken(code);

	if (!result || "error" in result) {
		return NextResponse.redirect(
			`${origin}?${stringify({
				error: "access_token_error",
			})}`,
		);
	}

	cookieStore.set(KEYS.access_token, result.access_token);
	cookieStore.set(KEYS.refresh_token, result.refresh_token);
	cookieStore.set(KEYS.creation_time, String(Date.now()));
	cookieStore.set(KEYS.expires_in, String(result.expires_in));

	return NextResponse.redirect(`${origin}`);
}
