import { CharacterDetailsBody } from "../database/documents/characters/interfaces";
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

export const characterDetailsExistRes = (currentDetails: any): Response => {
  const body = {
    message:
      "Character details already exist. Please use PATCH instead to update or add to the current details.",
    currentDetails,
  };
  return apiResponse(body, 400);
};
