"use client";

import Box from "@/components/Box/Box";
import SidebarMenuItem from "@/components/Sidebar/SidebarMenuItem";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchEyeLine, RiSearchLine } from "react-icons/ri";

function SidebarMenu() {
	const pathname = usePathname();

	const routes = useMemo(() => {
		return [
			{
				IconActive: GoHomeFill,
				Icon: GoHome,
				label: "Home",
				active: pathname === "/",
				href: "/",
			},
			{
				Icon: RiSearchLine,
				IconActive: RiSearchEyeLine,
				label: "Search",
				active: pathname.includes("/search"),
				href: "/search",
			},
		];
	}, [pathname]);

	return (
		<Box>
			<ul className="px-3 p-2">
				{routes.map(({ href, active, Icon, IconActive, label }) => (
					<SidebarMenuItem
						href={href}
						active={active}
						Icon={Icon}
						IconActive={IconActive}
						label={label}
						key={label}
					/>
				))}
			</ul>
		</Box>
	);
}

export default SidebarMenu;
