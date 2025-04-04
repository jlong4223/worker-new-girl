import { IRequest } from "itty-router";
import { apiResponse } from "../../utils/routes";
import { getCharacterDetails } from "../../database/documents/characters/characters";

export const getDetailedCharacterHandler = async (request: IRequest) => {
  const { id } = request.params;
  const { isTest } = request;
  try {
    const characterWithDetails = await getCharacterDetails(id, isTest);
    return apiResponse(characterWithDetails);
  } catch (err: any | unknown) {
    return apiResponse(err);
  }
};
