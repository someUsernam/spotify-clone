import { HoursMinutesSeconds } from "@/shared/utils/HoursMinutesSeconds";
import Image from "next/image";

const variants = {
	withImg: {
		layout: "h-[30vh] max-h-[400px] min-h-[340px] gap-x-6 ",
		tagline: "inline-grid grid-cols-[auto_1fr] gap-x-2",
		title: "cursor-pointer",
		subtitle: "text-sm",
	},
	withoutImg: {
		layout: "h-[40vh] flex-col",
		tagline: "flex gap-x-2 items-center capitalize",
		title: "",
		subtitle: "leading-loose",
	},
};

type HeaderProps = {
	variant: keyof typeof variants;
	playlists?: Playlist;
	children: React.ReactNode;
};

const HeaderContext: Map<
	"variant" | "playlist",
	HeaderProps["variant"] | HeaderProps["playlists"]
> = new Map();

function Header({ variant = "withImg", playlists, children }: HeaderProps) {
	HeaderContext.set("variant", variant);
	HeaderContext.set("playlist", playlists);

	return (
		<header
			className={`pb-4 @md:pb-5 @lg:pb-6 text-primary flex overflow-hidden select-none items-end -mt-16 ${variants[variant].layout}`}
			data-variant={variant}
		>
			{children}
		</header>
	);
}

function Tagline({ children }: ChildrenProps) {
	const variant = HeaderContext.get("variant") as HeaderProps["variant"];

	return (
		<span className={`text-sm ${variants[variant].tagline}`}>{children}</span>
	);
}

function Img() {
	const playlist = HeaderContext.get("playlist") as Playlist;

	return (
		<figure>
			<Image
				src={playlist.images[0].url}
				className="w-[232px] shadow-xl dark:shadow-neutral-900"
				alt={`${playlist.name} ${playlist.type}`}
				width={232}
				height={232}
			/>
		</figure>
	);
}

function Title({ children }: ChildrenProps) {
	const variant = HeaderContext.get("variant") as HeaderProps["variant"];

	return (
		<span className="line-clamp-3 leading-tight mt-2 text-left break-words">
			<h1
				className={`mt-[0.08em] mb-[0.12em] font-black whitespace-nowrap text-[3.5rem] @md:text-8xl ${variants[variant].title}`}
			>
				{children}
			</h1>
		</span>
	);
}

function Subtitle({ children }: ChildrenProps) {
	const variant = HeaderContext.get("variant") as HeaderProps["variant"];
	const playlist = HeaderContext.get("playlist") as Playlist;

	let duration = "";

	if (playlist) {
		const [hours, minutes, seconds] = HoursMinutesSeconds(
			playlist.tracks?.items.reduce(
				(total: number, curr) => total + curr.track.duration_ms,
				0,
			),
		);

		duration =
			hours > 0
				? `${hours} hr ${minutes} min`
				: `${minutes} min ${seconds} sec`;
	}

	return (
		<span className={`mt-1 flex ${variants[variant].subtitle}`}>
			{variant === "withImg" ? (
				<>
					<figure>
						<Image
							src={playlist.images[0].url}
							alt={`${playlist.owner.display_name} profile picture`}
							width={24}
							height={24}
							className="rounded-full object-cover object-center"
						/>
					</figure>
					{children}
					<span
						data-before="&#8226;"
						className=" before:content-[attr(data-before)] before:p-1"
					>
						<span>{playlist.tracks.total} songs,&nbsp;</span>
						<span className="text-primary/70">{duration}</span>
					</span>
				</>
			) : (
				children
			)}
		</span>
	);
}

Header.Tagline = Tagline;
Header.Img = Img;
Header.Title = Title;
Header.Subtitle = Subtitle;

export { Header };
