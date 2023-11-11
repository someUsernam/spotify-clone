function onError<T extends ErrorType>(result: T) {
	if (result?.error) {
		throw new Error(`${result.error.message} - ${result.error.status}`);
	}
}

export { onError };
