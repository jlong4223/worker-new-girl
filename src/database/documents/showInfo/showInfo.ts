import { Collections } from "../../collections";
import { getSingleRefDataByID } from "../../queries";

export const getShowInfo = async (id: string) => {
  const showInfo = await getSingleRefDataByID(Collections.SHOW_INFO, id);
  return showInfo;
};
