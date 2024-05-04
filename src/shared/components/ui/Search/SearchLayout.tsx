import { RiSearchLine } from "react-icons/ri";

function SearchLayout({ children }: ChildrenProps) {
	return (
		<form role="search" className="grow flex relative group">
			{children}
			<span className="absolute top-1/2 transform -translate-y-1/2 translate-x-2/3 text-subdued group-hover:text-primary group-focus-within:text-primary ">
				<RiSearchLine size={18} />
			</span>
		</form>
	);
}
export default SearchLayout;
