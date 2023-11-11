function FiltersLayout({ children }: ChildrenProps) {
	return (
		<div className="sticky top-16 h-12 py-2 flex items-center gap-2 mb-8 text-sm z-10 dark:bg-secondary overflow-hidden overflow-x-auto whitespace-nowrap select-none ">
			{children}
		</div>
	);
}
export default FiltersLayout;
