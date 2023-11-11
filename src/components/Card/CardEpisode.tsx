import { HoursMinutesSeconds } from "@/utils/HoursMinutesSeconds";
import Card from "./Card";

function formatReleaseDate(releaseDate: string) {
	return new Date(releaseDate).toString().split(" ").splice(1, 2).join(" ");
}

const ONE_HOUR = 3600000;

function CardEpisode({ item }: { item: Episode }) {
	const [minutes] = HoursMinutesSeconds(item.duration_ms);

	return (
		<Card href={`/episode/${item.id}`}>
			<Card.Img
				src={item.images[0].url}
				alt={`${item.name} ${item.type}`}
			/>
			<Card.Div>
				<Card.Title>{item.name}</Card.Title>
				<Card.Description>
					{formatReleaseDate(item.release_date)} • {minutes} min
				</Card.Description>
			</Card.Div>
		</Card>
	);
}
export default CardEpisode;
