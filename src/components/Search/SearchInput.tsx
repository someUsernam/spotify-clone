"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ONE_SECOND_DELAY = 1000;

function SearchInput() {
	const [query, setQuery] = useState("");
	const router = useRouter();
	const pathname = usePathname();
	const timeout = useRef<ReturnType<typeof setInterval>>();

	function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (pathname.includes("/search")) {
			setQuery(event.target.value);
		}
	}

	useEffect(() => {
		if (query.length < 2) return;

		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			router.push(`/search/${query.toLowerCase()}`);
		}, ONE_SECOND_DELAY);

		return () => {
			clearTimeout(timeout.current);
		};
	}, [query, router]);

	return (
		<input
			type="text"
			className="dark:bg-elevated-secondary dark:hover:bg-elevated-highlight-secondary dark:placeholder:text-main-essential-subdued placeholder:font-medium focus:border-2 dark:focus:border-main-essential-primary hover:border dark:hover:border-[hsla(0,0%,100%,.2)] rounded-full px-9 py-1.5 truncate text-sm [flex:0_1_364px] h-12 outline-none"
			placeholder="What do you want to listen to?"
			autoCorrect="off"
			autoCapitalize="off"
			maxLength={800}
			spellCheck="false"
			onChange={handleQueryChange}
			value={query}
		/>
	);
}
export default SearchInput;
