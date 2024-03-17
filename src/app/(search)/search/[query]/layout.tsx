import { Filters } from "@blocks/Filters";

function Layout({ children }: ChildrenProps) {
	return (
		<>
			<Filters />
			{children}
		</>
	);
}
export default Layout;
