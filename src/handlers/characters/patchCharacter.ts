import { IRequest } from "itty-router";
import { apiResponse } from "../../utils/routes";
import { updateCharacter } from "../../database/documents/characters/characters";

export const patchCharacterHandler = async (request: IRequest) => {
  const { id } = request.params;
  const { isTest } = request;

  const body = await request.json();
  const result = await updateCharacter(id, body, isTest);

  return apiResponse(result);
};
