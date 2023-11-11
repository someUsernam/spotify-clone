// import { DEV_URL } from "@/utils/constants";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
// 	const cookieStore = cookies();
// 	const expires_in = Number(cookieStore.get("expires_in")?.value);
// 	const creation_time = Number(cookieStore.get("creation_time")?.value);

// 	const { pathname } = new URL(request.url);

// 	if (
// 		Date.now() > creation_time + expires_in * 1000 &&
// 		pathname !== "/api/refresh"
// 	) {
// 		console.log("refreshing token");
// 		return NextResponse.redirect(`${DEV_URL}/api/refresh`);
// 	}

// 	console.log("not refreshing token");
// 	return NextResponse.next();
// }

// export const config = {
// 	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
