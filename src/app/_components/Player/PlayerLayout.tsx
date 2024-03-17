function PlayerLayout({ children }: ChildrenProps) {
	return (
		<footer className="basis-full flex items-center justify-between col-span-2 h-[72px]">
			{children}
		</footer>
	);
}
export { PlayerLayout };
