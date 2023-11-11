import Image from "next/image";

type AvatarProps = {
	image: string;
	name: string;
	size: number;
	className?: string;
};

function Avatar({ image, name, size, className }: AvatarProps) {
	return (
		<figure
			className={`aspect-square w-6 rounded-full select-none overflow-hidden ${className}`}
		>
			<Image
				src={image}
				alt={`${name} profile picture`}
				width={size}
				height={size}
				className="object-cover w-full h-full"
			/>
		</figure>
	);
}
export default Avatar;
