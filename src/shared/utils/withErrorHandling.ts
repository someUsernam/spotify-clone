import { LINKS } from "@utils/constants";
import { redirect } from "next/navigation";

const { origin, login } = LINKS;

const LoginURL = `${origin}${login}`;

export async function withErrorHandling(fn: () => any) {
	try {
		const res = await fn();

		if (!res.ok) {
			if (res.status === 401) {
				redirect(LoginURL);
			}
			if (res.status === 403) {
				throw new Error("You are not authorized to access this resource.");
			}
			if (res.status === 423) {
				throw new Error("You are rate limited. Try again later.");
			}
			throw new Error("Something went wrong. Please try again later.");
		}
	} catch (error: unknown) {
		throw new Error(`Something went wrong: ${(error as Error).message}`);
	}
}
