import { getSearchAction } from "@/actions";
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll";
import Section from "@/components/Main/Section";
import { onError } from "@/utils/onError";
import { Metadata } from "next";

const type = "album";

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

	const { albums } = result;

	return (
		<>
			{albums.items && (
				<Section variant="block">
					<InfiniteScroll initData={albums.items} type={type} />
				</Section>
			)}
		</>
	);
}
export default Page;
