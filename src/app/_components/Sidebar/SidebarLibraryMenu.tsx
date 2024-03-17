"use client";
import { BiLibrary, BiPlus } from "react-icons/bi";

function SidebarLibraryMenu() {
	return (
		<div className="p-2 dark:text-subdued px-4 flex justify-between items-center">
			<div className="flex items-center px-2 py-1 gap-3 h-10 font-bold dark:hover:text-primary transition-colors duration-200 cursor-pointer">
				<BiLibrary size={27} />
				<span className="hidden @[10rem]:block truncate">Your Library</span>
			</div>
			<button
				type="button"
				aria-label="Create playlist or folder"
				aria-expanded="false"
				className="flex items-center justify-center h-8 w-8 dark:hover:bg-highlight-secondary rounded-full dark:hover:text-primary cursor-pointer transition-colors duration-300"
			>
				<BiPlus size={25} className="hidden @[10rem]:block" />
			</button>
		</div>
	);
}

export { SidebarLibraryMenu };
