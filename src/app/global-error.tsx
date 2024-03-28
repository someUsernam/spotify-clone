"use client";

import { Button } from "@ui/Button";
import { GoArrowRight } from "react-icons/go";

function GlobalErrorPage({ error }: { error: Error }) {
	console.error(error);

	return (
		<html lang="en">
			<body className="h-screen flex place-items-center">
				<main>
					500
					<h1 className="special -mt-4">Internal Server Error</h1>
					<p className="-mt-4 max-w-sm text-center text-lg">
						This page has thrown a non-recoverable error.
					</p>
					<Button variant="light-lg" href="/">
						Back to Home
						<GoArrowRight />
					</Button>
				</main>
			</body>
		</html>
	);
}

export default GlobalErrorPage;
