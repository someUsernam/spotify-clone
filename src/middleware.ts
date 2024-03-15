import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECOND = 1000;
const EXPIRES_IN_KEY = "expires_in";
const CREATION_TIME_KEY = "creation_time";
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_PATH = "/api/refresh";
const LOGIN_PATH = "/api/login";

function isExpired(expires_in: number, creation_time: number) {
	return Date.now() > creation_time + expires_in * SECOND;
}

export async function middleware(request: NextRequest) {
	const cookieStore = cookies();
	const expires_in = Number(cookieStore.get(EXPIRES_IN_KEY)?.value);
	const creation_time = Number(cookieStore.get(CREATION_TIME_KEY)?.value);
	const access_token = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
	const { pathname, origin } = new URL(request.url);

	if (Number.isNaN(expires_in) || Number.isNaN(creation_time)) {
		console.log(
			`Invalid values: ${EXPIRES_IN_KEY}=${expires_in}, ${CREATION_TIME_KEY}=${creation_time}`,
		);
		return NextResponse.next();
	}

	if (isExpired(expires_in, creation_time) && pathname !== REFRESH_PATH) {
		return NextResponse.redirect(new URL(REFRESH_PATH, origin));
	}

	if (!access_token && pathname !== LOGIN_PATH) {
		return NextResponse.redirect(new URL(LOGIN_PATH, origin));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
