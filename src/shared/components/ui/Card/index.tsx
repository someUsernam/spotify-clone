import Image from "next/image";
import Link from "next/link";

const variants = {
	"square-md": {
		image: "rounded-sm shadow-xl aspect-square object-cover",
		layout: "gap-4 p-4",
		title: "text-base",
		description: "",
	},
	"rounded-md": {
		image: "rounded-full shadow-xl aspect-square object-cover",
		layout: "gap-4 p-4",
		title: "text-base",
		description: "",
	},
	"rounded-xl": {
		image: "rounded-full shadow-xl aspect-square object-cover w-[92px]",
		layout: "gap-5 p-5",
		title: "text-[2rem]",
		description:
			"rounded-full bg-foreground/5 text-primary font-bold px-3 py-1 self-start",
	},
};

const CardContext = new Map();

type Variant = keyof typeof variants;

type CardProps = {
	children: React.ReactNode;
	href: string;
	variant?: Variant;
};

type ImgProps = {
	src: string;
	alt: string;
};

function Card({ children, href, variant = "square-md" }: CardProps) {
	CardContext.set("variant", variant);

	return (
		<Link
			href={href}
			className={`flex flex-col bg-elevated hover:bg-highlight rounded-md select-none overflow-hidden cursor-pointer transition-colors duration-200 ease-linear ${variants[variant].layout}`}
			data-variant={variant}
		>
			{children}
		</Link>
	);
}

function Img({ src, alt }: ImgProps) {
	const variant = CardContext.get("variant") as Variant;

	return (
		<Image
			src={src}
			alt={alt}
			width={300}
			height={300}
			className={variants[variant].image}
		/>
	);
}

function Title({ children }: ChildrenProps) {
	const variant = CardContext.get("variant") as Variant;

	return (
		<p className={`font-bold text-primary truncate ${variants[variant].title}`}>
			{children}
		</p>
	);
}

function Description({ children }: ChildrenProps) {
	const variant = CardContext.get("variant") as Variant;

	return (
		<p
			className={`text-sm capitalize truncate font-normal ${variants[variant].description}`}
		>
			{children}
		</p>
	);
}

function Div({ children }: ChildrenProps) {
	return <div className="flex flex-col gap-1.5 min-h-[62px]">{children}</div>;
}

Card.Img = Img;
Card.Title = Title;
Card.Description = Description;
Card.Div = Div;

export { Card };
