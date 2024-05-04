import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import Loading from "./(root)/loading";

import { Player } from "./_components/Player";
import { Sidebar } from "./_components/Sidebar";
import { TopBar } from "./_components/TopBar";

import { Main } from "./_components/Main";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Spotify - Web Player: Music for everyone",
	description:
		"Spotify is a digital music service that gives you access to millions of songs.",
};

export default function RootLayout({ children }: ChildrenProps) {
	return (
		<html lang="en">
			<body
				className={`${plusJakartaSans.className} h-svh grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_70px] bg-primary-foreground text-primary gap-2 p-2 leading-relaxed overflow-hidden antialiased font-medium`}
			>
				<Sidebar />
				<TopBar />
				<Main>
					<Suspense fallback={<Loading />}>{children}</Suspense>
				</Main>
				<Player />
			</body>
		</html>
	);
}
