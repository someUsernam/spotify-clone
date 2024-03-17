import InfiniteScroll from "@/shared/components/blocks/InfiniteScroll/InfiniteScroll";
import { Section } from "@blocks/Section";
import { getSearchAction } from "@utils/actions";
import { onError } from "@utils/onError";
import { Metadata } from "next";

const type = "artist";

export async function generateMetadata({
	params: { query },
}: QueryProps): Promise<Metadata> {
	return {
		title: `${type}s related to "${query}"`,
	};
}

async function Page({ params: { query } }: QueryProps) {
	const result = await getSearchAction({
		query,
		type,
		offset: "0",
	});

	onError(result);

	const { artists } = result;

	return (
		<>
			{artists.items && (
				<Section variant="block">
					<InfiniteScroll initData={artists.items} type={type} />
				</Section>
			)}
		</>
	);
}
export default Page;
