import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { KEYS, LINKS } from "./shared/utils/constants";

const SECOND = 1000;

function isExpired(expires_in: number, creation_time: number) {
	return Date.now() > creation_time + expires_in * SECOND;
}

// const { spotify } = endpoint;

export async function middleware(request: NextRequest) {
	const cookieStore = cookies();
	const expires_in = Number(cookieStore.get(KEYS.expires_in)?.value);
	const creation_time = Number(cookieStore.get(KEYS.creation_time)?.value);
	const access_token = cookieStore.get(KEYS.access_token)?.value;
	const refresh_token = cookieStore.get(KEYS.refresh_token)?.value;
	const { pathname, origin } = new URL(request.url);

	//TODO: middleware headers setting,
	// CURRENT PROBLEM: next is not intercepting fetch requests nor server functions
	// check if request is to spotify api
	// console.log({ requestUrl: request.url });
	// if (request.url.startsWith(spotify.origin)) {
	// 	console.log("middleware: spotify api 😀");
	// 	const requestHeaders = new Headers(request.headers);
	// 	requestHeaders.set("Authorization", `Bearer ${access_token}`);

	// 	return NextResponse.next({
	// 		request: {
	// 			headers: requestHeaders,
	// 		},
	// 	});
	// }

	if (!access_token && !refresh_token && pathname !== LINKS.login) {
		return NextResponse.redirect(new URL(LINKS.login, origin));
	}

	if (Number.isNaN(expires_in) || Number.isNaN(creation_time)) {
		console.log(
			`Invalid values: ${KEYS.expires_in}=${expires_in}, ${KEYS.creation_time}=${creation_time}`,
		);
		return NextResponse.next();
	}

	if (isExpired(expires_in, creation_time) && pathname !== LINKS.refresh) {
		return NextResponse.redirect(new URL(LINKS.refresh, origin));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
