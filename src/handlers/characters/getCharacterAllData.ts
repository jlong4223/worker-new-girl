import { IRequest } from "itty-router";
import { apiResponse } from "../../utils/routes";
import { getCharacterAllData } from "../../database/documents/characters/characters";

export const getCharacterAllDataHandler = async (request: IRequest) => {
  const { id } = request.params;
  const { isTest } = request;

  const allCharacterData = await getCharacterAllData(id, isTest);
  return apiResponse(allCharacterData);
};
