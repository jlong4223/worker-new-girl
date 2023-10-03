import { getShowInfo } from "../database/documents/showInfo/showInfo";
import { apiResponse } from "../utils/routes";

export const welcomeHander = async () => {
  // @ts-ignore
  const showInfo = await getShowInfo("365484020443643981");
  const body = {
    message: "Welcome to the New Girl API",
    ...showInfo.data,
  };
  return apiResponse(body);
};
