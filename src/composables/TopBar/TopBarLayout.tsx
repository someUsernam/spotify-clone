function TopBarLayout({ children }: ChildrenProps) {
	return (
		<nav className="flex w-full h-16 rounded-ss-lg z-10 py-4 px-5 sticky top-0 justify-between items-center dark:bg-darken-40 gap-x-2">
			{children}
		</nav>
	);
}
export default TopBarLayout;
