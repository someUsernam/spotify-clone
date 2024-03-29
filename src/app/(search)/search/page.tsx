import { getSeveralCategories } from "@/shared/services/spotify";
import { Section } from "@blocks/Section";
import Image from "next/image";
import Link from "next/link";

type SearchProps = {
	searchParams: {
		q: string;
	};
};

async function page({ searchParams: { q: query } }: SearchProps) {
	const categoriesData = await getSeveralCategories();

	const { categories } = categoriesData;
	console.log(query);

	return (
		<Section title="Browse all" variant="block">
			{categories?.items.map((category) => (
				<Link
					key={category.id}
					className="rounded-lg bg-red-400 aspect-square overflow-hidden relative"
					href={`${category.id}`}
				>
					<span className="text-2xl font-bold break-words  text-primary absolute inset-4">
						{category.name}
					</span>
					{category.icons.map((icon) => (
						<Image
							key={icon.url}
							src={icon.url}
							alt={category.name}
							className="rotate-[25deg] w-1/2 aspect-square absolute top-1/2 left-1/2 transform translate-x-[18%] -translate-y-[2%] shadow-xl"
							width={300}
							height={300}
						/>
					))}
				</Link>
			))}
		</Section>
	);
}
export default page;
