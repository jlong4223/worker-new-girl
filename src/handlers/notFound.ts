import { returnResponse } from "../utils/routes";

export const notFoundHandler = async () => {
  const body = {
    routeNote: "No route found",
    status: 404,
  };
  return returnResponse(body, 404);
};
