import { Card } from ".";

function CardPlaylist<T extends SimplifiedPlaylist>({ item }: { item: T }) {
	return (
		<Card href={`/playlist/${item.id}`}>
			<Card.Img src={item.images[0].url} alt={`${item.name} ${item.type}`} />
			<Card.Div>
				<Card.Title>{item.name}</Card.Title>
				<Card.Description>{`By ${item.owner.display_name}`}</Card.Description>
			</Card.Div>
		</Card>
	);
}
export { CardPlaylist };
