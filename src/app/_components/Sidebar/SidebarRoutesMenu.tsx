"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchEyeLine, RiSearchLine } from "react-icons/ri";
import SidebarMenuItem from "./SidebarMenuItem";

function SidebarRoutesMenu() {
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
		<>
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
		</>
	);
}
export { SidebarRoutesMenu };
