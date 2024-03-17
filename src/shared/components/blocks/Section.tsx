import Link from "next/link";

interface SectionProps {
	children: React.ReactNode;
	title?: string;
	href?: string;
	variant?: keyof typeof variants;
}

const variants = {
	inline: "auto-rows-[0px] gap-x-6",
	block: "auto-rows-auto gap-6",
};

function Section({
	title = "",
	href,
	children,
	variant = "inline",
}: SectionProps) {
	return (
		<section
			className="@container flex flex-col flex-auto basis-full pb-4 pt-2 overflow-x-hidden select-none relative"
			data-variants={variant}
		>
			{title && (
				<div className="flex mb-4">
					<h2 className="grow text-2xl font-bold dark:text-primary">{title}</h2>
					{href && (
						<Link href={`section/${href}`} className=" text-sm font-bold">
							Show all
						</Link>
					)}
				</div>
			)}
			<div
				className={`grid @lg:grid-cols-[repeat(auto-fill,minmax(183px,1fr))] @md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] @xs:grid-cols-2  grid-rows-1 overflow-y-hidden  ${variants[variant]}`}
			>
				{children}
			</div>
		</section>
	);
}
export { Section };
