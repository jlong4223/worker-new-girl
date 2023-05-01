import { IRequest } from "itty-router";
import { apiResponse } from "../../utils/routes";
import { updateCharacter } from "../../database/documents/characters/characters";

interface IRequestWithVerifiedBody extends IRequest {
  verifiedBody: any;
}

export const patchCharacterHandler = async (
  request: IRequestWithVerifiedBody
) => {
  const { id } = request.params;
  const { isTest } = request;

  const body = request.verifiedBody;
  const result = await updateCharacter(id, body, isTest);

  return apiResponse(result);
};
