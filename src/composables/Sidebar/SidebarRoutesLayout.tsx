import Box from "@/components/Box/Box";

function SidebarRoutesLayout({ children }: ChildrenProps) {
	return (
		<Box>
			<ul className="px-3 p-2">{children}</ul>
		</Box>
	);
}
export default SidebarRoutesLayout;
