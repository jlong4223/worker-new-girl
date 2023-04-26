import { returnResponse } from "./routes";

export const queryNotSupportedRes = (query: unknown): Response => {
  const body = {
    routeNote: "Query not supported",
    status: 400,
    queryProvided: query,
  };
  return returnResponse(body, 400);
};
