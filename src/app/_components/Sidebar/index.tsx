import { Suspense } from "react";
import { SidebarLayout } from "./SidebarLayout";
import { SidebarLibrary } from "./SidebarLibrary";
import { SidebarLibraryMenu } from "./SidebarLibraryMenu";
import { SidebarPlaylistsSection } from "./SidebarPlaylistsSection";
import { SidebarRoutesLayout } from "./SidebarRoutesLayout";
import { SidebarRoutesMenu } from "./SidebarRoutesMenu";

async function Sidebar() {
	return (
		<SidebarLayout>
			<SidebarRoutesLayout>
				<SidebarRoutesMenu />
			</SidebarRoutesLayout>

			<SidebarLibrary>
				<SidebarLibraryMenu />
				<Suspense fallback={<div>Loading...</div>}>
					<SidebarPlaylistsSection />
				</Suspense>
			</SidebarLibrary>
		</SidebarLayout>
	);
}

export { Sidebar };
