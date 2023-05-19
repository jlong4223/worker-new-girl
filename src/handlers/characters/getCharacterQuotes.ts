import { IRequest } from "itty-router";
import { getCharacterQuotes } from "../../database/documents/characters/characters";
import { apiResponse } from "../../utils/routes";

export const getCharacterQuotesHandler = async (request: IRequest) => {
  const { id } = request.params;
  const { isTest } = request;

  const characterWithQuotes = await getCharacterQuotes(id, isTest);
  return apiResponse(characterWithQuotes);
};
