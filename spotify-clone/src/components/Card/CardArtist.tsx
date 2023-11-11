import Card from "./Card";

function CardArtist({ item }: { item: Artist }) {
	return (
		<Card href={`/artist/${item.id}`} variant="rounded-md">
			<Card.Img src={item.images[0]?.url} alt={`${item.name} ${item.type}`} />
			<Card.Div>
				<Card.Title>{item.name}</Card.Title>
				<Card.Description>{item.type}</Card.Description>
			</Card.Div>
		</Card>
	);
}
export default CardArtist;
