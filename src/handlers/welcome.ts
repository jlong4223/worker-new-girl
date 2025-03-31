import { IRequest } from "itty-router";
import { getShowInfo } from "../database/documents/showInfo/showInfo";
import { apiResponse } from "../utils/routes";

export const welcomeHander = async (_req: IRequest, env: Env) => {
  const showInfoId = env.SHOW_INFO_ID;
  const showInfo = await getShowInfo(showInfoId);
  const body = {
    message: "Welcome to the New Girl API",
    ...showInfo.data,
  };
  return apiResponse(body);
};
