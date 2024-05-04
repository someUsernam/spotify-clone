function Main({ children }: ChildrenProps) {
	return (
		<main className="flex [flex-flow:wrap] rounded-b-lg -mt-2 text-subdued overflow-y-auto relative transparent-scrollbar w-full row-start-2 row-end-3 col-start-2 col-end-3 @container px-4 xl:px-5 2xl:px-6 bg-background">
			{children}
		</main>
	);
}

export { Main };
