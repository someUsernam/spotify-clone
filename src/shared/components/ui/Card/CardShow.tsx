import { Card } from ".";

type CardShowProps = {
	item: SimplifiedShow;
};

function CardShow({ item }: CardShowProps) {
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
