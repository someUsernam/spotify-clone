"use client";

type ErrorPageProps = {
	error: {
		message: string;
		status: number;
	};
};

function ErrorPage({ error }: ErrorPageProps) {
	return (
		<div>
			<h1>Error</h1>
			<p>
				{error.message} - {error.status}
			</p>
		</div>
	);
}
export default ErrorPage;
