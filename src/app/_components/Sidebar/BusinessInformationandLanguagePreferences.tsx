import { Button } from "@ui/Button";
import { TbWorld } from "react-icons/tb";
import { BusinessInformationLinks } from "./BusinessInformationLinks";

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
export { BusinessInformationandLanguagePreferences };
