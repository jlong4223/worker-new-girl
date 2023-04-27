import { apiResponse } from "./routes";

export const queryNotSupportedRes = (query: unknown): Response => {
  const body = {
    routeNote: "Query not supported",
    status: 400,
    queryProvided: query,
  };
  return apiResponse(body, 400);
};

export const validationErrorRes = (error: string): Response => {
  const body = {
    routeNote: "Validation error",
    status: 400,
    error,
  };
  return apiResponse(body, 400);
};
