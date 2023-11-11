import Box from "@/components/Box/Box";

function SidebarLibrary({ children }: ChildrenProps) {
	return (
		<Box className="flex flex-col flex-1 h-full overflow-hidden">
			{children}
		</Box>
	);
}
export default SidebarLibrary;
