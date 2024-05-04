function TopBarLayout({ children }: ChildrenProps) {
	return (
		<nav className="flex w-full h-16 rounded-t-lg z-10 py-4 px-5 sticky top-0 justify-between items-center bg-background gap-x-2 row-start-1 row-end-2 col-start-2 col-end-3">
			{children}
		</nav>
	);
}
export { TopBarLayout };
