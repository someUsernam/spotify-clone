"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function TopBarNavigationButtons() {
	const router = useRouter();

	const navigationButtons = useMemo(() => {
		return [
			{
				label: "Go Back",
				Icon: GoChevronLeft,
				onClick: () => {
					router.back();
				},
			},
			{
				label: "Go Forward",
				Icon: GoChevronRight,
				onClick: () => {
					router.forward();
				},
			},
		];
	}, [router]);

	return (
		<div className="flex gap-2 pointer-events-auto">
			{navigationButtons.map(({ label, Icon, onClick }) => (
				<button
					type="button"
					className="inline-flex items-center justify-center dark:bg-main opacity-60 dark:text-primary h-8 w-8 border-full rounded-full"
					aria-label={label}
					key={label}
					onClick={onClick}
				>
					<Icon size={25} />
				</button>
			))}
		</div>
	);
}
export { TopBarNavigationButtons };
