import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
	children: React.ReactNode;
	className?: string;
}

function Box({ children, className }: Props) {
	return (
		<div className={`bg-background rounded-lg text-subdued ${className}`}>
			{children}
		</div>
	);
}
export { Box };
