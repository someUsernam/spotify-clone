function formatDate(date: string | number | Date) {
	return new Date(date).toLocaleDateString("en-US", {
		day: "2-digit",
		year: "numeric",
		month: "short",
	});
}

export { formatDate };
