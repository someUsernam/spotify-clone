import { HoursMinutesSeconds } from "@/utils/HoursMinutesSeconds";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEllipsis } from "react-icons/ai";
import { TbHeart } from "react-icons/tb";

type TitleProps = {
	children: React.ReactNode;
	imageSrc: string;
	imageAlt: string;
	href: string;
	artistsItems: Artist[];
};

type AlbumProps = {
	children: React.ReactNode;
	href: string;
};

function PlaylistItem({ children }: ChildrenProps) {
	let variant;

	if (Array.isArray(children)) {
		if (children.length < 4) {
			variant = "";
		} else if (children.length === 4) {
			variant =
				"@2xl:grid-cols-[16px_6fr_4fr_minmax(120px,1fr)] @lg:grid-cols-[16px_4fr_2fr_minmax(20px,1fr)]";
		} else {
			variant =
				"@2xl:grid-cols-[16px_6fr_4fr_3fr_minmax(120px,1fr)] @lg:grid-cols-[16px_4fr_2fr_minmax(20px,1fr)]";
		}
	}

	return (
		<div
			className={`grid grid-cols-[16px_1fr_minmax(60px,120px)] grid-flow-col gap-x-4 h-14 px-4 items-center select-none dark:hover:bg-neutral-700 dark:hover:bg-main-essential-primary/10 rounded-md group ${variant}`}
		>
			{children}
		</div>
	);
}

function Index({ children }: ChildrenProps) {
	return <div>{children}</div>;
}

function Title({
	children,
	imageSrc,
	imageAlt,
	href,
	artistsItems,
}: TitleProps) {
	return (
		<div className="flex items-center gap-x-4 line-clamp-3">
			<Image
				src={imageSrc}
				alt={`${imageAlt} track picture`}
				width={40}
				height={40}
				className="h-10 aspect-square rounded-sm"
			/>
			<div className="flex flex-col">
				<Link
					href={`/track/${href}`}
					className="line-clamp-1 dark:text-primary hover:underline hover:underline-offset-1 cursor-pointer"
				>
					{children}
				</Link>
				<span className="line-clamp-1">
					{artistsItems.map((artist, i, arr) => (
						<Link
							className=" hover:underline hover:underline-offset-1 text-sm cursor-pointer dark:group-hover:text-primary"
							href={`/artist/${artist.id}`}
							key={artist.id}
						>
							{arr.length > 1
								? i !== arr.length - 1
									? `${artist.name}, `
									: artist.name
								: artist.name}
						</Link>
					))}
				</span>
			</div>
		</div>
	);
}

function Album({ children, href }: AlbumProps) {
	return (
		<Link
			href={`/album/${href}`}
			className="truncate dark:group-hover:text-primary hover:underline hover:underline-offset-1 cursor-pointer text-sm hidden @lg:block"
		>
			{children}
		</Link>
	);
}

function DateAdded({ children }: ChildrenProps) {
	return (
		<div className="hidden @2xl:block truncate text-sm">
			{formatDate(children as string)}
		</div>
	);
}

function Duration({ children }: ChildrenProps) {
	return (
		<div className="text-sm flex items-center justify-center group-hover:justify-between">
			<button type="button" className="hidden group-hover:block">
				<TbHeart size={21} />
			</button>
			{HoursMinutesSeconds(children as number).join(":")}
			<button type="button" className="hidden group-hover:block">
				<AiOutlineEllipsis size={25} className="dark:text-primary" />
			</button>
		</div>
	);
}

PlaylistItem.Index = Index;
PlaylistItem.Title = Title;
PlaylistItem.Album = Album;
PlaylistItem.DateAdded = DateAdded;
PlaylistItem.Duration = Duration;

export default PlaylistItem;
