"use client";

import { Button } from "@ui/Button";
import { useEffect } from "react";

type ErrorPageProps = {
	error: {
		message: string;
		status: number;
	};
};

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("catched by app error boundary -", error);
	}, [error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<Button variant="light-md" onClick={() => reset()}>
				Try again
			</Button>
		</div>
	);
}
