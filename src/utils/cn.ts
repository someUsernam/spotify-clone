type CN = string | number | boolean | null | undefined | object | Array<CN>;

export function cn(...args: CN[]): string {
	const classes = [];

	for (const arg of args) {
		if (!arg) continue;

		const argType = typeof arg;

		if (argType === "string" || argType === "number") {
			classes.push(arg);
		} else if (Array.isArray(arg) && arg.length) {
			const inner = cn(...arg);
			if (inner) {
				classes.push(inner);
			}
		} else if (argType === "object") {
			for (const [key, value] of Object.entries(arg)) {
				if (value) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(" ");
}
