import InfiniteScroll from "@/shared/components/blocks/InfiniteScroll/InfiniteScroll";
import { Section } from "@blocks/Section";
import { onError } from "@shared/utils/onError";
import { getSearchAction } from "@utils/actions";
import { Metadata } from "next";

const type = "episode";

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

	const { episodes } = result;

	return (
		<>
			{episodes.items && (
				<Section variant="block">
					<InfiniteScroll initData={episodes.items} type={type} />
				</Section>
			)}
		</>
	);
}
export default Page;
