import { useEffect, useRef, useState } from "react";

function useDebounce(value: string | number | boolean, number: number) {
	const [debounceValue, setDebounceValue] = useState(value);
	const ref = useRef<ReturnType<typeof setInterval>>();

	useEffect(() => {
		ref.current = setTimeout(() => {
			setDebounceValue(value);
		}, number);

		return () => {
			clearTimeout(ref.current);
		};
	}, [value, number]);

	return debounceValue;
}

export { useDebounce };
