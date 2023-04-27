import { apiResponse } from "../utils/routes";

export const notFoundHandler = async () => {
  const body = {
    routeNote: "No route found",
    status: 404,
  };
  return apiResponse(body, 404);
};
