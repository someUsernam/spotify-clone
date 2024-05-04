import { LiaClock } from "react-icons/lia";

type PlaylistLayoutProps = {
	children: React.ReactNode;
	all?: boolean;
};

function PlaylistLayout({ children, all = false }: PlaylistLayoutProps) {
	let variant = "";
	if (all) {
		variant = "grid-cols-[16px_6fr_4fr_3fr_minmax(120px,1fr)]";
	} else {
		variant = "grid-cols-[16px_6fr_4fr_minmax(120px,1fr)]";
	}

	return (
		<>
			<div>
				<div
					className={`sticky top-16 px-4 z-2 grid grid-cols-[16px_1fr_minmax(60px,120px)] @2xl:${variant} @lg:grid-cols-[16px_4fr_2fr_minmax(20px,1fr)] grid-flow-col gap-x-4 border-b border-solid dark:border-highlight`}
				>
					<div>#</div>
					<div>Title</div>
					<div className="hidden @lg:block">Album</div>
					{all && <div className="hidden @2xl:block">Date Added</div>}
					<div className="place-self-center">
						<LiaClock size={24} />
					</div>
				</div>
				{children}
			</div>
		</>
	);
}
export default PlaylistLayout;
