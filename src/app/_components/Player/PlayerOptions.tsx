import { HiOutlineQueueList } from "react-icons/hi2";
import { TbDevices2, TbMicrophone2 } from "react-icons/tb";
import { ICON_SIZE } from "./PlayerControls/modules/utils/consts";

function PlayerOptions() {
	return (
		<div className="flex">
			<TbMicrophone2 size={ICON_SIZE} />
			<HiOutlineQueueList size={ICON_SIZE} />
			<TbDevices2 size={ICON_SIZE} />
		</div>
	);
}
export { PlayerOptions };
