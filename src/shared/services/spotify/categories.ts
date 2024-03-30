"use server";

import { MAX_ITEMS_IN_PAGE, endpoint } from "@/shared/utils/constants";
import { fetchAndHandleErrors } from "@/shared/utils/fetchAndHandleErrors";
import { withAuthHeaders } from "@/shared/utils/withAuthHeaders";

const { origin, categories } = endpoint.spotify;

async function getSeveralBrowseCategories() {
	return fetchAndHandleErrors<GetSeveralBrowseCategories>(
		`${origin}${categories.several}`,
		{
			headers: withAuthHeaders({}),
			params: {
				limit: MAX_ITEMS_IN_PAGE,
			},
		},
	);
}

async function getSingleBrowseCategory(categoryId: string) {
	return fetchAndHandleErrors<GetSingleBrowseCategory>(
		`${origin}${categories.single(categoryId)}`,
		{
			headers: withAuthHeaders({}),
		},
	);
}

export { getSeveralBrowseCategories, getSingleBrowseCategory };
