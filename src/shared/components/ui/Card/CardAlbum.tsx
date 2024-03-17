import { Card } from ".";

function CardAlbum({ item }: { item: Album }) {
	return (
		<Card href={`/album/${item.id}`}>
			<Card.Img src={item.images[0].url} alt={`${item.name} ${item.type}`} />
			<Card.Div>
				<Card.Title>{item.name}</Card.Title>
				<Card.Description>
					{`${item.release_date.split("-")[0]} • ${item.artists[0].name}`}
				</Card.Description>
			</Card.Div>
		</Card>
	);
}
export { CardAlbum };
