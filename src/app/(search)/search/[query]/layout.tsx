import Filters from "@/components/Filters/Filters";

function Layout({ children }: ChildrenProps) {
	return (
		<>
			<Filters />
			{children}
		</>
	);
}
export default Layout;
