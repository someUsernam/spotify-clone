import Link from "next/link";
import { UrlObject } from "url";

import { ComponentPropsWithRef, forwardRef } from "react";

const base =
	"rounded-full cursor-pointer relative touch-manipulation hover:scale-105 text-center font-bold hover:font-extrabold transition-colors duration-200 whitespace-nowrap focus:outline-[3px] dark:focus:outline-white";

const variants = {
	"light-sm": `${base} dark:bg-primary dark:text-secondary px-4 py-1 h-8 text-sm`,
	"light-md": `${base} dark:bg-primary dark:text-secondary px-4 py-2 h-10 text-base`,
	"light-lg": `${base} dark:bg-primary dark:text-secondary px-8 py-2 h-12 text-base`,
	"dark-sm": `${base} dark:bg-secondary dark:text-primary px-4 py-1 h-8 text-sm`,
	"dark-md": `${base} dark:bg-secondary dark:text-primary px-4 py-2 h-10 text-base`,
	"dark-lg": `${base} dark:bg-secondary dark:text-primary px-8 py-2 h-12 text-base`,
	"outline-sm": `${base} dark:border-main-essential-subdued dark:text-primary px-3 py-1.5 text-sm border gap-1 dark:hover:border-main-essential-primary flex items-center `,
};

interface ButtonProps extends ComponentPropsWithRef<"button"> {
	variant: keyof typeof variants;
	href?: string | UrlObject;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			href,
			type = "button",
			variant = "light-sm",
			...props
		},
		ref,
	) =>
		href === undefined ? (
			<button
				ref={ref}
				type={type}
				data-variant={variant}
				className={`${variants[variant]} ${className}`}
				{...props}
			>
				{children}
			</button>
		) : (
			<Link
				href={href}
				type={type}
				data-variant={variant}
				className={`${variants[variant]} ${className}`}
			>
				{children}
			</Link>
		),
);

export default Button;
