import Main from "@/composables/Main/Main";
import MainLayout from "@/composables/Main/MainLayout";
import Sidebar from "@/composables/Sidebar/Sidebar";
import TopBar from "@/composables/TopBar/TopBar";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import Loading from "./(root)/loading";
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
				className={`${plusJakartaSans.className} grid grid-cols-[auto_1fr] dark:bg-main dark:text-primary gap-2 p-2 leading-relaxed overflow-hidden antialiased font-medium`}
			>
				<Sidebar />
				<MainLayout>
					<TopBar />
					<Main>
						<Suspense fallback={<Loading />}>{children}</Suspense>
					</Main>
				</MainLayout>
			</body>
		</html>
	);
}
