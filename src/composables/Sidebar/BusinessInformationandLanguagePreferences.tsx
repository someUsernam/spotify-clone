import Button from "@/components/Button/Button";
import BusinessInformationLinks from "@/composables/Sidebar/BusinessInformationLinks";
import { TbWorld } from "react-icons/tb";

function BusinessInformationandLanguagePreferences() {
	return (
		<div className="overflow-hidden px-6 pb-8">
			<BusinessInformationLinks />
			<Button variant="outline-sm">
				<TbWorld size={20} />
				English
			</Button>
		</div>
	);
}
export default BusinessInformationandLanguagePreferences;
