export function onServerError<T extends object>(
	obj: T | ErrorType,
	message = "Error occured",
): asserts obj is T {
	if (obj === null || obj === undefined) {
		console.log(`throwError ❌ ${message} - object is null or undefined`);
		throw new Error("Error occured");
	}

	if (typeof obj === "object" && "error" in obj) {
		console.log(`throwError ❌ ${obj.error.message} - ${obj.error.status}`);
		throw new Error(`${obj.constructor.name} ${message}`);
	}
}
