import Link from "next/link";
import { memo } from "react";

interface Props {
	href: string;
	active: boolean;
	Icon: React.JSXElementConstructor<{ size: number }>;
	IconActive: React.JSXElementConstructor<{ size: number }>;
	label: string;
}

function SidebarMenuItem({ href, active, Icon, IconActive, label }: Props) {
	return (
		<li className="px-3 py-1">
			<Link
				href={href}
				className={`flex gap-x-5 h-10 items-center dark:hover:text-primary transition-colors duration-200 font-bold ${
					active ? "dark:text-primary" : ""
				}`}
			>
				{active ? <IconActive size={27} /> : <Icon size={27} />}
				<span className="hidden @[10rem]:block">{label}</span>
			</Link>
		</li>
	);
}
export default memo(SidebarMenuItem);
