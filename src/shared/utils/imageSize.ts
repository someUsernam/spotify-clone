type ImageSizeParam = "small" | "medium" | "large";

export function getImageUrlBySize(images: Image[], size: ImageSizeParam) {
	if (!images[0] || images.length === 0) {
		return "";
	}

	const image = images.reduce((acc, curr) => {
		if (!curr.height || !acc.height)
			throw new Error("Image height or width is missing");

		if (size === "small") {
			if (curr.height < acc.height) return curr;
		}
		if (size === "medium") {
			if (curr.height < 600 && curr.height > 100) return curr;
		}
		if (curr.height > acc.height) return curr;

		return acc;
	}, images[0]);

	return image.url ?? "";
}
