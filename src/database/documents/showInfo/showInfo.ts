import { getRawDataById } from "@gearsnbeans/faunadb-utils";
import { Collections } from "../../fauna_deprecated/collections";

export const getShowInfo = async (id: string) => {
	const showInfo = await getRawDataById(Collections.SHOW_INFO, id);
	return showInfo;
};
