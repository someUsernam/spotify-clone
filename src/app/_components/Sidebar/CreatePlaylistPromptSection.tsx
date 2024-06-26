"use client";

import { Button } from "@ui/Button";

interface Props {
	title: string;
	subtitle: string;
	buttonText: string;
}

function CreateSidebarPromptSection({ title, subtitle, buttonText }: Props) {
	return (
		<section className="flex flex-col gap-5 justify-center my-2 py-4 px-5 bg-highlight/80 rounded-lg">
			<div className="flex flex-col gap-2 text-primary">
				<span className=" font-bold text-base leading-relaxed">{title}</span>
				<span className="text-sm leading-relaxed">{subtitle}</span>
			</div>
			<div>
				<Button variant="light-sm">
					<span>{buttonText}</span>
				</Button>
			</div>
		</section>
	);
}

export { CreateSidebarPromptSection };
