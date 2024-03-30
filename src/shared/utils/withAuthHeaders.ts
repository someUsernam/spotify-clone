import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { KEYS, LINKS } from "./constants";

const { origin, login } = LINKS;

export function withAuthHeaders(headers: HeadersInit): HeadersInit {
	const cookieStore = cookies();
	const token = cookieStore.get(KEYS.access_token)?.value;

	if (!token) {
		NextResponse.redirect(`${origin}${login}`);
	}

	return {
		Authorization: `Bearer ${token}`,
		...headers,
	};
}
