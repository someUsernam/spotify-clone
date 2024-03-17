import { Box } from "@ui/Box";

function SidebarLibrary({ children }: ChildrenProps) {
	return (
		<Box className="flex flex-col flex-1 h-full overflow-hidden">
			{children}
		</Box>
	);
}
export { SidebarLibrary };
