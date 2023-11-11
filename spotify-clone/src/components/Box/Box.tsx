import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
	children: React.ReactNode;
	className?: string;
}

function Box({ children, className }: Props) {
	return (
		<div
			className={`dark:bg-main-primary rounded-lg dark:text-subdued ${className}`}
		>
			{children}
		</div>
	);
}
export default Box;
