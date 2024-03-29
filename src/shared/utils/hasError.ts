export function hasError<T>(obj: T | ErrorType): obj is ErrorType {
	return (
		obj === null ||
		obj === undefined ||
		(typeof obj === "object" && "error" in obj)
	);
}
