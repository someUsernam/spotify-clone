import Link from "next/link";
import { memo } from "react";

interface SidebarMenuItemProps {
	href: string;
	active: boolean;
	Icon: React.ComponentType<{ size: number }>;
	IconActive: React.ComponentType<{ size: number }>;
	label: string;
}

function SidebarMenuItem({
	href,
	active,
	Icon,
	IconActive,
	label,
}: SidebarMenuItemProps) {
	return (
		<li className="px-3 py-1">
			<Link
				href={href}
				className={`flex gap-x-5 h-10 items-center hover:text-primary transition-colors duration-200 font-bold ${
					active ? "text-primary" : ""
				}`}
			>
				{active ? <IconActive size={27} /> : <Icon size={27} />}
				<span className="hidden @[10rem]:block">{label}</span>
			</Link>
		</li>
	);
}
export default memo(SidebarMenuItem);
