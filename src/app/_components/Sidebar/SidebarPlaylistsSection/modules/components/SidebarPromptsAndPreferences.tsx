import { BusinessInformationandLanguagePreferences } from "../../../BusinessInformationandLanguagePreferences";
import { CreateSidebarPromptSection } from "../../../CreatePlaylistPromptSection";

function SidebarPromptsAndPreferences() {
	return (
		<>
			<div className="flex flex-col gap-2 px-2 pb-2 grow overflow-hidden overflow-y-auto">
				<CreateSidebarPromptSection
					title="Create your first playlist"
					subtitle="It's easy — we'll help you"
					buttonText="Create playlist"
				/>

				<CreateSidebarPromptSection
					title="Let's find some podcasts to follow"
					subtitle="We'll keep you updated on new episodes"
					buttonText="Browse podcasts"
				/>
			</div>
			<BusinessInformationandLanguagePreferences />
		</>
	);
}
export { SidebarPromptsAndPreferences };
