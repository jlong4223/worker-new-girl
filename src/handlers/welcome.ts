import { IRequest } from "itty-router";
import { showInfo } from "../data/showInfo";
import { apiResponse } from "../utils/routes";

export const welcomeHander = async (_req: IRequest, env: Env) => {
	return apiResponse(showInfo.data);
};
