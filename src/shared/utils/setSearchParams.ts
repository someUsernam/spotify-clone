export function setSearchParams(url: URL, params: Record<string, string>) {
	if (Object.keys(params).length === 0) {
		return;
	}

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined) {
			url.searchParams.set(key, value);
		}
	}
}