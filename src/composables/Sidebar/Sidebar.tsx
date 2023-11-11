import SidebarLayout from "@/composables/Sidebar/SidebarLayout";
import SidebarLibrary from "@/composables/Sidebar/SidebarLibrary";
import SidebarLibraryMenu from "@/composables/Sidebar/SidebarLibraryMenu";
import SidebarPlaylistsSection from "@/composables/Sidebar/SidebarPlaylistsSection";
import SidebarRoutesLayout from "@/composables/Sidebar/SidebarRoutesLayout";
import SidebarRoutesMenu from "@/composables/Sidebar/SidebarRoutesMenu";
import { Suspense } from "react";

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

export default Sidebar;
