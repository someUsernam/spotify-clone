"use client";

type NavigationButtonProps = {
	label: string;
	Icon: React.ComponentType<{ size: number }>;
	onClick: () => void;
};

function NavigationButton({ label, Icon, onClick }: NavigationButtonProps) {
	return (
		<button
			type="button"
			className="inline-flex items-center justify-center bg-primary-foreground hover:bg-highlight text-primary size-8 rounded-full"
			aria-label={label}
			key={label}
			onClick={onClick}
		>
			<Icon size={25} />
		</button>
	);
}
export default NavigationButton;
