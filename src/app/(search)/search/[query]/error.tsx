"use client";

type ErrorProps = {
	error: {
		message: string;
		status: number;
	};
};

function ErrorPage({ error }: ErrorProps) {
	return (
		<div>
			{error.message} - {error.status}
		</div>
	);
}
export default ErrorPage;
