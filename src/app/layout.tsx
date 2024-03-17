import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import Loading from "./(root)/loading";

import { Main } from "./_components/Main";
import { MainLayout } from "./_components/Main/MainLayout";
import { Player } from "./_components/Player";
import { Sidebar } from "./_components/Sidebar";
import { TopBar } from "./_components/TopBar";

import "./globals.css";
import { Player } from "./_components/Player";

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
				className={`${plusJakartaSans.className} grid grid-cols-[auto_1fr] dark:bg-main dark:text-primary gap-2 p-2 leading-relaxed overflow-hidden antialiased font-medium`}
			>
				<Sidebar />
				<MainLayout>
					<TopBar />
					<Main>
						<Suspense fallback={<Loading />}>{children}</Suspense>
					</Main>
				</MainLayout>
				<Player />
			</body>
		</html>
	);
}
