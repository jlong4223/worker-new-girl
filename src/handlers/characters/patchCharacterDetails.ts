import { IRequest } from "itty-router";
import { updateCharacterDetails } from "../../database/documents/characters/characters";
import { apiResponse } from "../../utils/routes";

// TODO add test
export const patchCharacterDetailsHandler = async (request: IRequest) => {
  const { id: characterId } = request.params;
  const { isTest } = request;

  const body = await request.json();
  const result = await updateCharacterDetails(characterId, body, isTest);

  return apiResponse(result);
};
