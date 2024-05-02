"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import NavigationButton from "./NavigationButton";

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
				<NavigationButton
					key={label}
					label={label}
					Icon={Icon}
					onClick={onClick}
				/>
			))}
		</div>
	);
}
export { TopBarNavigationButtons };
