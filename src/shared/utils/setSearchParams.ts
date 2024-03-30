export function setSearchParams(
	url: URL,
	params: Record<string, string | number | boolean>,
) {
	if (Object.keys(params).length === 0) {
		return;
	}

	for (const key in params) {
		if (params[key] !== undefined) {
			url.searchParams.set(key, String(params[key]));
		}
	}
}
