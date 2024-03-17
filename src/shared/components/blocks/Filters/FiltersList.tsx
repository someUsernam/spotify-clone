"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useRef } from "react";

export const FiltersTags = [
	{ href: "", label: "All" },
	{ href: "/artists", label: "Artists" },
	{ href: "/tracks", label: "Songs" },
	{ href: "/playlists", label: "Playlists" },
	{ href: "/albums", label: "Albums" },
	{ href: "/podcastAndEpisodes", label: "Podcasts & Shows" },
	{ href: "/users", label: "Profiles" },
	{ href: "/genres", label: "Genres & Moods" },
];

const activeFilter = "dark:bg-primary dark:text-secondary";
const inactiveFilter =
	"dark:bg-primary/[0.08] hover:bg-primary/[0.15] dark:text-primary";

function FiltersList() {
	const pathname = usePathname();
	const { query } = useParams();
	const observerTarget = useRef(null);

	return (
		<>
			{FiltersTags.map((tag) => (
				<Link
					className={`py-1 px-3 cursor-pointer transition-colors rounded-full text-sm ${
						`/search/${query}${tag.href}` === pathname
							? activeFilter
							: inactiveFilter
					} `}
					href={`/search/${query}/${tag.href}`}
					key={tag.label}
					ref={observerTarget}
				>
					{tag.label}
				</Link>
			))}
		</>
	);
}
export { FiltersList };
