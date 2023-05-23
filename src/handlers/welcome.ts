import { getShowInfo } from "../database/documents/showInfo/showInfo";
import { apiResponse } from "../utils/routes";

export const welcomeHander = async () => {
  // @ts-ignore
  const showInfo = await getShowInfo(SHOW_INFO_ID);
  const body = {
    message: "Welcome to the API",
    ...showInfo.data,
  };
  return apiResponse(body);
};
