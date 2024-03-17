import { Card } from ".";
function CardShow({ item }: { item: Show }) {
	return (
		<Card href={`/show/${item.id}`}>
			<Card.Img src={item.images[0].url} alt={`${item.name} ${item.type}`} />
			<Card.Div>
				<Card.Title>{item.name}</Card.Title>
				<Card.Description>{item.publisher}</Card.Description>
			</Card.Div>
		</Card>
	);
}
export { CardShow };
