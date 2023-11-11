import { getSearchAction } from "@/actions";
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll";
import PlaylistLayout from "@/components/Playlist/PlaylistLayout";
import { onError } from "@/utils/onError";
import { Metadata } from "next";

const type = "track";

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

	const { tracks } = result;

	return (
		<>
			{tracks.items && (
				<PlaylistLayout all={false}>
					<InfiniteScroll initData={tracks.items} type={type} />
				</PlaylistLayout>
			)}
		</>
	);
}
export default Page;
