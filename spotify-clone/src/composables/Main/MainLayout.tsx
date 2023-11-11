function MainLayout({ children }: ChildrenProps) {
	return (
		<main className="flex flex-col flex-1 dark:bg-secondary rounded-lg dark:text-subdued overflow-hidden relative overflow-y-auto [flex-flow:wrap] transparent-scrollbar">
			{children}
		</main>
	);
}
export default MainLayout;
