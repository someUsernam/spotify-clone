import {
	getCategoryPlaylist,
	getSingleCategory,
} from "@/shared/services/spotify";
import { Section } from "@blocks/Section";
import { Card } from "@ui/Card";

type CategoryProps = {
	params: {
		category: string;
	};
};

async function Page({ params: { category: categoryId } }: CategoryProps) {
	const [category, categoryPlaylist] = await Promise.all([
		getSingleCategory(categoryId),
		getCategoryPlaylist(categoryId),
	]);

	if (category?.error) {
		// throw new Error(category.error.message);
		console.log(category.error.message);
	}

	console.log(category, categoryPlaylist);

	return (
		<>
			<h1>{category.name}</h1>
			<Section title={category.name}>
				{categoryPlaylist.playlists.items.map((playlist) => (
					<Card href={`/playlist/${playlist.id}`} key={playlist.id}>
						<Card.Img
							src={playlist.images[0].url}
							alt={`${playlist.name} ${playlist.type}`}
						/>
						<Card.Div>
							<Card.Title>{playlist.name}</Card.Title>
							<Card.Description>{playlist.description}</Card.Description>
						</Card.Div>
					</Card>
				))}
			</Section>
		</>
	);
}
export default Page;
